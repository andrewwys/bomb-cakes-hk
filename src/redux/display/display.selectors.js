import { createSelector } from 'reselect';

const selectDisplay = (state) => state.display;

export const selectOrderMode = createSelector(
  [selectDisplay],
  (display) => display.orderMode
);

export const selectCurrentPage = createSelector(
  [selectDisplay],
  (display) => display.currentPage
);

export const selectOptionOnHover = createSelector(
  [selectDisplay],
  (display) => display.optionOnHover
);
