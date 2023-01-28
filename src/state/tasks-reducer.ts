import {TasksStateType} from "../AppWiithRedux";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, SetTodolistsActionType,
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoListsApi} from "../api/todolists-api";
import {Dispatch} from "redux";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    // todolistId: string
    // title: string
    task: TaskType
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    todolistId: string
    taskId: string
    status: TaskStatuses
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    todolistId: string
    taskId: string
    title: string
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    todolistId: string
    tasks: Array<TaskType>
}

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | SetTasksActionType

const initialState: TasksStateType = {
//     [todoListId1]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ],
//     [todoListId2]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ],
//     [todoListId3]: [
//     {id: v1(), title: 'task1', isDone: true},
//     {id: v1(), title: 'task2', isDone: false},
//     {id: v1(), title: 'task3', isDone: false}
// ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(task => task.id !== action.taskId)
            return copyState
        }

        case 'ADD-TASK': {
            // const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
            // let copyState = {...state}
            // let todoListTasks = copyState[action.todolistId]
            // copyState[action.todolistId] = [newTask, ...todoListTasks]

            const newTask = action.task
            let copyState = {...state}
            let todoListTasks = copyState[newTask.todoListId]
            copyState[newTask.todoListId] = [newTask, ...todoListTasks]
            return copyState
        }

        case 'CHANGE-TASK-STATUS': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            return copyState
        }

        case 'CHANGE-TASK-TITLE': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = todoListTasks.map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            return copyState
        }

        case 'ADD-TODOLIST': {
            let copyState = {...state}
            // copyState[action.todolistId] = []
            copyState[action.todoList.id] = []
            return copyState
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }

        case 'SET-TODOLISTS': {
            let copyState = {...state}
            action.todoLists.forEach((tl) => copyState[tl.id] = [])
            return copyState
        }

        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistId, taskId}
}

// export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
//     return {type: 'ADD-TASK', todolistId, title}
// }

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, taskId, status}
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', todolistId, taskId, title}
}

export const setTasksAC = (todolistId: string, tasks: Array<TaskType>): SetTasksActionType => {
    return {type: 'SET-TASKS', todolistId, tasks}
}

export const fetchTasksThunkCreator = (todolistId: string) => (dispatch: Dispatch) => {
    todoListsApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            dispatch(setTasksAC(todolistId, tasks))
        })
}

export const removeTaskThunkCreator = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.deleteTask(todolistId, taskId)
            .then ((res) => {
                const action = removeTaskAC(todolistId, taskId)
                dispatch(action)
            })
    }
}

export const addTaskThunkCreator = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsApi.createTask(todoListId,title)
            .then((res) => {
                const task = res.data.data.item
                const action = addTaskAC(task)
                dispatch(action)
            })
    }
}

// export const updateTaskStatusThunkCreator = (todoListId: string, taskId: string, status: TaskStatuses) => {
//     return (dispatch: Dispatch) => {
//         todoListsApi.changeTodoListTitle(todoListId, title)
//     }
// }
