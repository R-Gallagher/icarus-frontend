import React from "react";
import { Row, Col } from "antd";

import SearchBar from "./SearchBar";
import requireAuth from "../HOCs/requireAuth";

class Search extends React.Component {
  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="space-around"
          align="middle"
          style={{ minHeight: "75vh" }}
        >
          <Col span={8} style={{ textAlign: "left", fontSize: "20px" }}>
            <h1 style={{ color: "#e04556", fontWeight: "bold" }}>
              PHYSICIAN SEARCH
            </h1>
            <p style={{ fontWeight: "bold" }}>
              Find other doctors by specialty and distance from your practice.
            </p>
            <p style={{ fontWeight: "bold" }}>
              You can then sort by wait times or travel distance to help you
              make the right referral decision for your patient.
            </p>
          </Col>
          <Col span={8} style={{ textAlign: "left", fontSize: "20px" }}>
            <h3 style={{ fontWeight: "bold", opacity: 0.75, padding: "0.5em" }}>
              The entire healthcare system, <br />
              at your fingertips.
            </h3>
            <SearchBar isResult={false} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default requireAuth(Search);

export let undecorated = Search;
