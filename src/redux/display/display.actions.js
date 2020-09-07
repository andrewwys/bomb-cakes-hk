import displayActionTypes from './display.types';

export const toggleOrderMode = () => ({
  type: displayActionTypes.TOGGLE_ORDER_MODE,
});

export const turnOffOrderMode = () => ({
  type: displayActionTypes.TURN_OFF_ORDER_MODE,
});
