import React from 'react';
import { connect } from 'react-redux';
import {
  clearOrderDetails,
  setOrderDetails,
  setPickupDate,
  clearAll,
} from '../../redux/cart/cart.actions';
import {
  turnOffOrderMode,
  updateErrorMsgArr,
  clearErrorMsgArr,
  //setCurrentPage,
} from '../../redux/display/display.actions';
import moment from 'moment';
import emailjs from 'emailjs-com';
import { formatCurrency } from '../../utils';

import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item';
import OptionSelector from '../../components/option-selector/option-selector';
import DatePickerWrapper from '../../components/date-picker/date-picker-wrapper';
import CustomButton from '../../components/custom-button/custom-button';
import ErrorNotification, {
  errorCode,
} from '../../components/error-notification/error-notification';

import { ORDER_DETAILS } from '../../product.data';

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
  clearAll,
  setOrderDetails,
  turnOffOrderMode,
  clearOrderDetails,
  setPickupDate,
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
  const sendEmail = (e) => {
    e.preventDefault();

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

  const renderCartItems = () => {
    if (cartItems.length <= 0) {
      return <div className='no-cart-item'>- OMG! Your Cart Is Empty -</div>;
    } else {
      return cartItems.map((item, id) => (
        <CheckoutCartItem item={item} id={id} />
      ));
    }
  };
  // let datePickerIsFocused = false;
  const hourOptions = [];
  /* opening hour: 12 closing: 21 */
  for (let i = 12; i <= 21; i++) {
    hourOptions.push(<option value={i}>{i}</option>);
  }

  const handleClickSubmit = (e) => {
    const err = errorMsgArr();
    if (err.length <= 0) {
      e.preventDefault();
      let submitInfo = `Order Submitted! 
Pickup date: ${moment(pickupDate).format('dddd YYYY-MMM-DD')}
Pickup time: ${pickupHour}:${pickupMin}
Customer's name: ${name}
Phone no.: ${phone}
Email address: ${email}
Additional comments: ${comments}
Selected accessories: ${accessories}
Total amount: ${checkoutTotal}
`;
      alert(submitInfo);
      cartItems.map((item) => {
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
`;
        alert(cakeInfo);
      });
      // clear form, close modal
      turnOffOrderMode();
      clearErrorMsgArr();
      clearAll();
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

  const checkoutTotal = cartItems.reduce((total, item) => {
    const {
      productData: { price },
      quantity,
      sumExtraCost,
    } = item;
    return total + (price + sumExtraCost) * quantity;
  }, 0);

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
        <form className='order-input-form' onSubmit={sendEmail}>
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
              maxlength='20'
              required
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
            <input
              maxlength='8'
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
              maxlength='80'
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
              maxlength='100'
              onChange={(event) => setOrderDetails(event.target)}
            ></input>
          </div>
          <div className='order-details-right'>
            <OptionSelector productOption={ORDER_DETAILS[0]} />
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
                <div className='total'>{formatCurrency(checkoutTotal)}</div>
              </div>
              <div className='button-wrapper'>
                <CustomButton
                  buttonClassName='submit-btn'
                  type='submit'
                  onClick={handleClickSubmit}
                >
                  {' '}
                  Submit{' '}
                </CustomButton>
              </div>
            </div>
          </div>
          <input
            type='text'
            name='pickupDate'
            id='pickupDate'
            value={pickupDate}
            style={{ display: 'none' }}
          ></input>
          <input
            type='text'
            name='accessories'
            id='accessories'
            value={accessories}
            style={{ display: 'none' }}
          ></input>
          <input //antispam
            type='checkbox'
            id='send-newsletter'
            value='1'
            style={{ display: 'none' }}
            tabindex='-1' // Can't be navigated to via the 'tab' key
            autocomplete='off' // Can't be filled by auto-complete
          ></input>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  popErrorMsg: state.display.popErrorMsg,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderDetails: (input) => dispatch(setOrderDetails(input)),
  turnOffOrderMode: () => dispatch(turnOffOrderMode()),
  clearOrderDetails: () => dispatch(clearOrderDetails()),
  setPickupDate: (date) => dispatch(setPickupDate(date)),
  updateErrorMsgArr: (err) => dispatch(updateErrorMsgArr(err)),
  clearErrorMsgArr: () => dispatch(clearErrorMsgArr()),
  clearAll: () => dispatch(clearAll()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
