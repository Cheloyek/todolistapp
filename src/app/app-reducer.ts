import {authApi} from "api";
import {setIsLoggedInAC} from "features/Auth";
import {handleAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

//rtk
export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    try {
        const res = await authApi.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({value: true}))
        }
        else {
            // thunkAPI.dispatch(setIsLoggedInAC({value: true}))
            handleAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
    // thunkAPI.dispatch(setAppInitializedAC({isInitialized: true}))
})

const slice = createSlice({
    name: 'app',
    initialState: {
        error: null,
        status: 'idle' as RequestStatusType,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(stateDraft, action: PayloadAction<{error: string | null}>) {
            // @ts-ignore
            stateDraft.error = action.payload.error
        },
        setAppStatusAC(stateDraft, action: PayloadAction<{status: RequestStatusType}>) {
            stateDraft.status = action.payload.status
        },
    },
    extraReducers: builder => {
        builder
            .addCase(initializeAppTC.fulfilled, (stateDraft) => {
                stateDraft.isInitialized = true
            })
    }
})

export const appReducer = slice.reducer
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppStatusAC = slice.actions.setAppStatusAC

//types
export type SetErrorActionType = ReturnType<typeof setAppErrorAC>;
export type SetStatusActionType = ReturnType<typeof setAppStatusAC>;
export type AppReducerActionsType = SetErrorActionType | SetStatusActionType
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    error: null | string
    status: RequestStatusType
    isInitialized: boolean
}