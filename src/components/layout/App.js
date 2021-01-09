import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";
import { withCookies } from "react-cookie";

import Header from "./Header";
import requireCsrf from "../HOCs/requireCsrf";
import "./App.css";

import Search from "../search/Search";
import Results from "../search/results/Results";
import Home from "../home/Home";
import Profile from "../user/Profile";
import RegisterConfirm from "../user/FirstLogin/RegisterConfirm";
import FirstLogin from "../user/FirstLogin/FirstLogin";
import ForgotPassword from "../user/ForgotPassword";
import ForgotPasswordReset from "../user/ForgotPasswordReset";
import Settings from "../user/Settings";
import Help from "../user/Help";
import FourOhFour from "../common/404";
import Dashboard from "../admin/Dashboard";
import AcceptAdminRequest from "../user/AcceptAdminRequest";

const { Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout
          className="layout"
          style={{ minHeight: "100vh", maxWidth: "100%" }}
        >
          <Header />

          <Content style={{ background: "#fff" }}>
            <div style={{ background: "#fff", minHeight: "80vh" }}>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/registration_confirmation"
                  component={RegisterConfirm}
                />
                <Route path="/first_login" component={FirstLogin} />
                <Route
                  path="/reset_password/:resetToken"
                  component={ForgotPasswordReset}
                />
                <Route path="/search" exact component={Search} />
                <Route path="/results" exact component={Results} />
                {/* Block admin user type from going to profile.  */}
                {this.props.allCookies.u_type !== "3" && (
                  <Route path="/profile" exact component={Profile} />
                )}
                <Route path="/help" exact component={Help} />
                <Route
                  path="/forgot_password"
                  exact
                  component={ForgotPassword}
                />
                <Route path="/settings" exact component={Settings} />

                {/* Only allow admin assistants to navigate to the dashboard for now. */}
                {this.props.allCookies.u_type === "3" && (
                  <Route path="/dashboard" exact component={Dashboard} />
                )}
                <Route
                  path="/users/accept_admin_request/:acceptToken/:adminUuid/:adminName"
                  component={AcceptAdminRequest}
                />

                {/* All routes must be above this 404 or they will redirect. */}
                <Route component={FourOhFour} />
              </Switch>
              {this.props.children}
            </div>
          </Content>

          <Footer>
            <p>© {new Date().getFullYear()} Icarus Medical</p>
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default requireCsrf(withCookies(App));
