import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import IcarusRest from "../../../../api/IcarusRest";
import { undecorated as RegisterConfirm } from "../RegisterConfirm";
import Root from "../../../../Root";

let wrapped, historyMock, confirmForm;

beforeEach(() => {
  moxios.install(IcarusRest);

  historyMock = { push: jest.fn() };

  wrapped = mount(
    <Root>
      <RegisterConfirm history={historyMock} />
    </Root>
  );

  ({ form: confirmForm } = wrapped.find("RegisterConfirm").props());
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall(IcarusRest);
});

describe("RegisterConfirm", () => {
  it("Should render the RegisterConfirm component.", () => {
    expect(wrapped.find(RegisterConfirm).length).toEqual(1);
  });

  it("Should verify all form validation is present.", () => {
    confirmForm.validateFields(["confirmation_code"], (errors, values) => {
      expect(errors).toBeDefined();
      expect(errors).not.toBeNull();
    });
  });

  it("Should redirect to the first login after successful confirmation.", done => {
    wrapped.find("input#confirmation_code").simulate("change", {
      target: { value: "1234" },
    });

    wrapped.find("form").simulate("submit");

    wrapped.update();

    moxios.wait(() => {
      let request = moxios.requests.mostRecent();

      // Tell moxios to respond with the successful confirmation response
      request
        .respondWith({
          status: 200,
          response: {
            message: "Confirmation successful!",
            is_initial_setup_complete: false,
          },
        })
        .then(() => {
          wrapped.update();

          expect(historyMock.push.mock.calls[0][0].pathname).toEqual(
            "/first_login"
          );

          done();
        });
    });
  });
});
