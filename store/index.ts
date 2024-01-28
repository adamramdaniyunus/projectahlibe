import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducers";

let initialState = {
    user: { userInfo: null }
};

if (typeof window !== "undefined") {
    const userDataString = localStorage.getItem("userdata");
    const userInfoFromStorage = userDataString !== null
        ? JSON.parse(userDataString)
        : null;

    initialState = {
        user: { userInfo: userInfoFromStorage }
    };
}

const store = configureStore({
    reducer: {
        user: userReducer
    },
    preloadedState: initialState
});

export default store;
