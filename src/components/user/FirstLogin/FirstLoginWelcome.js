import React from "react";
import { Row, Col, Card, Button } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { setUserType } from "../../../actions";
import { StyledDiv } from "../../../styles/GlobalStyles";
import withRequestStatus from "../../HOCs/withRequestStatus";

class FirstLoginWelcome extends React.Component {
  /*
  Selected (Int) corrosponds to User types

  0 --> Free Public Provider
  1 --> Paid Public Provider
  2 --> Paid Private Provider
  3 --> Admin
  */
  state = { selected: null };

  welcomeSubmit = async () => {
    const { selected } = this.state;

    this.props.setUserType(selected, () => {
      this.props.changeStep(1);
    });

    this.props.onUserTypeSelect();
  };

  render() {
    return (
      <div>
        <h3 style={{ fontWeight: "bold" }}>
          Where do you fit into the healthcare system?
        </h3>

        <Row gutter={16} style={{ padding: "5vh 0 5vh 0" }}>
          <Col span={10}>
            <StyledDiv highlighted={this.state.selected === 0}>
              <Card
                hoverable
                onClick={e => this.setState({ selected: 0 })}
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                title="Physician"
                bordered
              >
                I provide health services in the public system
              </Card>
            </StyledDiv>
          </Col>
          {/* 
          <Col span={8}>
            <StyledDiv highlighted={this.state.selected === 1}>
              <Card
                hoverable
                onClick={e => this.setState({ selected: 1 })}
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                title="Private health provider"
                bordered
              >
                I provide health services in a private practice
              </Card>
            </StyledDiv>
          </Col> */}

          <Col span={10}>
            <StyledDiv highlighted={this.state.selected === 3}>
              <Card
                hoverable
                onClick={e => this.setState({ selected: 3 })}
                headStyle={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
                title="Administrative assistant"
                bordered
              >
                I am an assistant to a health care professional
              </Card>
            </StyledDiv>
          </Col>

          <div style={{ textAlign: "right" }}>
            <Button
              style={{ margin: "5vh 0 5vh 0" }}
              type="primary"
              // Disable the button when the user has not selected anything.
              disabled={this.state.selected === null}
              loading={this.props.isLoading}
              onClick={this.welcomeSubmit}
            >
              Next
            </Button>
          </div>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading,
    responseMessage,
    errorMessage,
    userType,
  } = state.userTypeReducer;

  return {
    isLoading,
    responseMessage,
    userType,
    errorMessage,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { setUserType }
  )(withRequestStatus(FirstLoginWelcome))
);

export let undecorated = connect(
  mapStateToProps,
  { setUserType }
)(FirstLoginWelcome);
