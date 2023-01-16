import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from 'redux'
import { v1 } from 'uuid'
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'TodoList 1', filter: 'all'},
        {id: 'todolistId2', title: 'TodoList 2', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'task 1', isDone: true},
            {id: v1(), title: 'task 2', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'task 3', isDone: true},
            {id: v1(), title: 'task 4', isDone: true}
        ]
    }
}

class AppRootStateType {
}

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType)

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}
