import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import requireAuth from "../../HOCs/requireAuth";

import { confirm, resendConfirmation, loggedInAs } from "../../../actions";
import withRequestStatus from "../../HOCs/withRequestStatus";

class RegisterConfirm extends React.Component {
  componentDidMount() {
    const { is_initial_setup_complete } = this.props.current_user;

    if (is_initial_setup_complete === true) {
      this.props.history.push("/search");
    }
  }

  componentDidUpdate() {
    const { is_initial_setup_complete } = this.props.current_user;

    if (is_initial_setup_complete) {
      this.props.history.push("/search");
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.confirm(values.confirmation_code, () => {
          this.props.history.push({
            pathname: "/first_login",
          });
        });
      }
    });
  };

  handleResendConfirmation = () => {
    this.props.resendConfirmation();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
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
              Registration was successful!
            </h1>

            <p>
              Please check your email for the confirmation code we sent and
              input it below
            </p>
            <Form.Item>
              {getFieldDecorator("confirmation_code", {
                rules: [
                  {
                    required: true,
                    message: "Please input your confirmation code!",
                  },
                ],
              })(
                <Input
                  size="large"
                  style={{ maxWidth: "60%" }}
                  placeholder="Confirmation Code"
                />
              )}
            </Form.Item>
            <p style={{ fontSize: 14 }} onClick={this.handleResendConfirmation}>
              Didn't get a code?{" "}
              <span style={{ color: "#e04556", cursor: "pointer" }}>
                {" "}
                Click here to resend!
              </span>
            </p>
            <p style={{ fontSize: 14 }}>
              If you don't see the email in your inbox, please check your spam
              or junk folder. If this does not work, please reach out to us at
              support@icarusmed.com
            </p>
            <Form.Item>
              <Button
                size="large"
                style={{ margin: "0.5em" }}
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

RegisterConfirm = Form.create()(RegisterConfirm);

const mapStateToProps = state => {
  const {
    isLoading: isLoadingConfirm,
    responseMessage: responseMessageConfirm,
    errorMessage: errorMessageConfirm,
  } = state.confirmReducer;

  const {
    isLoading: isLoadingResend,
    responseMessage: responseMessageResend,
    errorMessage: errorMessageResend,
  } = state.resendConfirmationReducer;

  const { current_user } = state.loggedInAsReducer;

  return {
    isLoading: isLoadingConfirm && isLoadingResend,
    responseMessage: responseMessageConfirm || responseMessageResend,
    errorMessage: errorMessageConfirm || errorMessageResend,
    current_user: current_user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { confirm, resendConfirmation, loggedInAs }
  )(withRequestStatus(requireAuth(RegisterConfirm)))
);

export let undecorated = connect(
  mapStateToProps,
  { confirm, resendConfirmation }
)(RegisterConfirm);
