import React from "react";
import { mount } from "enzyme";

import NumericInput from "../NumericInput";
import Root from "../../../Root";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <NumericInput />
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("NumericInput", () => {
  it("Should accept positive integers as input.", () => {
    let inputText = "1234";

    wrapped.find("input").simulate("change", {
      target: { value: inputText },
    });

    wrapped.update();

    expect(wrapped.find("input").props().value).toEqual(`${inputText}.0`);
  });

  it("Should reject NEGATIVE sign (-) as input.", () => {
    wrapped.find("input").simulate("change", {
      target: { value: "-1234" },
    });

    wrapped.update();

    expect(wrapped.find("input").props().value).toEqual("1234.0");
  });

  it("Should accept positive floats as input.", () => {
    let inputText = "1234.5";

    wrapped.find("input").simulate("change", {
      target: { value: inputText },
    });

    wrapped.update();

    expect(wrapped.find("input").props().value).toEqual(inputText);
  });

  it("Should reject ALL non-numeric characters as input.", () => {
    wrapped.find("input").simulate("change", {
      target: { value: "abc" },
    });

    wrapped.update();

    expect(wrapped.find("input").props().value).toEqual("");
  });
});
