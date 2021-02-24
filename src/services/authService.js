import axios from "axios";
import { toast } from "react-toastify";

export const apiUrl = "http://localhost:3100/api";

// http://68.183.135.125:3100/api/auth/signup

export const signup = async (dto) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/signup`, dto);
    if (res.status === 200) {
      toast.info("Signup successfull");
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

export const updateProfile = async (profileData) => {
  try {
    const res = await axios.put(`${apiUrl}/auth/updateMe`, profileData);

    if (res.status === 200) {
      toast.info("Profile updated successfully");

      setUserLocalStorage(res.data.user);
      return true;
    }
  } catch (err) {
    toast.error(
      "There was an error updating profile, please try again later. "
    );
    return false;
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
    if (err.response.status === 404) {
      toast.error("No user registered with provided Email");
      return false;
    }
    toast.error("There was an error in sending Email");
    return false;
  }
};
export const resetPassword = async (data) => {
  const dto = {
    resetCode: data.code,
    passwordConfirm: data.confirmPassword,
    password: data.password,
  };

  try {
    const res = await axios.post(`${apiUrl}/auth/resetPassword`, dto);

    if (res.status === 200) {
      toast.info(res.data.message);
      return true;
    }
  } catch (err) {
    console.log(err);
    if (err.response.status === 400) {
      toast.error(err.response.data.message);
    }
    return false;
  }
};
export const logout = async () => {
  try {
    await axios.get(`${apiUrl}/auth/logout`);
    removeUserLocalStorage();
    window.location = "/";
    return true;
  } catch (err) {
    return false;
  }
};

export const getCurrentUserApi = async () => {
  try {
    const res = await axios.get(`${apiUrl}/auth/me`);
    if (res.data.provider === "facebook") {
      var {
        email,
        first_name: firstName,
        last_name: lastName,
      } = res.data._json;
    }
    if (res.data.provider === "google") {
      var {
        email,
        given_name: firstName,
        family_name: lastName,
      } = res.data._json;
    }

    if (firstName && lastName && email)
      setUserLocalStorage({ firstName, lastName, email });
    return { firstName, lastName, email };
  } catch (err) {
    // console.log(err.response);
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
