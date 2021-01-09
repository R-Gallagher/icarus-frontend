import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from "antd";
import { PasswordInput } from "antd-password-input-strength";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue("password")) {
      callback("Passwords do not match!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { handleRegisterSubmit, isLoading } = this.props;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={handleRegisterSubmit}>
        <FormItem {...formItemLayout} label="First Name">
          {getFieldDecorator("first_name", {
            rules: [
              {
                required: true,
                message: "Please input your first name!",
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Last Name">
          {getFieldDecorator("last_name", {
            rules: [
              {
                required: true,
                message: "Please input your last name!",
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="E-mail">
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not a valid E-mail address!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ],
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Password">
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "Please input your password!",
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<PasswordInput />)}
        </FormItem>

        <FormItem {...formItemLayout} label="Confirm Password">
          {getFieldDecorator("confirm", {
            rules: [
              {
                required: true,
                message: "Please confirm your password!",
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<PasswordInput />)}
        </FormItem>

        <FormItem style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default RegistrationForm;
