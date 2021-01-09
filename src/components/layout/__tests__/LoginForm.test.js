import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";
import Cookies from "universal-cookie";

import { undecorated as LoginForm } from "../LoginForm";
import Root from "../../../Root";
import { wrapWithForm } from "../../../utils";
import IcarusRest from "../../../api/IcarusRest";

let wrapped, loginForm, historyMock;

beforeEach(() => {
  moxios.install(IcarusRest);

  const Form = wrapWithForm(LoginForm);
  historyMock = { push: jest.fn() };

  wrapped = mount(
    <Root>
      <BrowserRouter>
        <Form history={historyMock} />
      </BrowserRouter>
    </Root>
  );

  // Destructure the form into an existing variable.
  ({ form: loginForm } = wrapped.find(LoginForm).props());
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("LoginForm", () => {
  it("Should trigger Email field is Required validation.", () => {
    wrapped.find("input#test_password").simulate("change", {
      target: { value: "1234" },
    });

    // Trigger validation for the form.
    loginForm.validateFields(["email"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should trigger Password Required validation.", () => {
    wrapped.find("input#test_email").simulate("change", {
      target: { value: "test@test.com" },
    });

    // Trigger validation for the form.
    loginForm.validateFields(["password"], (errors, values) => {
      // If errors is defined the validation blocked the user from submitting a bad form.
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should redirect to dashboard if the user is an admin assistant.", done => {
    // Mock input field typing.
    wrapped.find("input#test_email").simulate("change", {
      target: { value: "test@test.com" },
    });

    wrapped.find("input#test_password").simulate("change", {
      target: { value: "1234" },
    });

    // Mock form submit.
    wrapped.find("form").simulate("submit");
    wrapped.update();

    // Force the get method called in the component to return the value 3.
    Cookies.prototype.get = jest.fn().mockReturnValueOnce("3");

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful login response
      request
        .respondWith({
          status: 200,
          response: {
            message: "User Login successful!",
            u: "1234",
            user_type: 3,
            is_initial_setup_complete: true,
            is_confirmed: true,
          },
        })
        .then(() => {
          // Expect the redirect to send the user to the dashboard.
          expect(historyMock.push.mock.calls[0][0]).toEqual("/dashboard");

          done();
        });
    });
  });

  it("Should redirect to dashboard if the user is not an admin assistant. (Ancillary/physician)", done => {
    // Mock input field typing.
    wrapped.find("input#test_email").simulate("change", {
      target: { value: "test@test.com" },
    });

    wrapped.find("input#test_password").simulate("change", {
      target: { value: "1234" },
    });

    // Mock form submit.
    wrapped.find("form").simulate("submit");
    wrapped.update();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful login response
      request
        .respondWith({
          status: 200,
          response: {
            message: "User Login successful!",
            u: "1234",
            user_type: 1,
            is_initial_setup_complete: true,
            is_confirmed: true,
          },
        })
        .then(() => {
          // Expect the redirect to send the user to the dashboard.
          expect(historyMock.push.mock.calls[0][0]).toEqual("/search");

          done();
        });
    });
  });
});
