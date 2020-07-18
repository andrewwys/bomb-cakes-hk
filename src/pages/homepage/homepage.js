import React from 'react';
//import CallForAction from '../../components/call-for-action/call-for-action';
import SimpleSlider from '../../components/slider/simpleSlider';
import InfoSection from '../../components/info-section/info-section';

import './homepage.scss';
import imageFaq from '../../assets/images/cake-icon-yellow.JPG';

const contentFaq = [
  'Each cake is handcrafted, orders require at-least 7 days in advance notice. The 7day advance begins when payment is received.',
  'Only Pick Up is available in Central (via VeggieSF).', 
  'All cakes will be decorated as listed; Cakes will have a final check brief and all sales are final.',
  'If customized designs are required a consultation/designer fee will be added to the cake charge.',
  'We’re not gluten-free/nut-free/allergen-free.',
  'Actual cake may look slightly different from the picture due to each designer’s techniques and materials available.'
]

const HomePage = () => {
  return(  
    <div className='homepage'>
      <div className='cover-area'>
        {/* <div className='cover-image'></div> */}
        {/* <CallForAction /> */}
      </div>
      <div className='slider-container'>
        <SimpleSlider />
      </div>
      <InfoSection 
        title='FAQ'
        image={ imageFaq }
        content={ contentFaq }
      />
    </div>
  );
}

export default HomePage;