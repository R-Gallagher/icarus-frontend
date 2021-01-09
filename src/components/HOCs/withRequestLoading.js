import React from "react";
import { withRouter } from "react-router-dom";

import CenteredSpinner from "../common/CenteredSpinner";

export default ChildComponent => {
  class ComposedComponent extends React.Component {
    render() {
      if (this.props.isLoading) {
        return (
          <ChildComponent {...this.props}>
            <CenteredSpinner message="Loading, please wait..." />
          </ChildComponent>
        );
      } else {
        return <ChildComponent {...this.props} />;
      }
    }
  }

  return withRouter(ComposedComponent);
};
