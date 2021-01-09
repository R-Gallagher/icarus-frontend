import React from "react";
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { UserOutlined } from '@ant-design/icons';
import { List, Avatar, Row, Col } from "antd";

class ManagementItem extends React.Component {
  render() {
    const { item, onProviderSelect, selectedProvider } = this.props;
    return (
      <List.Item
        style={{
          cursor: "pointer",
          // Highlight the background colour if the result is currently selected.
          backgroundColor:
            item.uuid === selectedProvider ? "rgba(204, 204, 204, 0.2)" : null,
        }}
        key={item.uuid}
        // Disallow the user to click if the provider hasn't confirmed.
        onClick={() =>
          item.is_relationship_confirmed_by_provider &&
          onProviderSelect(item.uuid)
        }
      >
        <List.Item.Meta
          title={item.designation === "MD" ? "Dr. " + item.name : item.name}
          description={item.specialty}
          avatar={
            item.profile_picture_link ? (
              <Avatar size="large" src={item.profile_picture_link} />
            ) : (
              <Avatar
                size="large"
                style={{
                  color: "white",
                }}
                icon={<UserOutlined />}
              />
            )
          }
        />
        <Row style={{ textAlign: "right" }}>
          <Col>
            <h3 style={{ color: "rgba(0, 0, 0, 0.45)" }}>
              {item.is_relationship_confirmed_by_provider
                ? "Request Accepted"
                : "Request Not Accepted"}
            </h3>
          </Col>
          <Col>
            <LegacyIcon
              id="requestStatus"
              style={{ fontSize: "5vh" }}
              type={
                item.is_relationship_confirmed_by_provider
                  ? "check-circle"
                  : "close-circle"
              }
              theme="twoTone"
              twoToneColor={
                item.is_relationship_confirmed_by_provider
                  ? "#52C41A"
                  : "#ED2939"
              }
            />
          </Col>
        </Row>
      </List.Item>
    );
  }
}

export default ManagementItem;
