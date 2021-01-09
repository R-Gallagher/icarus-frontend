import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { BrowserRouter } from "react-router-dom";

import requireCsrf from "../requireCsrf";
import Root from "../../../Root";
import IcarusRest from "../../../api/IcarusRest";

let wrapped;

beforeEach(() => {
  moxios.install(IcarusRest);

  let TestComponent = () => <div>Test</div>;
  let ComponentRendered = requireCsrf(TestComponent, true);

  wrapped = mount(
    <Root>
      <BrowserRouter>
        <ComponentRendered />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("requireCsrf", () => {
  it("Should ensure that a CSRF token is successfully set.", done => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      let responseToken = "1234";

      request
        .respondWith({
          status: 200,
          response: {
            xs: responseToken,
          },
        })
        .then(() => {
          wrapped.update();

          // Ensure that the child component is rendered without a modal.
          expect(wrapped.find("TestComponent").length).toEqual(1);
          expect(wrapped.find("Modal").length).toEqual(0);

          // Ensure that the CSRF token is present.
          expect(localStorage.getItem("xs")).toEqual(responseToken);

          done();
        });
    });
  });

  it("Should ensure that on CSRF failure the user is notified and a new token is requested.", done => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      request
        .respondWith({
          status: 400,
          response: { message: "The CSRF token has expired." },
        })
        .then(() => {
          wrapped.update();

          done();
        });
    });
  });
});
