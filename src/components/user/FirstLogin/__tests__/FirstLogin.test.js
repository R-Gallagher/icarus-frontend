import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Cookies from "universal-cookie";
import moment from "moment";

import { undecorated as FirstLogin } from "../FirstLogin";
import FirstLoginWelcome from "../FirstLoginWelcome";
import FirstLoginVerify from "../FirstLoginVerify";
import FirstLoginFinish from "../FirstLoginFinish";
import Root from "../../../../Root";
import { theme } from "../../../../styles/Theme";
import IcarusRest from "../../../../api/IcarusRest";

let wrapped;

beforeEach(() => {
  moxios.install(IcarusRest);

  wrapped = mount(
    <Root>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <FirstLogin current_user={{ name: "Johnny Bravo" }} />
        </BrowserRouter>
      </ThemeProvider>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("FirstLogin", () => {
  describe("Unit", () => {
    it("Should render the users name in the header.", () => {
      expect(wrapped.text().includes("Johnny Bravo")).toEqual(true);
    });
  });

  describe("Integration", () => {
    // Loop through different user types for the same test, helps reduce boilerplate.
    it.each([["0"] /*, ["1"]*/, ["2"], ["3"]])(
      "Should properly render first login based on user types. (Physician, ancillary, admin)",
      (userType, done) => {
        //  Mock the cookies get function to fake the admin cookie value.
        Cookies.prototype.get = jest.fn().mockReturnValue(userType);

        // Verify that the initial first login component is rendered.
        expect(wrapped.contains(FirstLoginWelcome)).toEqual(true);

        /* Mock each user type clicked.
      0 - Physician
      1 - Private
      2 - Paid physician (unimplemented)
      3 - Admin assistant */
        if (userType == 0 || userType == 2) {
          wrapped
            .find("Card")
            .at(0)
            .simulate("click");
        }
        // Admin assistant now the first index for v1.
        else if (userType == 3) {
          wrapped
            .find("Card")
            .at(1)
            .simulate("click");
        }
        // This no longer exists in v1.
        // else {
        //   wrapped
        //     .find("Card")
        //     .at(2)
        //     .simulate("click");
        // }

        // Mock next button clicked.
        wrapped.find("Button").simulate("click");
        wrapped.update();

        moxios.wait(() => {
          let request = moxios.requests.mostRecent();

          // Tell moxios to respond with the successful user_type response.
          request
            .respondWith({
              status: 200,
              response: {
                message: "Profile updated successfully!",
                user_type: userType,
              },
            })
            .then(() => {
              wrapped.update();

              expect(wrapped.contains(FirstLoginVerify)).toEqual(true);
              // Expect the provider page when a provider type is selected and an admin type when admin is selected.
              if (userType < 3) {
                expect(wrapped.find("FirstLoginVerifyProvider").length).toEqual(
                  1
                );
              } else {
                expect(wrapped.find("FirstLoginVerifyAdmin").length).toEqual(1);
              }

              // Only fill in the form for provider types, it is not mandatory for admins.
              if (userType < 3) {
                let { form: providerForm } = wrapped
                  .find("FirstLoginVerifyProvider")
                  .props();

                providerForm.setFieldsValue({
                  place: {
                    location: { lat: 10.5, lon: 10.5 },
                    address: "Test address",
                  },
                });
                providerForm.setFieldsValue({ phone: "000 000 0000" });
                providerForm.setFieldsValue({ fax: "000 000 0000" });
                providerForm.setFieldsValue({ is_wheelchair_accessible: true });
                providerForm.setFieldsValue({
                  hours: {
                    startTime: moment("09:30", ["H:m"]),
                    endTime: moment("09:30", ["H:m"]),
                  },
                });
              }

              wrapped.find("form").simulate("submit");

              wrapped.update();

              moxios.wait(() => {
                let request = moxios.requests.mostRecent();

                request
                  .respondWith({
                    status: 200,
                    response: {
                      message: "Profile updated successfully!",
                      profile: {
                        uuid: "123",
                        profile_picture_link: null,
                        provider: {
                          specialty: null,
                          subspecialty_or_special_interests: null,
                          services_provided: null,
                          procedural_wait_times: [],
                          languages: [],
                          designations: [],
                          education_and_qualifications: null,
                          addresses: [
                            {
                              start_hour: "09:30:00",
                              phone: "123",
                              is_wheelchair_accessible: true,
                              longitude: 10.5,
                              address: "Test address",
                              fax: "12",
                              end_hour: "09:30:00",
                              latitude: 10.5,
                            },
                          ],
                          procedural_wait: null,
                          consultation_wait: null,
                          referral_instructions: null,
                          research_interests: null,
                          services_not_provided: null,
                        },
                        email: "test@test.com",
                        name: "Testy Test",
                        is_verified_professional: false,
                        is_initial_setup_complete: true,
                        user_type: userType,
                      },
                    },
                  })
                  .then(() => {
                    wrapped.update();

                    expect(wrapped.contains(FirstLoginFinish)).toEqual(true);

                    done();
                  });
              });
            });
        });
      }
    );
  });
});
