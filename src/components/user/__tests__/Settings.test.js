import React from "react";
import { mount } from "enzyme";

import { undecorated as Settings } from "../Settings";
import Root from "../../../Root";

let wrapped, settingsForm;

// Before each test, install moxios and mount the profile dropdown component
beforeEach(() => {
  // We pass forceSubMenuRender because we were unable to render using mouseEnter or by setting props to the child component.
  wrapped = mount(
    <Root>
      <Settings />
    </Root>
  );

  ({ form: settingsForm } = wrapped.find("Settings").props());
});

afterEach(() => {
  wrapped.unmount();
});

describe("Settings", () => {
  it("Should provide an error message if the user does not provide their old password.", () => {
    let inputText = "1234";

    wrapped.find("input#new_password").simulate("change", {
      target: { value: inputText },
    });

    wrapped.find("input#confirm").simulate("change", {
      target: { value: inputText },
    });

    // Trigger validation for the form.
    settingsForm.validateFields(["old_password"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should provide an error message if the user does not provide a new password.", () => {
    let inputText = "1234";

    wrapped.find("input#old_password").simulate("change", {
      target: { value: inputText },
    });

    wrapped.find("input#confirm").simulate("change", {
      target: { value: inputText },
    });

    // Trigger validation for the form.
    settingsForm.validateFields(["new_password"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should provide an error message if the user does not provide confirm their new password.", () => {
    let inputText = "1234";

    wrapped.find("input#old_password").simulate("change", {
      target: { value: inputText },
    });

    wrapped.find("input#new_password").simulate("change", {
      target: { value: inputText },
    });

    // Trigger validation for the form.
    settingsForm.validateFields(["confirm"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should provide an error message if the new password and confirm password do not match.", () => {
    let inputText = "1234";

    wrapped.find("input#old_password").simulate("change", {
      target: { value: inputText },
    });

    wrapped.find("input#new_password").simulate("change", {
      target: { value: inputText },
    });

    wrapped.find("input#confirm").simulate("change", {
      target: { value: "NOT_THE_SAME" },
    });

    // Trigger validation for the form.
    settingsForm.validateFields(["confirm"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });
});
