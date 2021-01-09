import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import ApiResourceSelect from "../ApiResourceSelect";
import Root from "../../../Root";
import IcarusRest from "../../../api/IcarusRest";
import { fetchDesignations, fetchLanguages } from "../../../actions";

let wrapped;

beforeEach(() => {
  moxios.install(IcarusRest);
});

afterEach(() => {
  wrapped.unmount();
  moxios.uninstall(IcarusRest);
});

describe("ApiResourceSelect", () => {
  it("Should render the correct data when one of the props is passed in.", done => {
    wrapped = mount(
      <Root>
        <ApiResourceSelect
          resourceActionCreator={fetchLanguages}
          placeholder="Select Languages"
          resourceReducerName="languagesReducer"
          resourceName="languages"
        />
      </Root>
    );

    moxios.wait(() => {
      // fetch the request that was just stubbed
      let request = moxios.requests.mostRecent();

      let languages = [
        {
          name: "Test 1",
          id: 1,
        },
        {
          name: "Test 2",
          id: 2,
        },
        {
          name: "Test 3",
          id: 3,
        },
      ];

      // Respond with two addresses that should be preloaded into the select.
      request
        .respondWith({
          status: 200,
          response: {
            languages,
          },
        })
        .then(() => {
          wrapped
            .find({ placeholder: "Select Languages" })
            .at(0)
            .simulate("click");

          wrapped.update();

          expect(wrapped.find("MenuItem").length).toEqual(3);
          wrapped.find("MenuItem").forEach((node, index) => {
            expect(node.props().value).toEqual(languages[index].id);
            expect(node.text()).toEqual(languages[index].name);
          });

          done();
        });
    });
  });
});
