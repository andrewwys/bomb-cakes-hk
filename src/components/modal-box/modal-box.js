import React from 'react';

import CustomButton from '../custom-button/custom-button';

import './modal-box.scss';

const ModalBox = ({ handleClose, show, children }) => {
  const showClassName = show ? 'display-ui' : 'display-none'

  return (
    <div 
      className={`modal-background ${showClassName}`} 
      id='modalBackground'
      onClick={ handleClose }
    >
      <div className='modal-main'>
        <div className='button-container'>
          <CustomButton  
            buttonClassName='close-button'
            onClick={ handleClose }
            id='closeButton'
          > X </CustomButton>
        </div>

        { children }
      </div>
    </div>
  );
}

export default ModalBox;