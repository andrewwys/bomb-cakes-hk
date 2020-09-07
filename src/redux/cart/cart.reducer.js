import CartActionTypes from './cart.types';

const INITIAL_STATE = {
  cartItems: [],
  pickupDate: '',
  pickupTime: '',
  accessories: [],
  name: '',
  phone: '',
  email: '',
  comments: '',
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;
