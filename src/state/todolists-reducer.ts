import {v1} from "uuid";
import {todoListsApi, TodoListType} from "../api/todolists-api";
import {Dispatch} from "redux";

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
export type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType | SetTodolistsActionType


export const todolistsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): TodoListDomainType[] => {
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

export const fetchTodolistsThunkCreator = () => {
    return (dispatch: Dispatch) => {
        todoListsApi.getTodoLists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}

export const removeTodolistThunkCreator = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodolistAC(todoListId))
            })
    }
}

export const addTodoListThunkCreator = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTodoList(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}