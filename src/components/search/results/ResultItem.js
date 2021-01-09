import React from "react";
import PropTypes from "prop-types";
import { CarOutlined, ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { List, Avatar, Row, Col } from "antd";

const ResultItem = ({ result, onResultSelect, selectedResult }) => {
  return (
    <List.Item
      style={{
        cursor: "pointer",
        // Highlight the background colour if the result is currently selected.
        backgroundColor:
          result.uuid === selectedResult.uuid
            ? "rgba(204, 204, 204, 0.2)"
            : null,
      }}
      key={result.uuid}
      onClick={() => onResultSelect(result)}
    >
      <List.Item.Meta
        title={result.name}
        description={result.provider.subspecialty_or_special_interests}
        // If the user has a profile picture, display that. Otherwise display default user icon.
        avatar={
          result.profile_picture_link ? (
            <Avatar src={result.profile_picture_link} />
          ) : (
            <Avatar
              style={{
                color: "white",
              }}
              icon={<UserOutlined />}
            />
          )
        }
      />
      {/* Render the distance and consultation wait time. */}
      <Row style={{ textAlign: "right" }}>
        {result.provider.consultation_wait && (
          // Only render the wait time if it is already set in the profile.
          <Col>
            {result.provider.consultation_wait} day <ClockCircleOutlined />
          </Col>
        )}
        <Col>
          {result.provider.addresses[0].distance} <CarOutlined />
        </Col>
      </Row>
    </List.Item>
  );
};

ResultItem.propTypes = {
  results: PropTypes.array.isRequired,
  onResultSelect: PropTypes.func.isRequired,
  selectedResult: PropTypes.object.isRequired,
};

export default ResultItem;
