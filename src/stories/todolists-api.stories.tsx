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
    const [todoListId, setTodoListId] = useState<any>(null)
    const deleteTodoListCallback = () => {
        todoListsApi.deleteTodoList(todoListId)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }

    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <button onClick={deleteTodoListCallback}>Delete todoList</button>
        {state ? JSON.stringify(state) : ''}
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const updateTodoListTitleCallback = () => {
        todoListsApi.changeTodoListTitle(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}/>
        <button onClick={updateTodoListTitleCallback}>Change TodoList title</button>
        {state ? JSON.stringify(state) : ''}
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const getTasksCallback = () => {
        todoListsApi.getTasks(todoListId)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <button onClick={getTasksCallback}>Get tasks</button>
        {JSON.stringify(state)}
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTaskCallback = () => {
        todoListsApi.deleteTask(todoListId, taskId)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }
    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <input type="text" placeholder={'taskId'} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <button onClick={deleteTaskCallback}>delete task</button>
        {JSON.stringify(state)}
    </div>
}

export const AddTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const addTaskCallback = () => {
        todoListsApi.createTask(todoListId, title)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }
    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <input type="text" placeholder={'title'} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={addTaskCallback}>Add task</button>
        {JSON.stringify(state)}
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todoListId, setTodoListId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const changeTaskTitleCallback = () => {
        todoListsApi.changeTask(todoListId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
            .catch((rej) => {
                alert(rej.message)
            })
    }

    return <div>
        <input type="text" placeholder={'todoListId'} onChange={(e) => {setTodoListId(e.currentTarget.value)}}/>
        <input type="text" placeholder={'taskId'} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <input type="text" placeholder={'title'} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={changeTaskTitleCallback}>Change task title</button>
        {JSON.stringify(state)}
    </div>
}



