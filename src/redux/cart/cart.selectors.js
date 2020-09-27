import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectNewItem = createSelector(
  [selectCart],
  (cart) => cart.newItem
);

export const selectAmount = createSelector([selectNewItem], (item) => {
  return item.amount;
});

export const selectMessage = createSelector([selectNewItem], (item) => {
  return item.message;
});

export const selectProductData = createSelector([selectNewItem], (item) => {
  return item.productData;
});
