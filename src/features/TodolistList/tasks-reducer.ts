import {
    addTodolistAC,
    AddTodolistActionType,
    removeTodolistAC,
    RemoveTodolistActionType,
    setTodolistsAC,
    SetTodolistsActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType} from "../../app/store";
import {setAppStatusAC, SetErrorActionType, SetStatusActionType} from "../../app/app-reducer";
import {TasksStateType} from "./TodolistsList";
import {handleAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// const initialState: TasksStateType = {}
//
// export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
//     switch (action.type) {
//         case 'REMOVE-TASK': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)
//             }
//         }
//         case 'ADD-TASK': {
//             return {
//                 ...state,
//                 [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
//             }
//         }
//         case 'UPDATE-TASK': {
//             return {
//                 ...state,
//                 [action.todolistId]: state[action.todolistId]
//                     .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
//             }
//         }
//         // case 'ADD-TODOLIST': {
//         case addTodolistAC.type: {
//             return {...state, [action.payload.todoList.id]: []}
//         }
//         // case 'REMOVE-TODOLIST': {
//         case removeTodolistAC.type: {
//             let copyState = {...state}
//             delete copyState[action.payload.id]
//             return copyState
//         }
//         // case 'SET-TODOLISTS': {
//         case setTodolistsAC.type: {
//             let copyState = {...state}
//             action.payload.todoLists.forEach((tl: any) => copyState[tl.id] = [])
//             return copyState
//         }
//         case 'SET-TASKS': {
//             return {...state, [action.todolistId]: action.tasks}
//         }
//         default:
//             return state
//     }
// }
//
// //actions
// export const removeTaskAC = (todolistId: string, taskId: string) =>
//     ({type: 'REMOVE-TASK', todolistId, taskId} as const)
// export const addTaskAC = (task: TaskType) =>
//     ({type: 'ADD-TASK', task} as const)
// export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskType) =>
//     ({type: 'UPDATE-TASK', todolistId, taskId, model} as const)
// export const setTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
//     ({type: 'SET-TASKS', todolistId, tasks} as const)
//
// //thunks
// export const fetchTasksThunkCreator = (todolistId: string) => {
//     return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todoListsApi.getTasks(todolistId)
//             .then((res) => {
//                 const tasks = res.data.items
//                 dispatch(setTasksAC(todolistId, tasks))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//             .catch((error) => {
//                 console.log(error)
//                 dispatch(setAppErrorAC(error.message))
//                 dispatch(setAppStatusAC({status: 'failed'}))
//             })
//     }
// }
//
// export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
//     return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todoListsApi.deleteTask(todolistId, taskId)
//             .then((res) => {
//                 const action = removeTaskAC(todolistId, taskId)
//                 dispatch(action)
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//             .catch((error) => {
//                 handleServerNetworkError(dispatch, error)
//             })
//     }
// }
//
// export const addTaskThunkCreator = (title: string, todoListId: string) => {
//     return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todoListsApi.createTask(todoListId, title)
//             .then((res) => {
//                 if (res.data.resultCode === 0) {
//                     const task = res.data.data.item
//                     const action = addTaskAC(task)
//                     dispatch(action)
//                     dispatch(setAppStatusAC({status: 'succeeded'}))
//                 } else {
//                     handleAppError(dispatch, res.data)
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(dispatch, error)
//             })
//     }
// }
//
// export const updateTaskThunkCreator = (todoListId: string, taskId: string, model: UpdateTaskType) => {
//     return (dispatch: Dispatch<AppActionsType | SetErrorActionType>, getState: () => AppRootStateType) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         const state = getState()
//         const task = state.tasks[todoListId].find(el => el.id === taskId)
//         if (!task) {
//             throw new Error('task was not found')
//         }
//         const apiModel: UpdateTaskModelType = {
//             status: task.status,
//             title: task.title,
//             description: task.description,
//             startDate: task.startDate,
//             deadline: task.deadline,
//             priority: task.priority,
//             ...model //поменяет то свойство которое придет (status или title)
//         }
//         todoListsApi.changeTask(todoListId, taskId, apiModel)
//             .then((res) => {
//                 if(res.data.resultCode === 0) {
//                     const action = updateTaskAC(todoListId, taskId, model)
//                     dispatch(action)
//                     dispatch(setAppStatusAC({status: 'succeeded'}))
//                 } else {
//                     handleAppError(dispatch, res.data)
//                 }
//             })
//             .catch((error) => {
//                 handleServerNetworkError(dispatch, error)
//             })
//
//     }
// }
//
// //types
// export type TasksActionsType =
//     | RemoveTaskActionType
//     | AddTaskActionType
//     | UpdateTaskActionType
//     | AddTodolistActionType
//     | RemoveTodolistActionType
//     | SetTodolistsActionType
//     | SetTasksActionType
//
// export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
// export type AddTaskActionType = ReturnType<typeof addTaskAC>
// export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
// export type SetTasksActionType = ReturnType<typeof setTasksAC>
//
// export type UpdateTaskType = {
//     title?: string,
//     description?: string,
//     status?: TaskStatuses,
//     priority?: TaskPriorities,
//     startDate?: string,
//     deadline?: string
// }


// case addTodolistAC.type: {
//             return {...state, [action.payload.todoList.id]: []}
//         }
//         // case 'REMOVE-TODOLIST': {
//         case removeTodolistAC.type: {
//             let copyState = {...state}
//             delete copyState[action.payload.id]
//             return copyState
//         }
//         // case 'SET-TODOLISTS': {
//         case setTodolistsAC.type: {
//             let copyState = {...state}
//             action.payload.todoLists.forEach((tl: any) => copyState[tl.id] = [])
//             return copyState
//         }

//rtk
const initialState: TasksStateType = {}

//rtk thunk
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todoListsApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            // thunkAPI.dispatch(setTasksAC({todolistId, tasks}))
            return {todolistId, tasks}
        })
        // .catch((error) => {
        //     console.log(error)
        //     thunkAPI.dispatch(setAppErrorAC(error.message))
        //     thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
        // })
})

//redux thunk
// export const fetchTasksTC_ = (todolistId: string) => {
//     return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todoListsApi.getTasks(todolistId)
//             .then((res) => {
//                 const tasks = res.data.items
//                 dispatch(setTasksAC({todolistId, tasks}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//             .catch((error) => {
//                 console.log(error)
//                 dispatch(setAppErrorAC(error.message))
//                 dispatch(setAppStatusAC({status: 'failed'}))
//             })
//     }
// }

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        removeTaskAC(stateDraft, action: PayloadAction<{todolistId: string, taskId: string}>) {
            const tasks = stateDraft[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(stateDraft, action: PayloadAction<TaskType>) {
            stateDraft[action.payload.todoListId].unshift(action.payload)
        },
        updateTaskAC(stateDraft, action: PayloadAction<{todolistId: string, taskId: string, model: UpdateTaskType}>) {
            const tasks = stateDraft[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }
        // setTasksAC(stateDraft, action: PayloadAction<{todolistId: string, tasks: Array<TaskType>}>) {
        //     stateDraft[action.payload.todolistId] = action.payload.tasks
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodolistAC, (stateDraft, action) => {
                stateDraft[action.payload.todoList.id] = []
            })
            .addCase(removeTodolistAC, (stateDraft, action) => {
                delete stateDraft[action.payload.id]
            })
            .addCase(setTodolistsAC, (stateDraft, action) => {
                action.payload.todoLists.forEach((tl) => stateDraft[tl.id] = [])
            })
            .addCase(fetchTasksTC.fulfilled, (stateDraft, action) => {
                stateDraft[action.payload.todolistId] = action.payload.tasks
            })
    }


//         {
//             [addTodolistAC.type]: ((stateDraft, action: PayloadAction<{todoList: TodoListType}>) => {}),
//             [removeTodolistAC.type]:((stateDraft, action: PayloadAction<{id: string}>) => {}),
//             [setTodolistsAC.type]: ((stateDraft, action: PayloadAction<{todoLists: Array<TodoListType>}>) => {})
// },
})

export const tasksReducer = slice.reducer

//actions
export const {removeTaskAC, addTaskAC, updateTaskAC} = slice.actions

//thunks

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todoListsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                const action = removeTaskAC({todolistId, taskId})
                dispatch(action)
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
}

export const addTaskThunkCreator = (title: string, todoListId: string) => {
    return (dispatch: Dispatch<AppActionsType | SetErrorActionType | SetStatusActionType>) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todoListsApi.createTask(todoListId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    const action = addTaskAC(task)
                    dispatch(action)
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleAppError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
}

export const updateTaskThunkCreator = (todoListId: string, taskId: string, model: UpdateTaskType) => {
    return (dispatch: Dispatch<AppActionsType | SetErrorActionType>, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status: 'loading'}))
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
                if(res.data.resultCode === 0) {
                    const action = updateTaskAC({todolistId: todoListId, taskId, model})
                    dispatch(action)
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleAppError(dispatch, res.data)
                }
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
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

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type UpdateTaskType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string,
    deadline?: string
}
