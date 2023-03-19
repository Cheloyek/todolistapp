import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {AppThunk} from "../../app/store";
import {authApi, FieldErrorType} from "../../api/todolists-api";
import {handleAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

// const initialState: InitialStateType = {
//     isLoggedIn: false
// }

//rtk thunks
export const loginTC = createAsyncThunk<undefined, LoginParamsType, {rejectValue: {errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}>('auth/login', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authApi.login(param.email, param.password, param.rememberMe, param.captcha)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            // thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            return
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
} )

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI ) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authApi.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return
        } else {
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

//redux thunks
// export const _loginTC = (email: string, password: string, rememberMe: boolean, captcha?: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     try {
//         const res = await authApi.login(email, password, rememberMe, captcha)
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: true}))
//             // dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//             handleAppError(dispatch, res.data)
//         }
//     } catch (error: any) {
//         handleServerNetworkError(dispatch, error)
//     }
// }

// export const _logoutTC = (): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     try {
//         const res = await authApi.logout()
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: false}))
//             dispatch(setAppStatusAC({status: 'succeeded'}))
//         } else {
//             handleAppError(dispatch, res.data)
//         }
//     } catch (error: any) {
//         handleServerNetworkError(dispatch, error)
//     }
// }

//rtk
const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } ,
    reducers: {
        setIsLoggedInAC(stateDraft, action: PayloadAction<{value: boolean}>) {
            stateDraft.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginTC.fulfilled, (stateDraft) => {
                stateDraft.isLoggedIn = true
        })
            .addCase(logoutTC.fulfilled, (stateDraft) => {
                stateDraft.isLoggedIn = false
            })
    }
})

//redux
// export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }

//rtk
export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC

//actions
// export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

//types
export type AuthActionsType = LoginActionType | SetStatusActionType | SetErrorActionType
export type LoginActionType = ReturnType<typeof setIsLoggedInAC>
type LoginParamsType = {email: string, password: string, rememberMe: boolean, captcha?: string}
// type InitialStateType = {isLoggedIn: boolean}