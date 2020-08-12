import React from 'react';

import CustomButton from '../custom-button/custom-button';

import './full-page-menu.scss';

const FullPageMenu = () => (
    <div className='full-page-menu'>
      <div className='menu-option'>
        PRODUCTS
      </div>
      <div className='menu-option'>
        ABOUT
      </div>
      <div className='menu-option'>
        FAQ
      </div>
      <div className='menu-option'>
        LOCATION
      </div>
      {/* <CustomButton 
        buttonClassName='header-order-button'
      > ORDER NOW
      </CustomButton> */}
    </div>
);

export default FullPageMenu;