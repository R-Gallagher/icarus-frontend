import React from "react";
import { Row, Col } from "antd";
import PricingModals from "./PricingModals";
import PricingCard from "./PricingCard";
import styled from "styled-components";
import { media } from "../../../styles/helpers";
import { StyledH1, StyledH2, StyledP } from "../../../styles/GlobalStyles";

const StyledCol = styled(({ ...rest }) => <Col {...rest} />)`
  ${media.xs`
    margin-bottom: 24px;
    padding-left: 0px;
    padding-right: 0px;
    height: 75%
  `}
  ${media.sm`
    margin-bottom: 24px;
    padding-left: 0px;
    padding-right: 0px;
    height: 75%
  `}
  ${media.md`
    margin-bottom: 24px;
    padding-left: 12px;
    padding-right: 12px;
  `}
  padding-left: 64px;
  padding-right: 64px;
`;

class Pricing extends React.Component {
  state = {
    isPublicProviderModalVisible: false,
    isPrivateProviderModalVisible: false,
  };

  handlePublicProviderModal = () => {
    this.setState({
      isPublicProviderModalVisible: !this.state.isPublicProviderModalVisible,
    });
  };

  handlePrivateProviderModal = () => {
    this.setState({
      isPrivateProviderModalVisible: !this.state.isPrivateProviderModalVisible,
    });
  };

  render() {
    return (
      <div>
        <PricingModals
          handlePublicProviderModal={this.handlePublicProviderModal}
          handlePrivateProviderModal={this.handlePrivateProviderModal}
          isPublicProviderModalVisible={this.state.isPublicProviderModalVisible}
          isPrivateProviderModalVisible={
            this.state.isPrivateProviderModalVisible
          }
        />

        <StyledH1 padding="0 0 5vh 0" fontColor="black">
          Pricing
        </StyledH1>

        <Row
          style={{ padding: "0 5vw", minWidth: "90vw" }}
          type="flex"
          justify="space-between"
        >
          <StyledCol height="100%" xs={24} sm={24} md={12} lg={12} xl={12}>
            <PricingCard
              handlePublicProviderModal={this.handlePublicProviderModal}
              height="100%"
              title="Starter"
              price="Free"
            >
              <StyledP fontColor="black">Desktop</StyledP>

              <StyledP fontColor="black">Mobile (Coming soon)</StyledP>

              <StyledP fontColor="black">Network Access</StyledP>
            </PricingCard>
          </StyledCol>

          <StyledCol xs={24} sm={24} md={12} lg={12} xl={12}>
            <PricingCard
              handlePublicProviderModal={this.handlePublicProviderModal}
              title="Premium"
              price="$75 / month"
            >
              <StyledP fontColor="black"> Desktop + Mobile</StyledP>

              <StyledP fontColor="black"> Network Access</StyledP>

              <StyledP fontColor="black"> Unlimited eReferrals</StyledP>

              <StyledP fontColor="black"> Billable eConsults</StyledP>
            </PricingCard>
          </StyledCol>
        </Row>
        <StyledH2 padding="10vh 0 0 0">Premium features coming soon!</StyledH2>
      </div>
    );
  }
}

export default Pricing;
