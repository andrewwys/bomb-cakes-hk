import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './option-selector.scss';
import {
  editCakeOptions,
  //calculateCakePrice,
} from '../../redux/cart/cart.actions';
import { updateOptionOnHover } from '../../redux/display/display.actions';
import {
  selectNewItem,
  selectAccessories,
} from '../../redux/cart/cart.selectors';
import { selectOptionOnHover } from '../../redux/display/display.selectors';

const OptionSelector = ({
  productOption: { id, optionName, optionCode, optionValues },
  editCakeOptions,
  updateOptionOnHover,
  //calculateCakePrice,
  accessories,
  newItem,
  optionOnHover,
}) => {
  const isProductOption = id < 999 ? true : false; // is product option or checkout option
  const formatSelectedOptions = (options) => {
    return options.map((option, id) => (
      <div className='option-tag' key={id}>
        {option}
      </div>
    ));
  };
  const formatOptionOnHover = (name) => <div className='hover-tag'>{name}</div>;
  const displayOptionNames = () => {
    //determines what to show on option name label
    if (optionOnHover && Math.floor(optionOnHover.id / 100) * 100 === id) {
      return formatOptionOnHover(optionOnHover.name);
    } else if (isProductOption)
      return formatSelectedOptions(newItem[optionCode]);
    //newItem[optionCode];
    //returns property value in newItem corresponding to optionCode (e.g. newItem.decorations)
    else return formatSelectedOptions(accessories); //!
  };
  const handleClick = (value) => {
    editCakeOptions(value);
    //calculateCakePrice();
  };
  return (
    <div className='option-selector'>
      <div className='options'>
        {optionValues.map((optionValue, optionId) => {
          const { image, id, name } = optionValue;

          const selectionArray = isProductOption
            ? newItem[optionCode]
            : accessories;
          const selectedClassName = selectionArray.includes(name)
            ? 'selected'
            : '';
          return (
            <div
              className={`option ${selectedClassName}`} //'option'
              key={optionId}
              style={{
                backgroundImage: `url(${image})`,
              }}
              onClick={() => {
                handleClick(optionValue);
              }} //investigate why here execute once for each instance?
              onMouseEnter={() => updateOptionOnHover(optionValue)}
              onMouseLeave={() => updateOptionOnHover(null)}
              onMouseUp={() => updateOptionOnHover(null)}
            ></div>
          );
        })}
      </div>
      <span className='heading'>
        <div className='title'>{`${optionName}:`}&nbsp;&nbsp;</div>
        <div className='option-names'>{displayOptionNames()}</div>
        {/* //display selected option, or option on hover */}
      </span>
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
  updateOptionOnHover: (value) => dispatch(updateOptionOnHover(value)),
  // calculateCakePrice: () => dispatch(calculateCakePrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSelector);
