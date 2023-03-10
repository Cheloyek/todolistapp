import React from 'react'
import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import {v1} from 'uuid'
import {tasksReducer} from "../features/TodolistList/tasks-reducer";
import {todolistsReducer} from "../features/TodolistList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {AppRootStateType} from "../app/store";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
})


const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'TodoList 1', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
        {id: 'todolistId2', title: 'TodoList 2', filter: 'all', order: 0, addedDate: '', todolistStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            // {id: v1(), title: 'task 1', isDone: true},
            // {id: v1(), title: 'task 2', isDone: true}
            {id: v1(), title: 'task 1', status: TaskStatuses.Completed, todoListId: 'todolistId1', addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task 2', status: TaskStatuses.Completed, todoListId: 'todolistId1', addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'task 3', status: TaskStatuses.Completed, todoListId: 'todolistId2', addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task 4', status: TaskStatuses.Completed, todoListId: 'todolistId2', addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ]
    },
    app: {
        error: null,
        status: 'idle'
    }
}


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk))

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
