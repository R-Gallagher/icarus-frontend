import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { BrowserRouter } from "react-router-dom";
import { Empty } from "antd";

import { undecorated as Results } from "../Results";
import Root from "../../../../Root";
import IcarusRest from "../../../../api/IcarusRest";
import { UserOutlined } from "@ant-design/icons";

let wrapped;

beforeEach(() => {
  moxios.install(IcarusRest);
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
      <BrowserRouter>
        <Results location={location} />
      </BrowserRouter>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("Results", () => {
  describe("Unit", () => {});

  describe("Integration", () => {
    it("Should render the correct result details based on search paramets and result item click.", (done) => {
      moxios.wait(() => {
        let request = moxios.requests.mostRecent();

        request
          .respondWith({
            status: 200,
            response: {
              specialists: [
                {
                  user_type: 0,
                  is_verified_professional: true,
                  provider: {
                    services_not_provided: "Anything not involving time.",
                    languages: [
                      { id: 1, name: "English" },
                      { id: 2, name: "French" },
                      { id: 4, name: "Mardarin" },
                    ],
                    education_and_qualifications: "University of Toronto",
                    referral_instructions:
                      "- Send patient for blood work prior to visit. \n- For patients who are not fluent in English, please bring someone willing to translate.",
                    services_provided: "Time travel related heart surgery.",
                    specialty: { id: 3, name: "Cardiac Surgery" },
                    designations: [{ id: 1, name: "MD" }],
                    addresses: [
                      {
                        end_hour: "20:00:00",
                        address:
                          "237 Barton St E, Hamilton, ON L8L 2X2, Canada",
                        fax: "123-456-7891",
                        longitude: -79.8543243,
                        phone: "123-456-7890",
                        latitude: 43.2617528,
                        start_hour: "08:00:00",
                        is_wheelchair_accessible: true,
                        distance: "1 m",
                      },
                      {
                        end_hour: "15:25:00",
                        address:
                          "711 Concession St, Hamilton, ON L8V 5C2, Canada",
                        fax: "1",
                        longitude: -79.8449394,
                        phone: "123",
                        latitude: 43.2399717,
                        start_hour: "00:25:00",
                        is_wheelchair_accessible: true,
                        distance: "7.4 km",
                      },
                    ],
                    subspecialty_or_special_interests:
                      "Effects of time travel on the heart.",
                    consultation_wait: null,
                    procedural_wait: null,
                    research_interests: "Time travel, DeLorean repair",
                    procedural_wait_times: [],
                  },
                  uuid: "b706dc9c-a9ee-40cb-846f-048bcc4eb6ec",
                  is_initial_setup_complete: true,
                  name: "Emmett Brown",
                  email: "test@test.com",
                  profile_picture_link:
                    "https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.amazonaws.com/cf8622a8-a22c-4d28-bc7f-cd3fb8ec85ef-profile-picture.jpg",
                },
                {
                  user_type: 0,
                  is_verified_professional: true,
                  provider: {
                    services_not_provided: ".",
                    languages: [{ id: 1, name: "English" }],
                    education_and_qualifications: "University of Toronto",
                    referral_instructions: "- ......",
                    services_provided: "....",
                    specialty: { id: 3, name: "Cardiac Surgery" },
                    designations: [{ id: 1, name: "MD" }],
                    addresses: [
                      {
                        end_hour: "20:00:00",
                        address:
                          "237 Barton St E, Hamilton, ON L8L 2X2, Canada",
                        fax: "123-456-7891",
                        longitude: -79.8543243,
                        phone: "123-456-7890",
                        latitude: 43.2617528,
                        start_hour: "08:00:00",
                        is_wheelchair_accessible: true,
                        distance: "1 m",
                      },
                      {
                        end_hour: "15:25:00",
                        address:
                          "711 Concession St, Hamilton, ON L8V 5C2, Canada",
                        fax: "1",
                        longitude: -79.8449394,
                        phone: "123",
                        latitude: 43.2399717,
                        start_hour: "00:25:00",
                        is_wheelchair_accessible: true,
                        distance: "7.4 km",
                      },
                    ],
                    subspecialty_or_special_interests: "......",
                    consultation_wait: null,
                    procedural_wait: null,
                    research_interests: ".....",
                    procedural_wait_times: [],
                  },
                  uuid: "1",
                  is_initial_setup_complete: true,
                  name: "Doctor Brown",
                  email: "test@test.com",
                  profile_picture_link: null,
                },
                {
                  user_type: 0,
                  is_verified_professional: true,
                  provider: {
                    services_not_provided: ".",
                    languages: [{ id: 1, name: "English" }],
                    education_and_qualifications: "University of Toronto",
                    referral_instructions: "- ......",
                    services_provided: "....",
                    specialty: { id: 3, name: "Cardiac Surgery" },
                    designations: [{ id: 1, name: "MD" }],
                    addresses: [
                      {
                        end_hour: "20:00:00",
                        address:
                          "237 Barton St E, Hamilton, ON L8L 2X2, Canada",
                        fax: "123-456-7891",
                        longitude: -79.8543243,
                        phone: "123-456-7890",
                        latitude: 43.2617528,
                        start_hour: "08:00:00",
                        is_wheelchair_accessible: true,
                        distance: "1 m",
                      },
                      {
                        end_hour: "15:25:00",
                        address:
                          "711 Concession St, Hamilton, ON L8V 5C2, Canada",
                        fax: "1",
                        longitude: -79.8449394,
                        phone: "123",
                        latitude: 43.2399717,
                        start_hour: "00:25:00",
                        is_wheelchair_accessible: true,
                        distance: "7.4 km",
                      },
                    ],
                    subspecialty_or_special_interests: "......",
                    consultation_wait: null,
                    procedural_wait: null,
                    research_interests: ".....",
                    procedural_wait_times: [],
                  },
                  uuid: "2",
                  is_initial_setup_complete: true,
                  name: "John Watson",
                  email: "test@test.com",
                  profile_picture_link:
                    "https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.amazonaws.com/cf8622a8-a22c-4d28-bc7f-cd3fb8ec85ef-profile-picture.jpg",
                },
              ],
              specialty: { id: 3, name: "Anesthesiology" },
            },
          })
          .then(() => {
            wrapped.update();

            expect(wrapped.find("ResultDetail").contains(Empty)).toEqual(true);

            expect(
              wrapped.find("ResultList").contains("Anesthesiology")
            ).toEqual(true);

            wrapped.find("ResultItem").at(0).find("Item").simulate("click");

            expect(
              wrapped.find("ResultDetail").contains("Emmett Brown")
            ).toEqual(true);

            expect(wrapped.find("Avatar").at(0).props().src).toEqual(
              "https://icarus-storage-bucket-2473fb10-f248-4821-bfc4-89f8fe4ed1c7.s3.amazonaws.com/cf8622a8-a22c-4d28-bc7f-cd3fb8ec85ef-profile-picture.jpg"
            );

            wrapped.find("ResultItem").at(1).find("Item").simulate("click");

            expect(
              wrapped.find("ResultDetail").contains("Doctor Brown")
            ).toEqual(true);

            expect(wrapped.exists("Avatar")).toBe(true);

            wrapped.find("ResultItem").at(2).find("Item").simulate("click");

            expect(
              wrapped.find("ResultDetail").contains("John Watson")
            ).toEqual(true);

            done();
          });
      });
    });
  });
});
