import React from "react";
import { mount } from "enzyme";

import { undecorated as ForgotPassword } from "../ForgotPassword";
import Root from "../../../Root";

let wrapped, forgotPasswordForm;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <ForgotPassword />
    </Root>
  );

  console.log(wrapped);

  // Retrieve the form from the ForgotPasswordReset component
  ({ form: forgotPasswordForm } = wrapped.find("ForgotPassword").props());
});

afterEach(() => {
  wrapped.unmount();
});

describe("ForgotPassword", () => {
  describe("Test input validation", () => {
    it("Should tell the user to input a value for the email input", () => {
      // Expect errors on form validation.
      forgotPasswordForm.validateFields(["email"], (errors, values) => {
        expect(errors).toBeDefined();
        expect(errors).not.toBeNull();
      });
    });

    it("Should tell the user they must enter a valid email address.", () => {
      wrapped.find("input#forgotPassword_email").simulate("change", {
        target: { value: "testabc123" },
      });

      // Expect errors on form validation.
      forgotPasswordForm.validateFields(["email"], (errors, values) => {
        expect(errors).toBeDefined();
        expect(errors).not.toBeNull();
      });
    });
  });
});
