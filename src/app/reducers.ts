import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../features/TodolistList";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/Auth";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})