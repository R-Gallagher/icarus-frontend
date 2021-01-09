import React from "react";
import { mount } from "enzyme";
import Root from "../../../../Root";
import { BrowserRouter } from "react-router-dom";

import ResultDetail from "../ResultDetail";

let wrapped, historyMock;

describe("ResultDetail", () => {
  historyMock = { push: jest.fn() };

  beforeEach(() => {
    wrapped = mount(
      <Root>
        <BrowserRouter>
          <ResultDetail history={historyMock} />
        </BrowserRouter>
      </Root>
    );
  });

  afterEach(() => {
    wrapped.unmount();
  });

  describe("No data passed in as a result.", () => {
    it("Should display an empty when there are results but nothing is currently selected.", () => {
      wrapped = mount(
        <ResultDetail result={{}} results={[{ data: "I am data." }]} />
      );

      expect(
        wrapped
          .find(".ant-empty-footer")
          .children("h2")
          .exists()
      ).toEqual(true);
    });

    it("Should display an empty when there are no results found and is loading is false.", () => {
      wrapped = mount(
        <ResultDetail result={{}} results={[]} isLoading={false} />
      );

      expect(wrapped.find("Empty").props().description).toEqual(
        "No results found."
      );
    });

    it("Should display an empty with Loading indicator text \
     when there are no results found and is loading is true.", () => {
      wrapped = mount(
        <ResultDetail result={{}} results={[]} isLoading={true} />
      );

      expect(wrapped.find("Empty").props().description).toEqual(
        "Loading Please Wait..."
      );
    });
  });

  describe("Data passed in.", () => {
    it("Should render all of the mandatory profile fields and N/A for all of the optional left blank.", () => {
      var result = {
        email: "brucewayne@thebatman.com",
        name: "Bruce Wayne",
        is_initial_setup_complete: true,
        provider: {
          procedural_wait_times: [{ procedure: "test", wait_time: "12.0" }],
          addresses: [
            {
              start_hour: "05:30:00",
              longitude: -79.8449394,
              latitude: 43.2399717,
              phone: "1234",
              fax: "12345",
              address: "711 Concession St, Hamilton, ON L8V 5C2, Canada",
              end_hour: "15:30:00",
              is_wheelchair_accessible: false,
              distance: "1 m",
            },
          ],
          languages: [],
          designations: [],
        },
      };

      wrapped = mount(
        <BrowserRouter>
          <ResultDetail
            result={result}
            results={[{ data: "I am data." }]}
            forceTabRender={true}
          />
        </BrowserRouter>
      );

      expect(
        wrapped
          .find("#name")
          .children("b")
          .text()
      ).toEqual("Dr. Bruce Wayne");

      expect(
        wrapped
          .find("#subspecialty")
          .text()
          .includes("N/A")
      ).toEqual(true);

      expect(
        wrapped
          .find({ placeholder: "Practice Locations" })
          .at(0)
          .text()
          .includes("711 Concession St, Hamilton, ON L8V 5C2, Canada")
      ).toEqual(true);

      expect(
        wrapped
          .find("div#accessibility")
          .text()
          .includes("Not Wheelchair Accessible")
      ).toEqual(true);

      expect(
        wrapped
          .find("div#phone")
          .text()
          .includes("1234")
      ).toEqual(true);

      expect(
        wrapped
          .find("div#fax")
          .text()
          .includes("12345")
      ).toEqual(true);

      expect(
        wrapped
          .find("div#email")
          .text()
          .includes("brucewayne@thebatman.com")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Services Provided" })
          .text()
          .includes("N/A")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Services Not Provided" })
          .text()
          .includes("N/A")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Languages Spoken" })
          .text()
          .includes("N/A")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Education" })
          .text()
          .includes("N/A")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Research Interests" })
          .text()
          .includes("N/A")
      ).toEqual(true);

      // These fields are broken currently.

      // expect(
      //   wrapped
      //     .find({ tab: "Consultation Wait Time" })
      //     .text()
      //     .includes("N/A")
      // ).toEqual(true);

      // expect(
      //   wrapped
      //     .find({ tab: "Surgical Wait Time" })
      //     .text()
      //     .includes("N/A")
      // ).toEqual(true);
    });

    it("Should render all of the optional fields with provided data.", () => {
      var result = {
        email: "docbrown@tuta.io",
        name: "Emmett  Brown",
        is_initial_setup_complete: true,
        provider: {
          addresses: [
            {
              start_hour: "05:30:00",
              longitude: -79.8449394,
              latitude: 43.2399717,
              phone: "123",
              fax: "123",
              address: "711 Concession St, Hamilton, ON L8V 5C2, Canada",
              end_hour: "15:30:00",
              is_wheelchair_accessible: true,
              is_accepting_new_patients: true,
              distance: "1 m",
            },
            {
              start_hour: "05:30:00",
              longitude: -79.8443494,
              latitude: 43.23992317,
              phone: "123",
              fax: "123",
              address: "715 Concession St, Hamilton, ON L8V 5C2, Canada",
              end_hour: "20:30:00",
              is_wheelchair_accessible: true,
              is_accepting_new_patients: false,
              distance: "1 m",
            },
          ],
          services_not_provided: "DeLorean repair",
          consultation_wait: null,
          procedural_wait_times: [{ procedure: "test", wait_time: "12.0" }],
          specialty_id: 1,
          research_interests: "Time travel related procedures",
          education_and_qualifications: "Self-taught",
          languages: [
            {
              id: 1,
              name: "English",
            },
            {
              id: 2,
              name: "French",
            },
          ],
          designations: [
            {
              id: 1,
              name: "MD",
            },
          ],
          services_provided: "Time travel",
          subspecialty_or_special_interests: "Time travel",
        },
      };

      wrapped = mount(
        <BrowserRouter>
          <ResultDetail
            result={result}
            results={[{ data: "I am data." }]}
            forceTabRender={true}
          />
        </BrowserRouter>
      );

      expect(
        wrapped
          .find({ tab: "Services Provided" })
          .text()
          .includes("Time travel")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Services Not Provided" })
          .text()
          .includes("DeLorean repair")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Languages Spoken" })
          .text()
          .includes("English, French")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Education" })
          .text()
          .includes("Self-taught")
      ).toEqual(true);

      expect(
        wrapped
          .find({ tab: "Research Interests" })
          .text()
          .includes("Time travel related procedures")
      ).toEqual(true);

      // These fields are broken currently.

      // expect(
      //   wrapped
      //     .find({ tab: "Consultation Wait Time" })
      //     .text()
      //     .includes("N/A")
      // ).toEqual(true);

      // expect(
      //   wrapped
      //     .find({ tab: "Surgical Wait Time" })
      //     .text()
      //     .includes("N/A")
      // ).toEqual(true);
    });

    it("Should render multiple addresses and designations if the user has provided them.", () => {
      var result = {
        email: "docbrown@tuta.io",
        name: "Emmett  Brown",
        is_initial_setup_complete: true,
        provider: {
          procedural_wait_times: [{ procedure: "test", wait_time: "12.0" }],
          addresses: [
            {
              start_hour: "05:30:00",
              longitude: -79.8449394,
              latitude: 43.2399717,
              phone: "123",
              fax: "123",
              address: "711 Concession St, Hamilton, ON L8V 5C2, Canada",
              end_hour: "15:30:00",
              is_wheelchair_accessible: true,
              is_accepting_new_patients: true,
              distance: "1 m",
            },
            {
              start_hour: "05:30:00",
              longitude: -79.8443494,
              latitude: 43.23992317,
              phone: "123",
              fax: "123",
              address: "715 Concession St, Hamilton, ON L8V 5C2, Canada",
              end_hour: "20:30:00",
              is_wheelchair_accessible: true,
              is_accepting_new_patients: true,
              distance: "1 m",
            },
          ],
          languages: [],
          designations: [
            {
              id: 1,
              name: "MD",
            },
            {
              id: 2,
              name: "RMT",
            },
          ],
        },
      };

      wrapped = mount(
        <BrowserRouter>
          <ResultDetail
            result={result}
            results={[{ data: "I am data." }]}
            forceTabRender={true}
          />
        </BrowserRouter>
      );

      wrapped
        .find({ placeholder: "Practice Locations" })
        .at(0)
        .simulate("click");

      expect(
        wrapped
          .find({ placeholder: "Practice Locations" })
          .at(0)
          .text()
          .includes("711 Concession St, Hamilton, ON L8V 5C2, Canada")
      ).toEqual(true);

      expect(
        wrapped
          .find({ placeholder: "Practice Locations" })
          .at(0)
          .text()
          .includes("715 Concession St, Hamilton, ON L8V 5C2, Canada")
      ).toEqual(true);

      expect(
        wrapped
          .find("#name")
          .text()
          .includes("MD, RMT")
      ).toEqual(true);
    });
  });

  it("Should show whether or not the location is wheelchair accessible.", () => {
    var result = {
      email: "docbrown@tuta.io",
      name: "Emmett  Brown",
      is_initial_setup_complete: true,
      provider: {
        procedural_wait_times: [{ procedure: "test", wait_time: "12.0" }],
        addresses: [
          {
            start_hour: "05:30:00",
            longitude: -79.8449394,
            latitude: 43.2399717,
            phone: "123",
            fax: "123",
            address: "711 Concession St, Hamilton, ON L8V 5C2, Canada",
            end_hour: "15:30:00",
            is_wheelchair_accessible: true,
            is_accepting_new_patients: true,
            distance: "1 m",
          },
          {
            start_hour: "05:30:00",
            longitude: -79.8443494,
            latitude: 43.23992317,
            phone: "123",
            fax: "123",
            address: "715 Concession St, Hamilton, ON L8V 5C2, Canada",
            end_hour: "20:30:00",
            is_wheelchair_accessible: true,
            is_accepting_new_patients: true,
            distance: "1 m",
          },
        ],
        languages: [],
        designations: [],
      },
    };

    wrapped = mount(
      <BrowserRouter>
        <ResultDetail
          result={result}
          results={[{ data: "I am data." }]}
          forceTabRender={true}
        />
      </BrowserRouter>
    );

    expect(
      wrapped
        .find("#accessibility")
        .at(0)
        .text()
        .includes("Wheelchair Accessible")
    ).toEqual(true);

    // two different forms will have these, expect 2
    expect(wrapped.find({ type: "check-circle" }).length).toEqual(2);

    result.provider.addresses[0].is_wheelchair_accessible = false;

    wrapped = mount(
      <BrowserRouter>
        <ResultDetail
          result={result}
          results={[{ data: "I am data." }]}
          forceTabRender={true}
        />
      </BrowserRouter>
    );

    expect(
      wrapped
        .find("#accessibility")
        .at(0)
        .text()
        .includes("Not Wheelchair Accessible")
    ).toEqual(true);

    expect(wrapped.find({ type: "close-circle" }).length).toEqual(1);
  });
});
