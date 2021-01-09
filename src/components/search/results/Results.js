import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import queryString from "query-string";
import { Divider, Row, Col } from "antd";

import requireAuth from "../../HOCs/requireAuth";
import withRequestStatus from "../../HOCs/withRequestStatus";

import { fetchUsers, fetchSpecialties } from "../../../actions";
import SearchBar from "../SearchBar";
import ResultList from "./ResultList";
import ResultDetail from "./ResultDetail";

class Results extends React.Component {
  state = {
    formattedRadius: null,
    searchedSpecialistId: null,
    selectedResult: {},
  };

  componentDidMount() {
    // Grab the results for the first page on initial load.
    this.retrieveSearchResults(1);
  }

  componentDidUpdate(prevProps) {
    // Check if the params in the url have updated, if they have do a new search. Ensure that it doesn't run on first load either by checking that the value in previous props exists.
    if (
      prevProps.location.search &&
      prevProps.location.search !== this.props.location.search
    ) {
      this.retrieveSearchResults(1);
    }
  }

  retrieveSearchResults = page => {
    // Grab the search params from the url to use them.
    const searchParams = queryString.parse(this.props.location.search);

    const {
      specialty_id,
      radius,
      sort_by,
      lat,
      lon,
      name,
      languages_spoken,
      designations,
      is_wheelchair_accessible,
      is_accepting_new_patients,
    } = searchParams;

    this.props.fetchUsers(
      specialty_id,
      radius,
      page,
      sort_by,
      lat,
      lon,
      name,
      languages_spoken,
      designations,
      is_wheelchair_accessible,
      is_accepting_new_patients
    );

    // Save these to state because we need to access them to display the list nicely.
    this.setState({
      formattedRadius: radius * 0.001,
      isNewSearch: false,
    });
  };

  onResultSelect = result => {
    this.setState({ selectedResult: result });
  };

  render() {
    const { selectedResult, formattedRadius } = this.state;
    const {
      specialists,
      numSpecialists,
      searchedSpecialty,
      isLoading,
    } = this.props;

    return (
      <div>
        <SearchBar isResult={true} />
        <Divider />
        <Row type="flex" justify="space-around" align="top">
          <Col style={{ padding: "0 20px" }} span={8}>
            <ResultList
              onResultSelect={this.onResultSelect}
              retrieveSearchResults={this.retrieveSearchResults}
              selectedResult={selectedResult}
              results={specialists}
              resultCount={numSpecialists}
              searchedSpecialty={searchedSpecialty}
              formattedRadius={formattedRadius}
              isLoading={isLoading}
            />
          </Col>
          <Col style={{ padding: "0 20px" }} span={16}>
            <div
              style={{
                padding: "2.5vh 20px",
                borderRadius: "5px",
                border: "1px solid #ebedf0",
                minHeight: "75vh",
              }}
            >
              <ResultDetail
                result={selectedResult}
                results={specialists}
                isLoading={isLoading}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading,
    specialists,
    numSpecialists,
    searchedSpecialty,
    errorMessage,
  } = state.usersReducer;

  const { specialties } = state.specialtiesReducer;

  return {
    isLoading,
    specialists,
    numSpecialists,
    searchedSpecialty,
    errorMessage,
    specialties,
  };
};

export default requireAuth(
  withRouter(
    connect(
      mapStateToProps,
      { fetchUsers, fetchSpecialties }
    )(withRequestStatus(Results))
  )
);

export let undecorated = connect(
  mapStateToProps,
  { fetchUsers, fetchSpecialties }
)(Results);
