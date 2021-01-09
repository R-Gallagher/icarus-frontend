import React from "react";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";

import { undecorated as FirstLoginWelcome } from "../FirstLoginWelcome";
import Root from "../../../../Root";
import { theme } from "../../../../styles/Theme";

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <ThemeProvider theme={theme}>
        <FirstLoginWelcome />
      </ThemeProvider>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});

describe("FirstLoginWelcome", () => {
  it("Should block users from proceeding if no user type is selected.", () => {
    expect(wrapped.find("Button").props().disabled).toEqual(true);
  });

  it("Should have a selected state of 0 when the type physician is clicked.", () => {
    wrapped
      .find("Card")
      .at(0)
      .simulate("click");

    wrapped.update();

    expect(wrapped.find("FirstLoginWelcome").state().selected).toEqual(0);
  });

  // Not in v1
  // it("Should have a selected state of 1 when the type private health provider is clicked.", () => {
  //   wrapped
  //     .find("Card")
  //     .at(1)
  //     .simulate("click");

  //   wrapped.update();

  //   expect(wrapped.find("FirstLoginWelcome").state().selected).toEqual(1);
  // });

  it("Should have a selected state of 3 when the type admin assistant is clicked.", () => {
    wrapped
      .find("Card")
      // This is now located at 1 because private health provider was removed for v1.
      .at(1)
      .simulate("click");

    wrapped.update();

    // I'm unsure why this is 3. I am resisting my urge to refactor because I don't know what your plans are.
    expect(wrapped.find("FirstLoginWelcome").state().selected).toEqual(3);
  });
});
