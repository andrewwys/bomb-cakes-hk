import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectOrderMode } from '../../redux/display/display.selectors';
import { selectCurrentPage } from '../../redux/display/display.selectors';

import InfoSection from '../../components/info-section/info-section';
import ProductSlider from '../../components/slider/productSlider';
import ModalBox from '../../components/modal-box/modal-box';
import ProductMenu from '../product-menu/product-menu';
import Checkout from '../checkout/checkout';

import './homepage.scss';
import imageFaq from '../../assets/images/cake-icon-yellow.JPG';
import coverVideo from '../../assets/images/LANDINGPAGE_Video.mp4';

const contentFaq = [
  'Each cake is handcrafted, orders require at-least 7 days in advance notice. The 7day advance begins when payment is received.',
  'Only Pick Up is available in Central (via VeggieSF).',
  'All cakes will be decorated as listed; Cakes will have a final check brief and all sales are final.',
  'If customized designs are required a consultation/designer fee will be added to the cake charge.',
  'We’re not gluten-free/nut-free/allergen-free.',
  'Actual cake may look slightly different from the picture due to each designer’s techniques and materials available.',
];

const HomePage = ({ orderMode, currentPage, ...props }) => {
  // Reference point objects for page scroll
  props.pageRef.products = React.useRef(null);
  props.pageRef.faq = React.useRef(null);
  let modalChild = null;
  if (currentPage === 'PRODUCT_MENU') {
    modalChild = <ProductMenu />;
  } else if (currentPage === 'CHECKOUT') {
    modalChild = <Checkout />;
  }
  return (
    <div className='homepage'>
      <video className='cover-area' autoPlay loop muted playsInline>
        <source src={coverVideo} type='video/mp4' />
      </video>
      <div className='slider-container' ref={props.pageRef.products}>
        <ProductSlider />
      </div>
      <span ref={props.pageRef.faq}></span>
      <InfoSection
        title='FAQ'
        image={imageFaq}
        content={contentFaq}
        imageOnRight // set image on right
      />
      {orderMode ? <ModalBox>{modalChild}</ModalBox> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orderMode: selectOrderMode,
  currentPage: selectCurrentPage,
});

export default connect(mapStateToProps)(HomePage);
