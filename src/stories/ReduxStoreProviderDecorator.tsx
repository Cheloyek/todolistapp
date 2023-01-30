import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {tasksReducer} from "../state/tasks-reducer";
import {TodoListDomainType, todolistsReducer} from "../state/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

type AppRootStateType = {
    todolists: Array<TodoListDomainType>
    tasks: {
        [key: string]: Array<TaskType>
    }
}

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'TodoList 1', filter: 'all', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'TodoList 2', filter: 'all', order: 0, addedDate: ''}
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
    }
}


export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
