import React from 'react';

import './info-section.scss';

const InfoSection = ({ title, image, content, direction }) => {
  return(
    <div className='info-section' style={{flexDirection: direction}}>
     {/* <style> {`flex-direction: ${direction}`} </style>  */}



      <img src={`${image}`} alt={'${title}'} />

      <div className='content'>
        <h1 className='content-title'>{title}Test</h1>
        <ul className='content-list'>
          {content.map((row) =>
            <li className='list-item'>{row}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InfoSection;