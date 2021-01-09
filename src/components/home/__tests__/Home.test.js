import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";
import { ThemeProvider } from "styled-components";

import IcarusRest from "../../../api/IcarusRest";
import { undecorated as Home } from "../Home";
import RegistrationForm from "../Sections/RegistrationForm";
import Root from "../../../Root";
import { theme } from "../../../styles/Theme";

let wrapped, historyMock, registerForm;

// Before each test, install moxios and mount the home component
beforeEach(() => {
  moxios.install(IcarusRest);

  historyMock = { push: jest.fn() };

  wrapped = mount(
    <Root>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Home history={historyMock} />
        </ThemeProvider>
      </BrowserRouter>
    </Root>
  );

  ({ form: registerForm } = wrapped.find("Home").props());
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall(IcarusRest);
});

describe("RegistrationForm", () => {
  it("Should ensure all form validation is present.", () => {
    expect(wrapped.contains(RegistrationForm)).toEqual(true);

    registerForm.validateFields(["first_name"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });

    registerForm.validateFields(["last_name"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });

    registerForm.validateFields(["email"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });

    registerForm.validateFields(["password"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });

    registerForm.validateFields(["confirm"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should push to the correct end point after successful registration.", (done) => {
    expect(wrapped.contains(RegistrationForm)).toEqual(true);

    wrapped.find("input#home_first_name").simulate("change", {
      target: { value: "Marty" },
    });
    wrapped.find("input#home_last_name").simulate("change", {
      target: { value: "McFly" },
    });
    wrapped.find("input#home_email").simulate("change", {
      target: { value: "test@test.ca" },
    });
    wrapped.find("input#home_password").simulate("change", {
      target: { value: "abc" },
    });
    wrapped.find("input#home_confirm").simulate("change", {
      target: { value: "abc" },
    });

    wrapped.find("form").simulate("submit");

    wrapped.update();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful registration response
      request
        .respondWith({
          status: 200,
          response: {
            message:
              "Account created successfully, a confirmation email is on its way!",
            u: "1234",
            first_login: true,
          },
        })
        .then(() => {
          wrapped.update();

          expect(historyMock.push.mock.calls[0][0].pathname).toEqual(
            "/registration_confirmation"
          );

          done();
        });
    });
  });
});
