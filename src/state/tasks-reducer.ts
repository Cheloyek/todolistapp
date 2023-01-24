import {TasksStateType} from "../AppWiithRedux";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistsActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

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
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType

const initialState: TasksStateType = {
//     [todoListId1]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ],
//     [todoListId2]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ],
//     [todoListId3]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(task => task.id !== action.taskId)
            return copyState
        }

        case 'ADD-TASK': {
            const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todoListTasks]
            return copyState
        }

        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return copyState
        }

        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return copyState
        }

        case 'ADD-TODOLIST': {
            let copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        case 'SET-TODOLISTS': {
            let copyState = {...state}
            action.todoLists.forEach((tl) => copyState[tl.id] = [])
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return {type: 'ADD-TASK', todolistId, title}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

