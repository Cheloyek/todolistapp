import {Dispatch} from "redux";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";
import {authApi} from "../../api/todolists-api";
import {handleAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        // case 'login/SET-IS-LOGGED-OUT':
        //     return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// export const setIsLoggedOutAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-OUT', value} as const)

//thunks
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha?: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.login(email, password, rememberMe, captcha)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleAppError(dispatch, res.data)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
}

export const logoutThunkCreator = (): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleAppError(dispatch, res.data)
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
}

//types
export type AuthActionType = ReturnType<typeof setIsLoggedInAC>
// export type LogoutActionsType = ReturnType<typeof setIsLoggedOutAC>
type InitialStateType = {isLoggedIn: boolean}
// type AuthReducerActionsType = AuthActionType | SetStatusActionType | SetErrorActionType