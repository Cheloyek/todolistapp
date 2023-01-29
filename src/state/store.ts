import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListDomainType, TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../AppWiithRedux";
import thunk from "redux-thunk";

// type AppThunkType = ThunkDispatch<AppRootStateType, void, Action>

//общий тип actions, включающий все типы actions
export type AppActionsType = TodolistsActionsType | TasksActionsType

//тип всего объекта
export type AppRootStateType = {
    todolists: Array<TodoListDomainType>
    tasks: TasksStateType
}

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

//create store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const useAppDispatch = () => useDispatch<AppThunkType>()
// @ts-ignore
window.store = store