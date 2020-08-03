import React from 'react';

import './info-section.scss';

const InfoSection = ({ title, image, content }) => {
  return(
    <div className='info-section'>
      <img src={`${image}`} alt={`${title}`}/>
      <div className='content'>
        <h1 className='content-title'>{title}</h1>
        <ul className='content-list'>
          {content.map((row) =>
            <li className='list-item' key={row.id} >{row}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InfoSection;