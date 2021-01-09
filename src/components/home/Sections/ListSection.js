import React from "react";
import { Row, Col } from "antd";
import { StyledH1 } from "../../../styles/GlobalStyles";

class ListSection extends React.Component {
  generateList = listText => (
    <ul>
      {listText.map((listItem, index) => {
        return <li key={index}>{listItem}</li>;
      })}
    </ul>
  );

  render() {
    const { title, listText } = this.props;
    return (
      <Row>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <StyledH1 align="left">{title}</StyledH1>
          {this.generateList(listText)}
        </Col>
      </Row>
    );
  }
}

export default ListSection;
