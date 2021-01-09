import React, { Component } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

// You may be wondering the purpose of this... Me too... Just let it do it's thing. Antd tell us to.
class DynamicForm extends Component {
  // id = 0 needs to be in here instead of above
  // otherwise multiple forms will share id values
  id = 0;

  componentDidMount() {
    // Only set the initial value when one is provided.
    if (this.props.value) {
      // Add a new id to the form for every value in the initial value, if any.
      for (var i = 0; i < this.props.value.length; i++) {
        this.addToForm();
      }
    }
  }

  addToForm = () => {
    const { parentForm } = this.props;

    // Grab the keys from the parent.
    const keys = parentForm.getFieldValue(this.props.childFormItemKey);

    const updatedKeys = keys.concat(this.id++);

    // Set the keys back into the parent form.
    parentForm.setFieldsValue({
      [this.props.childFormItemKey]: updatedKeys,
    });
  };

  removeFromForm = (keyToBeRemoved) => {
    const { parentForm } = this.props;

    // Grab the keys from the parent.
    const keys = parentForm.getFieldValue(this.props.childFormItemKey);

    // Set the keys back into the parent form.
    parentForm.setFieldsValue({
      [this.props.childFormItemKey]: keys.filter(
        (key) => key !== keyToBeRemoved
      ),
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.parentForm;
    const {
      value,
      handleFormChange,
      childFormItemTitle,
      onChange,
    } = this.props;

    // Set the key to a unique value so that multiple dynamic forms will not share values.
    getFieldDecorator(this.props.childFormItemKey, { initialValue: [] });
    const keys = getFieldValue(this.props.childFormItemKey);

    const formItems = keys.map((key, index) => {
      const { ChildFormItems } = this.props;
      return (
        // Build each child component.
        <div key={key}>
          <ChildFormItems
            keys={keys}
            currentKey={key}
            getFieldDecorator={getFieldDecorator}
            index={index}
            handleFormChange={handleFormChange}
            initialValue={value}
            removeFromForm={this.removeFromForm}
            onChange={onChange}
          />
        </div>
      );
    });

    return (
      <div>
        {formItems}
        <Button
          type="dashed"
          // We are calling onClick with an arrow function so the initial value isn't set by the click event.
          onClick={this.addToForm}
          style={{ minWidth: "30vw" }}
          icon={<PlusOutlined />}
          className="addItem"
        >
          Add {childFormItemTitle}
        </Button>
      </div>
    );
  }
}

DynamicForm.propTypes = {
  parentForm: PropTypes.object.isRequired,
  ChildFormItems: PropTypes.any.isRequired,
  childFormItemTitle: PropTypes.string.isRequired,
  childFormItemKey: PropTypes.string.isRequired,
  initialValue: PropTypes.any,
  handleFormChange: PropTypes.func,
};

export default DynamicForm;
