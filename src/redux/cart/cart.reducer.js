import CartActionTypes from './cart.types';
import {
  getOptionCode,
  loadProductData,
  newCartItemsAfterIncrement,
  newCartItemsAfterReduce,
  newCartItemsAfterRemoving,
} from './cart.utils';
import { PRODUCT_DATA } from '../../product.data';

const INITIAL_STATE = {
  cartItems: [],
  pickupDate: null,
  pickupHour: '',
  pickupMin: '',
  accessories: [],
  name: '',
  phone: '',
  email: '',
  comments: '',
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
      const cakeProp = getOptionCode(action.payload.id);
      return {
        ...state,
        newItem: {
          ...state.newItem,
          [cakeProp]: action.payload.name,
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

    // :::: Actions related to ORDER DETAILS ::::
    case CartActionTypes.SET_PICKUP_DATE:
      return {
        ...state,
        pickupDate: action.payload, //moment object
      };
    case CartActionTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case CartActionTypes.EDIT_ORDER_SELECTION:
      const optionCode = getOptionCode(action.payload.id);
      return {
        ...state,
        [optionCode]: action.payload.name,
      };
    default:
      return state;
  }
};

export default cartReducer;
