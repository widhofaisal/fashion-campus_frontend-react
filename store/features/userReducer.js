import { createSlice } from "@reduxjs/toolkit";
import { setCookie, deleteCookie, hasCookie, getCookie } from 'cookies-next';

const initialState = {
  username: hasCookie('username') ? getCookie('username') : null,
  isLoggedIn: hasCookie('isLoggedIn') ? getCookie('isLoggedIn') : false,
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginHandler: (state, action) => {
      state.username = action.payload.username;
      state.isLoggedIn = true;
      setCookie('isLoggedIn',true);
      setCookie('username',action.payload.username);
    },
    logoutHandler: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      deleteCookie('isLoggedIn');
      deleteCookie('username');
    },
  },
});

export const { loginHandler, logoutHandler } = userReducer.actions;

//Export the variable
export const selectIsLoggedIn = (state) => state.userReducer.isLoggedIn;
export const selectUsername = (state) => state.userReducer.username;

export default userReducer.reducer;
