import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Collapse, Input, Checkbox } from "antd";
import moment from "moment";

import ApiResourceSelect from "../common/ApiResourceSelect";
import { fetchDesignations, fetchLanguages } from "../../actions";

const FormItem = Form.Item;

class AdvancedSearchBar extends React.Component {
  state = {
    name: "",
    languages_spoken: "",
    designations: "",
    education: "",
    research_interests: "",
    services_provided: "",
    is_wheelchair_accessible: false,
    is_accepting_new_patients: false,
    hours: {},
  };

  componentDidMount() {
    if (this.props.isResult) {
      const searchParams = this.props.searchParams;

      this.setState({
        name: searchParams.name,
        languages_spoken: searchParams.languages_spoken,
        designations: searchParams.designations,
        education: searchParams.education,
        research_interests: searchParams.research_interests,
        services_provided: searchParams.services_provided,
        is_wheelchair_accessible: searchParams.is_wheelchair_accessible,
        is_accepting_new_patients: searchParams.is_accepting_new_patients,
        hours: {
          startTime:
            searchParams.startTime &&
            moment(searchParams.startTime, "HH:mm:ss"),
          endTime:
            searchParams.endTime && moment(searchParams.endTime, "HH:mm:ss"),
        },
      });
    }
  }
  render() {
    const {
      form: { getFieldDecorator },
      isVertical,
    } = this.props;
    const formModified = {
      labelCol: { span: 25 },
      wrapperCol: { span: 22 },
    };
    if (isVertical) {
      return (
        <Collapse bordered={false} defaultActiveKey={["1"]}>
          <Collapse.Panel header="Advanced Search">
            <Row gutter={24}>
              <Col span={12} style={{ display: "block" }}>
                <FormItem label={"Name"}>
                  {getFieldDecorator("name", {})(
                    <Input placeholder="Provider Name" />
                  )}
                </FormItem>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                <FormItem label="Languages Spoken">
                  {getFieldDecorator("languages_spoken", {})(
                    <ApiResourceSelect
                      resourceActionCreator={fetchLanguages}
                      placeholder="Select Languages"
                      resourceReducerName="languagesReducer"
                      resourceName="languages"
                      mode="multiple"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12} style={{ display: "block" }}>
                <FormItem label="Designations">
                  {getFieldDecorator("designations", {})(
                    <ApiResourceSelect
                      resourceActionCreator={fetchDesignations}
                      placeholder="Select Designation"
                      resourceReducerName="designationsReducer"
                      resourceName="designations"
                      mode="multiple"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={6} style={{ display: "block" }}>
                <FormItem label={"Wheelchair Accessible"}>
                  {getFieldDecorator(`is_wheelchair_accessible`, {})(
                    <Checkbox />
                  )}
                </FormItem>
              </Col>
              <Col span={6} style={{ display: "block" }}>
                <FormItem label={"Accepting Patients"}>
                  {getFieldDecorator(`is_accepting_new_patients`, {})(
                    <Checkbox />
                  )}
                </FormItem>
              </Col>
              {/* <Col span={12} style={{ display: "block" }}>
                <FormItem label={"Education"}>
                  {getFieldDecorator("education", {})(
                    <Input placeholder="Name of School/Institution" />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12} style={{ display: "block" }}>
                <FormItem label={"Interests"}>
                  {getFieldDecorator("research_interests", {})(
                    <Input placeholder="Providers Interests" />
                  )}
                </FormItem>
              </Col>
              <Col span={12} style={{ display: "block" }}>
                <FormItem label={"Services Provided"}>
                  {getFieldDecorator("services_provided", {})(
                    <Input placeholder="Serviced Provided" />
                  )}
                </FormItem>
              </Col> */}
            </Row>
            {/* <FormItem label="Hours">
              {getFieldDecorator("hours", {})(<RangeTimePicker />)}
            </FormItem> */}
          </Collapse.Panel>
        </Collapse>
      );
    } else {
      return (
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          style={{ display: "flex" }}
        >
          <Collapse.Panel header="Advanced Search" style={{ minWidth: "100%" }}>
            <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label={"Name"}
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("name", { initialValue: this.state.name })(
                    <Input placeholder="Provider Name" />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label="Languages Spoken"
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("languages_spoken", {
                    initialValue: this.state.languages_spoken,
                  })(
                    <ApiResourceSelect
                      resourceActionCreator={fetchLanguages}
                      placeholder="Select Languages"
                      resourceReducerName="languagesReducer"
                      resourceName="languages"
                      mode="multiple"
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label="Designations"
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("designations", {
                    initialValue: this.state.designations,
                  })(
                    <ApiResourceSelect
                      resourceActionCreator={fetchDesignations}
                      placeholder="Select Designation"
                      resourceReducerName="designationsReducer"
                      resourceName="designations"
                      mode="multiple"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8} style={{ display: "block" }}>
                <FormItem label={"Wheelchair Accessible"}>
                  {getFieldDecorator(`is_wheelchair_accessible`, {
                    valuePropName: "checked",
                    initialValue:
                      this.state.is_wheelchair_accessible === "true"
                        ? true
                        : false,
                  })(<Checkbox />)}
                </FormItem>
              </Col>
              <Col span={8} style={{ display: "block" }}>
                <FormItem label={"Accepting Patients"}>
                  {getFieldDecorator(`is_accepting_new_patients`, {
                    valuePropName: "checked",
                    initialValue:
                      this.state.is_accepting_new_patients === "true"
                        ? true
                        : false,
                  })(<Checkbox />)}
                </FormItem>
              </Col>
            </Row>
            {/* <Row gutter={24}>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label={"Education"}
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("education", {
                    initialValue: this.state.education,
                  })(<Input placeholder="Name of School/Institution" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label={"Interests"}
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("research_interests", {
                    initialValue: this.state.research_interests,
                  })(<Input placeholder="Providers Interests" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label={"Services Provided"}
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("services_provided", {
                    initialValue: this.state.services_provided,
                  })(<Input placeholder="Serviced Provided" />)}
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  {...formModified}
                  label="Hours"
                  style={{ display: "block" }}
                >
                  {getFieldDecorator("hours", {
                    initialValue: this.state.hours,
                  })(<RangeTimePicker />)}
                </FormItem>
              </Col>
            </Row> */}
          </Collapse.Panel>
        </Collapse>
      );
    }
  }
}

export default AdvancedSearchBar;
