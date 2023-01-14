import {TasksStateType} from "../App";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "./todolists-reducer";

let todoListId1: string
let todoListId2: string

let taskId1: string
let taskId2: string
let taskId3: string
let taskId4: string
let taskId5: string
let taskId6: string

let startState: TasksStateType

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    taskId1 = v1()
    taskId2 = v1()
    taskId3 = v1()
    taskId4 = v1()
    taskId5 = v1()
    taskId6 = v1()

    startState = {
        [todoListId1]: [
            {id: taskId1, title: 'task1', isDone: true},
            {id: taskId2, title: 'task2', isDone: false},
            {id: taskId3, title: 'task3', isDone: false}
        ],
        [todoListId2]: [
            {id: taskId4, title: 'task1', isDone: true},
            {id: taskId5, title: 'task2', isDone: false},
            {id: taskId6, title: 'task3', isDone: false}
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC(todoListId1, taskId1)
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListId1]: [
            {id: taskId2, title: 'task2', isDone: false},
            {id: taskId3, title: 'task3', isDone: false}
        ],
        [todoListId2]: [
            {id: taskId4, title: 'task1', isDone: true},
            {id: taskId5, title: 'task2', isDone: false},
            {id: taskId6, title: 'task3', isDone: false}
        ]
    })
    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2].every(t => t.id !== taskId1)).toBeTruthy()
    expect(endState[todoListId1][0].id).toBe(taskId2)
    expect(endState[todoListId1][1].id).toBe(taskId3)
})

test('correct task should be added to correct array', () => {
    const action = addTaskAC(todoListId2, 'newTask')
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2].length).toBe(4)
    expect(endState[todoListId2][0].title).toBe('newTask')
    expect(endState[todoListId1][0].title).not.toBe('newTask')
    expect(endState[todoListId2][0].id).toBeDefined()
    expect(endState[todoListId2][0].isDone).toBe(false)
})

test('status of task should be changed', () => {
    const action = changeTaskStatusAC(todoListId1, taskId2, true)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].isDone).toBeTruthy()
    expect(endState[todoListId1][2].isDone).toBeFalsy()
    expect(endState[todoListId2][1].isDone).toBeFalsy()
})

test('task title should be changed', () => {
    const action = changeTaskTitleAC(todoListId1, taskId2, 'newTaskTitle')
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].title).toBe('newTaskTitle')
    expect(endState[todoListId2][1].title).toBe('task2')
    expect(endState[todoListId1].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('newTodolist')
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== todoListId1 && k !== todoListId2)
    if (!newKey) {
        throw new Error('new key should be added')
    }
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])

})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC(todoListId1)

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId1]).toBeUndefined()
})