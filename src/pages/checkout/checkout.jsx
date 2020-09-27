import React from 'react';
import { connect } from 'react-redux';
import CheckoutCartItem from '../../components/checkout-cart-item/checkout-cart-item';

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
}) => {
  const renderCartItems = () => {
    if (cartItems.length <= 0) {
      return <div className='no-cart-item'>- OMG! Your Cart Is Empty -</div>;
    } else {
      return cartItems.map((item) => <CheckoutCartItem item={item} />);
    }
  };
  return (
    <div className='cart-item-wrapper'>
      <h3 className='checkout'>Checkout</h3>
      <div className='header'>
        <div className='header-child header-img'> </div>
        <div className='header-child header-item'>Item</div>
        <div className='header-child header-qty'>Qty</div>
        <div className='header-child header-price'>Price (HKD)</div>
      </div>
      {renderCartItems()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(Checkout);
