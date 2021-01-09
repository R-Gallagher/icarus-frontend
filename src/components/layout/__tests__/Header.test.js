import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";

import { undecorated as Header } from "../Header";
import LoginForm from "../LoginForm";
import IcarusRest from "../../../api/IcarusRest";
import Root from "../../../Root";
import { isUserAuthenticated } from "../../../utils";
import ProfileDropdown from "../ProfileDropdown";

let wrapped, historyMock;

jest.mock("../../../utils", () => ({
  isUserAuthenticated: jest.fn(),
}));

beforeEach(() => {
  moxios.install(IcarusRest);

  historyMock = { push: jest.fn() };

  // Mock the media query needs.
  global.matchMedia = () => ({
    addListener: () => {},
    removeListener: () => {},
    matches: true,
  });
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("Header", () => {
  describe("Unit", () => {
    it("Should not contain a homepage link when initial setup is not complete.", () => {
      wrapped = mount(
        <Root>
          <BrowserRouter>
            <Header allCookies={{ isSetup: true }} />
          </BrowserRouter>
        </Root>
      );

      expect(
        wrapped.findWhere(
          node => node.name() === "Link" && node.props().to === "/"
        ).length
      ).toEqual(0);
    });
  });

  describe("Integration", () => {
    it("Should verify that all login functionality is working.", done => {
      wrapped = mount(
        <Root>
          <BrowserRouter>
            <Header
              history={historyMock}
              allCookies={{ isSetup: false }}
              forceSubMenuRender
            />
          </BrowserRouter>
        </Root>
      );

      // Verify that the login component is rendered.
      expect(wrapped.contains(LoginForm)).toEqual(true);
      // Verify that the homepage link is rendered
      expect(
        wrapped.findWhere(
          node => node.name() === "Link" && node.props().to === "/"
        ).length
      ).toEqual(1);

      // Mock input field typing.
      wrapped.find("input#login_email").simulate("change", {
        target: { value: "email@email.com" },
      });

      wrapped.find("input#login_password").simulate("change", {
        target: { value: "pass123" },
      });

      isUserAuthenticated.mockReturnValueOnce(true);

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
              user_type: 3,
              is_initial_setup_complete: true,
            },
          })
          .then(() => {
            // Update the component with the user data
            wrapped.update();

            // Verify login component is no longer rendered.
            expect(wrapped.find(LoginForm).length).toEqual(0);
            expect(wrapped.contains(ProfileDropdown)).toEqual(true);

            done();
          });
      });
    });
  });
});
