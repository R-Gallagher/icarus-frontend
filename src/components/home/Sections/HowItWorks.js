import React from "react";
import { Row, Col } from "antd";
import {
  StyledH1,
  StyledP,
} from "../../../styles/GlobalStyles";

class HowItWorks extends React.Component {
  render() {
    return (
      <Row>
        <Col offset={6} xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledH1 align="left">Health professionals only</StyledH1>
          <StyledP align="left" fontColor="black">
            We verify the identity and credentials of every Icarus Medical user.
            Only approved care providers and their administrative assistants can
            register. You'll be on a platform composed entirely of your peers.
          </StyledP>
        </Col>

        <Col
          style={{ padding: "5vh 0" }}
          offset={6}
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <StyledH1 align="left">Built for busy people</StyledH1>
          <StyledP align="left" fontColor="black">
            Icarus helps you to navigate the entire healthcare system around you
            in just a few clicks. We give new professionals the vast network of
            their most established peers, while giving busy veterans a chance to
            streamline their referral process.
          </StyledP>
        </Col>

        <Col offset={6} xs={12} sm={12} md={12} lg={12} xl={12}>
          <StyledH1 align="left">Patient centered</StyledH1>
          <StyledP align="left" fontColor="black">
            No more waiting months before finding out if another professional has the capacity
            to see your patient. With Icarus, you can find relevant professionals in seconds,
            quickly determine if they match your patients' needs, and then
            quickly consult or refer to them. Icarus provides unmatched
            reliability for getting your patients the care they need as quickly
            as possible.
          </StyledP>
        </Col>
      </Row>
    );
  }
}

export default HowItWorks;
