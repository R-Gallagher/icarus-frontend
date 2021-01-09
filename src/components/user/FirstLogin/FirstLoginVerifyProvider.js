import React from "react";
import { connect } from "react-redux";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button, Checkbox } from "antd";

import GMapsInput from "../../common/GMapsInput";
import RangeTimePicker from "../../common/RangeTimePicker";
import { updateUsersProfile } from "../../../actions";
import withRequestStatus from "../../HOCs/withRequestStatus";

const FormItem = Form.Item;

class FirstLoginVerifyProvider extends React.Component {
  back = () => {
    this.props.changeStep(0);
  };

  handleProfileSave = ({
    phone,
    place,
    fax,
    is_wheelchair_accessible,
    is_accepting_patients,
    hours,
  }) => {
    const { lat, lon } = place.location;
    const address = place.address;

    const latitude = lat;
    const longitude = lon;
    const geo = `POINT(${longitude} ${latitude})`;

    const { startTime, endTime } = hours;

    const start_hour = startTime.format("HH:mm");
    const end_hour = endTime.format("HH:mm");

    var addresses = [
      {
        address,
        latitude,
        longitude,
        geo,
        phone,
        fax,
        is_wheelchair_accessible,
        is_accepting_new_patients: is_accepting_patients
          ? is_accepting_patients
          : false,
        start_hour,
        end_hour,
      },
    ];

    this.props.updateUsersProfile({ provider: { addresses } }, null, () => {
      this.props.changeStep(2);
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        for (var propName in values) {
          if (
            values[propName] === null ||
            values[propName] === undefined ||
            values[propName] === ""
          ) {
            delete values[propName];
          }
        }
        this.handleProfileSave(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem label="Practice Address">
          {getFieldDecorator("place", {
            rules: [
              {
                required: true,
                validator: (rule, value, callback) => {
                  if (
                    !value ||
                    !value.address ||
                    !value.location.lat ||
                    !value.location.lon
                  ) {
                    callback("Please input your practice address!");
                  }

                  callback();
                  return;
                },
              },
            ],
          })(<GMapsInput size="large" />)}
        </FormItem>
        <FormItem label="Practice Phone">
          {getFieldDecorator("phone", {
            rules: [
              {
                required: true,
                message: "Please input an office phone number!",
              },
            ],
          })(<Input placeholder="Practice Phone Number" size="large" />)}
        </FormItem>

        <FormItem label="Fax">
          {getFieldDecorator("fax", {
            rules: [
              {
                required: true,
                message: "Please input an office fax number!",
              },
            ],
          })(<Input placeholder="Practice Fax Number" size="large" />)}
        </FormItem>

        <FormItem label="Office Accessibility">
          {getFieldDecorator("is_wheelchair_accessible", {
            rules: [
              {
                required: false,
                message:
                  "Please input the accessibility status of your office!",
              },
            ],
          })(<Checkbox>Wheelchair Accessible</Checkbox>)}
        </FormItem>
        <FormItem label="Accepting Patients">
          {getFieldDecorator("is_accepting_patients", {
            rules: [
              {
                required: false,
                message:
                  "Please input whether or not your practice is accepting new patients!",
              },
            ],
          })(<Checkbox>Accepting Patients</Checkbox>)}
        </FormItem>
        <FormItem label="Hours">
          {getFieldDecorator("hours", {
            rules: [
              {
                required: true,
                message: "Please input the office hours!",
              },
            ],
          })(<RangeTimePicker />)}
        </FormItem>

        <h2>
          You can add more practices to your profile, but we only need one
          practice for account verification.
        </h2>
        <div>
          <Button
            style={{ float: "left", margin: "5vh 0" }}
            type="default"
            onClick={this.back}
          >
            Back
          </Button>
          <Button
            style={{ float: "right", margin: "5vh 0" }}
            loading={this.props.isLoading}
            type="primary"
            htmlType="submit"
          >
            Next
          </Button>
        </div>
      </Form>
    );
  }
}

FirstLoginVerifyProvider = Form.create()(FirstLoginVerifyProvider);

const mapStateToProps = state => {
  const {
    isLoading,
    profile,
    errorMessage,
    isProfileUpdate,
    responseMessage,
    isVerified,
  } = state.usersProfileReducer;

  return {
    isLoading,
    profile,
    errorMessage,
    isProfileUpdate,
    responseMessage,
    isVerified,
  };
};

export default connect(
  mapStateToProps,
  { updateUsersProfile }
)(withRequestStatus(FirstLoginVerifyProvider));
