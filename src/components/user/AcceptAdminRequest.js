import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { Card } from "antd";

import withRequestLoading from "../HOCs/withRequestLoading";
import withRequestStatus from "../HOCs/withRequestStatus";
import {
  usersAcceptAdminRequest,
  usersRejectAdminRequest,
} from "../../actions";
import { StyledDiv, StyledH2, StyledH3 } from "../../styles/GlobalStyles";

class AcceptAdminRequest extends React.Component {
  acceptRequest = () => {
    const { acceptToken, adminUuid } = this.props.match.params;

    this.props.usersAcceptAdminRequest(acceptToken, adminUuid, () => {
      this.props.history.push("/");
    });
  };

  rejectRequest = () => {
    const { acceptToken, adminUuid } = this.props.match.params;

    this.props.usersRejectAdminRequest(acceptToken, adminUuid, () => {
      this.props.history.push("/");
    });
  };

  render() {
    var { adminName } = this.props.match.params;
    var adminNameCleaned = adminName.replace("+", " ");

    return (
      <div
        style={{
          padding: "10vh",
        }}
      >
        <div>
          <StyledH2>
            {adminNameCleaned} is requesting to be your administrative
            assistant!
          </StyledH2>
          <StyledDiv
            centered={true}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              style={{ maxWidth: "65vw" }}
              actions={[
                <CheckCircleTwoTone
                  key="acceptRequest"
                  style={{ fontSize: "5vh" }}
                  twoToneColor="#52C41A"
                  onClick={this.acceptRequest} />,
                <CloseCircleTwoTone
                  key="rejectRequest"
                  style={{ fontSize: "5vh" }}
                  twoToneColor="#ED2939"
                  onClick={this.rejectRequest} />,
              ]}
            >
              <StyledH3>
                Save time on the network to spend more with your patients!
              </StyledH3>
              <h3>
                Here's what an administrative assistant can do for you on
                Icarus:
              </h3>
              <ul>
                <li>Edit your profile and keep the information up to date.</li>
                {/* <li>Send messages on your behalf.</li> */}
                <li>Search the Icarus network on your behalf.</li>
              </ul>
              <h4>
                <strong>
                  * Only accept this request if this is your administrative
                  assistant!
                </strong>
              </h4>
            </Card>
          </StyledDiv>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { isLoadingAccept, errorMessageAccept } = state.usersAcceptAdminReducer;
  const { isLoadingReject, errorMessageReject } = state.usersRejectAdminReducer;

  return {
    isLoading: isLoadingAccept && isLoadingReject,
    errorMessage: errorMessageAccept || errorMessageReject,
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { usersAcceptAdminRequest, usersRejectAdminRequest }
  )(withRequestLoading(withRequestStatus(AcceptAdminRequest)))
);

export let undecorated = connect(
  mapStateToProps,
  { usersAcceptAdminRequest, usersRejectAdminRequest }
)(AcceptAdminRequest);
