import {AppThunk} from "./store";
import {authApi} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// const initialState = {
//     error: null,
//     status: 'idle' as RequestStatusType,
//     isInitialized: false
// }

export type InitialStateType = {
    error: null | string
    status: RequestStatusType
    isInitialized: boolean
}

// export const appReducer = (state: InitialStateType = initialState, action: AppReducerActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return <InitialStateType>{...state, error: action.error};
//         case 'APP/SET-IS-INITIALIZED':
//             return <InitialStateType>{...state, isInitialized: action.value}
//         default:
//             return state
//     }
// }

//actions
// export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
// export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
// export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

//thunks
// export const initializeAppThunkCreator = (): AppThunk => async dispatch => {
//     try {
//         const res = await authApi.me()
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC({value: true}))
//         }
//     } catch (error: any) {
//         handleServerNetworkError(dispatch, error)
//     }
//     dispatch(setAppInitializedAC(true))
// }

//types
export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetInitializedActionType = ReturnType<typeof setAppInitializedAC>
export type AppReducerActionsType = SetErrorActionType | SetStatusActionType | SetInitializedActionType

//rtk
const initialState = {
    error: null,
    status: 'idle' as RequestStatusType,
    isInitialized: false
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppErrorAC(stateDraft, action: PayloadAction<{error: string | null}>) {
            // @ts-ignore
            stateDraft.error = action.payload.error
        },
        setAppStatusAC(stateDraft, action: PayloadAction<{status: RequestStatusType}>) {
            stateDraft.status = action.payload.status
        },
        setAppInitializedAC(stateDraft, action: PayloadAction<{isInitialized: boolean}>) {
            stateDraft.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC

export const initializeAppThunkCreator = (): AppThunk => async dispatch => {
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}))
        }
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
    dispatch(setAppInitializedAC({isInitialized: true}))
}