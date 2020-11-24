import DataActionTypes from './data.types';
import { apiPaths } from '../../env';

export const productDataSuccess = (data) => ({
  type: DataActionTypes.PRODUCT_DATA_SUCCESS,
  payload: data,
});

export const productDataError = (error) => ({
  type: DataActionTypes.PRODUCT_DATA_ERROR,
  payload: error,
});

export const fetchProductData = () => (dispatch) => {
  console.log('fetching product data.');
  fetch(apiPaths.PRODUCT_DATA)
    .then((res) => res.json())
    .then((res) => {
      dispatch(productDataSuccess(res));
    })
    .catch((err) => {
      dispatch(productDataError(err));
    });
};

export const productOptionsSuccess = (data) => ({
  type: DataActionTypes.PRODUCT_OPTIONS_SUCCESS,
  payload: data,
});

export const productOptionsError = (error) => ({
  type: DataActionTypes.PRODUCT_OPTIONS_ERROR,
  payload: error,
});

export const fetchProductOptions = () => (dispatch) => {
  fetch(apiPaths.PRODUCT_OPTIONS)
    .then((res) => res.json())
    .then((res) => {
      dispatch(productOptionsSuccess(res));
    })
    .catch((err) => {
      dispatch(productOptionsError(err));
    });
};

export const orderDetailsSuccess = (data) => ({
  type: DataActionTypes.ORDER_DETAILS_SUCCESS,
  payload: data,
});

export const orderDetailsError = (error) => ({
  type: DataActionTypes.ORDER_DETAILS_ERROR,
  payload: error,
});

export const fetchOrderDetails = () => (dispatch) => {
  fetch(apiPaths.ORDER_DETAILS)
    .then((res) => res.json())
    .then((res) => {
      dispatch(orderDetailsSuccess(res));
    })
    .catch((err) => {
      dispatch(orderDetailsError(err));
    });
};
