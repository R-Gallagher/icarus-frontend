import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Col, Row, Button, Input } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { usersForgotPasswordUpdate } from "../../actions";
import withRequestStatus from "../HOCs/withRequestStatus";

const FormItem = Form.Item;

class ForgotPasswordReset extends React.Component {
  state = {
    isAllowedToReset: null,
    message: null,
  };

  onPasswordResetSubmit = ({ password }) => {
    const resetToken = this.props.match.params.resetToken;

    this.props.usersForgotPasswordUpdate(resetToken, password, () => {
      this.props.history.push("/");
    });
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

  handlePasswordResetSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.onPasswordResetSubmit(values);
      }
    });
  };

  render() {
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
      <div>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ minHeight: "75vh" }}
        >
          <Col
            span={10}
            style={{
              textAlign: "left",
              fontSize: "24px",
            }}
          >
            <h1 style={{ fontWeight: "bold", color: "#e04556" }}>
              Thanks for verifying your identity
            </h1>
            <p>Please enter your new account password below.</p>
            <Form>
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
                })(<Input type="password" />)}
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
                })(<Input type="password" />)}
              </FormItem>

              <FormItem style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  onClick={this.handlePasswordResetSubmit}
                  loading={this.props.isLoading}
                >
                  Submit
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

ForgotPasswordReset = Form.create()(ForgotPasswordReset);

const mapStateToProps = state => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
  } = state.usersForgotPasswordUpdateReducer;
  return {
    isLoading,
    responseMessage,
    errorMessage,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { usersForgotPasswordUpdate }
  )(withRequestStatus(ForgotPasswordReset))
);

export let undecorated = connect(
  mapStateToProps,
  { usersForgotPasswordUpdate }
)(ForgotPasswordReset);
