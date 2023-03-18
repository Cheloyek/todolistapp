import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC, changeTodolistStatusAC,
    changeTodolistTitleAC, fetchTodolistsTC, FilterValuesType,
    removeTodolistAC, TodoListDomainType,
    todolistsReducer
} from "./todolists-reducer";

let todoListId1: string
let todoListId2: string
let todoListId3: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
todoListId1 = v1()
todoListId2 = v1()
todoListId3 = v1()

startState = [
    {id: todoListId1, title: 'Todolist1', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
    {id: todoListId2, title: 'Todolist2', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
    {id: todoListId3, title: 'Todolist3', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'}
]
})
test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC({id: todoListId1}))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(todoListId2)
})

test('correct todolist should be added', () => {
    let newTodoListTitle = 'New Todolist'
    const endState = todolistsReducer(startState, addTodolistAC({todoList: {id: v1(), title: newTodoListTitle, order: 0, addedDate: ''}}))

    expect(endState.length).toBe(4)
    expect(endState[0].title).toBe(newTodoListTitle)
    expect(endState[3].filter).toBe('all')
})

test('correct todolist should change its name', () => {
    let newTodoListTitle = 'New Todolist'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({id: todoListId2, title: newTodoListTitle}))

    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('New Todolist')
    expect(endState[2].title).toBe('Todolist3')
})

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed'

    const endState = todolistsReducer(startState, changeTodolistFilterAC({id: todoListId2, filter: newFilter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})

test('correct set todolists', () => {

    const endState = todolistsReducer([], fetchTodolistsTC.fulfilled({todoLists: startState}, 'requestId'))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('Todolist1')
    expect(endState[1].title).toBe('Todolist2')
    expect(endState[2].title).toBe('Todolist3')
    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe('all')
    expect(endState[2].filter).toBe('all')
})

test('change todolistStatus', () => {

    const endState = todolistsReducer(startState, changeTodolistStatusAC({id: todoListId1, todoListStatus: 'loading'}))

    expect(endState[0].todolistStatus).toBe('loading')
    expect(endState[1].todolistStatus).toBe('idle')
})

