import {todoListsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {ThunkAction} from "redux-thunk";
import {RequestStatusType, setAppStatusAC, SetStatusActionsType} from "../app-reducer";

// export type RemoveTodolistActionType = {
//     type: 'REMOVE-TODOLIST'
//     id: string
// }
//
// export type AddTodolistActionType = {
//     type: 'ADD-TODOLIST'
//     todoList: TodoListType
// }
//
// export type ChangeTodolistTitleActionType = {
//     type: "CHANGE-TODOLIST-TITLE"
//     id: string
//     title: string
// }
//
// export type ChangeTodolistFilterActionType = {
//     type: 'CHANGE-TODOLIST-FILTER'
//     id: string
//     filter: FilterValuesType
// }
//
// export type SetTodolistsActionType = {
//     type: 'SET-TODOLISTS'
//     todoLists: Array<TodoListType>
// }
//
// export type ChangeTodolistStatusActionType = {
//     type: 'CHANGE-TODOLIST-STATUS'
//     id: string
//     todoListStatus: RequestStatusType
// }
//
// ///
//
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ChangeTodolistStatusActionType = ReturnType<typeof changeTodolistStatusAC>

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks

export type TodoListDomainType = TodoListType & { filter: FilterValuesType, todolistStatus: RequestStatusType }

const initialState: Array<TodoListDomainType> = []
export type TodolistsActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType
    | SetStatusActionsType
    | ChangeTodolistStatusActionType


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodolistsActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let copyState = [...state]
            return copyState.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            // let newTodoList: TodoListDomainType = {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}
            let newTodoList: TodoListDomainType = {...action.todoList, filter: 'all', todolistStatus: 'idle'}
            return [newTodoList, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-STATUS': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.todolistStatus = action.todoListStatus
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                console.log(`reducer tl.id: ${todolist.id}`)
                console.log(`reducer type id: ${action.id}`)
                console.log(`reducer todolist: ${todolist}`)
                console.log(`reducer todolist.filter: ${todolist.filter}`)
                console.log(`reducer action.filter: ${action.filter}`)
                todolist.filter = action.filter
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todoLists.map((tl) => ({...tl, filter: 'all', todolistStatus: 'idle'}))
        }

        default:
            return state
    }
}

// export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
//     return {type: 'REMOVE-TODOLIST', id: todolistId}
// }

// export const addTodolistAC = (todoList: TodoListType): AddTodolistActionType => {
//     // return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
//     return {type: 'ADD-TODOLIST', todoList}
// }
//
// export const changeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleActionType => {
//     return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
// }
//
// export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
//     return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter}
// }
//
// //смена статуса листа
// export const changeTodolistStatusAC = (todoListId: string, todoListStatus: RequestStatusType): ChangeTodolistStatusActionType => {
//     return {type: 'CHANGE-TODOLIST-STATUS', id: todoListId, todoListStatus: todoListStatus}
// }
//
// export const setTodolistsAC = (todoLists: Array<TodoListType>): SetTodolistsActionType => {
//     return {type: 'SET-TODOLISTS', todoLists}
// }

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}

export const addTodolistAC = (todoList: TodoListType) => {
    return {type: 'ADD-TODOLIST', todoList} as const
}

export const changeTodolistTitleAC = (todoListId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title} as const
}

export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter} as const
}

export const changeTodolistStatusAC = (todoListId: string, todoListStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-STATUS', id: todoListId, todoListStatus: todoListStatus} as const
}

export const setTodolistsAC = (todoLists: Array<TodoListType>) => {
    return {type: 'SET-TODOLISTS', todoLists} as const
}


//thunks
//получение листов
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
export const fetchTodolistsThunkCreator = (): AppThunk => {
    //1. return (dispatch: Dispatch) => {
    //2. return (dispatch: Dispatch<SetTodolistsActionType>) => {
    //3. return (dispatch: Dispatch<TodolistsActionsType>) => {
    //4. return (dispatch: Dispatch<AppActionsType>) => {
    //5. return (dispatch)
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

//удаление листа
//1. then
// export const removeTodolistThunkCreator = (todoListId: string): AppThunk => dispatch => {
//         todoListsApi.deleteTodoList(todoListId)
//             .then((res) => {
//                 dispatch(removeTodolistAC(todoListId))
//             })
// }

//2. async await
export const removeTodolistThunkCreator = (todoListId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(todoListId, 'loading'))
    try {
        await todoListsApi.deleteTodoList(todoListId)
        dispatch(removeTodolistAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e: any) {
        dispatch(setAppStatusAC('failed'))
        throw new Error(e)
    }
}

//добавление листа
export const addTodoListThunkCreator = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    const res = await todoListsApi.createTodoList(title)
    dispatch(addTodolistAC(res.data.data.item))
    dispatch(setAppStatusAC('succeeded'))
}

//редактирование листа
export const changeTodoListTitleThunkCreator = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(todoListId, 'loading'))
    await todoListsApi.changeTodoListTitle(todoListId, title)
    dispatch(changeTodolistTitleAC(todoListId, title))
    dispatch(changeTodolistStatusAC(todoListId, 'succeeded'))
    dispatch(setAppStatusAC('succeeded'))
}
