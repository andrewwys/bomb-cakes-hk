const CartActionTypes = {
  // Below are actions affecting NEW ITEMS:
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  // CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
  SET_PRODUCT_DATA: 'SET_PRODUCT_DATA',
  UPDATE_PRODUCT_DATA: 'UPDATE_PRODUCT_DATA',
  EDIT_CAKE_OPTIONS: 'EDIT_CAKE_OPTIONS',
  EDIT_CAKE_MSG: 'EDIT_CAKE_MSG',
  CLEAR_ALL: 'CLEAR_ALL',
  SAVE_NEW_ITEM_TO_CART: 'SAVE_NEW_ITEM_TO_CART',

  //Below are actions related to CART:
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  REDUCE_QTY: 'REDUCE_QTY',
  INCREMENT_QTY: 'INCREMENT_QTY',

  //Below are actions related to ORDER DETAILS:
  SET_PICKUP_DATE: 'SET_PICKUP_DATE',
  SET_ORDER_DETAILS: 'SET_ORDER_DETAILS',
  EDIT_ORDER_SELECTION: 'EDIT_ORDER_SELECTION',
};

export default CartActionTypes;
