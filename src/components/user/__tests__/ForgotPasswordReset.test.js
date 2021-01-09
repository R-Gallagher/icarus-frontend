import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";

import { undecorated as ForgotPasswordReset } from "../ForgotPasswordReset";
import IcarusRest from "../../../api/IcarusRest";
import Root from "../../../Root";

let wrapped, forgotPasswordResetForm, historyMock;

beforeEach(() => {
  moxios.install(IcarusRest);

  historyMock = { push: jest.fn() };
  const match = {
    params: { resetToken: "RESET_TOKEN" },
  };

  wrapped = mount(
    <Root>
      <BrowserRouter>
        <ForgotPasswordReset history={historyMock} match={match} />
      </BrowserRouter>
    </Root>
  );

  // Retrieve the form from the ForgotPasswordReset component
  ({ form: forgotPasswordResetForm } = wrapped
    .find("ForgotPasswordReset")
    .props());
});

afterEach(() => {
  moxios.uninstall(IcarusRest);
  wrapped.unmount();
});

describe("ForgotPasswordReset", () => {
  describe("Test input validation", () => {
    // The user should receive an error if they do not provide a new password
    it("Should tell the user they must input a new password.", () => {
      // Input a confirmation password but no new password
      wrapped.find("input#confirm").simulate("change", {
        target: { value: "testabc123" },
      });

      // Expect errors on form validation.
      forgotPasswordResetForm.validateFields(["password"], (errors, values) => {
        expect(errors).toBeDefined();
        expect(errors).not.toBeNull();
      });
    });

    // The user should recieve an error if they do not provide a password confirmation.
    it("Should tell the user they must confirm their password.", () => {
      // Input a new password but no confirmation password
      wrapped.find("input#password").simulate("change", {
        target: { value: "testabc123" },
      });

      // Expect errors on form validation.
      forgotPasswordResetForm.validateFields(["confirm"], (errors, values) => {
        expect(errors).toBeDefined();
        expect(errors).not.toBeNull();
      });
    });

    // The user should recieve an error if the password inputs they provide do not match.
    it("Should tell the user their passwords do not match.", () => {
      // Input a different password from the confirmation
      wrapped.find("input#password").simulate("change", {
        target: { value: "testabc123" },
      });

      // Input a different password from the new password
      wrapped.find("input#confirm").simulate("change", {
        target: { value: "testabc123456" },
      });

      // Expect errors on form validation.
      forgotPasswordResetForm.validateFields(
        ["password", "confirm"],
        (errors, values) => {
          expect(errors).toBeDefined();
          expect(errors).not.toBeNull();
        }
      );
    });

    // The user should recieve errors if neither inputs are provided.
    it("Should throw errors if neither input are provided.", () => {
      wrapped.find("Button").simulate("click");

      // Expect errors on form validation.
      forgotPasswordResetForm.validateFields(
        ["password", "confirm"],
        (errors, values) => {
          expect(errors).toBeDefined();
          expect(errors).not.toBeNull();
        }
      );
    });

    it("Should redirect to the home page if password reset was successful.", done => {
      wrapped.find("input#password").simulate("change", {
        target: { value: "123" },
      });

      wrapped.find("input#confirm").simulate("change", {
        target: { value: "123" },
      });

      wrapped.find("button").simulate("click");

      moxios.wait(() => {
        // fetch the request that was just stubbed
        let request = moxios.requests.mostRecent();

        // Tell moxios to respond with the successful login response
        request
          .respondWith({
            status: 200,
            response: {
              message: "Password reset successful!",
            },
          })
          .then(() => {
            // Update the component with the user data
            wrapped.update();

            expect(historyMock.push.mock.calls[0][0]).toEqual("/");

            done();
          });
      });
    });
  });
});
