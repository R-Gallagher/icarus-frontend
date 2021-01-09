import React from "react";
import { Modal } from "antd";

class PricingModals extends React.Component {
  render() {
    return (
      <div>
        <Modal
          onOk={this.props.handlePublicProviderModal}
          onCancel={this.props.handlePublicProviderModal}
          visible={this.props.isPublicProviderModalVisible}
        >
          <h1>For care providers whose services are covered by OHIP</h1>
          <ul>
            <li>Family Physicians</li>
            <li>Specialist Physicians</li>
            <li>Administrative Assistants to Physicians</li>
          </ul>
        </Modal>

        <Modal
          onOk={this.props.handlePrivateProviderModal}
          onCancel={this.props.handlePrivateProviderModal}
          visible={this.props.isPrivateProviderModalVisible}
        >
          <h1>For care providers whose services are not covered by OHIP</h1>
          <ul>
            <li>Check</li>
            <li>List</li>
            <li>From</li>
            <li>Notebook</li>
          </ul>
        </Modal>
      </div>
    );
  }
}

export default PricingModals;
