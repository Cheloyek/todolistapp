import axios from "axios";
import {TodoListDomainType} from "../state/todolists-reducer";

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoListResponseType = {
    item: TodoListType
}
export type TodoListResponseType<D = {}> = {
    data: D
    messages: Array<string>
    resultCode: number
}

type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export enum TaskStatuses {
    New ,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low ,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    addedDate: string
}

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    ...settings
})

// type UpdateTaskType = {
//     title: string
//     description: string
//     completed: boolean
//     status: number
//     priority: number
//     startDate: string
//     deadline: string
// }

export const todoListsApi = {
    getTodoLists() {
        // return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return instance.get<Array<TodoListDomainType>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<TodoListResponseType>('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<TodoListResponseType>(`/todo-lists/${todoListId}`)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return instance.put<TodoListResponseType>(`/todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<TodoListResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<TodoListResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    changeTask(todoListId: string, taskId: string, newTitle: string) {
        return instance.put<TodoListResponseType<TaskType>>(`/todo-lists/${todoListId}/tasks/${taskId}`, {title: newTitle, description: null,
            completed: false, status: 0, priority: 1, startDate: null, deadline: null})
    }
}