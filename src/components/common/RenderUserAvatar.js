import React from "react";
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";

const default_style = {
  margin: 20,
  color: "white",
};

class RenderUserAvatar extends React.Component {
  render() {
    const { profile_picture_link, avatar_style, size } = this.props;

    if (profile_picture_link) {
      return (
        <Avatar style={{ margin: 20 }} size={size} src={profile_picture_link} />
      );
    } else {
      return (
        <Avatar
          size={size}
          style={avatar_style ? avatar_style : default_style}
          icon={<UserOutlined />}
        />
      );
    }
  }
}

export default RenderUserAvatar;
