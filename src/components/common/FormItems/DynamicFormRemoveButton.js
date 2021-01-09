import React from "react";
import PropTypes from "prop-types";
import { CloseOutlined } from '@ant-design/icons';
import { Button } from "antd";

export const DynamicFormRemoveButton = ({ onRemove, keyToRemove }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      icon={<CloseOutlined />}
      size="small"
      style={{ marginLeft: "1vw" }}
      onClick={() => onRemove(keyToRemove)}
    />
  );
};

DynamicFormRemoveButton.propTypes = {
  onRemove: PropTypes.func.isRequired,
  keyToRemove: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    .isRequired,
};

export default DynamicFormRemoveButton;
