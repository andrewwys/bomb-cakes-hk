import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CustomButton from '../custom-button/custom-button';

import './modal-box.scss';

import { selectOrderMode } from '../../redux/display/display.selectors';
// import { toggleOrderMode } from '../../redux/display/display.actions';
import {
  turnOffOrderMode,
  clearErrorMsgArr,
} from '../../redux/display/display.actions';

const ModalBox = ({
  // toggleOrderMode,
  turnOffOrderMode,
  clearErrorMsgArr,
  children,
  orderMode,
}) => {
  const showClassName = orderMode ? 'display-ui' : 'display-none';
  // console.log('orderMode is ', orderMode);

  return (
    <div className={`modal-background ${showClassName}`} id='modalBackground'>
      <div className='modal-main'>
        <div className='button-container'>
          <CustomButton
            buttonClassName='close-button'
            onClick={() => {
              turnOffOrderMode();
              clearErrorMsgArr();
            }}
            id='closeButton'
          >
            {' '}
            X{' '}
          </CustomButton>
        </div>
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  orderMode: selectOrderMode,
});

const mapDispatchToProps = (dispatch) => ({
  // toggleOrderMode: () => dispatch(toggleOrderMode()),
  turnOffOrderMode: () => dispatch(turnOffOrderMode()),
  clearErrorMsgArr: () => dispatch(clearErrorMsgArr()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalBox);
