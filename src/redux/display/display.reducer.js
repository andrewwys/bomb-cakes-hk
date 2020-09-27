import { setCurrentPage } from './display.actions';
import displayActionTypes from './display.types';

const INITIAL_STATE = {
  currentProductOptions: [],
  orderMode: false,
  currentPage: 'PRODUCT_MENU',
  optionOnHover: null,
};

const displayReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case displayActionTypes.TOGGLE_ORDER_MODE:
      return {
        ...state,
        orderMode: !state.orderMode,
      };
    case displayActionTypes.TURN_OFF_ORDER_MODE:
      return {
        ...state,
        orderMode: false,
      };
    case displayActionTypes.UPDATE_OPTION_ON_HOVER:
      return {
        ...state,
        optionOnHover: action.payload,
      };
    case displayActionTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

export default displayReducer;
