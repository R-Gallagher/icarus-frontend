import React from "react";
import { mount } from "enzyme";
import moment from "moment";

import RangeTimePicker from "../RangeTimePicker";

let wrapped;

afterEach(() => {
  wrapped.unmount();
});

describe("RangeTimePicker", () => {
  describe("Start time set", () => {
    it("Should restrict the user from selecting a closing time before or equal to the opening time.", () => {
      wrapped = mount(
        <RangeTimePicker value={{ startTime: moment("09:30", ["H:m"]) }} />
      );

      let disabledHours = wrapped
        .find("TimePicker")
        .at(1)
        .props()
        .disabledHours();

      // Set the hour to the start hour provided to trigger the validation.
      let disabledMinutes = wrapped
        .find("TimePicker")
        .at(1)
        .props()
        .disabledMinutes(9);

      expect(disabledHours.every(hour => hour >= 0 && hour < 9)).toEqual(true);

      expect(
        disabledMinutes.every(minute => minute >= 0 && minute <= 30)
      ).toEqual(true);
    });

    it("Should account for the step size when disabling hours.", () => {
      // Set the time to 8:55, the last option with a step of 5.
      wrapped = mount(
        <RangeTimePicker value={{ startTime: moment("08:55", ["H:m"]) }} />
      );

      let disabledHours = wrapped
        .find("TimePicker")
        .at(1)
        .props()
        .disabledHours();

      // 8 should be disabled as an hour.
      expect(disabledHours.every(hour => hour >= 0 && hour < 8)).toEqual(true);
    });
  });

  describe("End time set", () => {
    beforeEach(() => {
      wrapped = mount(
        <RangeTimePicker value={{ endTime: moment("18:45", ["H:m"]) }} />
      );
    });
    it("Should restrict the user from selecting an opening time before or equal to the closing time.", () => {
      let disabledHours = wrapped
        .find("TimePicker")
        .at(0)
        .props()
        .disabledHours();

      // Set the hour to the start hour provided to trigger the validation.
      let disabledMinutes = wrapped
        .find("TimePicker")
        .at(0)
        .props()
        .disabledMinutes(18);

      expect(disabledHours.every(hour => hour > 18 && hour < 24)).toEqual(true);

      expect(
        disabledMinutes.every(minute => minute >= 45 && minute < 60)
      ).toEqual(true);
    });
  });
});
