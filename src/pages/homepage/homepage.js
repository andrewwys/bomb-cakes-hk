import React from 'react';
//import CallForAction from '../../components/call-for-action/call-for-action';
//import SimpleSlider from '../../components/slider/simpleSlider';
import InfoSection from '../../components/info-section/info-section';
import ProductSlider from '../../components/slider/productSlider';
// import ModalBox from '../../components/modal-box/modal-box';

import './homepage.scss';
//import backgroundImage from '../../assets/images/full-screen-background-cake-001.jpg';
import imageFaq from '../../assets/images/cake-icon-yellow.JPG';
import coverVideo from  '../../assets/images/LANDINGPAGE_Video.mp4';

const contentFaq = [
  'Each cake is handcrafted, orders require at-least 7 days in advance notice. The 7day advance begins when payment is received.',
  'Only Pick Up is available in Central (via VeggieSF).', 
  'All cakes will be decorated as listed; Cakes will have a final check brief and all sales are final.',
  'If customized designs are required a consultation/designer fee will be added to the cake charge.',
  'We’re not gluten-free/nut-free/allergen-free.',
  'Actual cake may look slightly different from the picture due to each designer’s techniques and materials available.'
]


const HomePage = (props) => {

  // Reference point objects for page scroll 
  props.pageRef.products = React.useRef(null); 
  props.pageRef.faq = React.useRef(null);

  return(  
    <div className='homepage'>

      {/* <div 
        className='cover-area'
        onClick={ () => scrollToRef(productEl) }
        style={{
          backgroundImage : `url(${backgroundImage})`,
          marginBottom: '40px',
          display: 'block',
          zIndex: 0,
          height: '100vh',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '50% 80%'
        }}
      > 
      </div>*/}

      <video className='cover-area' autoPlay loop muted playsInline>
        <source src={coverVideo} type='video/mp4'/>
      </video>
        {/* <div className='cover-image'></div> */}
        {/* <CallForAction /> */}
      <div 
        className='slider-container'
        ref={ props.pageRef.products }
      >
      <ProductSlider />
      </div>
      <span ref={ props.pageRef.faq }></span>
      <InfoSection 
        title='FAQ'
        image={ imageFaq }
        content={ contentFaq }
        // imageOnRight    // set image on right
      />
      {/* <ModalBox show={true} /> */}
    </div>
  );
}

export default HomePage;