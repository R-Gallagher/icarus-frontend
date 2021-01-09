import React from "react";
import { mount } from "enzyme";

import { undecorated as SearchBar } from "../SearchBar";
import Root from "../../../Root";

let wrapped, searchForm, historyMock;

afterEach(() => {
  wrapped.unmount();
});

describe("SearchBar", () => {
  describe("Form tests.", () => {
    beforeEach(() => {
      historyMock = { push: jest.fn() };

      wrapped = mount(
        <Root>
          <SearchBar history={historyMock} />
        </Root>
      );

      ({ form: searchForm } = wrapped.find("SearchBar").props());
    });

    it.each([["specialty_id"], ["place"], ["sort_by"], ["radius"]])(
      "Should trigger required validation for form fields.",
      formField => {
        // Trigger validation for the form.
        searchForm.validateFields([formField], (errors, values) => {
          // If errors is defined and not null the validation blocked the user from submitting a bad form.
          expect(errors).toBeDefined();
          expect(errors).not.toBeNull();
        });
      }
    );

    it("Should redirect to the results page with submitted results in URL params.", () => {
      let [specialty_id, place, radius, sort_by] = [
        0,
        {
          location: { lat: 10.5, lon: 10.5 },
          address: "Test address",
        },
        0,
        0,
      ];
      searchForm.setFieldsValue({ specialty_id });

      searchForm.setFieldsValue({
        place,
      });

      searchForm.setFieldsValue({
        radius,
      });

      searchForm.setFieldsValue({
        sort_by,
      });

      wrapped.find("form").simulate("submit");

      wrapped.update();

      const { address } = place;
      const { lat, lon } = place.location;

      var testParams = new URLSearchParams({
        specialty_id,
        address,
        lat,
        lon,
        radius,
        sort_by,
      }).toString();

      expect(historyMock.push.mock.calls[0][0].pathname).toEqual("/results");

      expect(
        historyMock.push.mock.calls[0][0].search.includes(testParams)
      ).toEqual(true);
    });
  });

  describe("Inline/Results tests.", () => {
    beforeEach(() => {
      // Example URL string that would be passed into the search component.
      const location = {
        hash: "",
        key: "",
        pathname: "/results",
        search:
          "?specialty_id=3&address=711+Concession+St%2C+Hamilton%2C+ON+L8V+1C3%2C+Canada&lat=43.23997170000001&lon=-79.84493939999999&radius=50000&sort_by=dist&insurance_ids=false",
      };

      wrapped = mount(
        <Root>
          <SearchBar isResult={true} location={location} />
        </Root>
      );
    });

    it("Should render inline if it is a result.", () => {
      expect(wrapped.find("Form").props().layout).toEqual("inline");

      // Inline forms currently only contain two rows.
      expect(wrapped.find("form").children("Row").length).toEqual(2);

      // Search the first row for the FormItems.
      let firstRow = wrapped
        .find("form")
        .children("Row")
        .at(0);

      expect(firstRow.find("FormItem").length).toEqual(5);

      // Search the second row for the AdvancedSearchBar.
      let secondRow = wrapped
        .find("form")
        .children("Row")
        .at(1);

      expect(secondRow.exists("AdvancedSearchBar")).toEqual(true);
    });

    it("Should verify that all fields are filled in when being displayed on the results page.", () => {
      // Verify that the specialty dropdown has the correct specialty.
      expect(wrapped.find("ApiResourceSelect").props().value).toEqual("3");

      // Verify that the address has the correct address.
      expect(wrapped.find("GMapsInput").props().value.address).toEqual(
        "711 Concession St, Hamilton, ON L8V 1C3, Canada"
      );

      // Verify that the radius dropdown has the correct value.
      expect(
        wrapped
          .find("Select#radius")
          .at(0)
          .props().value
      ).toEqual("50000");

      // Verify that the sort by dropdown has the correct value.
      expect(
        wrapped
          .find("Select#sort_by")
          .at(0)
          .props().value
      ).toEqual("dist");
    });
  });

  describe("Horizontal tests.", () => {
    beforeEach(() => {
      wrapped = mount(
        <Root>
          <SearchBar isResult={false} />
        </Root>
      );
    });

    it("Should render vertical if it is not a result.", () => {
      expect(wrapped.find("Form").props().layout).toEqual("vertical");

      // Vertical form should have a single form with all FormItems & AdvancedSearchBar inside it.
      expect(wrapped.find("form").children("FormItem").length).toEqual(5);
      expect(wrapped.find("form").exists("AdvancedSearchBar")).toEqual(true);
    });
  });
});
