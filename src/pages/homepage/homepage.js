import React, { useEffect, useState }  from 'react';
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
// import imageFaq from '../../assets/images/cake-icon-yellow.JPG';
import coverVideo from '../../assets/images/LANDINGPAGE_Video.mp4';
import {apiPaths} from '../../env';

const ThankYou = () => (
  <h1 className='thank-you'>
    Thank you for your order! We will be in contact shortly to confirm the
    details and proceed to payment.
  </h1>
);

const HomePage = ({ orderMode, currentPage, ...props }) => {
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiPaths.INFORMATION_SECTIONS}`);
        const newData = await response.json();
        setData(newData);
      } catch(err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.id]);

  const renderInfoSections = () => {
    if (data !== null) {
      if (Array.isArray(data)) {
        const display =  data.map((section)=>{
        const {title, richText, imageOnRight, picture} = section;
        return(
          <InfoSection
            key={section.id}
            title={title}
            image={picture ? `${picture.url}` : null}
            content={richText} //data[0].richText}
            imageOnRight={imageOnRight} // set image on right
          />
        )
        })
        return display;
      } else return null;
    } else return null;
  }

  // Reference point objects for page scroll
  props.pageRef.products = React.useRef(null);
  props.pageRef.faq = React.useRef(null);
  let modalChild = null;
  if (currentPage === 'PRODUCT_MENU') {
    modalChild = <ProductMenu />;
  } else if (currentPage === 'CHECKOUT') {
    modalChild = <Checkout />;
  } else if (currentPage === 'THANK_YOU') {
    modalChild = <ThankYou />;
  }
  return (
    <div className='homepage'>
      <video className='cover-area' autoPlay loop muted playsInline>
        <source src={coverVideo} type='video/mp4' />
      </video>
      <div className='slider-container' ref={props.pageRef.products}>
        <ProductSlider />
      </div>
      {/* an anchor */}
      <span ref={props.pageRef.faq}></span> 
      {renderInfoSections()}
      {orderMode ? <ModalBox>{modalChild}</ModalBox> : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orderMode: selectOrderMode,
  currentPage: selectCurrentPage,
});

export default connect(mapStateToProps)(HomePage);
