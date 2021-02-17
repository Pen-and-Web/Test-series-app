import axios from "axios";
const apiUrl = "http://localhost:3100/api";
// http://68.183.135.125:3100/api/auth/signup

export const login = async (user) => {
  try {
    const res = await axios.post(`${apiUrl}/auth/login`, user);

    if (res.status === 200) {
      return res.data;
    }
  } catch (err) {
    console.log(err, "error occured");
    return null;
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
  getCurrentUser,
};
