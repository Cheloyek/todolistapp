import {TodolistType} from "../App";
import {v1} from "uuid";
import {todolistsReducer} from "./todolists-reducer";

let todoListId1 = v1()
let todoListId2 = v1()
let todoListId3 = v1()

const startState: Array<TodolistType> = [
    {id: todoListId1, title: 'Todolist1', filter: 'all'},
    {id: todoListId2, title: 'Todolist2', filter: 'all'},
    {id: todoListId3, title: 'Todolist3', filter: 'all'}
]

test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})

    expect(endState!.length).toBe(2)
    expect(endState![0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New Todolist'
    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})

    expect(endState!.length).toBe(4)
    expect(endState![3].title).toBe(newTodoListTitle)
    expect(endState![3].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New Todolist'
    const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle})

    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('New Todolist')
    expect(endState[2].title).toBe('Todolist3')
})