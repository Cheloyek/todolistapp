import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TodolistsActionsType} from "features/TodolistList";
import {AuthActionsType} from "features/Auth";
import {AppReducerActionsType} from "./app-reducer";
import {rootReducer} from "./reducers";

export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootReducerType = typeof rootReducer
//rtk
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./reducers', () => {
        store.replaceReducer(rootReducer)
    })
}

//type
export type AppRootStateType = ReturnType<RootReducerType>
type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppActionsType = TodolistsActionsType | AuthActionsType | AppReducerActionsType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>