import {todoListsApi, TodoListType} from "../../api/todolists-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppErrorAC, setAppStatusAC, SetStatusActionType} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";

const initialState: Array<TodoListDomainType> = []

export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodolistsActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            // let copyState = [...state]
            return state.filter(tl => tl.id !== action.id)


        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: 'all', todolistStatus: 'idle'}, ...state]


        case 'CHANGE-TODOLIST-TITLE':
            return state.map((tl) => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-STATUS':
            return state.map((tl) => tl.id === action.id ? {...tl, todolistStatus: action.todoListStatus} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)


        case 'SET-TODOLISTS':
            return action.todoLists.map((tl) => ({...tl, filter: 'all', todolistStatus: 'idle'}))

        default:
            return state
    }
}

//AC
export const removeTodolistAC = (id: string) => ({type: 'REMOVE-TODOLIST', id} as const)
export const addTodolistAC = (todoList: TodoListType) => ({type: 'ADD-TODOLIST', todoList} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id, filter} as const)
export const changeTodolistStatusAC = (id: string, todoListStatus: RequestStatusType) => ({type: 'CHANGE-TODOLIST-STATUS', id, todoListStatus} as const)
export const setTodolistsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

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
            .catch((error) => {
                handleServerNetworkError(dispatch, error)
                // dispatch(setAppErrorAC(e.))
            })
    }
}

export const removeTodolistThunkCreator = (todoListId: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(todoListId, 'loading'))
    try {
        await todoListsApi.deleteTodoList(todoListId)
        dispatch(removeTodolistAC(todoListId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(changeTodolistStatusAC(todoListId, 'failed'))
        handleServerNetworkError(dispatch, error)
        // console.log("error")
        // console.log(error.message)
        // dispatch(setAppStatusAC('failed'))
        // throw new Error(e)
        // setAppErrorAC(e.message)
    }

}

export const addTodoListThunkCreator = (title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    // const res = await todoListsApi.createTodoList(title)
    // dispatch(addTodolistAC(res.data.data.item))
    // dispatch(setAppStatusAC('succeeded'))
    try {
        const res = await todoListsApi.createTodoList(title)
        dispatch(addTodolistAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        handleServerNetworkError(dispatch, error)
    }
}

export const changeTodoListTitleThunkCreator = (todoListId: string, title: string): AppThunk => async dispatch => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistStatusAC(todoListId, 'loading'))
    try {
        await todoListsApi.changeTodoListTitle(todoListId, title)
        dispatch(changeTodolistTitleAC(todoListId, title))
        dispatch(changeTodolistStatusAC(todoListId, 'succeeded'))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error: any) {
        dispatch(changeTodolistStatusAC(todoListId, 'failed'))
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
