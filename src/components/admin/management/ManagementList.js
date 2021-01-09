import React from "react";
import { List, Empty } from "antd";

import ManagementItem from "./ManagementItem";
import AddManagementItem from "./AddManagementItem";

const ManagementList = ({ items, onProviderSelect, selectedProvider }) => {
  return (
    <div style={{ minWidth: "50vw" }}>
      <List
        // Set custom empty text. (https://github.com/ant-design/ant-design/issues/7690#issuecomment-479299603)
        locale={{
          emptyText: <Empty description="You aren't managing anyone yet!" />,
        }}
        header={
          <div style={{ verticalAlign: "middle" }}>
            <h2
              style={{
                fontWeight: "bold",
                display: "inline-block",
                marginBottom: 0,
              }}
            >
              Management Roster
            </h2>
            <div style={{ float: "right", display: "inline-block" }}>
              <AddManagementItem />
            </div>
          </div>
        }
        bordered
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
          <ManagementItem
            item={item}
            onProviderSelect={onProviderSelect}
            selectedProvider={selectedProvider}
          />
        )}
      />
    </div>
  );
};

export default ManagementList;
