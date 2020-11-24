import { createSelector } from 'reselect';

const selectCart = (state) => state.cart;

export const selectCart2 = createSelector(
  [selectCart],
  (cart) => cart
)

export const selectAccessories = createSelector(
  [selectCart],
  (cart) => cart.accessories
);

export const selectPickupDate = createSelector(
  [selectCart],
  (cart) => cart.pickupDate
);

export const selectNewItem = createSelector(
  [selectCart],
  (cart) => cart.newItem
);

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
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

export const selectSumExtraCost = createSelector([selectNewItem], (item) => {
  return item.sumExtraCost;
});
