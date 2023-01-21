import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
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
        return instance.get('/todo-lists')
    },
    createTodoList(title: string) {
        return instance.post('/todo-lists', {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete(`/todo-lists/${todoListId}`)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return instance.put(`/todo-lists/${todoListId}`, {title})
    }
}