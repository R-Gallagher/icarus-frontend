import React from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import { Col } from "antd";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { withRouter } from "react-router-dom";

import { StyledRow, StyledH2 } from "../../styles/GlobalStyles";
import { register } from "../../actions";
import { isUserAuthenticated } from "../../utils";
import withRequestStatus from "../HOCs/withRequestStatus";
import { COOKIE_U_TYPE } from "../../constants";
import RegistrationForm from "./Sections/RegistrationForm";
import VideoSection from "./Sections/VideoSection";
import HowItWorks from "./Sections/HowItWorks";
import KeyValueProps from "./Sections/KeyValueProps";
import { media } from "../../styles/helpers";
import styled from "styled-components";

const cookie = new Cookies();

const StyledColHideOnMobile = styled(({ accentBackground, ...rest }) => (
  <Col {...rest} />
))`
  ${media.xs`
      display: none;
  `}
  ${media.sm`
    display: none;
  `}
  ${media.md`
    display:none;
  `}
`;

const StyledDivWithDropShadow = styled.div`
  -webkit-box-shadow: 3px 3px 10px 3px #d8d8d8;
  -moz-box-shadow: 3px 3px 10px 3px #d8d8d8;
  box-shadow: 3px 3px 10px 3px #d8d8d8;
  border-radius: 5px;
  padding: 10px;
`;

class Home extends React.Component {
  componentDidMount() {
    if (isUserAuthenticated()) {
      // Redirect user to their appropriate starting page depending on their type.
      cookie.get(COOKIE_U_TYPE) === "3"
        ? this.props.history.push("/dashboard")
        : this.props.history.push("/search");
    }
  }

  onRegisterSubmit = (formProps) => {
    this.props.register(formProps, () =>
      this.props.history.push({
        pathname: "/registration_confirmation",
      })
    );
  };

  handleRegisterSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.onRegisterSubmit(values);
      }
    });
  };

  render() {
    const { form, isLoading } = this.props;

    return (
      <div>
        <StyledRow type="flex" justify="space-around" align="middle">
          <Col xs={20} sm={20} md={20} lg={12} xl={12}>
            <KeyValueProps />
          </Col>

          <StyledColHideOnMobile xs={20} sm={20} md={20} lg={8} xl={8}>
            <StyledH2 fontColor="black" align="right">
              Get started!
            </StyledH2>
            <RegistrationForm
              form={form}
              handleRegisterSubmit={this.handleRegisterSubmit}
              isLoading={isLoading}
            />
          </StyledColHideOnMobile>

          <Col
            style={{ padding: "7.5vh 5vw" }}
            xs={20}
            sm={20}
            md={0}
            lg={0}
            xl={0}
          >
            <StyledDivWithDropShadow>
              <h1>
                Get started on your desktop computer, our mobile site is in
                progress!
              </h1>
            </StyledDivWithDropShadow>
          </Col>
        </StyledRow>

        <StyledRow
          type="flex"
          justify="space-around"
          align="middle"
          style={{ backgroundColor: "rgba(216,216,216,0.2)" }}
        >
          <VideoSection 
            sectionTitle="Your refferal network just got bigger" 
            videoTitle="Icarus Promo Video"
            embeddedYoutubeLink="5xsNKXUynHE"
          />
        </StyledRow>

        <StyledRow type="flex" justify="space-around" align="middle">
          <HowItWorks />
        </StyledRow>

        <StyledRow
          type="flex"
          justify="space-around"
          align="middle"
          style={{ backgroundColor: "rgba(216,216,216,0.2)" }}
        >
          <VideoSection 
            sectionTitle="See Icarus in action" 
            videoTitle="Icarus Demo Video"
            embeddedYoutubeLink="HAcblVca6S4"
          />
        </StyledRow>
      </div>
    );
  }
}

Home = Form.create({ name: "home" })(Home);

const mapStateToProps = (state) => {
  const { isLoading, responseMessage, errorMessage } = state.registerReducer;
  return {
    isLoading,
    responseMessage,
    errorMessage,
  };
};

export default withRouter(
  connect(mapStateToProps, { register })(withRequestStatus(Home))
);

export let undecorated = connect(mapStateToProps, { register })(Home);
