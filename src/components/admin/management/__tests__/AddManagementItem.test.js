import React from "react";
import { mount } from "enzyme";

import { undecorated as AddManagementItem } from "../AddManagementItem";
import Root from "../../../../Root";

let wrapped, form;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <AddManagementItem />
    </Root>
  );

  ({ form } = wrapped.find("AddManagementItem").props());
});

afterEach(() => {
  wrapped.unmount();
});

describe("AddManagementItem", () => {
  it.each([[null], ["test"]])(
    "Should verify that all validation is set on the form.",
    input => {
      form.setFieldsValue({
        email: input,
      });

      // Trigger validation for the form.
      form.validateFields(["email"], (errors, values) => {
        // If errors is defined and not null the validation blocked the user from submitting a bad form.
        expect(errors).toBeDefined();
        expect(errors).not.toBeNull();
      });
    }
  );
});
