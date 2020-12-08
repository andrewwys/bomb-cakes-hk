import React from 'react';

import ReactMarkdown from 'react-markdown'

import './info-section.scss';

const InfoSection = ({ title, image, content, imageOnRight }) => {
  const flexDir = imageOnRight ? 'row-reverse' : 'row';
  return(
    <div 
      className='info-section'
      style={{flexDirection: flexDir}}
    >
      {image? <img src={`${image}`} alt={`${title}`}/> : null}
      <div className='content'>
        <h1 className='content-title'>{title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default InfoSection;