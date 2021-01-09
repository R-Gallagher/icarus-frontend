import React from "react";
import { ArrowRightOutlined } from '@ant-design/icons';
import { TimePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

import { TIME_PICKER_LIMITS } from "../../constants";

class RangeTimePicker extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      startTime: value.startTime || null,
      endTime: value.endTime || null,
    };
  }

  getDisabledHours = (
    hourToCompare,
    userSelectedTime,
    hourLimit,
    isStartCount
  ) => {
    var hoursBetween = [];
    // Default to fully inclusive.
    var inclusivity = "[]";

    const { MINUTES_IN_HOUR, STEP_SIZE } = TIME_PICKER_LIMITS;

    /* 
      Change the inclusivity based on minutes of the already selected time.
      I.e. If start time selected is 8:45am, 8 will not be disabled for end time as the user can still selected 8:50, 8:55, etc.
      We also have to account for the step size, as if it is 5 minutes, and the selected time is 8:55am, 8 should be disabled for end time.
    */
    if (
      userSelectedTime != null &&
      (userSelectedTime.get("m") >= 0 &&
        userSelectedTime.get("m") <= MINUTES_IN_HOUR - STEP_SIZE)
    ) {
      inclusivity = isStartCount ? "[)" : "(]";
    }

    // Set the limit to a moment object, specify that the only thing provided is the hour.
    hourLimit = moment({ hour: hourLimit });

    /* 

      Push to the array of hours between:
        If it is a start count you are counting upwards: 0, 1, 2 and disabling all until the selected start time.
        If it is an end count the inverse is true.
    */
    while (
      moment({ hour: hourToCompare }).isBetween(
        isStartCount ? hourLimit : userSelectedTime,
        isStartCount ? userSelectedTime : hourLimit,
        "hour",
        inclusivity
      )
    ) {
      hoursBetween.push(hourToCompare);
      hourToCompare = isStartCount ? hourToCompare + 1 : hourToCompare - 1;
    }

    return hoursBetween;
  };

  getDisabledStartHour = () => {
    const { endTime } = this.state;
    const { HOUR_FINISH } = TIME_PICKER_LIMITS;

    return this.getDisabledHours(HOUR_FINISH, endTime, HOUR_FINISH, false);
  };

  getDisabledStartMinute = selectedHour => {
    var disabledMinutes = [];

    const { endTime } = this.state;

    if (endTime != null) {
      // Loop from the selected end minute to 60, and disable all.
      for (var i = endTime.get("m"); i < 60; i++) {
        // Disable for only the selected hour.
        if (moment(selectedHour).isSame(endTime.get("h"))) {
          disabledMinutes.push(i);
        }
      }
    }
    return disabledMinutes;
  };

  getDisabledEndHour = () => {
    const { startTime } = this.state;
    const { HOUR_START } = TIME_PICKER_LIMITS;

    return this.getDisabledHours(HOUR_START, startTime, HOUR_START, true);
  };

  getDisabledEndMinute = selectedHour => {
    const { startTime } = this.state;

    if (startTime != null) {
      var disabledMinutes = [];
      // Loop from 0 to the selected start minute.
      for (var i = 0; i <= startTime.get("m"); i++) {
        // Only disable the minutes in the selected hour.
        if (moment(selectedHour).isSameOrBefore(startTime.get("h"))) {
          disabledMinutes.push(i);
        }
      }
      return disabledMinutes;
    }
  };

  onStartChange = time => {
    if (time != null) {
      this.onTimeChange("startTime", time);
    }
  };

  onEndChange = time => {
    if (time != null) {
      this.onTimeChange("endTime", time);
    }
  };

  onTimeChange = (field, time) => {
    if (!("value" in this.props)) {
      this.setState({
        [field]: time,
      });
    }

    this.triggerChange({ [field]: time });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  };

  render() {
    const { STEP_SIZE } = TIME_PICKER_LIMITS;
    return (
      <div>
        <TimePicker
          placeholder="Start"
          id="tPickerStart"
          disabledHours={this.getDisabledStartHour}
          disabledMinutes={this.getDisabledStartMinute}
          value={this.state.startTime}
          minuteStep={STEP_SIZE}
          onChange={this.onStartChange}
          format="h:mm a"
          defaultValue={null}
        />
        <ArrowRightOutlined style={{ padding: "0 0.5em" }} />

        <TimePicker
          placeholder="End"
          id="tPickerEnd"
          disabledHours={this.getDisabledEndHour}
          disabledMinutes={this.getDisabledEndMinute}
          value={this.state.endTime}
          minuteStep={STEP_SIZE}
          onChange={this.onEndChange}
          format="h:mm a"
          defaultValue={null}
        />
      </div>
    );
  }
}

RangeTimePicker.propTypes = {
  value: PropTypes.object,
};

export default RangeTimePicker;
