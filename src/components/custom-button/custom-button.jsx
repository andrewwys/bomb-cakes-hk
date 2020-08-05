import React from 'react';

import './custom-button.scss';

const CustomButton = ({ children, buttonClassName, ...otherProps}) => (
  <button 
    className={`general-button ${buttonClassName}`}
    {...otherProps}
  >
    {children}
  </button>
)

export default CustomButton;