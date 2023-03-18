import {v1} from "uuid";
import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, updateTaskTC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, TodoListDomainType} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {TasksStateType} from "./TodolistsList";

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
            {id: taskId1, title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId2, title: 'task2', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId3, title: 'task3', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ],
        [todoListId2]: [
            {id: taskId4, title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId5, title: 'task2', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId6, title: 'task3', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ]
    }
})


test('correct task should be deleted from correct array', () => {
    // const action = removeTaskAC({todolistId: todoListId1, taskId: taskId1})
    let param = {todolistId: todoListId1, taskId: taskId1}
    const action = removeTaskTC.fulfilled(param, 'requestId', param)
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        [todoListId1]: [
            {id: taskId2, title: 'task2', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId3, title: 'task3', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ],
        [todoListId2]: [
            {id: taskId4, title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId5, title: 'task2', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: taskId6, title: 'task3', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ]
    })
    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(3)
    expect(endState[todoListId2].every(t => t.id !== taskId1)).toBeTruthy()
    expect(endState[todoListId1][0].id).toBe(taskId2)
    expect(endState[todoListId1][1].id).toBe(taskId3)
})

test('correct task should be added to correct array', () => {
    const newTask = {id: v1(), title: 'newTask', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
    // const action = addTaskAC(newTask)
    const action = addTaskTC.fulfilled(newTask, 'requestId', {title: newTask.title, todoListId: newTask.todoListId})
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2].length).toBe(4)
    expect(endState[todoListId2][0].title).toBe('newTask')
    expect(endState[todoListId1][0].title).not.toBe('newTask')
    expect(endState[todoListId2][0].id).toBeDefined()
    expect(endState[todoListId2][0].status).toBe(TaskStatuses.New)
})

test('status of task should be changed', () => {
    // const action = updateTaskAC({todolistId: todoListId1, taskId: taskId2, model: {status: TaskStatuses.Completed}})
    const changeModel = {todolistId: todoListId1, taskId: taskId2, model: {status: TaskStatuses.Completed}}
    const action = updateTaskTC.fulfilled(changeModel, 'requestId', changeModel)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].status).toBe(TaskStatuses.Completed)
    expect(endState[todoListId1][2].status).toBe(TaskStatuses.New)
    expect(endState[todoListId2][1].status).toBe(TaskStatuses.New)
})

test('task title should be changed', () => {
    const changeModel = {todolistId: todoListId1, taskId: taskId2, model: {title: 'newTaskTitle'}}
    const action = updateTaskTC.fulfilled(changeModel, 'requestId', changeModel)
    const endState = tasksReducer(startState, action)

    expect(endState[todoListId1][1].title).toBe('newTaskTitle')
    expect(endState[todoListId2][1].title).toBe('task2')
    expect(endState[todoListId1].length).toBe(3)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC({todoList: {id: v1(), title:'Todolist1', order: 0, addedDate: ''}})
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
    const action = removeTodolistAC({id: todoListId1})

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId1]).toBeUndefined()
})

test('set todoLists', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()
    const startTodoLists: Array<TodoListDomainType> = [
        {id: todoListId1, title: 'Todolist1', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
        {id: todoListId2, title: 'Todolist2', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'}
    ]
    const action = setTodolistsAC({todoLists: startTodoLists})
    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(startTodoLists[0]).toBeDefined()
    expect(startTodoLists[1]).toBeDefined()
})

test('tasks should be added for todolists', () => {

    // const action = setTasksAC({todolistId: todoListId1, tasks: startState[todoListId1]})
    const action = fetchTasksTC.fulfilled({todolistId: todoListId1, tasks: startState[todoListId1]}, 'requestId', todoListId1)
    const endState = tasksReducer({ [todoListId1]:[], [todoListId2]:[]}, action)

    expect(endState[todoListId1].length).toBe(3)
    expect(endState[todoListId2].length).toBe(0)
})