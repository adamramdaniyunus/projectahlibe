import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };

let initialState = userInitialState;

if (typeof window !== "undefined") {
    const userDataString = localStorage.getItem("userdata");
    if (userDataString !== null) {
        initialState = JSON.parse(userDataString);
    }
}

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
        resetUserInfo(state, action) {
            state.userInfo = null;
        },
    },
});

const { actions: userActions, reducer: userReducer } = userSlice;

export { userActions, userReducer };
