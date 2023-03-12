import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "../features/TodolistList/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../features/TodolistList/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, AppReducerActionsType} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";
import {useDispatch} from "react-redux";

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppActionsType = TodolistsActionsType | AuthActionsType | TasksActionsType | AppReducerActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = () => useDispatch<AppDispatch>()
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store