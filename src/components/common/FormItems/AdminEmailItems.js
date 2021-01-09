import React from "react";
import PropTypes from "prop-types";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input } from "antd";

import DynamicFormRemoveButton from "./DynamicFormRemoveButton";

const AdminEmailItems = ({
  getFieldDecorator,
  removeFromForm,
  keys,
  currentKey,
  index,
  handleFormChange,
  initialValue,
}) => {
  return (
    <Form.Item required={false}>
      {getFieldDecorator(`items[${currentKey}]`, {
        validateTrigger: ["onChange", "onBlur"],
        rules: [
          {
            required: true,
            message: "Please input provider's e-mail.",
          },
        ],
      })(
        <div style={{ display: "inline" }}>
          <Input
            placeholder={"Input Provider's E-mail"}
            style={{ maxWidth: "40vw" }}
          />
        </div>
      )}
      <DynamicFormRemoveButton
        onRemove={removeFromForm}
        keyToRemove={currentKey}
      />
    </Form.Item>
  );
};

AdminEmailItems.propTypes = {
  getFieldDecorator: PropTypes.func.isRequired,
  removeFromForm: PropTypes.func.isRequired,
  keys: PropTypes.array,
  currentKey: PropTypes.number,
  index: PropTypes.number,
  handleFormChange: PropTypes.func,
  initialValue: PropTypes.any,
};

export default AdminEmailItems;
