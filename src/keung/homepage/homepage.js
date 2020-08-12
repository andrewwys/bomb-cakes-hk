import React from 'react';
//import CallForAction from '../../components/call-for-action/call-for-action';
import SimpleSlider from '../../components/slider/simpleSlider';
import InfoSection from '../../components/info-section/info-section';

import './homepage.scss';
import backgroundImage from '../../assets/images/full-screen-background-cake-001.jpg';
//import imageFaq from '../../assets/images/cake-icon-yellow.JPG';
import imageFaq from '../../assets/images/cake-icon-yellow.JPG';
import imageFaq2 from '../../assets/images/background-cake-001.jpg';

const contentFaq = [
  'Each cake is handcrafted, orders require at-least 7 days in advance notice. The 7day advance begins when payment is received.',
  'Only Pick Up is available in Central (via VeggieSF).', 
  'All cakes will be decorated as listed; Cakes will have a final check brief and all sales are final.',
  'If customized designs are required a consultation/designer fee will be added to the cake charge.',
  'We’re not gluten-free/nut-free/allergen-free.',
  'Actual cake may look slightly different from the picture due to each designer’s techniques and materials available.'
]
const contentFaq2 = [
  'contentFaq2 row1',
  'contentFaq2 row2', 
  'contentFaq2 row3',
  'contentFaq2 row4',
  'contentFaq2 row5',
  'contentFaq2 row6'
]
const HomePage = () => {
  return(  
    <div className='homepage'>
      <div className='cover-area'
           style={{
              backgroundImage : `url(${backgroundImage})` ,
                              //  'url(......background-cake-001.JPG)'
              marginBottom: '40px',
              display: 'block',
              zIndex: 0,
              height: '150vh',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '50% 80%'
            }}
      >
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
        direction='row-reverse'
      />
      <InfoSection title='FAQ2' image={ imageFaq2 } content={contentFaq2} />
    </div>
  );
}

export default HomePage;