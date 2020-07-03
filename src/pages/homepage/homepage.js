import React from 'react';
import CallForAction from '../../components/call-for-action/call-for-action';
import './homepage.scss'

const HomePage = () => (
  //<HeaderNavBar />
    <div className='homepage'>
      <div className='cover-area'>
        <div 
          className='cover-image'
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&w=1000&q=80)`,}}
          >
        </div>
        <CallForAction />
      </div>
      
    </div>
  //<Slider />
)

export default HomePage;