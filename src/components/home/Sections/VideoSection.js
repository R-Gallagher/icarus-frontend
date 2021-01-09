import React from "react";
import { Row, Col } from "antd";
import { StyledH1 } from "../../../styles/GlobalStyles";

class VideoSection extends React.Component {
  render() {
    const {sectionTitle, videoTitle, embeddedYoutubeLink } = this.props;
    return (
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <StyledH1 style={{ padding: "0 0 5vh 0" }} fontColor="black">
          {sectionTitle}
        </StyledH1>

        <Row
          style={{ padding: "0 0 5vh 0" }}
          type="flex"
          justify="space-around"
          align="middle"
        >
          <Col
            xs={20}
            sm={20}
            md={20}
            lg={12}
            xl={12}
            style={{
              borderRadius: "5px",
              webkitBoxShadow: "3px 3px 10px 3px #333333",
              mozBoxShadow: "3px 3px 10px 3px #333333",
              boxShadow: "3px 3px 10px 3px #333333",
              height: "24rem"
            }}
          >
            <iframe
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
                display: "block",
              }}
              title={videoTitle}
              src={`https://www.youtube-nocookie.com/embed/${embeddedYoutubeLink}`}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default VideoSection;
