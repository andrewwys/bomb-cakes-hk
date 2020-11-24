import moment from 'moment';
import CartActionTypes from './cart.types';
import {
  //getOptionCode,
  getOptionType,
  newSelectedOptions,
  loadProductData,
  newCartItemsAfterIncrement,
  newCartItemsAfterReduce,
  newCartItemsAfterRemoving,
  findCostbyOptionValueName,
} from './cart.utils';
import { PRODUCT_DATA } from '../../product.data';

const INITIAL_STATE = {
  cartItems: [],
  pickupDate: moment().add(3, 'days'),
  pickupHour: '12',
  pickupMin: '00',
  accessories: [],
  name: '',
  phone: '',
  email: '',
  comments: '',
  newItem: {
    productData: PRODUCT_DATA[0],
    cakeSize: [],
    design: [],
    toppings: [],
    decorations: [],
    message: '',
    quantity: 1,
    sumExtraCost: 0,
    amount: 488,
  },
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.EDIT_CAKE_OPTIONS:
      const optionType = getOptionType(action.payload.id); // return option type object from PRODUCT_OPTIONS
      const { optionCode, max, id, optionValues } = optionType; // optionType e.g. Cake Size: {id: 100, max: 1, optionCode: 'cakeSize'}
      const currentValues =
        id < 1000 ? state.newItem[optionCode] : state[optionCode]; // An array of the specific option of the new item.
      const { name, extraCost } = action.payload; //name and cost of the clicked option
      const operation = currentValues.includes(name) ? -1 : 1; // a multiplier, to determine add(1) or subtract(-1)
      let minusCost = 0;
      if (currentValues.length >= max && operation > 0) {
        minusCost = findCostbyOptionValueName(optionValues, currentValues[0]);
      }

      const newSumExtraCost =
        state.newItem.sumExtraCost + extraCost * operation - minusCost;

      if (id <= 999) {
        return {
          ...state,
          newItem: {
            ...state.newItem,
            sumExtraCost: newSumExtraCost,
            //amount: ,
            [optionCode]: newSelectedOptions(currentValues, max, name),
          },
        };
      } else {
        return {
          ...state,
          [optionCode]: newSelectedOptions(currentValues, max, name),
        };
      }
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
      console.log('cart-reducer: updata-product-data: ', action)
      return {
        ...state,
        newItem: {
          ...state.newItem,
          productData: loadProductData(
            state.newItem.productData.id, //3
            action.increment,
            action.productData
          ),
        },
      };
    case CartActionTypes.CLEAR_ALL:
      return {
        ...state,
        newItem: {
          productData: PRODUCT_DATA[0],
          cakeSize: [],
          design: [],
          toppings: [],
          decorations: [],
          message: '',
          quantity: 1,
          sumExtraCost: 0,
          amount: 488,
        },
      };
    // :::: Actions related to CART ::::
    case CartActionTypes.SAVE_NEW_ITEM_TO_CART:
      let newCartItems = [];
      if (state.cartItems.length > 0) {
        state.cartItems.forEach((item) => newCartItems.push(item));
      }
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
    case CartActionTypes.CLEAR_ORDER_DETAILS:
      return {
        ...state,
        pickupDate: moment().add(3, 'days'),
        pickupHour: '12',
        pickupMin: '00',
        accessories: [],
        name: '',
        phone: '',
        email: '',
        comments: '',
      };

    case CartActionTypes.CLEAR_AFTER_SUBMIT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default cartReducer;
