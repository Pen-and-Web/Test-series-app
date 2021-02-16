import { SETLOGIN_STATUS } from './constants';

export function loginStatusAction(data) {
  return {
    type: SETLOGIN_STATUS,
    data,
  };
}
