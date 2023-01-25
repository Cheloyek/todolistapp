import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodoListDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {setTasksAC, tasksReducer} from "./tasks-reducer";

let todoListId1: string
let todoListId2: string
let todoListId3: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
todoListId1 = v1()
todoListId2 = v1()
todoListId3 = v1()

startState = [
    {id: todoListId1, title: 'Todolist1', filter: 'all', order: 0, addedDate: ''},
    {id: todoListId2, title: 'Todolist2', filter: 'all', order: 0, addedDate: ''},
    {id: todoListId3, title: 'Todolist3', filter: 'all', order: 0, addedDate: ''}
]
})
test('correct todolist should be removed', () => {
    // const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})
    const endState = todolistsReducer(startState, removeTodolistAC(todoListId1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New Todolist'
    // const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST', title: newTodoListTitle})
    const endState = todolistsReducer(startState, addTodolistAC(newTodoListTitle))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[3].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New Todolist'
    // const endState = todolistsReducer(startState, {type: "CHANGE-TODOLIST-TITLE", id: todoListId2, title: newTodoListTitle})
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('New Todolist')
    expect(endState[2].title).toBe('Todolist3')
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    // const endState = todolistsReducer(startState, {type: 'CHANGE-TODOLIST-FILTER', id: todoListId2, filter: newFilter})
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct set todolists', () => {

    const endState = todolistsReducer([], setTodolistsAC(startState))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('Todolist2')
    expect(endState[2].title).toBe('Todolist3')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
    expect(endState[2].filter).toBe('all')
})

