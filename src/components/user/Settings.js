import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Button, Tabs, Input } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { PasswordInput } from "antd-password-input-strength";

import requireAuth from "../HOCs/requireAuth";
import withRequestStatus from "../HOCs/withRequestStatus";
import { usersPasswordReset } from "../../actions";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class Settings extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    message: null,
  };

  onPasswordResetSubmit = ({ new_password, old_password }) => {
    this.props.usersPasswordReset(new_password, old_password);
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("new_password")) {
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

  handleSubmit = e => {
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
        <Form onSubmit={this.handleSubmit}>
          <Row type="flex" justify="space-around">
            <Col
              span={16}
              style={{
                padding: "2.5vh 20px",
                textAlign: "left",
                opacity: 1,
                transform: "translate(0px, 0px)",
                fontSize: "24px",
              }}
            >
              <div style={{ borderTop: "1px solid #ebedf0", padding: "5px 0" }}>
                <Tabs tabPosition="left" size="large" defaultActiveKey="1">
                  <TabPane tab="Account Settings" key="1">
                    <h4>Change Password</h4>

                    <FormItem {...formItemLayout} label="Old Password">
                      {getFieldDecorator("old_password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your old password!",
                          },
                        ],
                      })(<Input type="password" />)}
                    </FormItem>

                    <FormItem {...formItemLayout} label="New Password">
                      {getFieldDecorator("new_password", {
                        rules: [
                          {
                            required: true,
                            message: "Please input your new password!",
                          },
                          {
                            validator: this.validateToNextPassword,
                          },
                        ],
                      })(<PasswordInput />)}
                    </FormItem>
                    <FormItem {...formItemLayout} label="Confirm New Password">
                      {getFieldDecorator("confirm", {
                        rules: [
                          {
                            required: true,
                            message: "Please confirm your new password!",
                          },
                          {
                            validator: this.compareToFirstPassword,
                          },
                        ],
                      })(<PasswordInput />)}
                    </FormItem>
                  </TabPane>
                  {/* <TabPane tab="Search Settings" key="2">
                    <FormItem
                      {...formItemLayout}
                      label="Appear in Search Results"
                    >
                      <Switch
                        defaultChecked
                        disabled
                        onMouseEnter={() =>
                          message.info("Feature coming soon", 1)
                        }
                        onChange={this.onAppearInResultsChange}
                      />
                    </FormItem>
                  </TabPane> */}
                </Tabs>
              </div>
            </Col>
            <Col
              span={4}
              style={{
                padding: "2.5vh 0 0 0",
              }}
            >
              <Button
                size="large"
                style={{ margin: "0.5em" }}
                type="primary"
                htmlType="submit"
                loading={this.props.isLoading}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

Settings = Form.create()(Settings);

const mapStateToProps = state => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
  } = state.usersPasswordResetReducer;

  return {
    isLoading,
    responseMessage,
    errorMessage,
  };
};

export default requireAuth(
  withRouter(
    connect(
      mapStateToProps,
      { usersPasswordReset }
    )(withRequestStatus(Settings))
  )
);

export let undecorated = connect(
  mapStateToProps,
  { usersPasswordReset }
)(Settings);
