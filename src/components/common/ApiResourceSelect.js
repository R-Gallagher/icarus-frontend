import React, { Component } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Select } from "antd";

class ApiResourceSelect extends Component {
  state = { value: undefined };

  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      const value =
        typeof nextProps.value === "string"
          ? parseInt(nextProps.value)
          : nextProps.value || undefined;

      return {
        value,
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.resourceActionCreator();
  }

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { placeholder, mode, resources, isLoading, size, style } = this.props;

    return (
      <Select
        showSearch
        placeholder={placeholder}
        mode={mode}
        // Don't display the value until resources have been populated.
        value={resources.length ? this.state.value : undefined}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
        loading={isLoading}
        showArrow={false}
        size={size}
        style={style}
        onChange={value => {
          this.setState({ value });
          this.triggerChange(value);
        }}
      >
        {resources.map(resource => (
          <Select.Option key={resource.id} value={resource.id}>
            {resource.name}
          </Select.Option>
        ))}
      </Select>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { resourceReducerName, resourceName } = ownProps;
  const { [resourceName]: resources, isLoading, errorMessage } = state[
    resourceReducerName
  ];

  return {
    resources,
    isLoading,
    errorMessage,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { resourceActionCreator } = ownProps;
  return bindActionCreators({ resourceActionCreator }, dispatch);
};

ApiResourceSelect.propTypes = {
  resourceActionCreator: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  resourceReducerName: PropTypes.oneOf([
    "specialtiesReducer",
    "languagesReducer",
    "designationsReducer",
  ]).isRequired,
  resourceName: PropTypes.oneOf(["specialties", "designations", "languages"])
    .isRequired,
  mode: PropTypes.oneOf(["default", "multiple", "tags"]),
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.number]),
  style: PropTypes.object,
  size: PropTypes.oneOf(["default", "large", "small"]),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApiResourceSelect);
