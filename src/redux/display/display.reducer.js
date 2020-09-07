import displayActionTypes from './display.types';

const INITIAL_STATE = {
  currentProductOptions: [],
  orderMode: false,
  currentPage: '',
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
    default:
      return state;
  }
};

export default displayReducer;
