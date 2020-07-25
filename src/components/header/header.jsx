import React from 'react';

import './header.scss';

import logo from '../../assets/images/logo-white.png';

const Header = () => (
  <div className='header'>
    <div className='option'>
      ORDER
    </div>
    <div className='option'>
      ABOUT
    </div>
    <div className='logo-container'>
      <img className='logo' src={logo}/>
    </div>
    <div className='option'>
      FAQ
    </div>
    <div className='option'>
      LOCATION
    </div>
  </div>
)

export default Header;

