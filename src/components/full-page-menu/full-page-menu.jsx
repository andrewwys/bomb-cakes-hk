import React from 'react';

// import CustomButton from '../custom-button/custom-button';

import './full-page-menu.scss';

const FullPageMenu = ({ scrollToRef, pageRef, toggleMenuDisplay }) => {

  const handleMenuClick = (item) => {
    scrollToRef(item);
    toggleMenuDisplay();
  }

  return (
    <div className='full-page-menu'>
      <div 
        className='menu-option'
        onClick={ () => handleMenuClick(pageRef.products) }
      >  PRODUCTS
      </div>
      <div className='menu-option'>
        ABOUT
      </div>
      <div 
        className='menu-option'
        onClick={ () => handleMenuClick(pageRef.faq) }
      > FAQ
      </div>
      <div className='menu-option'>
        LOCATION
      </div>
      {/* <CustomButton 
        buttonClassName='header-order-button'
      > ORDER NOW
      </CustomButton> */}
    </div>
)};

export default FullPageMenu;