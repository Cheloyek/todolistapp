import axios from "axios";
import {number, string} from "prop-types";

// const settings = {
//     withCredentials: true,
//     headers: {
//         'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
//     }
// }

export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CreateTodoListResponseType = {
    item: TodoListType
}
export type ResponseType<D> = {
    data: D
    messages: Array<string>
    resultCode: number
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
})

export const todoListsApi = {
    getTodoLists() {
        // return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return instance.get<Array<ResponseType<CreateTodoListResponseType>>>('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{}>>('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType<{}>>(`/todo-lists/${todoListId}`)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return instance.put<ResponseType<{}>>(`/todo-lists/${todoListId}`, {title})
    }
}