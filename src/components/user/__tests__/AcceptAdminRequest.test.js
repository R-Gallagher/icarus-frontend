import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import moxios from "moxios";
import { ThemeProvider } from "styled-components";

import { undecorated as AcceptAdminRequest } from "../AcceptAdminRequest";
import Root from "../../../Root";
import IcarusRest from "../../../api/IcarusRest";
import { theme } from "../../../styles/Theme";

let wrapped, historyMock;

// Before each test, install moxios and mount the profile dropdown component
beforeEach(() => {
  moxios.install(IcarusRest);

  historyMock = { push: jest.fn() };
  const match = {
    params: {
      acceptToken: "ACCEPT_TOKEN",
      adminUuid: "ADMIN_UUID",
      adminName: "Bruce Wayne",
    },
  };

  wrapped = mount(
    <Root>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AcceptAdminRequest history={historyMock} match={match} />
        </BrowserRouter>
      </ThemeProvider>
    </Root>
  );
});

// After each test uninstall moxios.
afterEach(() => {
  moxios.uninstall(IcarusRest);
});

describe("AcceptAdminRequest", () => {
  it("Should verify that on successful acceptance request the user is redirected to the homepage.", done => {
    // Click the accept admin request button.
    wrapped
      .find("Icon")
      .at(0)
      .simulate("click");

    moxios.wait(() => {
      // fetch the request that was just stubbed
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful login response
      request
        .respondWith({
          status: 200,
          response: {
            message: "Profile updated successfully!",
          },
        })
        .then(() => {
          // Update the component with the user data
          wrapped.update();

          expect(historyMock.push.mock.calls[0][0]).toEqual("/");

          done();
          wrapped.unmount();
        });
    });
  });

  it("Should verify that on successful denial the user is redirected to the homepage.", done => {
    // Click the reject admin request button.
    wrapped
      .find("Icon")
      .at(1)
      .simulate("click");

    moxios.wait(() => {
      // fetch the request that was just stubbed
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful login response
      request
        .respondWith({
          status: 201,
          response: {
            message: "Request has been rejected succcessfully!",
          },
        })
        .then(() => {
          // Update the component with the user data
          wrapped.update();

          expect(historyMock.push.mock.calls[0][0]).toEqual("/");

          done();
          wrapped.unmount();
        });
    });
  });
});
