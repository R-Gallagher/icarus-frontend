import React from "react";
import { mount } from "enzyme";
import moxios from "moxios";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { undecorated as Dashboard } from "../Dashboard";
import Root from "../../../Root";
import { theme } from "../../../styles/Theme";
import IcarusRest from "../../../api/IcarusRest";

let wrapped;

beforeEach(() => {
  moxios.install(IcarusRest);

  wrapped = mount(
    <Root>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      </ThemeProvider>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();

  moxios.uninstall(IcarusRest);
});

describe("Dashboard", () => {
  describe("Unit", () => {});

  describe("Integration", () => {
    it("Should confirm that admin assistants can add and remove physicians from their roster.", (done) => {
      expect(wrapped.find("ManagementList").length).toEqual(1);

      // Expect that the list has no items in it.
      expect(
        Object.values(wrapped.find("ManagementItem").props().item).every(
          (item) => !item
        )
      ).toEqual(true);

      // Expect that the modal isn't visible until clicked.
      expect(wrapped.find("Modal").props().visible).toEqual(false);

      wrapped.find("Button").simulate("click");
      wrapped.update();

      // Expect that the modal is visible once the button is clicked.
      expect(wrapped.find("Modal").props().visible).toEqual(true);

      wrapped.find("input#add_to_roster_email").simulate("change", {
        target: { value: "test@test.com" },
      });

      wrapped.find("form").simulate("submit");
      wrapped.update();

      moxios.wait(() => {
        let request = moxios.requests.mostRecent();

        request
          .respondWith({
            status: 200,
            response: {
              managed_providers: [
                {
                  is_relationship_confirmed_by_provider: false,
                  email: "test@test.com",
                  name: "Emmett Brown",
                  profile_picture_link: null,
                  uuid: "123",
                },
                {
                  is_relationship_confirmed_by_provider: true,
                  email: "bruceisnotthebatman@gmail.com",
                  name: "Bruce Wayne",
                  profile_picture_link: "www.testimagesource.com/img.jpg",
                  uuid: "456",
                },
              ],
            },
          })
          .then(() => {
            wrapped.update();

            // Expect both items to appear in the list.
            expect(wrapped.find("ManagementItem").length).toEqual(2);

            wrapped.find("ManagementItem").forEach((node, index) => {
              if (!index) {
                expect(node.exists("Avatar")).toBe(true);
              } else {
                expect(node.find("Avatar").props().src).toEqual(
                  "www.testimagesource.com/img.jpg"
                );
              }

              expect(node.find("Meta").props().title).toEqual(
                !index ? "Emmett Brown" : "Bruce Wayne"
              );
              expect(
                node
                  .find("h3")
                  .text()
                  .includes(
                    !index ? "Request Not Accepted" : "Request Accepted"
                  )
              ).toEqual(true);

              expect(node.find("Icon#requestStatus").props().type).toEqual(
                !index ? "close-circle" : "check-circle"
              );

              done();
            });
          });
      });
    });
  });
});
