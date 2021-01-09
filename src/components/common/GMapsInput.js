import React from "react";
import { Select, Divider } from "antd";
import PropTypes from "prop-types";
import Script from "react-load-script";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

import { fetchUsersProfile } from "../../actions";
import CenteredSpinner from "./CenteredSpinner";
import {
  GOOGLE_API_KEY,
  GOOGLE_API_RESTRICTIONS,
  GOOGLE_API_TYPES,
  COOKIE_U_TYPE,
} from "../../constants";
import { generateAddressSearchObject } from "../../utils";

const { OptGroup, Option } = Select;
const cookie = new Cookies();

class GMapsInput extends React.Component {
  state = {
    isLoading: false,
    places: [],
    value: undefined,
    scriptLoaded: false,
  };

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      const { value } = nextProps;

      // Ensure that we only set value if it's not previously set. (Initial value)
      if (value) {
        return {
          value: [value],
        };
      }
    }
    return null;
  }

  componentDidMount() {
    if (this.props.showUserLocations && cookie.get(COOKIE_U_TYPE) !== "3") {
      this.props.fetchUsersProfile();
    }
  }

  componentDidUpdate(prevProps) {
    const { value, profile, showUserLocations } = this.props;
    /* If the initial value is set we need to trigger the search script.
      To do that we must verify that the value is set. Additionally, we need to check if it's a string as the only time it is of type string is when the initial value is set. Finally
      we need to be sure that the previous value doesn't exist.
      Lastly, ensure that the address is not in the users provider locations if they enable that feature.  */

    if (
      value &&
      typeof value === "string" &&
      !prevProps.value &&
      showUserLocations &&
      !profile.provider.addresses.some(address => address.address === value)
    ) {
      this.onSearch(value);
      this.onChange(value);
    } else if (value && value.isInitialValue) {
      this.onSearch(value);
    }
  }

  onSearch = query => {
    if (this.state.scriptLoaded && query.length) {
      // Initialize Gmaps.
      this.autocompleteService = new window.google.maps.places.AutocompleteService();

      let options = {
        input: query,
        componentRestrictions: GOOGLE_API_RESTRICTIONS,
        // types: GOOGLE_API_TYPES,
      };

      this.setState({ places: [], isLoading: true }, () => {
        this.autocompleteService.getPlacePredictions(options, results => {
          results = results || [];

          // const places = results.filter(result => {
          //   if (result.types.some(type => GOOGLE_API_TYPES.includes(type))) {
          //     return {
          //       address: result.description,
          //       placeId: result.place_id,
          //     };
          //   }
          // });

          var places = results.reduce((places, result) => {
            console.log(result);
            if (result.types.some(type => GOOGLE_API_TYPES.includes(type))) {
              places.push({
                address: result.description,
                placeId: result.place_id,
              });
            }
            return places;
          }, []);

          // const places = results.map(result => {
          //   return {
          //     address: result.description,
          //     placeId: result.place_id,
          //   };
          // });

          console.log(places);

          this.setState({ places, isLoading: false });
        });
      });
    }
  };

  promiseGeocode = value => {
    return new Promise(resolve => {
      this.geocoder = new window.google.maps.Geocoder();

      this.geocoder.geocode({ placeId: value }, (results, status) => {
        let result;

        if (status === window.google.maps.GeocoderStatus.OK) {
          result = generateAddressSearchObject(
            results[0].formatted_address,
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
        }
        resolve(result[0]);
      });
    });
  };

  onChange = value => {
    if (this.state.scriptLoaded) {
      const { profile } = this.props;

      if (profile.provider && profile.provider.addresses[value]) {
        const result = generateAddressSearchObject(
          profile.provider.addresses[value].address,
          profile.provider.addresses[value].latitude,
          profile.provider.addresses[value].longitude
        );

        this.props.onChange(result[0]);
        this.setState({ value: result, isLoading: false });
      } else {
        // Grab the latitude and longitude when an item is clicked.
        this.geocoder = new window.google.maps.Geocoder();

        Promise.all([this.promiseGeocode(value)]).then(result => {
          this.props.onChange(result[0]);
          this.setState({ value: result, isLoading: false });
        });
      }
    }
  };

  onBlur = () => {
    // If the value is not set, we want to clear the list of results
    if (!this.state.value) {
      this.setState({ value: undefined, places: [], isLoading: false });
    }
  };

  renderSearchStatus = (value, isLoading, places) => {
    /* If a value is present, and the state is loading and there are no results display a loading indicator.
      If a value is present and the state is not loading and there are no results tell the user no results were found.
      Show nothing when the user has just focused into the addressbar. */
    if (value && isLoading && !places.length) {
      return <CenteredSpinner message="Searching..." />;
    } else if (value && !places.length) {
      return "No results found.";
    } else {
      return "Type to start searching for more locations.";
    }
  };

  render() {
    const { placeholder, style, size, profile, showUserLocations } = this.props;
    const { places, value, isLoading } = this.state;

    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`}
          onCreate={() => {
            this.setState({ scriptLoaded: false });
          }}
          onLoad={() => {
            this.setState({ scriptLoaded: true });
          }}
        />
        <Select
          showSearch
          showArrow={false}
          placeholder={placeholder || "Search Locations"}
          style={style}
          size={size}
          onSearch={this.onSearch}
          onChange={this.onChange}
          onBlur={this.onBlur}
          value={value && value[0].address}
          loading={isLoading}
          filterOption={false}
          notFoundContent={this.renderSearchStatus(value, isLoading, places)}
          dropdownRender={menu => (
            <div>
              {menu}
              {/* Only render google logo when we are using their data. */}
              {(places.length || isLoading) && (
                <div>
                  <Divider style={{ margin: "0" }} />
                  <div style={{ textAlign: "center", padding: "0.5vmin" }}>
                    <img
                      alt="Google logo"
                      src="https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.us-east-2.amazonaws.com/powered_by_google_on_white.png"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        >
          {cookie.get(COOKIE_U_TYPE) !== "3" &&
            showUserLocations &&
            profile.provider && (
              <OptGroup label="Your Locations">
                {profile.provider &&
                  profile.provider.addresses.map((place, index) => (
                    <Option key={index}>{place.address}</Option>
                  ))}
              </OptGroup>
            )}
          <OptGroup label="Search Results">
            {places.map(place => (
              <Option key={place.placeId}>{place.address}</Option>
            ))}
          </OptGroup>
        </Select>
      </div>
    );
  }
}

GMapsInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "large", "small"]),
  showUserLocations: PropTypes.bool,
};

const mapStateToProps = state => {
  const { profile, isLoading, errorMessage } = state.usersProfileReducer;

  return {
    profile,
    isLoading,
    errorMessage,
  };
};

export default connect(
  mapStateToProps,
  { fetchUsersProfile }
)(GMapsInput);
