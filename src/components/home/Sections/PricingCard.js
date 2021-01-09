import React from "react";
import { Card, Row, Col, Divider } from "antd";
import styled from "styled-components";

const StyledCard = styled(({ ...rest }) => <Card {...rest} />)`
  -webkit-box-shadow: 3px 3px 10px 3px #d8d8d8;
  -moz-box-shadow: 3px 3px 10px 3px #d8d8d8;
  box-shadow: 3px 3px 10px 3px #d8d8d8;
  border-radius: 5px;
`;

const PricingCard = props => {
  return (
    <StyledCard
      type="flex"
      style={{ height: "100%" }}
      bodyStyle={{ textAlign: "center", height: "100%" }}
      headStyle={{
        fontSize: "24px",
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        backgroundColor: "#e04556",
      }}
      title={props.title}
    >
      <div style={{ height: "100%" }}>
        <Row style={{ height: "50%" }} type="flex">
          <Col style={{ height: "100%" }} span={24}>
            {props.children}
          </Col>
        </Row>
        <Row style={{ height: "50%" }} type="flex">
          <Col style={{ height: "100%" }} span={24}>
            <div>
              <Divider />
              <p
                style={{
                  fontSize: "24px",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {props.price}
              </p>
              <p
                style={{
                  color: "#e04556",
                  textAlign: "center",
                  cursor: "pointer",
                }}
                onClick={() => props.handlePublicProviderModal()}
              >
                Covered Providers
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </StyledCard>
  );
};

export default PricingCard;
