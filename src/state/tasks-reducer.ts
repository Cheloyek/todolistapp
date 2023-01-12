import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type ActionsType = RemoveTaskActionType


export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(task => task.id !== action.taskId)
            return {...copyState}
        }

        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}