import React from 'react';
import { connect } from 'react-redux';
import { setOrderDetails } from '../../redux/cart/cart.actions';
import moment from 'moment';

import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item';
import OptionSelector from '../../components/option-selector/option-selector';
import DatePickerWrapper from '../../components/date-picker/date-picker-wrapper';
import CustomButton from '../../components/custom-button/custom-button';

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
  setOrderDetails,
}) => {
  const renderCartItems = () => {
    if (cartItems.length <= 0) {
      return <div className='no-cart-item'>- OMG! Your Cart Is Empty -</div>;
    } else {
      return cartItems.map((item) => <CheckoutCartItem item={item} />);
    }
  };
  // let datePickerIsFocused = false;
  const hourOptions = [];
  /* opening hour: 12 closing: 21 */
  for (let i = 12; i <= 21; i++) {
    hourOptions.push(<option value={i}>{i}</option>);
  }

  const handleClickSubmit = () => {
    let submitInfo = `Order Submitted! 
Pickup date: ${moment(pickupDate).format('dddd YYYY-MMM-DD')}
Pickup time: ${pickupHour}:${pickupMin}
Customer's name: ${name}
Phone no.: ${phone}
Email address: ${email}
Additional comments: ${comments}
Selected accessories: ${accessories}
`;
    alert(submitInfo);
    cartItems.map((item) => {
      const {
        productData: { title1, title2 },
        cakeSize,
        design,
        toppings,
        decorations,
        message,
        quantity,
        amount,
      } = item;
      const cakeInfo = `Cake ${cartItems.indexOf(item) + 1}:
Cake name: ${title1} ${title2}
Quantity: ${quantity}
Cake size: ${cakeSize}
Design: ${design}
Toppings: ${toppings}
Decorations: ${decorations}
Cake message: ${message}
Amount: ${amount}
`;
      alert(cakeInfo);
    });
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
      <div className='order-details'>
        <div className='order-details-left'>
          <form className='order-input-form'>
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
              id='number'
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
          </form>
        </div>
        <div className='order-details-right'>
          <OptionSelector productOption={ORDER_DETAILS[0]} />
          <div className='summary'>
            <lable className='location-label'>Pickup location: </lable>
            <div className='address'>
              VeggieSF 10/F 11 Stanley Street, Central
            </div>
            <div className='total-wrapper'>
              <label className='total-label'>Total</label>
              <div className='total'>HK$ 888</div>
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
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setOrderDetails: (input) => dispatch(setOrderDetails(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
