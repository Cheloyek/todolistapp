import {addTodolistTC, TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import {TasksStateType} from "./TodolistsList";


test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListDomainType> = []

    // const action = addTodolistAC('newTodoList')
    let payload = { todoList: {id: v1(), title: 'newTodoList', order: 0, addedDate: ''}};
    const action = addTodolistTC.fulfilled(payload, 'requestId', {title: payload.todoList.title})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTask = keys[0]
    const idFromTodoList = endTodoListsState[0].id

    expect(idFromTask).toBe(action.payload?.todoList.id)
    expect(idFromTodoList).toBe(action.payload?.todoList.id)
})
