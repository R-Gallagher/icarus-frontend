import React from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";

class NumericInput extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      const value = Number(nextProps.value) || null;
      return {
        value,
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      value: Number(value.value) || null,
    };
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    return (
      <InputNumber
        // https://github.com/ant-design/ant-design/issues/17344
        // type="number"
        step={0.5}
        precision={1}
        formatter={currentValue =>
          `${currentValue}`.replace(/[^0-9.]/g, "").replace(/\.{2,}/g, ".")
        }
        onChange={value => {
          this.setState({ value: value });
          this.triggerChange(value);
        }}
        value={this.state.value}
        placeholder={this.props.placeholder}
      />
    );
  }
}

NumericInput.propTypes = {
  initialValue: PropTypes.number,
  placeholder: PropTypes.string,
};

export default NumericInput;
