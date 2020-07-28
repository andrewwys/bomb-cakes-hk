import React, { Component } from 'react';

import './header.scss';

import logo from '../../assets/images/logo-white.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      backgroundOpacity: 0
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // The header top nav-bar will change its background opacity on scrolling when the 
  // window page Y offset position falls in a certain range (e.g. 270-530)
  handleScroll = () => {
    let pos = window.pageYOffset;
    if (pos < 270) this.setState({backgroundOpacity: 0}) 
    else if (pos > 530) this.setState({backgroundOpacity: 1}) 
    else this.setState({backgroundOpacity: (pos-270) / 260});
  }

  render() {
    return(
      <nav 
        className='header' 
        style={{backgroundColor: `rgba(0, 0, 0, ${this.state.backgroundOpacity})`}}
      >
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
      </nav>
    )
  }
}

export default Header;

