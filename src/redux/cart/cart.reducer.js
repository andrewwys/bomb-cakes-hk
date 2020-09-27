import CartActionTypes from './cart.types';
import {
  editCakeProp,
  loadProductData,
  newCartItemsAfterIncrement,
  newCartItemsAfterReduce,
  newCartItemsAfterRemoving,
} from './cart.utils';
import { PRODUCT_DATA } from '../../product.data';

const INITIAL_STATE = {
  cartItems: [],
  pickupDate: '',
  pickupTime: '',
  accessories: [],
  name: 'Sample Customer',
  phone: '909090909',
  email: 'customer@gmail.com',
  comments: 'hahaha',
  newItem: {
    productData: PRODUCT_DATA[0],
    cakeSize: '',
    design: '',
    toppings: '',
    decorations: '',
    message: '',
    quantity: 1,
    amount: 488,
  },
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.EDIT_CAKE_OPTIONS:
      const cakeProp = editCakeProp(action.payload.id);
      return {
        ...state,
        newItem: {
          ...state.newItem,
          [`${cakeProp}`]: action.payload.name,
        },
      };
    case CartActionTypes.EDIT_CAKE_MSG:
      return {
        ...state,
        newItem: {
          ...state.newItem,
          message: action.payload,
        },
      };
    case CartActionTypes.SET_PRODUCT_DATA:
      return {
        ...state,
        newItem: {
          ...state.newItem,
          productData: action.payload,
        },
      };
    case CartActionTypes.UPDATE_PRODUCT_DATA:
      return {
        ...state,
        newItem: {
          ...state.newItem,
          productData: loadProductData(
            state.newItem.productData.id,
            action.payload
          ),
        },
      };
    case CartActionTypes.CLEAR_ALL:
      const newState = INITIAL_STATE;
      newState.cartItems = [];
      return newState;
    // :::: Actions related to CART ::::
    case CartActionTypes.SAVE_NEW_ITEM_TO_CART:
      let newCartItems = state.cartItems;
      newCartItems.push(state.newItem);
      return {
        ...state,
        cartItems: newCartItems,
        newItem: INITIAL_STATE.newItem,
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: newCartItemsAfterRemoving(state.cartItems, action.payload),
      };
    case CartActionTypes.REDUCE_QTY:
      return {
        ...state,
        cartItems: newCartItemsAfterReduce(state.cartItems, action.payload),
      };
    case CartActionTypes.INCREMENT_QTY:
      return {
        ...state,
        cartItems: newCartItemsAfterIncrement(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
