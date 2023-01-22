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
        let todoListId = '525c7ab5-bbd0-4393-b156-2fc61b20938c'
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
        let todoListId = '580d3a32-e3be-4daf-b972-843d492b528f'
        let title = 'New TodoList title'
            todoListsApi.changeTodoListTitle(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = 'e5f6e88d-5b14-4a36-ae47-679e9b6e2dcf'
        todoListsApi.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = 'e5f6e88d-5b14-4a36-ae47-679e9b6e2dcf'
        let taskId = '64e8e852-536d-40e9-8e23-794aa07cb33c'
        todoListsApi.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = 'e5f6e88d-5b14-4a36-ae47-679e9b6e2dcf'
        let title = 'New task'
        todoListsApi.createTask(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const ChangeTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todoListId = 'e5f6e88d-5b14-4a36-ae47-679e9b6e2dcf'
        let taskId = '1075a04d-b819-4b13-b33f-2d1401a34982'
        let newTitle = 'Update task title'
        todoListsApi.changeTask(todoListId, taskId, newTitle)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}



