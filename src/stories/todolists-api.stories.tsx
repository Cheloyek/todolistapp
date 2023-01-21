import React, {useEffect, useState} from 'react'
import {todoListsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsApi.getTodoLists()
        .then((res) => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'New TodoList'
        todoListsApi.createTodoList(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = '4742dc42-a664-43ab-9573-d22678b0ada4'
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = 'd6ff54cb-ea6e-4938-8008-1a82ad217dc0'
        let title = 'New TodoList title'
            todoListsApi.changeTodoListTitle(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

