import {combineReducers} from "redux";
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {tasksReducer} from "features/TodolistList";
import {AuthActionsType, authReducer} from "features/Auth";
import {TodolistsActionsType, todolistsReducer} from "features/TodolistList";
import {appReducer, AppReducerActionsType} from "./app-reducer";

export const useAppDispatch = () => useDispatch<AppDispatch>()
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})
//redux
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootReducerType = typeof rootReducer
//rtk
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store

//type
export type AppRootStateType = ReturnType<RootReducerType>
type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = TodolistsActionsType | AuthActionsType | AppReducerActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>