import {TasksStateType} from "../App";
import {addTodolistAC, TodoListDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


test('id should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodoListsState: Array<TodoListDomainType> = []

    const action = addTodolistAC('newTodoList')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todolistsReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTask = keys[0]
    const idFromTodoList = endTodoListsState[0].id

    expect(idFromTask).toBe(action.todolistId)
    expect(idFromTodoList).toBe(action.todolistId)
})