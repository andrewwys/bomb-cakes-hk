import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/custom-button/custom-button';
import OptionSelector from '../../components/option-selector/option-selector';

import './product-menu.scss';

import { PRODUCT_OPTIONS } from '../../product.data';

import {
  editCakeMsg,
  updateProductData,
  clearAll,
} from '../../redux/cart/cart.actions';
import { setCurrentPage } from '../../redux/display/display.actions';
import { saveNewItemToCart } from '../../redux/cart/cart.actions';
import { selectAmount } from '../../redux/cart/cart.selectors';
import { selectMessage } from '../../redux/cart/cart.selectors';
import { selectProductData } from '../../redux/cart/cart.selectors';

const ProductMenu = ({
  updateProductData,
  editCakeMsg,
  setCurrentPage,
  clearAll,
  saveNewItemToCart,
  productData,
  amount,
  message,
}) => {
  const { id, optionName, limit, optionValues } = PRODUCT_OPTIONS;
  const { title1, title2, price, image } = productData;
  const handleChange = (event) => {
    editCakeMsg(event.target.value);
  };
  return (
    <div className='container'>
      <span className='product-header'>
        <div className='title'>{title1 + ' ' + title2}</div>
        <div className='navigate-products'>
          <div className='prev-product' onClick={() => updateProductData(-1)}>
            &lt;&lt; Previous Product
          </div>
          <div className='divider'>&nbsp;|&nbsp;</div>
          <div className='next-product' onClick={() => updateProductData(1)}>
            Next Product &gt;&gt;
          </div>
        </div>
      </span>
      <div className='product-details'>
        <div
          className='product-img'
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className='product-options'>
          <p className='description'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris{' '}
          </p>
          {PRODUCT_OPTIONS.map((option) => (
            <OptionSelector productOption={option} />
          ))}
          <form className='product-order-form'>
            <label className='label'>Cake Message (optional): </label>
            <input
              type='text'
              id='cakemsg'
              name='cakeMessage'
              label='Cake Message'
              maxLength='30'
              className='cake-msg-input'
              value={message}
              onChange={handleChange}
            />
          </form>
          <p className='clear' onClick={() => clearAll()}>
            Clear Selection
          </p>
          <div className='summary'>
            <div className='amount'>{`HK$ ${price}`}</div>
            <CustomButton
              buttonClassName='add-to-cart'
              style={{ marginRight: '10px' }}
              type='submit'
              onClick={() => {
                saveNewItemToCart();
                setCurrentPage('CHECKOUT');
              }}
            >
              {' '}
              Add to Cart{' '}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  productData: selectProductData,
  amount: selectAmount,
  message: selectMessage,
});

const mapDispatchToProps = (dispatch) => ({
  updateProductData: (increment) => dispatch(updateProductData(increment)),
  editCakeMsg: (text) => dispatch(editCakeMsg(text)),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  clearAll: () => dispatch(clearAll()),
  saveNewItemToCart: () => dispatch(saveNewItemToCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductMenu);
