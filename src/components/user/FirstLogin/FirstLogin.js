import React from "react";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Divider } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import requireAuth from "../../HOCs/requireAuth";

import FirstLoginWelcome from "./FirstLoginWelcome";
import FirstLoginVerify from "./FirstLoginVerify";
import FirstLoginFinish from "./FirstLoginFinish";
import FirstLoginSteps from "./FirstLoginSteps";
import { loggedInAs } from "../../../actions";

class FirstLogin extends React.Component {
  state = {
    step: 0,
    selectedUserType: null,
  };

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

  changeStep = newStep => {
    this.setState({ step: newStep });
  };

  onUserTypeSelect = userType => {
    this.setState({ selectedUserType: userType });
  };

  renderStep = () => {
    const { step } = this.state;
    // There are three steps in the first login experience for now:
    //    Welcome, where the user selects what kind of account they are creating
    //    Verify, where the user provides a method of verifying that they are a healthcare professional
    //    Finish, where the user finalizes a few details about their profile.
    //       And they get the option of seeing a breif tutorial video
    // Eventually, there will be a fourth step: payment
    if (step === 0) {
      return (
        <FirstLoginWelcome
          changeStep={this.changeStep}
          onUserTypeSelect={this.onUserTypeSelect}
        />
      );
    }
    if (step === 1) {
      return (
        <FirstLoginVerify
          changeStep={this.changeStep}
          selectedUserType={this.state.selectedUserType}
        />
      );
    }
    if (step === 2) {
      return <FirstLoginFinish changeStep={this.changeStep} />;
    }
  };

  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="space-around"
          align="top"
          style={{ minHeight: "75vh", padding: "10vh" }}
        >
          <Col
            span={18}
            style={{
              textAlign: "left",
              fontSize: "24px",
            }}
          >
            <h1 style={{ fontWeight: "bold", color: "#e04556" }}>
              Welcome to Icarus, {this.props.current_user.name}!
            </h1>
            <Divider />

            <div style={{ padding: "5vh 0" }}>
              <FirstLoginSteps currentStep={this.state.step} />
            </div>

            {this.renderStep()}
          </Col>
        </Row>
      </div>
    );
  }
}

FirstLogin = Form.create()(FirstLogin);

const mapStateToProps = (state, ownProps) => {
  const { current_user } = state.loggedInAsReducer;

  return {
    current_user,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { loggedInAs }
  )(requireAuth(FirstLogin))
);

export let undecorated = FirstLogin;
