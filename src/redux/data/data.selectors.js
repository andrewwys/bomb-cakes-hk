import { createSelector } from 'reselect';

const selectData = (state) => state.data;

export const selectProductDataItems = createSelector(
  [selectData],
  (data) => data.productDataItems
);

export const selectProductOptions = createSelector(
  [selectData],
  (data) => data.productOptions
);

export const selectOrderDetails = createSelector(
  [selectData],
  (data) => data.orderDetails
);

export const selectProductDataPending = createSelector(
  [selectData],
  (data) => data.productDataPending
);

export const selectOrderDetailsPending = createSelector(
  [selectData],
  (data) => data.orderDetailsPending
);

export const selectProductOptionsPending = createSelector(
  [selectData],
  (data) => data.productOptionsPending
);