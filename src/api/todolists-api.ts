import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
}

const instance = axios.create({
    //local
    // baseURL: 'https://social-network.samuraijs.com/api/1.1',

    //vercel
    baseURL: 'https://cors-anywhere.herokuapp.com/https://social-network.samuraijs.com/api/1.1',
    ...settings
})

//api
export const todoListsApi = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<TodoListResponseType<{ item: TodoListType }>>('/todo-lists', {title})
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
    changeTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<TodoListResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}

export const authApi = {
    login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance.post<TodoListResponseType<{userId?: number}>>(`/auth/login`, {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete<TodoListResponseType<{userId?: number}>>(`/auth/login`)
    },
    me() {
        return instance.get<TodoListResponseType<{id: number, email: string, login: string}>>(`/auth/me`)
    }
}

//types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldErrorType = { field: string, error: string };
export type TodoListResponseType<D = {}> = {
    data: D
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    resultCode: number
}
type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type UpdateTaskModelType = {
    title: string,
    description: string,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string
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

/**
 * Enum for task statuses.
 * @readonly
 * @enum
 * {New | InProgress | Completed | Draft}
 */
export enum TaskStatuses {
    New ,
    InProgress,
    Completed,
    Draft
}

/**
 * Enum for task priorities.
 * @readonly
 * @enum
 * {Low | Middle | Hi | Urgently | Later}
 */
export enum TaskPriorities {
    Low ,
    Middle,
    Hi,
    Urgently,
    Later
}