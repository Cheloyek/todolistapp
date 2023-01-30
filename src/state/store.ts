import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodolistsActionsType, todolistsReducer} from "./todolists-reducer";
import {TasksActionsType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer} from "../app-reducer";

// type AppThunkType = ThunkDispatch<AppRootStateType, void, Action>

//общий тип actions, включающий все типы actions
export type AppActionsType = TodolistsActionsType | TasksActionsType

//тип всего объекта
// export type AppRootStateType = {
//     todolists: Array<TodoListDomainType>
//     tasks: TasksStateType
// }

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})

//create store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const useAppDispatch = () => useDispatch<AppThunkType>()
// @ts-ignore
window.store = store