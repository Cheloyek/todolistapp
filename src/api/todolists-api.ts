import axios from "axios";

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoListResponseType = {
    item: TodoListType
}
export type TodoListResponseType<D> = {
    data: D
    messages: Array<string>
    resultCode: number
}

type getTasksResponseType = {
    error: string | null
    totalCount: number
    items: Array<TaskResponseType>
}

export type TaskResponseType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
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


export const todoListsApi = {
    getTodoLists() {
        // return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return instance.get<Array<TodoListResponseType<CreateTodoListResponseType>>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<TodoListResponseType<{}>>('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<TodoListResponseType<{}>>(`/todo-lists/${todoListId}`)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return instance.put<TodoListResponseType<{}>>(`/todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<getTasksResponseType>(`/todo-lists/${todoListId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todoListId}/tasks/${taskId}`)
    }
}