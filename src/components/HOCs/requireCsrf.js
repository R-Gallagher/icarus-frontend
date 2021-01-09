import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Modal } from "antd";

import { fetchCsrf } from "../../actions";
import withRequestLoading from "./withRequestLoading";

export default (ChildComponent, isTest = null) => {
  class ComposedComponent extends React.Component {
    state = {
      modalVisible: false,
    };

    componentDidMount() {
      this.props.fetchCsrf();
    }

    handleClick = () => {
      this.props.fetchCsrf();
      this.setState({ modalVisible: !this.state.modalVisible });
    };

    render() {
      const { errorMessage } = this.props;

      if (errorMessage) {
        return (
          <ChildComponent {...this.props}>
            <Modal
              title="Session Expiry"
              visible={!this.state.modalVisible}
              onOk={this.handleClick}
              onCancel={this.handleClick}
            >
              <p>{errorMessage}</p>
            </Modal>
          </ChildComponent>
        );
      } else {
        return <ChildComponent {...this.props} />;
      }
    }
  }

  const mapStateToProps = state => {
    const { errorMessage, isLoading } = state.csrfReducer;

    return {
      errorMessage,
      isLoading,
    };
  };

  if (isTest) {
    return connect(
      mapStateToProps,
      { fetchCsrf }
    )(ComposedComponent);
  } else {
    return withRouter(
      connect(
        mapStateToProps,
        { fetchCsrf }
      )(withRequestLoading(ComposedComponent))
    );
  }
};
