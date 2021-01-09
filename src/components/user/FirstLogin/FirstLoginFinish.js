import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Row, Col, Button, Modal } from "antd";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { COOKIE_U_TYPE } from "../../../constants";

const cookie = new Cookies();

class FirstLoginFinish extends React.Component {
  state = {
    tutorialVideoVisible: false,
  };

  back = () => {
    this.props.changeStep(1);
  };

  videoTutorialModal = () => {
    const { tutorialVideoVisible } = this.state;

    return (
      <Modal
        title="Icarus Tutorial"
        onOk={() =>
          this.setState({ tutorialVideoVisible: !tutorialVideoVisible })
        }
        onCancel={() =>
          this.setState({
            tutorialVideoVisible: !tutorialVideoVisible,
          })
        }
        visible={tutorialVideoVisible}
      >
        <iframe
          title="Scooby Doo"
          display="block"
          width="100%"
          height="300"
          src="https://www.youtube-nocookie.com/embed/ZMX_GQ8PdoE"
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal>
    );
  };

  redirectSearch = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  redirectProfile = () => {
    this.props.history.push({
      pathname: "/profile",
    });
  };

  redirectDashboard = () => {
    this.props.history.push({
      pathname: "/dashboard",
    });
  };

  render() {
    const isAdmin = cookie.get(COOKIE_U_TYPE) === "3";

    return (
      <div>
        {this.videoTutorialModal()}

        <h3 style={{ fontWeight: "bold" }}>Thanks for Signing Up!</h3>

        <Row
          gutter={16}
          style={{ textAlign: "center", padding: "5vh 0 5vh 0" }}
          justify="space-around"
        >
          {isAdmin ? (
            <p>
              You're all set! Once approved by a physician you will be able to
              search the network and make profile changes on their behalf.
            </p>
          ) : (
            <p>
              You can update your profile at any time by clicking the{" "}
              <UserOutlined /> icon at the top right hand of the page, then
              selecting "Your Profile".
            </p>
          )}

          <Col span={8}>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={() =>
                this.setState({
                  tutorialVideoVisible: !this.state.tutorialVideoVisible,
                })
              }
            >
              Icarus video tutorial
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              shape="round"
              size="large"
              onClick={this.redirectSearch}
            >
              Let's get started!
            </Button>
          </Col>
          {!isAdmin && (
            <Col span={8}>
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={this.redirectProfile}
              >
                Take me to my profile!
              </Button>
            </Col>
          )}

          <div>
            <Button
              style={{ float: "left", margin: "5vh 0 5vh 0" }}
              type="default"
              onClick={this.back}
            >
              Back
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

export default withRouter(FirstLoginFinish);
