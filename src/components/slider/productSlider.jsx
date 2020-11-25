import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectProductDataItems, selectProductDataError } from '../../redux/data/data.selectors';
import {
  setCurrentPage,
  toggleOrderMode,
} from '../../redux/display/display.actions';

import CustomButton from '../custom-button/custom-button';

import './productSlider.scss';

import { PRODUCT_DATA } from '../../product.data';
import { ROOT_API_PATH } from '../../env';
import { setProductData } from '../../redux/cart/cart.actions';

class ProductSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfSlides: window.innerWidth < 700 ? 1 : 2, // number of slides to display matching media query in scss file
      slideCount: 0, // an index to determine which slide to render, can be changed by clicking prev and next button
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    if (window.innerWidth < 700 && this.state.numOfSlides === 2) {
      this.setState({
        numOfSlides: 1,
      });
    } else if (window.innerWidth >= 700 && this.state.numOfSlides === 1) {
      this.setState({
        numOfSlides: 2,
      });
    }
  };

  renderSlide = (product) => {
    //const { title1, title2, desc, id, image, button } = product;
    const {
      title1,
      title2,
      desc,
      id,
      image: { url },
      button,
    } = product;
    const { toggleOrderMode, setCurrentPage, setProductData } = this.props;
    const handleClick = () => {
      setProductData(product);
      toggleOrderMode();
      setCurrentPage('PRODUCT_MENU');
    };
    return (
      <div
        className='slide'
        style={{ backgroundImage: `url(${ROOT_API_PATH}${url})` }}
        key={id}
      >
        <div className='slide-desc'>
          <h1>
            {title1}
            <br />
            {title2}
          </h1>
          <p>{desc}</p>
          <CustomButton buttonClassName='order-product' onClick={handleClick}>
            {button}
          </CustomButton>
        </div>
      </div>
    );
  };

  renderSlideShow = () => {
    const { productData, productDataError } = this.props;
    const slideCount = this.state.slideCount;
    const activeProducts = [];

    if (!productDataError) {
      // adding products to activeProducts for displayed on screen
      for (let i = 0; i < this.state.numOfSlides; i++) {
      //activeProducts.push(PRODUCT_DATA[(slideCount + i) % PRODUCT_DATA.length]);
      activeProducts.push(productData[(slideCount + i) % productData.length]);
      }
      return activeProducts.map((product) => this.renderSlide(product));
    } else return (
      <div>Shopping cart service is not available now. To order, please {' '}
        <a href='mailto:order@bombcakeshk.com' target='_blank'>contact us</a> {' '}
      by email.</div>
    );
  };

  handleClick = (event) => {
    const increment = this.state.numOfSlides;
    const slideCount = this.state.slideCount;
    if (event.target.id === 'next') {
      this.setState({ slideCount: slideCount + increment });
    } else if (event.target.id === 'prev') {
      if (slideCount <= increment - 1) {
        // this.setState({ slideCount: PRODUCT_DATA.length - increment });
        this.setState({ slideCount: this.props.productData.length - increment });
      } else {
        this.setState({ slideCount: slideCount - increment });
      }
    }
  };

  productIdIsActive = (pid) => {
    const len = this.props.productData.length; // no. of items in the product list
    const slideCount = this.state.slideCount % len; // current count mod len = lowest id of active items
    const numOfSlides = this.state.numOfSlides; // total number of active slides
    if (pid >= slideCount && pid <= slideCount + numOfSlides - 1) {
      return true;
    } else if (slideCount === len - 1 && pid === 0 && numOfSlides === 2) {
      return true;
    } else return false;
  };

  renderDots = () => {
    return this.props.productData.map((p) => (
      <div
        className={`dot ${this.productIdIsActive(p.id) ? 'dot-active' : ''}`}
        id={p.id}
        key={p.id}
        // onClick={this.handleClickDot}
      ></div>
    ));
  };

  // handleClickDot = (event) => {
  //   this.setState({ slideCount: parseInt(event.target.id) });
  // }

  render() {
    return (
      <div className='product-slider'>
        <div className='slide-container'>
          <div id='prev' className='prev' onClick={this.handleClick}>
            &lt;
          </div>
          {this.renderSlideShow()}
          <div id='next' className='next' onClick={this.handleClick}>
            &gt;
          </div>
        </div>
        <div className='page-indicator'>
          {/* <div className='dot'></div> */}
          {this.renderDots()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  productData: selectProductDataItems,
  productDataError: selectProductDataError,

});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
  setProductData: (product) => dispatch(setProductData(product)),
  toggleOrderMode: () => dispatch(toggleOrderMode()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductSlider);
