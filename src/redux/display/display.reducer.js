import displayActionTypes from './display.types';

const INITIAL_STATE = {
  currentProductOptions: [],
  orderMode: false,
  currentPage: 'PRODUCT_MENU',
  optionOnHover: null,
  popErrorMsg: [],
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
    case displayActionTypes.UPDATE_ERROR_MSG_ARR:
      return {
        ...state,
        popErrorMsg: action.payload,
      };
    case displayActionTypes.CLEAR_ERROR_MSG_ARR:
      return {
        ...state,
        popErrorMsg: [],
      };
    default:
      return state;
  }
};

export default displayReducer;
