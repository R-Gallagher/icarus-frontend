import React from "react";
import PropTypes from "prop-types";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Row, Col } from "antd";
import NumericInput from "../../common/NumericInput";

import DynamicFormRemoveButton from "./DynamicFormRemoveButton";

const WaitItems = ({
  getFieldDecorator,
  removeFromForm,
  keys,
  currentKey,
  index,
  handleFormChange,
  initialValue,
}) => {
  return (
    <Form.Item required={false} label={!index ? "Additonal Wait Times" : null}>
      <Row type="flex" justify="center" align="middle" gutter={16}>
        <Col span={16}>
          {getFieldDecorator(`procedures[${currentKey}]`, {
            initialValue:
              initialValue[currentKey] && initialValue[currentKey].procedure
                ? initialValue[currentKey].procedure
                : "",
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                message: "Please include the type and duration of the wait.",
              },
            ],
          })(<Input placeholder="Type of Procedure" />)}
        </Col>

        <Col span={8}>
          {getFieldDecorator(`wait_times[${currentKey}]`, {
            initialValue:
              initialValue[currentKey] && initialValue[currentKey].wait_time
                ? initialValue[currentKey].wait_time
                : "",
            rules: [
              {
                type: "number",
                min: 0,
                max: 2000,
                message:
                  "Surgical / Procedural wait must be between 0 and 2000.",
              },
            ],
          })(<NumericInput placeholder="Time" />)}
          <DynamicFormRemoveButton
            onRemove={removeFromForm}
            keyToRemove={currentKey}
          />
        </Col>
      </Row>
    </Form.Item>
  );
};

WaitItems.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  removeFromForm: PropTypes.func.isRequired,
  keys: PropTypes.array,
  currentKey: PropTypes.number,
  index: PropTypes.number,
  handleFormChange: PropTypes.func,
  initialValue: PropTypes.any,
};

export default WaitItems;
