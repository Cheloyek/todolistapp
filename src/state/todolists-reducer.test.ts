import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

let todoListId1 = v1()
let todoListId2 = v1()
let todoListId3 = v1()

const startState: Array<TodolistType> = [
    {id: todoListId1, title: 'Todolist1', filter: 'all'},
    {id: todoListId2, title: 'Todolist2', filter: 'all'},
    {id: todoListId3, title: 'Todolist3', filter: 'all'}
]

test('correct todolist should be removed', () => {
    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})
    const endState = todolistsReducer(startState, RemoveTodolistAC(todoListId1))

    expect(endState!.length).toBe(2)
    expect(endState![0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New Todolist'
    // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})
    const endState = todolistsReducer(startState, AddTodolistAC(newTodoListTitle))

    expect(endState!.length).toBe(4)
    expect(endState![3].title).toBe(newTodoListTitle)
    expect(endState![3].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New Todolist'
    // const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle})
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('New Todolist')
    expect(endState[2].title).toBe('Todolist3')
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    // const endState = todolistsReducer(startState, {type: 'CHANGE-TODOLIST-FILTER', id: todoListId2, filter: newFilter})
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})