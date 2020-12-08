import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  clearOrderDetails,
  setOrderDetails,
  setPickupDate,
  clearAfterSubmit,
} from '../../redux/cart/cart.actions';
import {
  turnOffOrderMode,
  updateErrorMsgArr,
  clearErrorMsgArr,
  setCurrentPage,
} from '../../redux/display/display.actions';
import {selectCart2} from '../../redux/cart/cart.selectors';
import {selectOrderDetails, selectOrderDetailsError} from '../../redux/data/data.selectors';

import moment from 'moment';
import emailjs from 'emailjs-com';
import { formatCurrency, genOrderNum } from '../../utils';

import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item';
import OptionSelector from '../../components/option-selector/option-selector';
import DatePickerWrapper from '../../components/date-picker/date-picker-wrapper';
import CustomButton from '../../components/custom-button/custom-button';
import ErrorNotification, {
  errorCode,
} from '../../components/error-notification/error-notification';

import './checkout.scss';

const Checkout = ({
  cart: {
    cartItems,
    pickupDate,
    pickupHour,
    pickupMin,
    accessories,
    name,
    phone,
    email,
    comments,
  },
  updateErrorMsgArr,
  clearErrorMsgArr,
  clearAfterSubmit,
  setOrderDetails,
  turnOffOrderMode,
  setCurrentPage,
  clearOrderDetails,
  setPickupDate,
  orderDetails,
  orderDetailsError,
}) => {
  const errorMsgArr = () => {
    const arr = [];
    if (document.getElementById('send-newsletter').checked === true) {
      arr.push(errorCode.CHECKOUT_SEND_NEWSLETTER); // honeypot
    }
    if (cartItems.length <= 0) {
      arr.push(errorCode.CHECKOUT_EMPTY_CART);
    }
    if (pickupDate.length <= 0) {
      arr.push(errorCode.CHECKOUT_PICKUP_DATE_REQUIRED);
    }
    if (pickupHour.length <= 0 || pickupMin.length <= 0) {
      arr.push(errorCode.CHECKOUT_PICKUP_TIME_REQUIRED);
    }
    if (name.length <= 0) {
      arr.push(errorCode.CHECKOUT_NAME_REQUIRED);
    }
    if (phone.length <= 0) {
      arr.push(errorCode.CHECKOUT_PHONE_REQUIRED);
    }
    if (email.length <= 0) {
      arr.push(errorCode.CHECKOUT_EMAIL_REQUIRED);
    } else if (
      !(
        email.includes('@') &&
        email.includes('.') &&
        email.indexOf('@' < email.indexOf('.'))
      )
    ) {
      arr.push(errorCode.CHECKOUT_EMAIL_INVALID);
    }
    if (document.getElementById('agree-terms').checked === false) {
      arr.push(errorCode.CHECKOUT_AGREE_TERMS);
    }
    return arr;
  };

  const renderCartItems = () => {
    if (cartItems.length <= 0) {
      return <div className='no-cart-item'>- OMG! Your Cart Is Empty -</div>;
    } else {
      return cartItems.map((item, id) => (
        <CheckoutCartItem item={item} id={id} key={id} />
      ));
    }
  };
  // let datePickerIsFocused = false;
  const hourOptions = [];
  /* opening hour: 12 closing: 21 */
  for (let i = 12; i <= 21; i++) {
    hourOptions.push(<option value={i} key={i}>{i}</option>);
  }

    const orderSummary = () => {
      const text = cartItems.reduce((summary, item) => {
        const {
          productData: { title1, title2, price },
          cakeSize,
          design,
          toppings,
          decorations,
          message,
          quantity,
          sumExtraCost,
        } = item;
        const cakeInfo = `Cake ${cartItems.indexOf(item) + 1}:
Cake name: ${title1} ${title2}
Quantity: ${quantity}
Cake size: ${cakeSize}
Design: ${design}
Toppings: ${toppings}
Decorations: ${decorations}
Cake message: ${message}
Price: ${(sumExtraCost + price) * quantity}
======================

  `;
        return summary + cakeInfo;
      }, '');
      return text;
    };

  const sendEmail = (e) => {
    console.log('sending email... ', e);
    emailjs
      .sendForm(
        'service_hw5sptk',
        'template_31s6d2b',
        e.target,
        'user_9jnVlXRYTr3EiWjMlGOIs'
      )
      .then(
        (result) => {
          console.log(result.text, 'email sent!');
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const handleClickSubmit = async (e) => {
    e.persist();
    const err = errorMsgArr();
    if (err.length <= 0) {
      const orderSendOut = {
          "name": name,
          "phone": phone,
          "email": email,
          "pickupDate": pickupDate,
          "pickupTime": `${pickupHour}:${pickupMin}`,
          "comments": comments,
          "accessories": accessories.toString(),
          "checkoutTotal": checkoutTotal(),
          "items": orderSummary(),
          "status": "NEW",
      };
      console.log(orderSendOut);
      e.preventDefault();
      try {
        let response = await fetch('http://localhost:1337/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderSendOut)
      });
      let result = await response.json();
      console.log(result);
      } catch (error) {
        console.log('error ocurred: ', error);
      }
      sendEmail(e);
      // clear form, close modal
      // turnOffOrderMode();
      setCurrentPage('THANK_YOU');
      clearErrorMsgArr();
      clearAfterSubmit();
    } else {
      updateErrorMsgArr(err);
    }
  };

  const handleClickClearForm = () => {
    clearOrderDetails();
    clearErrorMsgArr();
    document.getElementById('agree-terms').checked = false;
    setPickupDate(moment().add(3, 'days').format('dddd YYYY-MMM-DD'));
  };

  const handleClickAddAnotherCake = () => {
    turnOffOrderMode();
    clearErrorMsgArr();
  };

  const checkoutTotal = () => {
    //Total Amount of all chosen items
    if (Array.isArray(cartItems) && cartItems.length) {
      return cartItems.reduce((total, item) => {
        const {
          productData: { price },
          quantity,
          sumExtraCost,
        } = item;
        return total + (price + sumExtraCost) * quantity;
      }, 0);
    } else return 0;
  };

  return (
    <div className='checkout-page'>
      <h3 className='checkout-heading'>Checkout</h3>
      <div className='header'>
        <div className='header-child header-img'> </div>
        <div className='header-child header-item'>Item</div>
        <div className='header-child header-qty'>Qty</div>
        <div className='header-child header-price'>Price (HKD)</div>
      </div>
      {renderCartItems()}
      <ErrorNotification />
      <div className='order-details'>
        <form className='order-input-form' onSubmit={handleClickSubmit}>
          <div className='order-details-left'>
            <div className='add-clear'>
              <div className='add-cake' onClick={handleClickAddAnotherCake}>
                Add another cake
              </div>
              <div className='clear-form' onClick={handleClickClearForm}>
                Clear form
              </div>
            </div>
            {/* <form className='order-input-form' onSubmit={sendEmail}> */}
            <label className='label'>Pickup date &amp; time: </label>
            <div className='date-time-picker'>
              <DatePickerWrapper />
              <div className='time-picker'>
                <select
                  name='pickupHour'
                  id='hours'
                  value={pickupHour}
                  onChange={(event) => setOrderDetails(event.target)}
                  required
                >
                  {hourOptions}
                </select>
                <div className='colon'>:</div>
                <select
                  name='pickupMin'
                  id='mins'
                  value={pickupMin}
                  onChange={(event) => setOrderDetails(event.target)}
                  required
                >
                  <option value='00'>00</option>
                  <option value='15'>15</option>
                  <option value='30'>30</option>
                  <option value='45'>45</option>
                </select>
              </div>
            </div>
            <label className='label'>Personal Information: </label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              className='name personal-info'
              placeholder='Name*'
              maxLength='20'
              required
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
            <input
              maxLength='8'
              type='text'
              pattern='[0-9]{8}'
              id='phone'
              name='phone'
              value={phone}
              className='number personal-info'
              placeholder='Telephone no.*'
              required
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
            <input
              maxLength='80'
              type='email'
              id='email'
              name='email'
              value={email}
              className='email personal-info'
              placeholder='Email address*'
              required
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
            <input
              type='text'
              id='comments'
              name='comments'
              value={comments}
              className='comments personal-info'
              placeholder='Additional comments'
              maxLength='100'
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
          </div>
          <div className='order-details-right'>
            {!orderDetailsError && orderDetails.length > 0
              ? <OptionSelector productOption={orderDetails[0]} /> : null}
            <div className='agree-terms'>
              <input
                type='checkbox'
                id='agree-terms'
                name='agree-terms'
                value='agree-terms'
              />
              <label> I agree to terms and conditions.</label>
            </div>
            <div className='summary'>
              <label className='location-label'>Pickup location: </label>
              <div className='address'>
                VeggieSF 10/F 11 Stanley Street, Central
              </div>
              <div className='total-wrapper'>
                <label className='total-label'>Total</label>
                <div className='total'>{formatCurrency(checkoutTotal())}</div>
              </div>
              <div className='button-wrapper'>
                <CustomButton
                  buttonClassName='submit-btn'
                  type='submit'
                  // onClick={handleClickSubmit}
                >
                  {' '}
                  Submit{' '}
                </CustomButton>
              </div>
            </div>
          </div>
          {/* below are hidden field either used for emailjs form submission or as an antispam */}
          <input
            type='text'
            name='pickupDate'
            id='pickupDate'
            defaultValue={pickupDate}
            style={{ display: 'none' }}
          ></input>
          <input
            type='text'
            name='accessories'
            id='accessories'
            defaultValue={accessories}
            style={{ display: 'none' }}
          ></input>
          <input
            type='text'
            name='orderNum'
            id='orderNum'
            defaultValue={genOrderNum()}
            style={{ display: 'none' }}
          ></input>
          <input //antispam
            type='checkbox'
            id='send-newsletter'
            defaultValue='1'
            style={{ display: 'none' }}
            tabIndex='-1' // Can't be navigated to via the 'tab' key
            autoComplete='off' // Can't be filled by auto-complete
          ></input>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cart: selectCart2,
  orderDetails: selectOrderDetails,
  orderDetailsError: selectOrderDetailsError,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderDetails: (input) => dispatch(setOrderDetails(input)),
  turnOffOrderMode: () => dispatch(turnOffOrderMode()),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  clearOrderDetails: () => dispatch(clearOrderDetails()),
  setPickupDate: (date) => dispatch(setPickupDate(date)),
  updateErrorMsgArr: (err) => dispatch(updateErrorMsgArr(err)),
  clearErrorMsgArr: () => dispatch(clearErrorMsgArr()),
  clearAfterSubmit: () => dispatch(clearAfterSubmit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
