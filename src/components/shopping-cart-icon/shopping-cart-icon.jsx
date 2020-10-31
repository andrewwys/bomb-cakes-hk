import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems } from '../../redux/cart/cart.selectors';
import {
  setCurrentPage,
  toggleOrderMode,
} from '../../redux/display/display.actions';

import './shopping-cart-icon.scss';

const ShoppingCartIcon = ({ cartItems, setCurrentPage, toggleOrderMode }) => {
  console.log('cart: ', Array.isArray(cartItems) && cartItems.length);
  return (
    <div
      class='icon-cart'
      onClick={() => {
        setCurrentPage('CHECKOUT');
        toggleOrderMode();
      }}
    >
      <div class='cart-line-1'></div>
      <div class='cart-line-2'></div>
      <div
        class='cart-line-3'
        style={{
          display:
            Array.isArray(cartItems) && cartItems.length ? 'inherit' : 'none',
        }}
      ></div>
      <div class='cart-wheel'></div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleOrderMode: () => dispatch(toggleOrderMode()),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartIcon);
