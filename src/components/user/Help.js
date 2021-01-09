import React from "react";
import { Row, Col } from "antd";

const Help = () => {
  return (
    <Row
      type="flex"
      style={{ minHeight: "80vh" }}
      align="middle"
      justify="center"
    >
      <Col span={20}>
        <h1>
          If you are stuck, please contact{" "}
          <a href={"mailto:support@icarusmed.com"}>support@icarusmed.com</a>
        </h1>
      </Col>
    </Row>
  );
};

export default Help;
