import React from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Layout } from "antd";
import { withCookies } from "react-cookie";

import LoginForm from "./LoginForm";
import ProfileDropdown from "./ProfileDropdown";
import { isUserAuthenticated } from "../../utils";

import "./Header.css";

// Rename header to "AntHeader" on import
const { Header: AntHeader } = Layout;

class Header extends React.Component {
  renderHeaderContent = () => {
    if (isUserAuthenticated()) {
      return (
        <ProfileDropdown forceSubMenuRender={this.props.forceSubMenuRender} />
      );
    } else {
      return <LoginForm form={this.props.form} />;
    }
  };

  render() {
    var { isSetup } = this.props.allCookies;

    return (
      <AntHeader>
        {isSetup ? (
          <img
            className="logo"
            src="https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.us-east-2.amazonaws.com/logo.png"
            alt="logo"
          />
        ) : (
          <Link to="/">
            <img
              className="logo"
              src="https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.us-east-2.amazonaws.com/logo.png"
              alt="logo"
            />
          </Link>
        )}
        <Media query="(min-width: 1000px)">
          {matches => (matches ? this.renderHeaderContent() : null)}
        </Media>
      </AntHeader>
    );
  }
}

Header = Form.create({ name: "login" })(Header);

export default withCookies(Header);

export let undecorated = Header;
