import React, { Component } from 'react';

import CustomButton from '../custom-button/custom-button';
import ModalBox from '../modal-box/modal-box';

import './header.scss';

import logo from '../../assets/images/logo-white.png';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      backgroundOpacity: 0,
      orderModalBoxVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  // The header top nav-bar will change its background opacity on scrolling when the 
  // window page Y offset position falls a certain range.
  // (i.e. between half of the window's height and the window's height)
  handleScroll = () => {
    const pos = window.pageYOffset;
    const height = window.innerHeight - 100; // deducting the header's height
    if (pos < height/2 ) this.setState({backgroundOpacity: 0}) 
    else if (pos > height) this.setState({backgroundOpacity: 1}) 
    else this.setState({backgroundOpacity: ((pos *2 / height) -1)});
  }

  showOrderModalBox = () => {
    this.setState({ orderModalBoxVisible: true});
  }

  closeOrderModalBox = (event) => {
    const closeBox = event.target.id;
    if (closeBox === 'modalBackground' || closeBox === 'closeButton') {
      this.setState({ orderModalBoxVisible: false});
    }
  }

  render() {
    return(
      <nav 
        className='header' 
        style={{backgroundColor: `rgba(0, 0, 0, ${this.state.backgroundOpacity})`}}
      >
        <div className='option-wrapper'>
          <div className='option'>
            PRODUCTS
          </div>
          <div className='option'>
            ABOUT
          </div>
          <div className='logo-container'>
            <img className='logo' src={logo} alt='logo'/>
          </div>
          <div className='option'>
            FAQ
          </div>
          <div className='option'>
            LOCATION
          </div>
        </div>        
        <CustomButton 
          buttonClassName='header-order-button'
          onClick={this.showOrderModalBox}
        > ORDER NOW
        </CustomButton>
        <ModalBox 
          show={this.state.orderModalBoxVisible} 
          handleClose={this.closeOrderModalBox}
        > content content 
        </ModalBox>
      </nav>
    )
  }
}

export default Header;