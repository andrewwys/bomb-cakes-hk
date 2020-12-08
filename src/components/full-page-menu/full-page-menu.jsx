import React from 'react';

// import CustomButton from '../custom-button/custom-button';

import './full-page-menu.scss';
import { ReactComponent as FacebookIcon } from '../../assets/images/facebook.svg';
import { ReactComponent as InstagramIcon } from '../../assets/images/instagram.svg';
import { ReactComponent as EmailIcon } from '../../assets/images/email.svg';

const FullPageMenu = ({ scrollToRef, pageRef, toggleMenuDisplay }) => {
  const handleMenuClick = (item) => {
    scrollToRef(item);
    toggleMenuDisplay();
  };

  return (
    <div className='full-page-menu'>
      <div
        className='menu-option'
        onClick={() => handleMenuClick(pageRef.products)}
      >
        {' '}
        PRODUCTS
      </div>
      <div className='menu-option'>ABOUT</div>
      <div className='menu-option' onClick={() => handleMenuClick(pageRef.faq)}>
        {' '}
        FAQ
      </div>
      <div className='menu-option'>LOCATION</div>
      {/* <CustomButton 
        buttonClassName='header-order-button'
      > ORDER NOW
      </CustomButton> */}
      <div className='icon-container'>
        <a href='https://www.facebook.com/BombCakesHK/' target='_blank' rel='noopener noreferrer'>
          <FacebookIcon style={{ paddingBottom: '2px', marginRight: '2px' }} />
        </a>
        <a href='https://www.instagram.com/bombcakes.hk/' target='_blank' rel='noopener noreferrer'>
          <InstagramIcon />
        </a>
        <a href='mailto:order@bombcakeshk.com' target='_blank' rel='noopener noreferrer'>
          <EmailIcon style={{ marginTop: '1px' }} />
        </a>
      </div>
    </div>
  );
};

export default FullPageMenu;
