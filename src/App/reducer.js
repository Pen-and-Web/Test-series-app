/*
 *
 * App reducer
 *
 */

import produce from 'immer';

import { SETLOGIN_STATUS } from './constants';

export let initialState = {
  loginStatus: '',
};

/* eslint-disable default-case, no-param-reassign, consistent-return */
const reducer = produce((draft, action) => {
  if (/(.*)_ERROR/.test(action.type)) {
    return initialState;
  }

  switch (action.type) {
    case SETLOGIN_STATUS:
      alert(action.data, 'action');
      console.log(draft.loginStatus, 'loginstatus');
      //   state.loginStatus = action.data;
      //   console.log(initialState, 'state');
      break;
  }
}, initialState);

export default reducer;
