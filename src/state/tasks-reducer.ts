import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    todolistId: string
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(task => task.id !== action.taskId)
            return copyState
        }

        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, isDone: false}
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todoListTasks]
            return copyState
        }

        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            let task = todoListTasks.find(task => task.id === action.taskId)
            if (task) {
                task.isDone = action.status
            }
            return copyState
        }

        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            let task = todoListTasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copyState
        }

        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }

        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: boolean): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}