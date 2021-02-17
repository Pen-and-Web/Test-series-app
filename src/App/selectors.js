import { createSelector } from 'reselect';
import { initialState } from './reducer';
/**
 * Direct selector to the registerPage state domain
 */

const selectRegisterPageDomain = (state) => state.registerPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectLoginStatus = () =>
  createSelector(selectRegisterPageDomain, (substate) => substate.loginStatus);

export { makeSelectLoginStatus };
