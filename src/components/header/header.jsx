import React, { Component } from 'react';

import CustomButton from '../custom-button/custom-button';
import ModalBox from '../modal-box/modal-box';
import FullPageMenu from '../full-page-menu/full-page-menu';

import './header.scss';

import logo from '../../assets/images/logo-white.png';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundOpacity: 0,
      orderModalBoxVisible: false, 
      fullPageMenuVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateHeaderColor);
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateHeaderColor);
  }

  // The header top nav-bar will change its background opacity on scrolling when the 
  // window page Y offset position falls a certain range.
  // (i.e. between half of the window's height and the window's height)
  updateHeaderColor = () => {
    if (!this.state.fullPageMenuVisible) {
      const pos = window.pageYOffset;
      const height = window.innerHeight - 100; // deducting the header's height
      if (pos < height/2 ) this.setState({backgroundOpacity: 0}) 
      else if (pos > height) this.setState({backgroundOpacity: 1}) 
      else this.setState({backgroundOpacity: ((pos *2 / height) -1)});
    }
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

  toggleMenuDisplay = () => {
    // then displaying the full page menu, there are 3 changes on the screen:
    // 1. menu button turns to a cross
    // 2. Header background-color turns black
    // 3. Show full page menu
    if (!this.state.fullPageMenuVisible) {
      // setting full page menu to become visible (false --> true)
      this.setState({
        fullPageMenuVisible: true,
        backgroundOpacity: 1
      });
    } else {
      // setting full page menu to become visible (true --> false)
      this.setState({
        fullPageMenuVisible: false
      }, () => {this.updateHeaderColor()}
      );
    }
  }

  scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop-105) 

  render() {
    return(
      <nav 
        className='header' 
        style={{backgroundColor: `rgba(0, 0, 0, ${this.state.backgroundOpacity})`}}
      >
        <div 
          className={`menu-icon ${this.state.fullPageMenuVisible ? 'cross': '' }`}
          onClick={this.toggleMenuDisplay}
          style={this.state.fullPageMenuVisible ? {display: 'inline-block'} : null}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>
        <div className='option-wrapper'>
          {/* <div 
            className='option'
            onClick={ () => this.scrollToRef(this.props.pageRef.products) }
          > PRODUCTS
          </div>
          <div className='option'>
            ABOUT
          </div> */}
          <div className='logo-container'>
            <img className='logo' src={logo} alt='logo'/>
          </div>
          {/* <div 
            className='option'
            onClick={ () => this.scrollToRef(this.props.pageRef.faq) }
          > FAQ
          </div>
          <div className='option'>
            LOCATION
          </div> */}
        </div>        
        {/* <CustomButton 
          buttonClassName='header-order-button'
          onClick={this.showOrderModalBox}
        > ORDER NOW
        </CustomButton> */}
        <ModalBox 
          show={this.state.orderModalBoxVisible} 
          handleClose={this.closeOrderModalBox}
        > content content 
        </ModalBox>
        { this.state.fullPageMenuVisible 
          ? <FullPageMenu 
              scrollToRef={this.scrollToRef}
              pageRef={this.props.pageRef}
              toggleMenuDisplay={this.toggleMenuDisplay}
            /> 
          : null 
        }
      </nav>
    )
  }
}

export default Header;