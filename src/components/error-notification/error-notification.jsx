import React from 'react';
import { connect } from 'react-redux';
import './error-notification.scss';

export const errorCode = {
  CHECKOUT_EMPTY_CART: 'CHECKOUT_EMPTY_CART',
  CHECKOUT_NAME_REQUIRED: 'CHECKOUT_NAME_REQUIRED',
  CHECKOUT_EMAIL_REQUIRED: 'CHECKOUT_EMAIL_REQUIRED',
  CHECKOUT_EMAIL_INVALID: 'CHECKOUT_EMAIL_INVALID',
  CHECKOUT_PHONE_REQUIRED: 'CHECKOUT_PHONE_REQUIRED',
  CHECKOUT_PICKUP_DATE_REQUIRED: 'CHECKOUT_PICKUP_DATE_REQUIRED',
  CHECKOUT_PICKUP_TIME_REQUIRED: 'CHECKOUT_PICKUP_TIME_REQUIRED',
  CHECKOUT_AGREE_TERMS: 'CHECKOUT_AGREE_TERMS',
  CHECKOUT_SEND_NEWSLETTER: 'CHECKOUT_SEND_NEWSLETTER',
  PRODUCT_MENU_OPTIONS_REQUIRED: 'PRODUCT_MENU_OPTIONS_REQUIRED',
};

const errorMsg = {
  CHECKOUT_EMPTY_CART: 'Your cart is empty!',
  CHECKOUT_NAME_REQUIRED: 'Name is required.',
  CHECKOUT_EMAIL_REQUIRED: 'Email address is required.',
  CHECKOUT_EMAIL_INVALID: 'Please enter a valid email address.',
  CHECKOUT_PHONE_REQUIRED: 'Telephone no. is required.',
  CHECKOUT_PICKUP_DATE_REQUIRED: 'Pickup date is required.',
  CHECKOUT_PICKUP_TIME_REQUIRED: 'Pickup time is required.',
  CHECKOUT_AGREE_TERMS: 'Please agree to terms of service.',
  CHECKOUT_SEND_NEWSLETTER: 'Validation error', //honeypot validation
  PRODUCT_MENU_OPTIONS_REQUIRED: 'Please fill in all required options (*).',
};

const ErrorNotification = ({ popErrorMsg }) => {
  return (
    <div className={popErrorMsg.length > 0 ? 'error-msg-wrapper' : ''}>
      {popErrorMsg.map((code, i) => (
        <div key={i}>{errorMsg[code]}</div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  popErrorMsg: state.display.popErrorMsg,
});

export default connect(mapStateToProps)(ErrorNotification);
