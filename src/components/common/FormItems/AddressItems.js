import React from "react";
import PropTypes from "prop-types";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Checkbox } from "antd";
import moment from "moment";

import GMapsInput from "../GMapsInput";
import RangeTimePicker from "../RangeTimePicker";
import DynamicFormRemoveButton from "./DynamicFormRemoveButton";

const AddressItems = ({
  getFieldDecorator,
  removeFromForm,
  keys,
  currentKey,
  index,
  handleFormChange,
  initialValue,
}) => {
  const startTime = initialValue[currentKey]
    ? moment(initialValue[currentKey].start_hour, "HH:mm:ss")
    : null;

  const endTime = initialValue[currentKey]
    ? moment(initialValue[currentKey].end_hour, "HH:mm:ss")
    : null;
  const hours_value = {
    startTime,
    endTime,
  };

  const address = {
    address: initialValue[currentKey] && initialValue[currentKey].address,
    location: {
      lat: initialValue[currentKey] && initialValue[currentKey].latitude,
      lon: initialValue[currentKey] && initialValue[currentKey].longitude,
    },
    isInitialValue: true,
  };

  return (
    <div>
      <h3 style={{ display: "inline-block" }}>Address {index + 1}</h3>
      {keys.length && index !== 0 && (
        // Ensure that the user always has at least one address.
        <DynamicFormRemoveButton
          onRemove={removeFromForm}
          keyToRemove={currentKey}
        />
      )}
      <Form.Item label="Address">
        {getFieldDecorator(`addresses[${currentKey}]`, {
          initialValue: address,
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
        })(<GMapsInput />)}
      </Form.Item>
      <Form.Item label="Phone Number" onChange={handleFormChange}>
        {getFieldDecorator(`phones[${currentKey}]`, {
          initialValue:
            initialValue[currentKey] && initialValue[currentKey].phone
              ? initialValue[currentKey].phone
              : "",
          rules: [
            {
              required: true,
              message: "Please input your practice phone number!",
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Fax" onChange={handleFormChange}>
        {getFieldDecorator(`faxes[${currentKey}]`, {
          initialValue:
            initialValue[currentKey] && initialValue[currentKey].fax
              ? initialValue[currentKey].fax
              : "",
          rules: [
            {
              required: true,
              message: "Please input your practice fax number!",
            },
          ],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Office Accessibility" onChange={handleFormChange}>
        {getFieldDecorator(`is_wheelchair_accessibles[${currentKey}]`, {
          valuePropName: "checked",
          initialValue:
            initialValue[currentKey] &&
            initialValue[currentKey].is_wheelchair_accessible
              ? initialValue[currentKey].is_wheelchair_accessible
              : false,
        })(<Checkbox>Wheelchair Accessible</Checkbox>)}
      </Form.Item>
      <Form.Item label="Accepting Patients" onChange={handleFormChange}>
        {getFieldDecorator(`is_accepting_patients[${currentKey}]`, {
          valuePropName: "checked",
          initialValue:
            initialValue[currentKey] &&
            initialValue[currentKey].is_accepting_new_patients
              ? initialValue[currentKey].is_accepting_new_patients
              : false,
        })(<Checkbox>Accepting Patients</Checkbox>)}
      </Form.Item>
      <Form.Item label="Hours" onChange={handleFormChange}>
        {getFieldDecorator(`dynamic_hours[${currentKey}]`, {
          // We need to set the initial values to the start time and end time once the backend is updated.
          initialValue: hours_value,
          rules: [
            {
              required: true,
              message: "Please input your practice hours!",
            },
          ],
        })(<RangeTimePicker onChange={handleFormChange} />)}
      </Form.Item>
    </div>
  );
};

AddressItems.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  removeFromForm: PropTypes.func.isRequired,
  keys: PropTypes.array,
  currentKey: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  index: PropTypes.number,
  handleFormChange: PropTypes.func,
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
};

export default AddressItems;
