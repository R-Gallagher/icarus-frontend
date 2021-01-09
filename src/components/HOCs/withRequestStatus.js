import React from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";

message.config({
  top: 100,
});

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    componentDidUpdate(prevProps) {
      const { responseMessage, errorMessage } = this.props;

      if (prevProps.responseMessage !== responseMessage && responseMessage) {
        message.success(responseMessage);
      } else if (prevProps.errorMessage !== errorMessage && errorMessage) {
        message.error(errorMessage);
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return withRouter(ComposedComponent);
};
