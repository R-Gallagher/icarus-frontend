import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Select, Row, Button, Tooltip } from "antd";
import PropTypes from "prop-types";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import moment from "moment";

import GMapsInput from "../common/GMapsInput";
import ApiResourceSelect from "../common/ApiResourceSelect";
import { fetchSpecialties } from "../../actions";
import { COUNTRY } from "../../constants";
import AdvancedSearchBar from "./AdvancedSearchBar";

const FormItem = Form.Item;
const Option = Select.Option;

class SearchBar extends React.Component {
  state = {
    specialty_id: "",
    radius: "",
    sort: "",
    address: {},
  };

  componentDidMount() {
    if (this.props.isResult) {
      const searchParams = queryString.parse(this.props.location.search);

      this.setState({
        specialty_id: searchParams.specialty_id,
        radius: searchParams.radius,
        sort: searchParams.sort_by,
        address: {
          address: searchParams.address,
          location: {
            lat: searchParams.lat,
            lon: searchParams.lon,
          },
          isInitialValue: true,
        },
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {
          specialty_id,
          radius,
          sort_by,
          place,
          name,
          languages_spoken,
          designations,
          is_wheelchair_accessible,
          is_accepting_new_patients,
          education,
          research_interests,
          services_provided,
          hours,
        } = values;
        var { insurance_ids } = values;

        if (COUNTRY !== "US") {
          insurance_ids = false;
        }

        const { address } = place;
        const { lat, lon } = place.location;

        let startTime = "";
        let endTime = "";

        if (hours && hours.startTime && hours.endTime) {
          startTime = moment(hours.startTime, "HH:mm:ss").format("HH:mm");
          endTime = moment(hours.endTime, "HH:mm:ss").format("HH:mm");
        }

        // Send the search through the URL, so that the user can copy/paste the link for reference.
        this.props.history.push({
          pathname: "/results",
          search:
            "?" +
            new URLSearchParams({
              specialty_id,
              address,
              lat,
              lon,
              radius,
              sort_by,
              ...(insurance_ids && { insurance_ids }),
              ...(name && { name }),
              ...(languages_spoken && { languages_spoken }),
              ...(designations && { designations }),
              ...(is_wheelchair_accessible && { is_wheelchair_accessible }),
              ...(is_accepting_new_patients && { is_accepting_new_patients }),
              ...(endTime && { endTime }),
              ...(education && { education }),
              ...(research_interests && { research_interests }),
              ...(services_provided && { services_provided }),
              ...(startTime && { startTime }),
              ...(endTime && { endTime }),
            }).toString(),
        });
      }
    });
  };

  renderInsuranceBasedOnCountry = () => {
    const { getFieldDecorator } = this.props.form;

    if (COUNTRY === "US") {
      return (
        <FormItem>
          {getFieldDecorator("insurance_ids", {
            rules: [
              {
                required: true,
                message: "Please select a Insurance Provider!",
              },
            ],
          })(
            <Select
              size="large"
              showSearch
              mode="multiple"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: "16vw", padding: "0.5em" }}
              placeholder="Select Insurance Coverage"
            >
              {this.props.insuranceTypes.insurance.map(currElement => (
                <Option key={currElement.id}>
                  {currElement.insurance_name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
      );
    }
  };
  // Need to discuss how to conditionally render these forms better.
  render() {
    const { getFieldDecorator } = this.props.form;
    const { form } = this.props;

    if (this.props.isResult) {
      const searchParams = queryString.parse(this.props.location.search);

      return (
        <div>
          <Row type="flex" justify="space-around">
            <Form onSubmit={this.onSubmit} layout="inline">
              <Row type="flex" justify="space-around">
                <FormItem>
                  {getFieldDecorator("specialty_id", {
                    initialValue: this.state.specialty_id,
                    rules: [
                      {
                        required: true,
                        message: "Please select a Specialty!",
                      },
                    ],
                  })(
                    <ApiResourceSelect
                      resourceActionCreator={fetchSpecialties}
                      placeholder="Select Specialty"
                      resourceReducerName="specialtiesReducer"
                      resourceName="specialties"
                      style={{ width: "16vw", padding: "0.5em" }}
                      size={"large"}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("place", {
                    initialValue: this.state.address,
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <GMapsInput
                      size="large"
                      style={{ padding: "0.5em", width: "16vw" }}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("radius", {
                    initialValue: this.state.radius,
                    rules: [
                      {
                        required: true,
                        message: "Please select a Travel Radius!",
                      },
                    ],
                  })(
                    <Select
                      size="large"
                      showSearch
                      showArrow={false}
                      style={{ width: "16vw", padding: "0.5em" }}
                      placeholder="Select Travel Radius"
                    >
                      <Option key={10000}>10 km</Option>
                      <Option key={25000}>25 km</Option>
                      <Option key={50000}>50 km</Option>
                      <Option key={100000}>100 km</Option>
                      <Option key={250000}>250 km</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("sort_by", {
                    initialValue: this.state.sort,
                    rules: [
                      {
                        required: true,
                        message: "Please select a sort preference!",
                      },
                    ],
                  })(
                    <Select
                      size="large"
                      showSearch
                      showArrow={false}
                      style={{ width: "16vw", padding: "0.5em" }}
                      placeholder="Sort by"
                    >
                      <Option key={"dist"}>Distance: low to high</Option>
                      <Option key={"wait"}>Wait Time: low to high</Option>
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  <Button
                    size="large"
                    style={{ float: "right", margin: "0.5em" }}
                    type="primary"
                    htmlType="submit"
                  >
                    Search
                  </Button>
                </FormItem>
              </Row>
              <Row>
                <AdvancedSearchBar
                  form={form}
                  isResult
                  searchParams={searchParams}
                />
              </Row>
            </Form>
          </Row>
        </div>
      );
    } else {
      return (
        <div>
          <Form onSubmit={this.onSubmit} layout="vertical">
            <FormItem>
              {getFieldDecorator("specialty_id", {
                rules: [
                  {
                    required: true,
                    message: "Please select a Specialty!",
                  },
                ],
              })(
                <ApiResourceSelect
                  resourceActionCreator={fetchSpecialties}
                  placeholder="Select Specialty"
                  resourceReducerName="specialtiesReducer"
                  resourceName="specialties"
                  style={{ padding: "0.5em" }}
                  size={"large"}
                />
              )}
            </FormItem>
            <FormItem>
              <Tooltip
                title="Navigation Starting Point"
                placement="topLeft"
                trigger="focus"
              >
                <div>
                  {getFieldDecorator("place", {
                    rules: [
                      {
                        required: true,
                      },
                    ],
                  })(
                    <GMapsInput
                      showUserLocations
                      size="large"
                      style={{ padding: "0.5em" }}
                    />
                  )}
                </div>
              </Tooltip>
            </FormItem>
            <FormItem>
              <Tooltip
                title="How far is the patient willing to travel from the starting point?"
                placement="topLeft"
                trigger="focus"
              >
                {getFieldDecorator("radius", {
                  rules: [
                    {
                      required: true,
                      message: "Please select a Travel Radius!",
                    },
                  ],
                })(
                  <Select
                    size="large"
                    showSearch
                    showArrow={false}
                    style={{ width: "100%", padding: "0.5em" }}
                    placeholder="Select Travel Radius"
                  >
                    {/* US <Option key={16093}>10 miles</Option>
                            <Option key={80467}>50 miles</Option>
                            <Option key={160934}>100 miles</Option>
                            <Option key={402336}>250 miles</Option> */}
                    <Option key={10000}>10 km</Option>
                    <Option key={25000}>25 km</Option>
                    <Option key={50000}>50 km</Option>
                    <Option key={100000}>100 km</Option>
                    <Option key={250000}>250 km</Option>
                  </Select>
                )}
              </Tooltip>
            </FormItem>

            <FormItem>
              {getFieldDecorator("sort_by", {
                rules: [
                  {
                    required: true,
                    message: "Please select a sort preference!",
                  },
                ],
              })(
                <Select
                  size="large"
                  showSearch
                  showArrow={false}
                  style={{ width: "100%", padding: "0.5em" }}
                  placeholder="Sort by"
                >
                  <Option key={"dist"}>Distance: low to high</Option>
                  <Option key={"wait"}>Wait Time: low to high</Option>
                </Select>
              )}
            </FormItem>
            <AdvancedSearchBar form={form} isVertical={true} />
            <FormItem>
              <Button
                size="large"
                style={{ float: "right", margin: "0.5em" }}
                type="primary"
                htmlType="submit"
              >
                Search
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
  }
}

SearchBar.propTypes = {
  isResult: PropTypes.bool,
};

SearchBar = Form.create()(SearchBar);

export default withRouter(SearchBar);

export let undecorated = SearchBar;
