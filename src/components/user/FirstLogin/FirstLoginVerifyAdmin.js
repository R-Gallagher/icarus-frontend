import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { setUsersProfileAdmin } from "../../../actions";
import { COOKIE_SETUP_REQUIRED } from "../../../constants";
import withRequestStatus from "../../HOCs/withRequestStatus";
import DynamicForm from "../../common/DynamicForm";
import AdminEmailItems from "../../common/FormItems/AdminEmailItems";

class FirstLoginVerifyAdmin extends React.Component {
  back = () => {
    this.props.changeStep(0);
  };

  handleAddProviderFormSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { items } = values;

        const cookie = new Cookies();
        cookie.remove(COOKIE_SETUP_REQUIRED);

        if (items) {
          // Create an array of objects from the items array, each object should have a key of "email", with a value of the provided email address.
          const providers = items.map(emailAddress => ({
            email: emailAddress,
          }));

          this.props.setUsersProfileAdmin(providers, () => {
            this.props.changeStep(2);
          });
        }
        this.props.changeStep(2);
      }
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleAddProviderFormSubmit}>
        <div style={{ textAlign: "center" }}>
          <DynamicForm
            parentForm={this.props.form}
            ChildFormItems={AdminEmailItems}
            childFormItemTitle="Provider Address"
            childFormItemKey="firstLoginProviderAddresses"
          />
        </div>
        <Button
          style={{ float: "left", margin: "5vh 0" }}
          type="default"
          onClick={this.back}
        >
          Back
        </Button>
        <Button
          style={{ float: "right", margin: "5vh 0" }}
          loading={this.props.isLoading}
          type="primary"
          htmlType="submit"
        >
          Next
        </Button>
      </Form>
    );
  }
}

FirstLoginVerifyAdmin = Form.create()(FirstLoginVerifyAdmin);

const mapStateToProps = state => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
  } = state.usersProfileAdminReducer;

  return {
    isLoading,
    responseMessage,
    errorMessage,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setUsersProfileAdmin }
  )(withRequestStatus(FirstLoginVerifyAdmin))
);
