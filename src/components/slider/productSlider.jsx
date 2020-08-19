import React from 'react';

import CustomButton from '../custom-button/custom-button';

import './productSlider.scss';

import vanillaCakeImage from '../../assets/images/product-vanilla-cake.jpg';
import chocolateCakeImage from '../../assets/images/product-chocolate-cake.jpg';

const sampleText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const ProductSlider = () => {
  return (
    <div className='product-slider'>
      <div className='slide-container'>
        <div className='prev'>
          &lt;
        </div>
        <div 
          className='slide'
          style={{backgroundImage: `url(${chocolateCakeImage})`}}
        >
          <div className='slide-desc'>
            <h1>CHOCOLATE<br/>DREAM</h1>
            <p>{sampleText}</p>
            <CustomButton buttonClassName='order-product'>Order Now!</CustomButton>
          </div>
        </div>
        <div 
          className='slide'
          style={{backgroundImage: `url(${vanillaCakeImage})`}}
        >
          <div className='slide-desc'>
            <h1>VANILLA<br/>DREAM</h1> 
            <p>{sampleText}</p>
            <CustomButton buttonClassName='order-product'>Order Now!</CustomButton>
          </div>
        </div>
        <div className='next'>
          &gt;
        </div>
      </div>
      <div className='page-indicator'>
        <div className='dot'></div>
      </div>
    </div>
  );
}

export default ProductSlider;