import { createSelector } from 'reselect';

const selectDisplay = (state) => state.display;

export const selectOrderMode = createSelector(
  [selectDisplay],
  (display) => display.orderMode
);
