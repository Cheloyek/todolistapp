import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {action} from "@storybook/addon-actions";

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
//?????????????? ??????????????????:
//1. dispatch: Dispatch - import from redux / ?????????????????? ?????????? ?? dispatch ???????????????? action ?? ???????????????? ???????? type
//2. ???????????????? generic / dispatch: Dispatch<SetTodolistsActionType> / ?????????????????? ?????? ?? dispatch - ???????????? SetTodolistsActionType
//3. generic ?? ?????????? ActionsType / dispatch: Dispatch<TodolistsActionType> / dispatch ?????????? ???? ???????? TodolistsActionsType
//4. ?????????????? ?????????? ?????? actions - AppActionsType / dispatch: Dispatch<AppActionsType> / ???????????????? ???? ?????????????? ?????????? ?????????? ?? thunk ???????????????????? ???????????? thunk
//5. fetchTodolistsThunkCreator = (): ThunkAction<void, RootState, unknown, AnyAction> / ?????? ???????????????? thunk
//ThunkAction<R, S, E, A> ???? redux-thunk,
//R - ?????? thunk ???????????????????? (?????? ?????????????? void)
//S - state ?????????? ????????????????????
//E - ???????????? ?????????????????? (unknown)
//A - ?????? actions
//6. ?????????????? ?????????????????? ?? store AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

//1-4. export const fetchTodolistsThunkCreator = () => {
//5. export const fetchTodolistsThunkCreator = (): ThunkAction<void, AppRootStateType, unknown, AppActionsType> => {
//6.
export const fetchTodolistsThunkCreator = (): AppThunk => {
    //1. return (dispatch: Dispatch) => {
    //2. return (dispatch: Dispatch<SetTodolistsActionType>) => {
    //3. return (dispatch: Dispatch<TodolistsActionsType>) => {
    //4. return (dispatch: Dispatch<AppActionsType>) => {
    //5. return (dispatch)
    return (dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC({todoLists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
            })
    }
}

export const removeTodolistThunkCreator = (todoListId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'loading'}))
    try {
        await todoListsApi.deleteTodoList(todoListId)
        dispatch(removeTodolistAC({id: todoListId}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'failed'}))
        handleServerNetworkError(dispatch, error)
    }

}

export const addTodoListThunkCreator = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todoListsApi.createTodoList(title)
        dispatch(addTodolistAC({todoList: res.data.data.item}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
}

export const changeTodoListTitleThunkCreator = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'loading'}))
    try {
        await todoListsApi.changeTodoListTitle(todoListId, title)
        dispatch(changeTodolistTitleAC({id: todoListId, title}))
        dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'succeeded'}))
        dispatch(setAppStatusAC({status: 'succeeded'}))
    } catch (error: any) {
        dispatch(changeTodolistStatusAC({id: todoListId, todoListStatus: 'failed'}))
        handleServerNetworkError(dispatch, error)
    }
}

//types
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | SetStatusActionType
    | ChangeTodolistStatusActionType

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
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
const initialState: Array<TodoListDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        removeTodolistAC(stateDraft, action: PayloadAction<{id: string}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                stateDraft.splice(index, 1)
            }
        },
        addTodolistAC(stateDraft, action: PayloadAction<{todoList: TodoListType}>) {
            stateDraft.push({...action.payload.todoList, filter: 'all', todolistStatus: 'idle'})
        },
        changeTodolistTitleAC(stateDraft, action: PayloadAction<{id: string, title: string}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].title = action.payload.title
        },
        changeTodolistFilterAC(stateDraft, action: PayloadAction<{id: string, filter: FilterValuesType}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].filter = action.payload.filter
        },
        changeTodolistStatusAC(stateDraft, action: PayloadAction<{id: string, todoListStatus: RequestStatusType}>) {
            const index = stateDraft.findIndex(tl => tl.id === action.payload.id)
            stateDraft[index].todolistStatus = action.payload.todoListStatus
        },
        setTodolistsAC(stateDraft, action: PayloadAction<{todoLists: Array<TodoListType>}>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todolistStatus: 'idle'}))
        }
    }
})

export const todolistsReducer = slice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistStatusAC, setTodolistsAC} = slice.actions