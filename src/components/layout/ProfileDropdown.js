import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Avatar, Spin } from "antd";
import { withCookies } from "react-cookie";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";

import "./Header.css";
import { COOKIE_U_TYPE } from "../../constants";
import { loggedInAs, logout } from "../../actions";

const SubMenu = Menu.SubMenu;
const cookie = new Cookies();

class ProfileDropdown extends React.Component {
  componentDidUpdate(prevProps) {
    // If the cookie is updated and the current cookie is true, then we want to recheck for the current logged in user details.
    if (
      prevProps.allCookies.isAuthenticated !==
        this.props.allCookies.isAuthenticated &&
      this.props.allCookies.isAuthenticated === "true"
    ) {
      this.props.loggedInAs();
    }
  }

  componentDidMount() {
    this.props.loggedInAs();
  }

  onLogoutClicked = () => {
    this.props.logout(() => {
      this.props.history.push("/");
    });
  };

  hasErrors = (fieldsError) => {
    return Object.keys(fieldsError).some((field) => fieldsError[field]);
  };

  renderProfileImage = () => {
    const { current_user, isLoadingLoggedInAs } = this.props;

    if (isLoadingLoggedInAs) {
      return <Spin size="small" />;
    } else {
      if (current_user.profile_picture) {
        return <Avatar src={current_user.profile_picture} />;
      } else {
        return (
          <UserOutlined
            style={{
              color: "white",
              fontSize: "24px",
              verticalAlign: "middle",
            }}
          />
        );
      }
    }
  };

  render() {
    const { current_user, forceSubMenuRender } = this.props;
    var { isSetup } = this.props.allCookies;

    const isAdmin = cookie.get(COOKIE_U_TYPE) === "3";

    // Setup has to be a boolean.
    isSetup = isSetup === "true";
    return (
      <Menu
        forceSubMenuRender={forceSubMenuRender || false}
        theme="dark"
        mode="horizontal"
        style={{
          lineHeight: "64px",
        }}
      >
        <Menu.Item disabled={isSetup}>
          <Link to={"/search"}>
            <SearchOutlined
              style={{
                color: "white",
                fontSize: "24px",
                verticalAlign: "middle",
              }}
            />
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              {this.renderProfileImage()}
            </span>
          }
        >
          <Menu.Item style={{ cursor: "default" }}>
            Signed in as: {current_user.email}
          </Menu.Item>
          {!isAdmin && (
            <Menu.Item key="profile" disabled={isSetup}>
              <Link to="/profile"> Your Profile </Link>
            </Menu.Item>
          )}
          <Menu.Item key="help" disabled={isSetup}>
            <Link to="/help"> Help </Link>
          </Menu.Item>
          <Menu.Item key="settings" disabled={isSetup}>
            <Link to="/settings"> Settings </Link>
          </Menu.Item>
          <Menu.Item
            key="logout"
            title="Logout Button"
            className="logout"
            onClick={this.onLogoutClicked}
          >
            {" "}
            Log Out{" "}
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

ProfileDropdown.propTypes = {
  // This prop will be used for tests, it allows us to fully render the menu.
  forceSubMenuRender: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const {
    isLoading: isLoadingLoggedInAs,
    current_user,
    errorMessageLoggedInAs,
  } = state.loggedInAsReducer;
  const {
    isLoading: isLoadingLogout,
    responseMessageLogout,
    errorMessageLogout,
  } = state.logoutReducer;

  return {
    isLoadingLoggedInAs,
    current_user,
    errorMessageLoggedInAs,
    isLoadingLogout,
    responseMessageLogout,
    errorMessageLogout,
  };
};

export default withRouter(
  withCookies(connect(mapStateToProps, { loggedInAs, logout })(ProfileDropdown))
);

export let undecorated = connect(mapStateToProps, { loggedInAs, logout })(
  ProfileDropdown
);
