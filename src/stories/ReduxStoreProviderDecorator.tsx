import React from 'react'
import {v1} from 'uuid'
import {Provider} from "react-redux";
import {combineReducers} from 'redux'
import thunkMiddleware from "redux-thunk";
import {HashRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer, todolistsReducer} from "features/TodolistList";
import {TaskPriorities, TaskStatuses} from "api";
import {AppRootStateType, RootReducerType, appReducer} from "app";
import {authReducer} from "features/Auth";

const rootReducer: RootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
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
        status: 'succeeded',
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
)

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>
        {storyFn()}
    </HashRouter>
)
