import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Divider } from "antd";

import ManagementList from "./management/ManagementList";
import requireAuth from "../HOCs/requireAuth";
import withRequestLoading from "../HOCs/withRequestLoading";
import { fetchUsersProfileAdmin } from "../../actions";
import Profile from "../user/Profile";
import { StyledDiv } from "../../styles/GlobalStyles";

class Dashboard extends React.Component {
  state = {
    selectedProvider: null,
  };

  componentDidMount() {
    this.props.fetchUsersProfileAdmin();
  }

  onProviderSelect = provider => {
    this.setState({ selectedProvider: provider });
  };

  render() {
    const { selectedProvider } = this.state;

    return (
      <div>
        <h1
          style={{
            color: "#e04556",
            fontWeight: "bold",
            padding: "3vmin 3vmin 0 3vmin",
          }}
        >
          MEDICAL ASSISTANT DASHBOARD
        </h1>
        <Divider />
        {selectedProvider ? (
          <Profile providerUuid={selectedProvider} />
        ) : (
          <StyledDiv
            centered={true}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ManagementList
              items={this.props.managed_providers}
              onProviderSelect={this.onProviderSelect}
              selectedProvider={selectedProvider}
            />
          </StyledDiv>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    isLoading,
    errorMessage,
    managed_providers,
  } = state.usersProfileAdminReducer;

  return {
    isLoading,
    errorMessage,
    managed_providers,
  };
};

export default requireAuth(
  withRouter(
    connect(
      mapStateToProps,
      { fetchUsersProfileAdmin }
    )(withRequestLoading(Dashboard))
  )
);

export let undecorated = connect(
  mapStateToProps,
  { fetchUsersProfileAdmin }
)(Dashboard);
