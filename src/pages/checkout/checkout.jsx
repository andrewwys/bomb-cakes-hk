import React from 'react';
import { connect } from 'react-redux';
import { setPickupDate } from '../../redux/cart/cart.actions';

import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item';
import OptionSelector from '../../components/option-selector/option-selector';
import DatePickerWrapper from '../../components/date-picker/date-picker-wrapper';

import { ORDER_DETAILS } from '../../product.data';

import './checkout.scss';

const Checkout = ({
  cart: {
    cartItems,
    pickupDate,
    pickupTime,
    accessories,
    name,
    phone,
    email,
    comments,
  },
  setPickupDate,
}) => {
  const renderCartItems = () => {
    if (cartItems.length <= 0) {
      return <div className='no-cart-item'>- OMG! Your Cart Is Empty -</div>;
    } else {
      return cartItems.map((item) => <CheckoutCartItem item={item} />);
    }
  };
  let datePickerIsFocused = false;
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
          <OptionSelector productOption={ORDER_DETAILS[0]} />
          <form className='order-input-form'>
            <label className='label'>Pickup date &amp; time: </label>
            <DatePickerWrapper />
          </form>
        </div>
        <div className='order-details-right'></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  setPickupDate: (date) => dispatch(setPickupDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
