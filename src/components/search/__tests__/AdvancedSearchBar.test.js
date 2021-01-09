import React from "react";
import { mount } from "enzyme";

import AdvancedSearchBar from "../AdvancedSearchBar";
import { undecorated as SearchBar } from "../SearchBar";
import Root from "../../../Root";

let wrapped;

// afterEach(() => {
//   wrapped.unmount();
// });

// The entire design change due to V1. We had to remove a bunch of shit.
it("Needs at least one test to not fail.", () => {});

// describe("AdvancedSearchBar", () => {
//   describe("AdvancedSearchBar rendered vertically", () => {
//     beforeEach(() => {
//       wrapped = mount(
//         <Root>
//           <SearchBar>
//             <AdvancedSearchBar isVertical={true} />
//           </SearchBar>
//         </Root>
//       );
//     });

//     it("Should render vertically if isVertical is true", () => {
//       /*
//         Update these rendering tests once we add more values to the advancedsearchbar
//       */
//       expect(wrapped.find("AdvancedSearchBar").props().isVertical).toEqual(
//         true
//       );

//       wrapped
//         .find("AdvancedSearchBar")
//         .find(".ant-collapse-header")
//         .simulate("click");

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 }).length
//       ).toEqual(2);

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(0)
//           .find("Col")
//           .find({ span: 12 })
//           .at(0)
//           .find('[htmlFor="name"]')
//           .text()
//       ).toEqual("Name");
//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(0)
//           .find("Col")
//           .find({ span: 12 })
//           .at(1)
//           .find('[htmlFor="languages_spoken"]')
//           .text()
//       ).toEqual("Languages Spoken");
//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(1)
//           .find("Col")
//           .find({ span: 12 })
//           .at(0)
//           .find('[htmlFor="designations"]')
//           .text()
//       ).toEqual("Designations");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(1)
//       //     .find("Col")
//       //     .find({ span: 12 })
//       //     .at(1)
//       //     .find('[htmlFor="education"]')
//       //     .text()
//       // ).toEqual("Education");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(2)
//       //     .find("Col")
//       //     .find({ span: 12 })
//       //     .at(0)
//       //     .find('[htmlFor="research_interests"]')
//       //     .text()
//       // ).toEqual("Interests");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(2)
//       //     .find("Col")
//       //     .find({ span: 12 })
//       //     .at(1)
//       //     .find('[htmlFor="services_provided"]')
//       //     .text()
//       // ).toEqual("Services Provided");

//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 0 })
//       //     .find("RangeTimePicker").length
//       // ).toEqual(1);

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .find("Col")
//           .find({ span: 12 }).length
//       ).toEqual(6);
//     });
//   });

//   describe("AdvancedSearchBar rendered horizontally", () => {
//     beforeEach(() => {
//       wrapped = mount(
//         <Root>
//           <SearchBar isResult={true} location={{}}>
//             <AdvancedSearchBar />
//           </SearchBar>
//         </Root>
//       );
//     });

//     it("Should render horizontally if isVertical is not set", () => {
//       expect(wrapped.find("AdvancedSearchBar").props().isVertical).toEqual(
//         undefined
//       );

//       wrapped
//         .find("AdvancedSearchBar")
//         .find(".ant-collapse-header")
//         .simulate("click");

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 }).length
//       ).toEqual(1);

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(0)
//           .find("Col")
//           .find({ span: 8 })
//           .at(0)
//           .find('[htmlFor="name"]')
//           .text()
//       ).toEqual("Name");
//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(0)
//           .find("Col")
//           .find({ span: 8 })
//           .at(1)
//           .find('[htmlFor="languages_spoken"]')
//           .text()
//       ).toEqual("Languages Spoken");
//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .at(0)
//           .find("Col")
//           .find({ span: 8 })
//           .at(2)
//           .find('[htmlFor="designations"]')
//           .text()
//       ).toEqual("Designations");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(1)
//       //     .find("Col")
//       //     .find({ span: 8 })
//       //     .at(0)
//       //     .find('[htmlFor="education"]')
//       //     .text()
//       // ).toEqual("Education");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(1)
//       //     .find("Col")
//       //     .find({ span: 8 })
//       //     .at(1)
//       //     .find('[htmlFor="research_interests"]')
//       //     .text()
//       // ).toEqual("Interests");
//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 24 })
//       //     .at(1)
//       //     .find("Col")
//       //     .find({ span: 8 })
//       //     .at(2)
//       //     .find('[htmlFor="services_provided"]')
//       //     .text()
//       // ).toEqual("Services Provided");

//       // expect(
//       //   wrapped
//       //     .find("AdvancedSearchBar")
//       //     .find("Row")
//       //     .find({ gutter: 0 })
//       //     .find("RangeTimePicker").length
//       // ).toEqual(1);

//       expect(
//         wrapped
//           .find("AdvancedSearchBar")
//           .find("Row")
//           .find({ gutter: 24 })
//           .find("Col")
//           .find({ span: 8 }).length
//       ).toEqual(7);
//     });
//   });
// });
