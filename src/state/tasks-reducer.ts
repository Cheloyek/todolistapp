import {TasksStateType} from "../AppWithRedux";
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType,} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "./store";
import {setErrorAC, SetErrorActionsType, setStatusAC, SetStatusActionsType} from "../app-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    // todolistId: string
    // title: string
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateTaskType
}

// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE'
//     todolistId: string
//     taskId: string
//     title: string
// }

export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

export type TasksActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(task => task.id !== action.taskId)
            return copyState
        }

        case 'ADD-TASK': {
            // const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
            // let copyState = {...state}
            // let todoListTasks = copyState[action.todolistId]
            // copyState[action.todolistId] = [newTask, ...todoListTasks]

            const newTask = action.task
            let copyState = {...state}
            let todoListTasks = copyState[newTask.todoListId]
            copyState[newTask.todoListId] = [newTask, ...todoListTasks]
            return copyState
        }

        case 'UPDATE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            return copyState
        }

        // case 'CHANGE-TASK-TITLE': {
        //     let copyState = {...state}
        //     let todoListTasks = copyState[action.todolistId]
        //     copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
        //     return copyState
        // }

        case 'ADD-TODOLIST': {
            let copyState = {...state}
            // copyState[action.todolistId] = []
            copyState[action.todoList.id] = []
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

        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

// export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', todolistId, title}
// }

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', todolistId, taskId, model}
}

// export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
//     return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
// }

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const fetchTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch<AppActionsType | SetStatusActionsType>) => {
    dispatch(setStatusAC('loading'))
    todoListsApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
            dispatch(setStatusAC('succeeded'))
        })
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetStatusActionsType>) => {
        dispatch(setStatusAC('loading'))
        todoListsApi.deleteTask(todolistId, taskId)
            .then ((res) => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)
                dispatch(setStatusAC('succeeded'))
            })
    }
}

export const addTaskThunkCreator = (title: string, todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetErrorActionsType | SetStatusActionsType>) => {
        dispatch(setStatusAC('loading'))
        todoListsApi.createTask(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setStatusAC('succeeded'))
                } else {
                    // return alert(`${res.data.messages}`)
                    if (res.data.messages.length > 0) {
                        dispatch(setErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setErrorAC('unknown message'))

                    }
                    dispatch(setStatusAC('failed'))
                }
            }
            );
    }
}

export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}

export const updateTaskThunkCreator = (todoListId: string, taskId: string, model: UpdateTaskType) => {
    return (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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
            })
    }
}
