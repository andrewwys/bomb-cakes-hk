import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './option-selector.scss';
import { ROOT_API_PATH } from '../../env';
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
//import { selectProductOptions } from '../../redux/data/data.selectors';

const OptionSelector = ({
  //productOptions,
  productOption: { optId, optionName, optionCode, optionValues },
  editCakeOptions,
  updateOptionOnHover,
  //calculateCakePrice,
  accessories,
  newItem,
  optionOnHover,
}) => {
  const isProductOption = optId < 999 ? true : false; // is product option or checkout option
  const formatSelectedOptions = (options) => {
    return options.map((option, optId) => (
      <div className='option-tag' key={optId}>
        {option}
      </div>
    ));
  };
  const formatOptionOnHover = (name) => <div className='hover-tag'>{name}</div>;
  const displayOptionNames = () => {
    //determines what to show on option name label
    if (optionOnHover && Math.floor(optionOnHover.optId / 100) * 100 === optId) {
      return formatOptionOnHover(optionOnHover.name);
    } else if (isProductOption)
      return formatSelectedOptions(newItem[optionCode]);
    //newItem[optionCode];
    //returns property value in newItem corresponding to optionCode (e.g. newItem.decorations)
    else return formatSelectedOptions(accessories); //!
  };
  const handleClick = (value) => {
    editCakeOptions(value);
  };
  return (
    <div className='option-selector'>
      <div className='options'>
        {optionValues.map((optionValue, optionId) => {
          const { image: {url}, name } = optionValue;
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
                backgroundImage: `url(${ROOT_API_PATH}${url})`,
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
  // productOptions: selectProductOptions,
});

const mapDispatchToProps = (dispatch) => ({
  editCakeOptions: (value) => dispatch(editCakeOptions(value)),
  updateOptionOnHover: (value) => dispatch(updateOptionOnHover(value)),
  // calculateCakePrice: () => dispatch(calculateCakePrice()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionSelector);
