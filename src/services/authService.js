import axios from "axios";
import { toast } from "react-toastify";

export const apiUrl = "http://localhost:3100/api";

// http://68.183.135.125:3100/api/auth/signup

export const signup = async (dto) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/signup`, dto);
    if (res.status === 200) {
      toast.error("Signup successfull");
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
      toast.error("Something went wrong");
    }
    return false;
  }
};

export const login = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);

    if (res.status === 200) {
      setUserLocalStorage(res.data.user);
      toast.info("Successfully Logged In");
      return true;
    }
  } catch (err) {
    if (err.response && err.response.status === 401) {
      toast.error("Invalid Email or Password ");
      return false;
    }
  }
};

export const updateProfile = async (obj) => {
  try {
    const res = await axios.put(`${apiUrl}/auth/updateMe`, obj);
    console.log(res, "response");
  } catch (err) {
    console.log(err, "error");
  }
};

export const forgetPassword = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/forgotPassword`, data);
    if (res.data.status === "success") {
      toast.info("Reset Code sent on provided email.");
      return true;
    }
  } catch (err) {
    console.log(err);
    toast.error("There was an error in sending Email");
    return false;
  }
};
export const resetPassword = async (data) => {
  // console.log(data, 'reset password called');
  const obj = {
    resetCode: data.code,
    passwordConfirm: data.confirmPassword,
    password: data.password,
  };
  console.log(obj, "object created");

  try {
    const res = await axios.post(`${apiUrl}/auth/resetPassword`, obj);
    console.log(res, "resetPass response");
  } catch (err) {
    console.log(err);
  }
};
export const logout = async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    removeUserLocalStorage();
    window.location = "/";
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const getCurrentUserApi = async () => {
  try {
    const res = await axios.get(`${apiUrl}/auth/me`);
    const { firstName, lastName, email } = res.data;
    if (firstName && lastName && email)
      setUserLocalStorage({ firstName, lastName, email });
    return res.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const removeUserLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const setUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export default {
  login,
  logout,
  signup,
  getUserLocalStorage,
  setUserLocalStorage,
  getCurrentUserApi,
  updateProfile,
};
