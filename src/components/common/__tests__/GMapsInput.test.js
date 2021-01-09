import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";

import GMapsInput from "../GMapsInput";
import IcarusRest from "../../../api/IcarusRest";
import Root from "../../../Root";

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

describe("GMapsInput", () => {
  it("Should show user locations.", (done) => {
    moxios.install(IcarusRest);

    wrapped = mount(
      <Root>
        <GMapsInput showUserLocations />
      </Root>
    );

    moxios.wait(() => {
      // fetch the request that was just stubbed
      let request = moxios.requests.mostRecent();

      // Respond with two addresses that should be preloaded into the select.
      request
        .respondWith({
          status: 200,
          response: {
            provider: {
              addresses: [
                {
                  address: "237 Barton St E, Hamilton, ON L8L 2X2, Canada",
                },
                {
                  address: "711 Concession St, Hamilton, ON L8V 1C3, Canada",
                },
              ],
            },
          },
        })
        .then(() => {
          wrapped.update();

          // Simulate a click into the GMapsInput
          wrapped
            .find({ placeholder: "Search Locations" })
            .at(0)
            .simulate("click");

          // Verify that the first address is present
          console.log(wrapped.debug());
          expect(
            wrapped.find({ placeholder: "Search Locations" }).at(0).text()
          ).toEqual(true);

          // Verify that the second address is present
          expect(
            wrapped
              .find({ placeholder: "Search Locations" })
              .at(0)
              .text()
              .includes("711 Concession St, Hamilton, ON L8V 1C3, Canada")
          ).toEqual(true);
          done();
        });
    });

    moxios.uninstall(IcarusRest);
  });

  it("Should display an initial value", () => {
    wrapped = mount(
      <Root>
        <GMapsInput
          value={{
            address: "711 Concession St, Hamilton, ON L8V 1C3, Canada",
            location: {
              lat: 0,
              lon: 1,
            },
          }}
        />
      </Root>
    );

    // Verify that the inital value is present and set.
    expect(wrapped.find("Select").at(0).props().value).toEqual(
      "711 Concession St, Hamilton, ON L8V 1C3, Canada"
    );
  });
});
