import {
  PRODUCT_DATA,
  PRODUCT_OPTIONS,
  ORDER_DETAILS,
} from '../../product.data';

export const getOptionCode = (id) => {
  const catCode = Math.floor(id / 100) * 100;
  if (catCode < 999)
    return PRODUCT_OPTIONS.find((option) => option.id === catCode).optionCode;
  else return ORDER_DETAILS.find((option) => option.id === catCode).optionCode;
};

export const getOptionType = (id) => {
  const catCode = Math.floor(id / 100) * 100;
  if (catCode < 999)
    return PRODUCT_OPTIONS.find((option) => option.id === catCode);
  else return ORDER_DETAILS.find((option) => option.id === catCode);
};

export const newSelectedOptions = (currentValues, max, name) => {
  let newValues = [...currentValues];
  if (newValues.includes(name)) {
    return newValues.filter((value) => value !== name);
  } else {
    newValues.push(name);
    if (newValues.length > max) {
      newValues.splice(0, 1);
    }
    return newValues;
  }
};

export const findCostbyOptionValueName = (optionValues, valueToBeDeleted) => {
  let minusCost = 0;
  optionValues.forEach((optionValue) => {
    if (optionValue.name === valueToBeDeleted) {
      minusCost = optionValue.extraCost;
      console.log(minusCost);
    }
  });
  return minusCost;
};

export const loadProductData = (currentProductId, increment) => {
  const len = PRODUCT_DATA.length;
  const newProductId = currentProductId + increment;
  if (newProductId >= len) {
    return PRODUCT_DATA[0];
  } else if (newProductId < 0) {
    return PRODUCT_DATA[len - 1];
  } else return PRODUCT_DATA[newProductId];
};

export const newCartItemsAfterRemoving = (cartItems, payload) => {
  return cartItems.filter((cartItem) => cartItem !== payload);
};

export const newCartItemsAfterIncrement = (cartItems, payload) => {
  return cartItems.map((cartItem) => {
    if (cartItem === payload) {
      return { ...cartItem, quantity: cartItem.quantity + 1 };
    } else {
      return cartItem;
    }
  });
};

export const newCartItemsAfterReduce = (cartItems, payload) => {
  if (payload.quantity <= 1) {
    return newCartItemsAfterRemoving(cartItems, payload);
  } else
    return cartItems.map((cartItem) => {
      if (cartItem === payload) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      } else {
        return cartItem;
      }
    });
};
