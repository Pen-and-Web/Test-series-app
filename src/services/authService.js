import { toast } from 'react-toastify';
import axios from 'axios';
import { useHistory } from 'react-router';
export const apiUrl = 'http://192.168.18.17:3100/api';

// http://68.183.135.125:3100/api/auth/signup

export const signup = async (dto) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/signup`, dto);
    if (res.status === 200) {
      toast.error('Signup successfull');
      return true;
    }
  } catch (ex) {
    console.log(ex);
    if (ex.response && ex.response.status === 422) {
      const errors = ex.response.data.errors || ex.response.data.error;

      errors.forEach((cur) => {
        toast.error(cur);
      });
    } else {
      toast.error('Something went wrong');
    }
    return false;
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);

    if (res.status === 200) {
      setUserLocalStorage(res.data.user);
      toast.info('Successfully Logged In');
      return true;
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      toast.error('Invalid Email or Password ');
      return false;
    }
  }
};

export const updateProfile = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/auth/updateMe`, obj);
    console.log(res, 'response');
  } catch (err) {
    console.log(err, 'error');
  }
};

export const forgetPassword = async () => {
  console.log('forget password called');
  // try {
  //   const res = await axios.get(`${apiUrl}/auth/forgotPassword`);
  //   console.log(res, 'forgetPass response');
  // } catch (err) {
  //   console.log(err);
  // }
};
export const resetPassword = async () => {
  console.log('reset password called');
  // try {
  //   const res = await axios.get(`${apiUrl}/auth/resetPassword`);
  //   console.log(res, 'resetPass response');
  // } catch (err) {
  //   console.log(err);
  // }
};
export const logout = async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    removeUserLocalStorage();
    window.location = '/';
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${apiUrl}/auth/me`);

    console.log(res.data.user);
    return res.data.user;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeUserLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserLocalStorage = () => {
  return JSON.parse(localStorage.getItem('user'));
};
export const setUserLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export default {
  login,
  logout,
  signup,
  getCurrentUser,
  updateProfile,
};
