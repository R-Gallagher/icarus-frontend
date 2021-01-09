import React from "react";
import { Row } from "antd";
import { withCookies } from "react-cookie";
import Cookies from "universal-cookie";

import FirstLoginVerifyProvider from "./FirstLoginVerifyProvider";
import FirstLoginVerifyAdmin from "./FirstLoginVerifyAdmin";
import { COOKIE_U_TYPE } from "../../../constants";

const cookie = new Cookies();

class FirstLoginVerify extends React.Component {
  renderVerifyContentBasedOnUserType = () => {
    const user_type = cookie.get(COOKIE_U_TYPE);

    if (user_type === "0" || user_type === "1" || user_type === "2") {
      return <FirstLoginVerifyProvider changeStep={this.props.changeStep} />;
    } else {
      return <FirstLoginVerifyAdmin changeStep={this.props.changeStep} />;
    }
  };

  render() {
    return (
      <div>
        <h3 style={{ fontWeight: "bold" }}>
          We keep Icarus exclusive to verified healthcare professionals. That
          means we need to verify you too!
        </h3>

        <Row gutter={16} style={{ padding: "5vh 0 5vh 0" }}>
          {this.renderVerifyContentBasedOnUserType()}
        </Row>
      </div>
    );
  }
}
export default withCookies(FirstLoginVerify);
