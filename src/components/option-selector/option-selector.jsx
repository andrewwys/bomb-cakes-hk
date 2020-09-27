import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './option-selector.scss';
import { editCakeOptions } from '../../redux/cart/cart.actions';
import { updateOptionOnHover } from '../../redux/display/display.actions';
import { selectNewItem } from '../../redux/cart/cart.selectors';
import { selectOptionOnHover } from '../../redux/display/display.selectors';
// import {  } from '../../redux/display/display.selectors';

const OptionSelector = ({
  productOption: { id, optionName, optionCode, limit, optionValues },
  editCakeOptions,
  updateOptionOnHover,
  newItem,
  optionOnHover,
}) => {
  const displayOptionNames = () => {
    if (optionOnHover && Math.floor(optionOnHover.id / 100) * 100 === id) {
      return optionOnHover.name;
    } else return newItem[optionCode];
  };
  return (
    <div className='option-selector'>
      <span className='heading'>
        <div className='title'>{`${optionName}:`}&nbsp;&nbsp;</div>
        <div className='option-names'>{displayOptionNames()}</div>
        {/* //display selected option, or option on hover */}
      </span>
      <div className='options'>
        {optionValues.map((optionValue) => {
          const { image, id, name, ...others } = optionValue;
          const selectedClassName =
            name === newItem[optionCode] ? 'selected' : '';
          return (
            <div
              className={`option ${selectedClassName}`} //'option'
              style={{
                backgroundImage: `url(${image})`,
              }}
              id={id}
              onClick={() => editCakeOptions(optionValue)}
              onMouseEnter={() => updateOptionOnHover(optionValue)}
              onMouseLeave={() => updateOptionOnHover(null)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  newItem: selectNewItem,
  optionOnHover: selectOptionOnHover,
});

const mapDispatchToProps = (dispatch) => ({
  editCakeOptions: (id) => dispatch(editCakeOptions(id)),
  updateOptionOnHover: (value) => dispatch(updateOptionOnHover(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSelector);
