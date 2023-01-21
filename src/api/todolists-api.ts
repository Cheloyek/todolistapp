import axios from "axios";
import {useState} from "react";

const settings = {
    withCredentials: true,
    headers: {
        'api-key': '34d100b8-894d-4061-9da0-9a27cb217fe9'
    }
}

export const todoListsApi = {
    getTodoLists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },
    createTodoList(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title} ,settings)
    },
    deleteTodoList(todoListId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, settings)
    },
    changeTodoListTitle(todoListId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`, {title}, settings)
    }
}