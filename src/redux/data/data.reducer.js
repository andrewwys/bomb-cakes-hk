import dataActionTypes from './data.types';

const INITIAL_STATE = {
  productDataPending: true,
  productDataError: null,
  productDataItems: [],  //added 'Items' to the name to distinguish from state.cart.newItem.productData
  productOptionsPending: true,
  productOptionsError: null,
  productOptions: [],
  orderDetailsPending: true,
  orderDetailsError: null,
  orderDetails: [],
};

const dataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case dataActionTypes.PRODUCT_DATA_SUCCESS:
      console.log('dataReducer: product data fetch success!');
      return {
        ...state,
        productDataPending: false,
        productDataError: null,
        productDataItems: action.payload,
      };
    case dataActionTypes.PRODUCT_DATA_ERROR:
      console.log('dataReducer: product data fetch error.');
      return {
        ...state,
        productDataPending: true,
        productDataError: action.payload,
      };
    case dataActionTypes.PRODUCT_OPTIONS_SUCCESS:
      console.log('dataReducer: product options fetch success!');
      return {
        ...state,
        productOptionsPending: false,
        productOptionsError: null,
        productOptions: action.payload,
      };
    case dataActionTypes.PRODUCT_OPTIONS_ERROR:
      console.log('dataReducer: product options fetch error.');
      return {
        ...state,
        productOptionsPending: true,
        productOptionsError: action.payload,
      };
    case dataActionTypes.ORDER_DETAILS_SUCCESS:
      console.log('dataReducer: order details fetch success!');
      return {
        ...state,
        orderDetailsPending: false,
        orderDetailsError: null,
        orderDetails: action.payload,
      };
    case dataActionTypes.ORDER_DETAILS_ERROR:
      console.log('dataReducer: order details fetch error.');
      return {
        ...state,
        orderDetailsPending: true,
        orderDetailsError: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
