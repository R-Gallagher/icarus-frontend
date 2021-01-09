import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Button } from "antd";
import { withCookies } from "react-cookie";
import Cookies from "universal-cookie";

import { login } from "../../actions";
import { COOKIE_U_TYPE } from "../../constants";
import withRequestStatus from "../HOCs/withRequestStatus";

import "./Header.css";

const FormItem = Form.Item;
const cookie = new Cookies();

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.email, values.password, () => {
          const { is_confirmed, is_initial_setup_complete } = this.props;

          // If the user has not completed setup send them to first login or confirmation, otherwise send to appropriate first page.
          if (is_confirmed === false) {
            this.props.history.push("/registration_confirmation");
          }
          if (is_confirmed === true && is_initial_setup_complete === false) {
            this.props.history.push("/first_login");
          }
          if (is_confirmed === true && is_initial_setup_complete === true) {
            cookie.get(COOKIE_U_TYPE) === "3"
              ? this.props.history.push("/dashboard")
              : this.props.history.push("/search");
          }
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div
        style={{
          lineHeight: "64px",
          float: "right",
          minWidth: "45vw",
        }}
      >
        <Form
          layout="inline"
          onSubmit={this.handleSubmit}
          style={{
            margin: "10px",
          }}
        >
          <FormItem>
            {getFieldDecorator("email", {
              rules: [
                {
                  required: true,
                  message: " ",
                },
              ],
            })(
              <Input
                prefix={
                  <UserOutlined
                    style={{
                      color: "rgba(0,0,0,.25)",
                    }} />
                }
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: " ",
                },
              ],
            })(
              <Input
                type={"password"}
                prefix={
                  <LockOutlined
                    style={{
                      color: "rgba(0,0,0,.25)",
                    }} />
                }
                placeholder="Password"
              />
            )}
            <div
              style={{
                lineHeight: "0",
                paddingTop: "0.5vmin",
                textAlign: "right",
              }}
            >
              <Link
                to="/forgot_password"
                style={{
                  color: "#ed6f7a",
                  fontSize: "10px",
                }}
              >
                Forgot your password?
              </Link>
            </div>
          </FormItem>
          <FormItem>
            {/* Disable the button if the form is invalid. */}
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.isLoadingLogin}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
    is_confirmed,
    is_initial_setup_complete,
  } = state.loginReducer;

  return {
    isLoading,
    responseMessage,
    errorMessage,
    is_confirmed,
    is_initial_setup_complete,
  };
};

export default withRouter(
  withCookies(
    connect(
      mapStateToProps,
      { login }
    )(withRequestStatus(LoginForm))
  )
);

export let undecorated = withCookies(
  connect(
    mapStateToProps,
    { login }
  )(LoginForm)
);
