import React from 'react';
import { connect } from 'react-redux';

import {
  reduceQty,
  incrementQty,
  removeFromCart,
} from '../../redux/cart/cart.actions';

import './checkout-cart-item.scss';

const CheckoutCartItem = ({
  id,
  item,
  reduceQty,
  incrementQty,
  removeFromCart,
}) => {
  const {
    productData: { title1, title2, image, price },
    cakeSize,
    design,
    toppings,
    decorations,
    message,
    quantity,
    sumExtraCost,
    //amount,
  } = item;
  const amount = quantity * (price + sumExtraCost);
  return (
    <div className='item' key={id}>
      <div className='img-wrapper'>
        <img
          className='product-img'
          src={image}
          alt='product'
          height='80px'
          width='80px'
        />
      </div>
      <div className='product-details'>
        <h5 className='product-title'>{title1 + ' ' + title2}</h5>
        <ul className='product-options'>
          <li>{`Cake size: ${cakeSize}`}</li>
          <li>{`Design: ${design}`}</li>
          <li>{`Toppings: ${toppings}`}</li>
          <li>{`Decorations: ${decorations}`}</li>
          <li>{`Message: ${message}`}</li>
        </ul>
      </div>
      <div className='qty'>
        <div className='qty-panel'>
          <div className='reduce' onClick={() => reduceQty(item)}>
            -
          </div>
          <div className='number'>{quantity}</div>
          <div className='increment' onClick={() => incrementQty(item)}>
            +
          </div>
        </div>
        <div className='remove' onClick={() => removeFromCart(item)}>
          remove
        </div>
      </div>
      <div className='amount'>{amount}</div>
    </div>
  );
};

const matchDispatchToProps = (dispatch) => ({
  removeFromCart: (cartItem) => dispatch(removeFromCart(cartItem)),
  reduceQty: (cartItem) => dispatch(reduceQty(cartItem)),
  incrementQty: (cartItem) => dispatch(incrementQty(cartItem)),
});

export default connect(null, matchDispatchToProps)(CheckoutCartItem);
