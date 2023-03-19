import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";
import {AxiosError} from "axios";
import {fetchTasksTC} from "./tasks-reducer";

// const initialState: Array<TodoListDomainType> = []

// export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodolistsActionsType): TodoListDomainType[] => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(tl => tl.id !== action.id)
//         case 'ADD-TODOLIST':
//             return [{...action.todoList, filter: 'all', todolistStatus: 'idle'}, ...state]
//         case 'CHANGE-TODOLIST-TITLE':
//             return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
//         case 'CHANGE-TODOLIST-STATUS':
//             return state.map((tl) => tl.id === action.id ? {...tl, todolistStatus: action.todoListStatus} : tl)
//         case 'CHANGE-TODOLIST-FILTER':
//             return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
//         case 'SET-TODOLISTS':
//             return action.todoLists.map((tl) => ({...tl, filter: 'all', todolistStatus: 'idle'}))
//         default:
//             return state
//     }
// }

//actions
// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
// export const addTodolistAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
// export const changeTodolistStatusAC = (id: string, todoListStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-STATUS', id, todoListStatus} as const)
// export const setTodolistsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

//thunks
//Способы типизации:
//1. dispatch: Dispatch - import from redux / проверяет чтобы в dispatch приходит action у которого есть type
//2. добавить generic / dispatch: Dispatch<SetTodolistsActionType> / проверяет что в dispatch - только SetTodolistsActionType
//3. generic с типом ActionsType / dispatch: Dispatch<TodolistsActionType> / dispatch любой из типа TodolistsActionsType
//4. создать общий тип actions - AppActionsType / dispatch: Dispatch<AppActionsType> / работает до момента когда нужно в thunk диспатчить другую thunk
//5. fetchTodolistsThunkCreator = (): ThunkAction<void, RootState, unknown, AnyAction> / для диспатча thunk
//ThunkAction<R, S, E, A> из redux-thunk,
//R - что thunk возвращает (как правило void)
//S - state всего приложения
//E - экстра аргументы (unknown)
//A - все actions
//6. вынести типизацию в store AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//1-4. export const fetchTodolistsThunkCreator = () => {
//5. export const fetchTodolistsThunkCreator = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> => {
//6.
// export const _fetchTodolistsTC = (): AppThunk => {
//     //1. return (dispatch: Dispatch) => {
//     //2. return (dispatch: Dispatch<SetTodolistsActionType>) => {
//     //3. return (dispatch: Dispatch<TodolistsActionsType>) => {
//     //4. return (dispatch: Dispatch<AppActionsType>) => {
//     //5. return (dispatch)
//     return (dispatch) => {
//         dispatch(setAppStatusAC({status: 'loading'}))
//         todoListsApi.getTodoLists()
//             .then((res) => {
//                 dispatch(setTodolistsAC({todoLists: res.data}))
//                 dispatch(setAppStatusAC({status: 'succeeded'}))
//             })
//             .catch((error) => {
//                 handleServerNetworkError(dispatch, error)
//             })
//     }
// }

// export const _removeTodolistTC = (todoListId: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'loading'}))
//     try {
//         await todoListsApi.deleteTodoList(todoListId)
//         dispatch(removeTodolistAC({id: todoListId}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     } catch (error: any) {
//         dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'failed'}))
//         handleServerNetworkError(dispatch, error)
//     }
// }

// export const _addTodolistTC = (title: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     try {
//         const res = await todoListsApi.createTodoList(title)
//         dispatch(addTodolistAC({todoList: res.data.data.item}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     } catch (error: any) {
//         handleServerNetworkError(dispatch, error)
//     }
// }

// export const _changeTodolistTitleTC = (todoListId: string, title: string): AppThunk => async dispatch => {
//     dispatch(setAppStatusAC({status: 'loading'}))
//     dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'loading'}))
//     try {
//         await todoListsApi.changeTodoListTitle(todoListId, title)
//         dispatch(changeTodolistTitleAC({id: todoListId, title}))
//         dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'succeeded'}))
//         dispatch(setAppStatusAC({status: 'succeeded'}))
//     } catch (error: any) {
//         dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'failed'}))
//         handleServerNetworkError(dispatch, error)
//     }
// }

//rtk thunk
export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    const res = await todoListsApi.getTodoLists()
    try {
        dispatch(setAppStatusAC({status: 'succeeded'}))
        // thunkAPI.dispatch(setTodolistsAC({todoLists: res.data}))
        return {todoLists: res.data}
    } catch(err: any) {
        const error: AxiosError = err
            handleServerNetworkError(dispatch, error)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
        }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (param: {id: string}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id: param.id, todoListStatus: 'loading'}))
    try {
        await todoListsApi.deleteTodoList(param.id)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        // dispatch(removeTodolistAC({id: param.todoListId}))
        return {id: param.id}
    } catch (err: any) {
        const error: AxiosError = err
        dispatch(changeTodolistStatusAC({id: param.id, todoListStatus: 'failed'}))
        handleServerNetworkError(dispatch, error)
        return rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: {title: string} , {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsApi.createTodoList(param.title)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoList: res.data.data.item}
    } catch (err: any) {
        const error: AxiosError = err
        handleServerNetworkError(dispatch, error)
        rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: {id: string, title: string}, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id: param.id, todoListStatus: 'loading'}))
    try {
        await todoListsApi.changeTodoListTitle(param.id, param.title)
        dispatch(changeTodolistStatusAC({id: param.id, todoListStatus: 'succeeded'}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {id: param.id, title: param.title}
    } catch (err: any) {
        const error: AxiosError = err
        dispatch(changeTodolistStatusAC({id: param.id, todoListStatus: 'failed'}))
        handleServerNetworkError(dispatch, error)
        rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})

//types
export type TodolistsActionsType =
    | ChangeTodolistFilterActionType
    | SetStatusActionType
    | ChangeTodolistStatusActionType
    // | ChangeTodolistTitleActionType
    // | AddTodolistActionType
    // | RemoveTodolistActionType
    // | SetTodolistsActionType

// export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
// export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
// export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
// export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistStatusActionType = ReturnType<typeof changeTodolistStatusAC>

export type FilterValuesType = 'active' | 'completed' | 'all'
export type TodoListDomainType = TodoListType & { filter: FilterValuesType, todolistStatus: RequestStatusType }

// export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
// export const addTodolistAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const)
// export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
// export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
// export const changeTodolistStatusAC = (id: string, todoListStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-STATUS', id, todoListStatus} as const)
// export const setTodolistsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)
//
// case 'REMOVE-TODOLIST':
// return state.filter(tl => tl.id !== action.id)
// case 'ADD-TODOLIST':
// return [{...action.todoList, filter: 'all', todolistStatus: 'idle'}, ...state]
// case 'CHANGE-TODOLIST-TITLE':
// return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)
// case 'CHANGE-TODOLIST-STATUS':
// return state.map((tl) => tl.id === action.id ? {...tl, todolistStatus: action.todoListStatus} : tl)
// case 'CHANGE-TODOLIST-FILTER':
// return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
// case 'SET-TODOLISTS':
// return action.todoLists.map((tl) => ({...tl, filter: 'all', todolistStatus: 'idle'}))

//rtk
const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        // removeTodolistAC(stateDraft, action: PayloadAction<{id: string}>) {
        //     const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
        //     if (index > -1) {
        //         stateDraft.splice(index, 1)
        //     }
        // },
        // addTodolistAC(stateDraft, action: PayloadAction<{todoList: TodoListType}>) {
        //     stateDraft.unshift({...action.payload.todoList, filter: 'all', todolistStatus: 'idle'})
        // },
        // changeTodolistTitleAC(stateDraft, action: PayloadAction<{id: string, title: string}>) {
        //     const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
        //     stateDraft[index].title = action.payload.title
        // },
        changeTodolistFilterAC(stateDraft, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(stateDraft, action: PayloadAction<{id: string, todoListStatus: RequestStatusType}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].todolistStatus = action.payload.todoListStatus
        },
        // setTodolistsAC(stateDraft, action: PayloadAction<{todoLists: Array<TodoListType>}>) {
        //     return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolistsTC.fulfilled, (stateDraft, action) => {
                return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
            })
            .addCase(removeTodolistTC.fulfilled, (stateDraft, action) => {
                const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
                if (index > -1) {
                    stateDraft.splice(index, 1)
                }
            })
            .addCase(addTodolistTC.fulfilled, (stateDraft, action) => {
                if (action.payload)
                stateDraft.unshift({...action.payload.todoList, filter: 'all', todolistStatus: 'idle'})
            })
            .addCase(changeTodolistTitleTC.fulfilled, (stateDraft, action) => {
                if (action.payload) {
                    // @ts-ignore
                    const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
                    stateDraft[index].title = action.payload.title
                }
            })
    }
})

export const todolistsReducer = slice.reducer
export const {changeTodolistFilterAC, changeTodolistStatusAC} = slice.actions