import {todoListsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunk} from "./store";
import {ThunkAction} from "redux-thunk";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    // title: string
    // todolistId: string
    todoList: TodoListType
}

export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks

export type TodoListDomainType = TodoListType & { filter: FilterValuesType }

const initialState: Array<TodoListDomainType> = [
]
export type TodolistsActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: TodolistsActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            let copyState = [...state]
            return copyState.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            // let newTodoList: TodoListDomainType = {id: action.todolistId, title: action.title, filter: 'all', addedDate: '', order: 0}
            let newTodoList: TodoListDomainType = {...action.todoList, filter: 'all'}
            return [newTodoList, ...state]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }

        case 'SET-TODOLISTS': {
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}))
        }

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}

export const addTodolistAC = (todoList: TodoListType): AddTodolistActionType => {
    // return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
    return {type: 'ADD-TODOLIST', todoList}
}

export const changeTodolistTitleAC = (todoListId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todoListId, title: title}
}

export const changeTodolistFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todoListId, filter: filter}
}

export const setTodolistsAC = (todoLists: Array<TodoListType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todoLists}
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
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
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
    try {
        await todoListsApi.deleteTodoList(todoListId)
        dispatch(removeTodolistAC(todoListId))
    } catch (e: any) {
        throw new Error(e)
    }


}

//добавление листа
export const addTodoListThunkCreator = (title: string): AppThunk => async dispatch => {
        const res = await todoListsApi.createTodoList(title)
        dispatch(addTodolistAC(res.data.data.item))
}

//редактирование листа
export const changeTodoListTitleThunkCreator = (todoListId: string, title: string): AppThunk => async dispatch => {
        await todoListsApi.changeTodoListTitle(todoListId, title)
                dispatch(changeTodolistTitleAC(todoListId, title))
}