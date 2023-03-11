import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";
import {setAppErrorAC, SetErrorActionsType, setAppStatusAC, SetStatusActionsType} from "../../app/app-reducer";
import {TasksStateType} from "./TodolistsList";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
            }
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            }
            // const newTask = action.task
            // let copyState = {...state}
            // let todoListTasks = copyState[newTask.todoListId]
            // copyState[newTask.todoListId] = [newTask, ...todoListTasks]
            // return copyState
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
            // let copyState = {...state}
            // let todoListTasks = copyState[action.todolistId]
            // copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            // return copyState
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todoList.id]: []}
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
        case 'SET-TASKS': {
            return {...state, [action.todolistId]: action.tasks}
            // let copyState = {...state}
            // copyState[action.todolistId] = action.tasks
            // return copyState
        }
        default:
            return state
    }
}

//AC
export const removeTaskAC = (todolistId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType) =>
    ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)
export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'SET-TASKS', todolistId, tasks} as const)

//thunks
export const fetchTasksThunkCreator = (todolistId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetStatusActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.getTasks(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(todolistId, tasks))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetStatusActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.deleteTask(todolistId, taskId)
            .then ((res) => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTaskThunkCreator = (title: string, todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetErrorActionsType | SetStatusActionsType>) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.createTask(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    if (res.data.messages.length > 0) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('unknown message'))
                    }
                    dispatch(setAppStatusAC('failed'))
                }
            })
        .catch((error) => {
            dispatch(setAppErrorAC(error.message))
        })
    }
}

export const updateTaskThunkCreator = (todoListId: string, taskId: string, model: UpdateTaskType) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todoListId].find(el => el.id === taskId)
        if (!task) {
            throw new Error('task was not found')
        }
        const apiModel: UpdateTaskModelType = {
            status: task.status,
            title: task.title,
            description: task.description,
            startDate: task.startDate,
            deadline: task.deadline,
            priority: task.priority,
            ...model //поменяет то свойство которое придет (status или title)
        }
        todoListsApi.changeTask(todoListId, taskId, apiModel)
            .then((res) => {
                const action = updateTaskAC(todoListId, taskId, model)
                dispatch(action)
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

//types
export type TasksActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}