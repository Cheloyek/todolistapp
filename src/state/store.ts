import {Action, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../AppWiithRedux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

// type AppThunkType = ThunkDispatch<AppRootStateType, void, Action>

export type AppRootStateType = {
    todolists: Array<TodoListDomainType>
    tasks: TasksStateType
}

export type AppRootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const useAppDispatch = () => useDispatch<AppThunkType>()
// @ts-ignore
window.store = store