import {TasksStateType} from "../App";
import {v1} from "uuid";
import {removeTaskAC, tasksReducer} from "./tasks-reducer";

let todoListId1 = v1()
let todoListId2 = v1()
let todoListId3 = v1()

let taskId1 = v1()
let taskId2 = v1()
let taskId3 = v1()
let taskId4 = v1()
let taskId5 = v1()
let taskId6 = v1()

const startState: TasksStateType = {
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