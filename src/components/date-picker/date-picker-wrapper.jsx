import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setPickupDate } from '../../redux/cart/cart.actions';
import { selectPickupDate } from '../../redux/cart/cart.selectors';

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
      // date: moment(this.props.pickupDate), //moment().add(3, 'days'),  //
      focused: false,
    };
  }
  handleDateChange = (date) => {
    this.setState({ date });
    //const pickupDate = moment(date).format('dddd YYYY-MMM-DD');
    this.props.setPickupDate(moment(date).format('dddd YYYY-MMM-DD'));
  };

  render() {
    //const { pickupDate } = this.props;
    //console.log(pickupDate);
    // const displayDate = this.props.pickupDate;
    //this.setState({ date: pickupDate });
    return (
      <SingleDatePicker
        date={moment(this.props.pickupDate)} // momentPropTypes.momentObj or null
        onDateChange={this.handleDateChange} // PropTypes.func.isRequired
        focused={this.state.focused} // PropTypes.bool
        onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
        id='your_unique_id' // PropTypes.string.isRequired,
        required
        showDefaultInputIcon
        small
        readOnly
        // isDayBlocked={(day) => moment.weekdays(day.weekday()) === 'Sunday'}
        // moment.weekdays() returns "Sunday"
        isDayBlocked={(day1) =>
          datesList.some((day2) => isSameDay(day1, day2)) ||
          moment.weekdays(day1.weekday()) === 'Sunday'
        }
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
        numberOfMonths={2}
        displayFormat='YYYY-MM-DD'
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  pickupDate: selectPickupDate,
});

const mapDispatchToProps = (dispatch) => ({
  setPickupDate: (date) => dispatch(setPickupDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DatePickerWrapper);
