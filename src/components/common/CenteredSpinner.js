import React from "react";
import { Spin } from "antd";

const CenteredSpinner = ({ message }) => (
  <div style={{ paddingTop: "50vh", textAlign: "center" }}>
    <Spin size="large" tip={message} />
  </div>
);

export default CenteredSpinner;
