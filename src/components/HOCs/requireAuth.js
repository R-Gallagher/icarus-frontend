import React from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { isUserAuthenticated } from "../../utils";
import { COOKIE_SETUP_REQUIRED, COOKIE_IS_CONFIRMED } from "../../constants";

const cookie = new Cookies();

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!isUserAuthenticated()) {
        this.props.history.push("/");
        this.forceUpdate();
      }

      if (
        cookie.get(COOKIE_SETUP_REQUIRED) &&
        this.props.location.pathname !== "/first_login" &&
        !cookie.get(COOKIE_IS_CONFIRMED)
      ) {
        this.props.history.push("/first_login");
      } else if (
        cookie.get(COOKIE_IS_CONFIRMED) &&
        this.props.location.pathname !== "/registration_confirmation"
      ) {
        this.props.history.push("/registration_confirmation");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return withRouter(ComposedComponent);
};
