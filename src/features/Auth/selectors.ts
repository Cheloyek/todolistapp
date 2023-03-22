import {AppRootStateType} from "app";

export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn