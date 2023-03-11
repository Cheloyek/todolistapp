import {Dispatch} from "redux";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";
import {authApi} from "../../api/todolists-api";
import {handleAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: InitialStateType = {
    isLoggedIn: false
}
export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

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

//types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {isLoggedIn: boolean}
type ThunkDispatch = Dispatch<AuthActionsType | SetStatusActionType | SetErrorActionType>