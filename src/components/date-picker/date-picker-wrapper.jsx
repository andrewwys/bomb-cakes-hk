import React from 'react';

import { SingleDatePicker } from 'react-dates';
import moment from 'moment';
import isInclusivelyAfterDay from 'react-dates/src/utils/isInclusivelyAfterDay';
import isSameDay from 'react-dates/src/utils/isSameDay';

const datesList = [
  moment(),
  moment().add(1, 'days'), //count future days from today
  moment().add(2, 'days'),
];

class DatePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: false,
    };
  }

  render() {
    return (
      <SingleDatePicker
        date={this.state.date} // momentPropTypes.momentObj or null
        onDateChange={(date) => this.setState({ date })} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id='your_unique_id' // PropTypes.string.isRequired,
        required
        showDefaultInputIcon
        showClearDate
        small
        // isDayBlocked={(day) => moment.weekdays(day.weekday()) === 'Sunday'}
        // moment.weekdays() returns "Sunday"
        isDayBlocked={(day1) => {
          const x =
            datesList.some((day2) => isSameDay(day1, day2)) ||
            moment.weekdays(day1.weekday()) === 'Sunday';
          return x;
        }}
        // day1: Each day on calendar       day2: Days in datesList
        // datesList.some() returns true if day1 is in the dateList
        isOutsideRange={(day) =>
          !isInclusivelyAfterDay(day, moment()) ||
          isInclusivelyAfterDay(day, moment().add(4, 'weeks'))
        } /* Look at examples:
            http://airbnb.io/react-dates/?path=/story/sdp-day-props--blocks-fridays
            https://github.com/airbnb/react-dates/blob/master/stories/SingleDatePicker_day.js
        */
        firstDayOfWeek={1} //Monday
        numberOfMonths={1}
      />
    );
  }
}

export default DatePickerWrapper;
