import React from "react";
import { Form } from "@ant-design/compatible";
import "@ant-design/compatible/assets/index.css";
import Cookies from "universal-cookie";

import { COOKIE_IS_AUTHENTICATED } from "./constants";

const cookie = new Cookies();

export const isUserAuthenticated = () => {
  const authStatus = cookie.get(COOKIE_IS_AUTHENTICATED) || false;

  if (authStatus === "true") {
    return true;
  } else {
    return false;
  }
};

export const wrapWithForm = (Component, customFormName = null) => {
  class Wrapper extends React.Component {
    render() {
      // Pass the form prop into a custom prop if provided. (For custom components where the prop is not form.)
      let customProps = customFormName
        ? { ...this.props, [customFormName]: this.props.form }
        : { ...this.props };

      return <Component {...customProps} />;
    }
  }
  return Form.create({ name: "test" })(Wrapper);
};

export const generateAddressSearchObject = (address, lat, lon) => {
  return [
    {
      address,
      location: {
        lat,
        lon,
      },
    },
  ];
};
