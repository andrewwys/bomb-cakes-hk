import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './option-selector.scss';
import {
  editCakeOptions,
  editOrderSelection,
} from '../../redux/cart/cart.actions';
import { updateOptionOnHover } from '../../redux/display/display.actions';
import {
  selectNewItem,
  selectAccessories,
} from '../../redux/cart/cart.selectors';
import { selectOptionOnHover } from '../../redux/display/display.selectors';

const OptionSelector = ({
  productOption: { id, optionName, optionCode, limit, optionValues },
  editCakeOptions,
  editOrderSelection,
  updateOptionOnHover,
  accessories,
  newItem,
  optionOnHover,
}) => {
  const isProductOption = id < 999 ? true : false; // is product option or checkout option
  const displayOptionNames = () => {
    if (optionOnHover && Math.floor(optionOnHover.id / 100) * 100 === id) {
      return optionOnHover.name;
    } else if (isProductOption) return newItem[optionCode];
    //returns property value in newItem corresponding to optionCode (e.g. newItem.decorations)
    else return accessories;
  };
  const handleClick = (optionValue) => {
    if (id <= 999) {
      editCakeOptions(optionValue);
    } else {
      editOrderSelection(optionValue);
    }
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
            name === newItem[optionCode] || name === accessories // indicate selection if name of option equals selected in state
              ? 'selected'
              : '';
          return (
            <div
              className={`option ${selectedClassName}`} //'option'
              style={{
                backgroundImage: `url(${image})`,
              }}
              id={id}
              onClick={() => handleClick(optionValue)}
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
  accessories: selectAccessories,
  newItem: selectNewItem,
  optionOnHover: selectOptionOnHover,
});

const mapDispatchToProps = (dispatch) => ({
  editCakeOptions: (value) => dispatch(editCakeOptions(value)),
  editOrderSelection: (value) => dispatch(editOrderSelection(value)),
  updateOptionOnHover: (value) => dispatch(updateOptionOnHover(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSelector);
