import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Row, Col, Input, Button } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { usersForgotPasswordRequest } from "../../actions";
import withRequestStatus from "../HOCs/withRequestStatus";

class ForgotPassword extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.usersForgotPasswordRequest(values.email);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
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
              Let&apos;s fix this together!
            </h1>
            <p>
              To get started, type in your email below. If we find a matching
              account, we will email you a link to reset your password.
            </p>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not a valid E-mail address!",
                  },
                  {
                    required: true,
                    message: "Please input an E-mail address!",
                  },
                ],
              })(
                <Input
                  size="large"
                  type="email"
                  style={{ minWidth: "30vw" }}
                  prefix={
                    <UserOutlined
                      style={{
                        color: "rgba(0,0,0,.25)",
                      }}
                    />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={this.props.isLoading}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

ForgotPassword = Form.create({ name: "forgotPassword" })(ForgotPassword);

const mapStateToProps = (state) => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
  } = state.usersForgotPasswordRequestReducer;
  return {
    isLoading,
    responseMessage,
    errorMessage,
  };
};

export default withRouter(
  connect(mapStateToProps, { usersForgotPasswordRequest })(
    withRequestStatus(ForgotPassword)
  )
);

export let undecorated = connect(mapStateToProps, {
  usersForgotPasswordRequest,
})(ForgotPassword);
