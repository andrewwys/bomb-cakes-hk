import { PRODUCT_DATA } from '../../product.data';

export const editCakeProp = (id) => {
  switch (Math.floor(id / 100)) {
    case 1:
      return 'cakeSize';
    case 2:
      return 'design';
    case 3:
      return 'toppings';
    case 4:
      return 'decorations';
  }
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
  return cartItems.filter((cartItem) => cartItem != payload);
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
