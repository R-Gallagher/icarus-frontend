import React from "react";
import { UserAddOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Button, Modal, Input } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setUsersProfileAdmin } from "../../../actions";
import withRequestStatus from "../../HOCs/withRequestStatus";

class AddManagementItem extends React.Component {
  state = { modalVisible: false };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  modalAdd = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.setUsersProfileAdmin([{ email: values.email }], () => {
          this.props.form.resetFields();
          this.toggleModal();
        });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Button type="primary" icon={<UserAddOutlined />} onClick={this.toggleModal}>
          Add to Roster
        </Button>
        <Modal
          title="Add to Roster"
          visible={this.state.modalVisible}
          onCancel={this.toggleModal}
          onOk={this.modalAdd}
          okText="Add"
        >
          <p>
            Before you are able to manage someone in your roster you must add
            them. Input the e-mail address associated with their account below.
          </p>
          <Form layout="inline">
            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not a valid E-mail address!",
                  },
                  {
                    required: true,
                    message:
                      "Please input the E-mail address associated with their account!",
                  },
                ],
              })(<Input />)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddManagementItem = Form.create({ name: "add_to_roster" })(AddManagementItem);

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
  )(withRequestStatus(AddManagementItem))
);

export let undecorated = connect(
  mapStateToProps,
  { setUsersProfileAdmin }
)(AddManagementItem);
