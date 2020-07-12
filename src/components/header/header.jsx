import React from 'react';
//import { Link } from 'react-router-dom';
import './header.scss';

const Header = () => (
  <div className='header'>
    <div className='option' to='/'>
      ORDER
    </div>
    <div className='option' to='/'>
      ABOUT
    </div>
    <div className='logo'>
      LOGO
    </div>
    <div className='option' to='/'>
      FAQ
    </div>
    <div className='option' to='/'>
      LOCATION
    </div>
  </div>
)

export default Header;

{/* 
  <div className='options'>
<Link className='option' to='/'>
  ORDER
</Link>
<Link className='option' to='/'>
  ABOUT
</Link>
</div>
<Link className='logo-container' to="/">
<div className='logo'></div>
</Link>
<div className='options'>
<Link className='option' to='/'>
  FAQ
</Link>
<Link className='option' to='/'>
  LOCATION
</Link>
</div> 
*/}