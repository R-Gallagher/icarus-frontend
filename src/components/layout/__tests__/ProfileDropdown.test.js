import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";

import { undecorated as ProfileDropdown } from "../ProfileDropdown";
import Root from "../../../Root";
import IcarusRest from "../../../api/IcarusRest";

let wrapped, response, historyMock;

beforeEach(() => {
  moxios.install(IcarusRest);
});

// After each test uninstall moxios.
afterEach(() => {
  wrapped.unmount();
  moxios.uninstall(IcarusRest);
});

describe("ProfileDropdown", () => {
  describe("With user setup complete", () => {
    beforeEach(() => {
      historyMock = { push: jest.fn() };

      // We pass forceSubMenuRender because we were unable to render using mouseEnter or by setting props to the child component.
      wrapped = mount(
        <Root>
          <BrowserRouter>
            <ProfileDropdown
              forceSubMenuRender
              allCookies={{ isSetup: "false" }}
              history={historyMock}
            />
          </BrowserRouter>
        </Root>
      );
    });

    describe("With Profile image", () => {
      // Before each profile image set test, create a response for moxios to mimic a successful login.
      beforeEach(() => {
        response = {
          email: "brucewayne@thebatman.com",
          name: "Bruce Wayne",
          profile_picture:
            "https://images.forbes.com/media/lists/fictional/2011/bruce-wayne_197x282.jpg",
        };
      });

      it("Should redirect the user back to the homepage on logout click.", done => {
        wrapped
          .find({ className: "logout" })
          .at(0)
          .simulate("click");

        moxios.wait(() => {
          let request = moxios.requests.mostRecent();

          // Tell moxios to respond with the successful login response
          request
            .respondWith({
              status: 200,
              response: {
                message: "Successfully logged out.",
              },
            })
            .then(() => {
              // Expect the redirect to send the user to the dashboard.
              expect(historyMock.push.mock.calls[0][0]).toEqual("/");

              done();
            });
        });
      });

      // Verify that the user's profile image is rendered in the menu
      it("Should verify profile image is displayed if set.", done => {
        // Wait until moxios stubs the request
        moxios.wait(() => {
          // fetch the request that was just stubbed
          let request = moxios.requests.mostRecent();

          // Tell moxios to respond with the successful login response
          request
            .respondWith({
              status: 200,
              response: response,
            })
            .then(() => {
              // Update the component with the user data
              wrapped.update();

              // Find the img and confirm that it's src is correctly set.
              expect(wrapped.find("img").prop("src")).toEqual(
                "https://images.forbes.com/media/lists/fictional/2011/bruce-wayne_197x282.jpg"
              );

              // Complete the test and unmount the component
              done();
            });
        });
      });
    });

    describe("Without Profile Image set", () => {
      // Before each profile image not set test, create a response for moxios to mimic a successful login that has no profile image set.
      beforeEach(() => {
        response = {
          email: "brucewayne@thebatman.com",
          name: "Bruce Wayne",
          profile_picture: null,
        };
      });

      // Verify that the default user icon is displayed
      it("Should verify user icon avatar is set if there is no profile picture", done => {
        // Wait until moxios stubs the request
        moxios.wait(() => {
          // fetch the request that was just stubbed
          let request = moxios.requests.mostRecent();

          // Tell moxios to respond with the successful login response
          request
            .respondWith({
              status: 200,
              response: response,
            })
            .then(() => {
              // Update the component with the user data
              wrapped.update();

              // Find the icon with type of user
              expect(wrapped.find({ type: "user" }).length).toEqual(1);

              // Complete the test and unmount the component
              done();
            });
        });
      });
    });
  });

  describe("Without user setup complete", () => {
    beforeEach(() => {
      moxios.install(IcarusRest);

      // We pass forceSubMenuRender because we were unable to render using mouseEnter or by setting props to the child component.
      wrapped = mount(
        <Root>
          <BrowserRouter>
            <ProfileDropdown
              forceSubMenuRender
              allCookies={{ isSetup: "true" }}
            />
          </BrowserRouter>
        </Root>
      );
    });

    it("Verify that menu items are disabled if the user's profile setup is not complete", done => {
      // Wait until moxios stubs the request
      moxios.wait(() => {
        // fetch the request that was just stubbed
        let request = moxios.requests.mostRecent();

        // Tell moxios to respond with the successful logged in as response
        request
          .respondWith({
            status: 200,
            response: response,
          })
          .then(() => {
            // Update the component with the user data
            wrapped.update();

            // Find all of the menu items that are disabled when the user has not completed their setup.
            expect(
              wrapped
                .findWhere(
                  node =>
                    node.name() === "Connect(MenuItem)" &&
                    node.props().disabled === true
                )
                .children().length
            ).toEqual(4);

            // Complete the test, remove the cookie and unmount the component
            done();
          });
      });
    });
  });
});
