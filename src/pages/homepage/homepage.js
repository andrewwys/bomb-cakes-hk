import React from 'react';
import CallForAction from '../../components/call-for-action/call-for-action';
import SimpleSlider from '../../components/slider/simpleSlider';
import './homepage.scss'

const HomePage = () => (
  //<HeaderNavBar />
    <div className='homepage'>
      <div className='cover-area'>
        <div className='cover-image'></div>
        <CallForAction />
      </div>
      <div className='slider-container'>
        <SimpleSlider />
      </div>
    </div>

)

export default HomePage;