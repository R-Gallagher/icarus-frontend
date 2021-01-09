import React from "react";
import { Steps } from "antd";

const Step = Steps.Step;

class FirstLoginSteps extends React.Component {
  render() {
    return (
      <Steps progressDot current={this.props.currentStep}>
        <Step title="Welcome" />
        <Step title="Identity Validation" />
        <Step title="Finish" />
      </Steps>
    );
  }
}

export default FirstLoginSteps;
