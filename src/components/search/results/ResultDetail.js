import React from "react";
import PropTypes from "prop-types";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { SelectOutlined } from "@ant-design/icons";
import { Divider, Tabs, Row, Col, Empty, Select } from "antd";
import moment from "moment";
import { isEmpty as _isEmpty } from "lodash";

const Option = Select.Option;

class ResultDetail extends React.Component {
  state = {
    selectedAddressIndex: 0,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.result !== this.props.result) {
      this.onAddressChanged(0);
    }
  }

  formatPhoneNumber = (phoneNumberString) => {
    /* Use stupid regex to make a phone number look good.
    No one likes this shit.
    Except Ryan.
    Only Ryan. */
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumberString;
  };

  fillEmptyOptionalFields = (field) => {
    return _isEmpty(field) ? "N/A" : field;
  };

  onAddressChanged = (value) => {
    this.setState({
      selectedAddressIndex: value,
    });
  };

  render() {
    const { result, results, forceTabRender, isLoading } = this.props;
    const { selectedAddressIndex } = this.state;

    // If there is no currently selected doctor, display the placeholder to click a doctor.
    if (!_isEmpty(results)) {
      if (!_isEmpty(result)) {
        const TabPane = Tabs.TabPane;
        const {
          end_hour,
          fax,
          is_wheelchair_accessible,
          is_accepting_new_patients,
          phone,
          start_hour,
        } = result.provider.addresses[selectedAddressIndex];

        return (
          <div style={{ textAlign: "center" }}>
            <h3 id="name">
              <b>Dr. {result.name}</b>{" "}
              {result.provider.designations
                .map((designation) => designation.name)
                .join(", ")}
            </h3>
            <h3 id="subspecialty">
              <b>Subspecialty / Special Interests: </b>
              {this.fillEmptyOptionalFields(
                result.provider.subspecialty_or_special_interests
              )}
            </h3>
            <Select
              style={{ width: "25vw", padding: "0.5em" }}
              placeholder="Practice Locations"
              value={selectedAddressIndex}
              onChange={this.onAddressChanged}
            >
              {result.provider.addresses.map((currElement, index) => (
                <Option key={index} value={index}>
                  {currElement.address}
                </Option>
              ))}
            </Select>
            <Divider />
            <Row>
              <Col span={8} id="accessibility">
                <LegacyIcon
                  type={
                    is_wheelchair_accessible ? "check-circle" : "close-circle"
                  }
                  theme="twoTone"
                  twoToneColor={
                    is_wheelchair_accessible ? "#52C41A" : "#ED2939"
                  }
                />{" "}
                {is_wheelchair_accessible ? null : <strong> Not </strong>}
                Wheelchair Accessible
              </Col>
              <Col span={8} id="availability">
                <LegacyIcon
                  type={
                    is_accepting_new_patients ? "check-circle" : "close-circle"
                  }
                  theme="twoTone"
                  twoToneColor={
                    is_accepting_new_patients ? "#52C41A" : "#ED2939"
                  }
                />{" "}
                {is_accepting_new_patients ? null : <strong> Not </strong>}
                Accepting New Patients
              </Col>
              <Col span={8} id="hours">
                <strong>Hours: </strong>
                {start_hour && end_hour
                  ? `${moment(start_hour, "HH:mm:ss").format(
                      "HH:mm"
                    )} - ${moment(end_hour, "HH:mm:ss").format("HH:mm")}`
                  : "N/A"}
              </Col>
            </Row>
            <Row>
              <Col span={8} id="phone">
                <a href={`tel:${phone}`}>
                  <strong>Phone: </strong>
                  {this.formatPhoneNumber(phone)}
                </a>
              </Col>
              <Col span={8} id="fax">
                <a href={`tel:${fax}`}>
                  <strong>Fax: </strong>
                  {this.formatPhoneNumber(fax)}
                </a>
              </Col>
              <Col span={8} id="email">
                <a href={`mailto:${result.email}`}>
                  <strong>Email: </strong>
                  {result.email}
                </a>
              </Col>
            </Row>

            <Divider />
            <div>
              <Tabs size="large" defaultActiveKey="1">
                <TabPane
                  tab="Services Provided"
                  key="1"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.services_provided
                  )}
                </TabPane>
                <TabPane
                  tab="Services Not Provided"
                  key="2"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.services_not_provided
                  )}
                </TabPane>
                <TabPane
                  tab="Referral Instructions"
                  key="3"
                  style={{ whiteSpace: "pre-line" }}
                  forceRender={forceTabRender}
                >
                  <div style={{ display: "inline-block", textAlign: "left" }}>
                    {this.fillEmptyOptionalFields(
                      result.provider.referral_instructions
                    )}
                  </div>
                </TabPane>
                <TabPane
                  tab="Languages Spoken"
                  key="4"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.languages
                      .map((language) => language.name)
                      .join(", ")
                  )}
                </TabPane>
              </Tabs>
              <br />
              <br />
              <Tabs size="large" defaultActiveKey="1">
                <TabPane tab="Education" key="1" forceRender={forceTabRender}>
                  {this.fillEmptyOptionalFields(
                    result.provider.education_and_qualifications
                  )}
                </TabPane>
                <TabPane
                  tab="Research Interests"
                  key="2"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.research_interests
                  )}
                </TabPane>
              </Tabs>
              <br />
              <br />
              <Tabs size="large" defaultActiveKey="1">
                <TabPane
                  tab="Consultation Wait Time"
                  key="1"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.consultation_wait
                  )}{" "}
                  days
                </TabPane>
                <TabPane
                  tab="Procedural Wait Times"
                  key="4"
                  forceRender={forceTabRender}
                >
                  {this.fillEmptyOptionalFields(
                    result.provider.procedural_wait_times.map(
                      (procedural_wait_time) => (
                        <p>
                          {procedural_wait_time.procedure},{" "}
                          {procedural_wait_time.wait_time} days
                        </p>
                      )
                    )
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
        );
      } else {
        return (
          <Empty
            style={{ padding: "25vmin" }}
            image={<SelectOutlined style={{ fontSize: "100px" }} />}
            // Set description blank as a workaround to override the default value of "No data" displaying.
            description=" "
          >
            <h2 style={{ marginTop: "5vmin" }}>
              Please <span style={{ color: "#e04556" }}> select a doctor </span>{" "}
              to reveal their profile.
            </h2>
          </Empty>
        );
      }
    } else {
      return (
        <Empty
          style={{ padding: "25vmin" }}
          image={
            <LegacyIcon
              style={{ fontSize: "100px", color: "rgba(1,1,1,0.1)" }}
              type={isLoading ? "loading" : "frown"}
            />
          }
          description={
            isLoading ? "Loading Please Wait..." : "No results found."
          }
        />
      );
    }
  }
}

ResultDetail.propTypes = {
  result: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired,
  forceTabRender: PropTypes.bool,
};

export default ResultDetail;
