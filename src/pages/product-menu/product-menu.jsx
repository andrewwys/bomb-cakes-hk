import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../../components/custom-button/custom-button';
import OptionSelector from '../../components/option-selector/option-selector';
import ErrorNotification, {
  errorCode,
} from '../../components/error-notification/error-notification';

import './product-menu.scss';

import { PRODUCT_OPTIONS } from '../../product.data';

import {
  editCakeMsg,
  updateProductData,
  clearAll,
} from '../../redux/cart/cart.actions';
import {
  setCurrentPage,
  updateErrorMsgArr,
  clearErrorMsgArr,
} from '../../redux/display/display.actions';
import { saveNewItemToCart } from '../../redux/cart/cart.actions';
import {
  selectAmount,
  selectMessage,
  selectProductData,
  selectSumExtraCost,
  selectNewItem,
} from '../../redux/cart/cart.selectors';

const ProductMenu = ({
  updateProductData,
  editCakeMsg,
  setCurrentPage,
  clearAll,
  saveNewItemToCart,
  updateErrorMsgArr,
  clearErrorMsgArr,
  productData,
  amount,
  message,
  sumExtraCost,
  newItem,
}) => {
  const errorMsgArr = () => {
    const arr = [];
    if (
      newItem.cakeSize.length < 1 ||
      newItem.design.length < 1 ||
      newItem.toppings.length < 1
    ) {
      arr.push(errorCode.PRODUCT_MENU_OPTIONS_REQUIRED);
    }
    return arr;
  };
  const { title1, title2, price, image } = productData;
  const handleChange = (event) => {
    editCakeMsg(event.target.value);
  };
  const total = price + sumExtraCost;

  const handleClickAddToCart = () => {
    const err = errorMsgArr();
    if (err.length <= 0) {
      clearErrorMsgArr();
      saveNewItemToCart();
      setCurrentPage('CHECKOUT');
    } else {
      updateErrorMsgArr(err);
    }
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
          {PRODUCT_OPTIONS.map((option, id) => (
            <OptionSelector productOption={option} key={id} />
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
          <ErrorNotification />
          <div className='summary'>
            <div className='amount'>{`HK$ ${total}`}</div>
            <CustomButton
              buttonClassName='add-to-cart'
              style={{ marginRight: '10px' }}
              type='submit'
              onClick={() => {
                handleClickAddToCart();
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
  sumExtraCost: selectSumExtraCost,
  productData: selectProductData,
  amount: selectAmount,
  message: selectMessage,
  newItem: selectNewItem,
});

const mapDispatchToProps = (dispatch) => ({
  updateProductData: (increment) => dispatch(updateProductData(increment)),
  editCakeMsg: (text) => dispatch(editCakeMsg(text)),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  clearAll: () => dispatch(clearAll()),
  saveNewItemToCart: () => dispatch(saveNewItemToCart()),
  updateErrorMsgArr: (err) => dispatch(updateErrorMsgArr(err)),
  clearErrorMsgArr: () => dispatch(clearErrorMsgArr()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductMenu);
