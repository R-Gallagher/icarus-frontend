import React from "react";
import {
  StyledH2,
  StyledH3,
  StyledP,
} from "../../../styles/GlobalStyles";

class KeyValueProps extends React.Component {
  render() {
    return (
      <div>
        <StyledH2 align="left" fontColor="black">
          The referral toolkit
        </StyledH2>
        <StyledH2 padding="0 0 5vh 0" align="left">
          rebuilt for the 21st century
        </StyledH2>

        <StyledH3 align="left" fontColor="black">
          Family Doctors
        </StyledH3>
        <StyledP padding="0 0 2.5vh 0" align="left" fontColor="black">
          Find the best specialists for your patient in seconds
        </StyledP>
        <StyledH3 align="left" fontColor="black">
          Specialists
        </StyledH3>
        <StyledP align="left" fontColor="black">
          Grow your practice while eliminating misreferrals
        </StyledP>
        <StyledH3 align="left" fontColor="black">
          Admin Assistants
        </StyledH3>
        <StyledP align="left" fontColor="black">
          Superior referral organization and efficiency
        </StyledP>
      </div>
    );
  }
}

export default KeyValueProps;
