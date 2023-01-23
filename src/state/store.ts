import {combineReducers, legacy_createStore} from "redux";
import {TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../AppWiithRedux";

export type AppRootStateType = {
    todolists: Array<TodoListDomainType>
    tasks: TasksStateType
}

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)

// @ts-ignore
window.store = store