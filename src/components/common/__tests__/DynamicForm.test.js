import React from "react";
import { mount } from "enzyme";

import DynamicForm from "../DynamicForm";
import AddressItems from "../FormItems/AddressItems";
import { wrapWithForm } from "../../../utils";
import Root from "../../../Root";

let wrapped;

beforeEach(() => {
  const Form = wrapWithForm(DynamicForm, "parentForm");

  wrapped = mount(
    <Root>
      <Form
        ChildFormItems={AddressItems}
        value={[]}
        childFormItemTitle="Test Address"
        childFormItemKey="testAddressKey"
      />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("DynamicForm", () => {
  it("Should render the child component.", () => {
    expect(wrapped.contains(AddressItems)).toEqual(true);
  });

  it("Should add form item and increment count.", () => {
    // Add two address items.
    wrapped.find("button").simulate("click");
    wrapped.find("button").simulate("click");

    wrapped.update();

    // Look for the two items.
    expect(wrapped.find(AddressItems).length).toEqual(2);
    expect(wrapped.find(AddressItems).at(0).props().currentKey).toEqual(0);
    expect(wrapped.find(AddressItems).at(1).props().currentKey).toEqual(1);
  });

  it("Should delete correct form item and decrement count.", () => {
    for (var i = 0; i < 5; i++) {
      wrapped.find(".addItem").at(1).simulate("click");
    }

    wrapped.update();

    let currentKey = wrapped.find({ index: 2 }).props().currentKey;

    wrapped
      .findWhere(
        (node) =>
          node.name() === "DynamicFormRemoveButton" &&
          node.props().keyToRemove === currentKey
      )
      .children("Button")
      .simulate("click");

    wrapped.update();

    // Check if the correct item was deleted.
    expect(wrapped.find({ currentKey }).length).toEqual(0);

    currentKey = wrapped.find({ index: 3 }).props().currentKey;

    wrapped
      .findWhere(
        (node) =>
          node.name() === "DynamicFormRemoveButton" &&
          node.props().keyToRemove === currentKey
      )
      .children("Button")
      .simulate("click");

    wrapped.update();

    // Check if the correct item was deleted.
    expect(wrapped.find({ currentKey }).length).toEqual(0);
  });

  it("Should contain the value passed in for the childFormItemTitle prop.", () => {
    expect(wrapped.find("span").at(1).text().includes("Test Address")).toEqual(
      true
    );
  });
});
