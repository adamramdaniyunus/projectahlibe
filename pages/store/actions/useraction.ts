import { userActions } from "../reducers/userReducers";

export const logout = () => (dispacth: any) => {
    dispacth(userActions.resetUserInfo(""));
    localStorage.removeItem("userdata");
}