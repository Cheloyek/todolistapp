import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import './todolistStyle.css';
import {FilterValuesType} from "../App";

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void
}

//type for task
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<null | string>(null)


    //add new task
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required')
            setNewTaskTitle('')
            return
        } else {
            props.addTask(newTaskTitle.trim(), props.todolistId)
            setNewTaskTitle('')
        }
    }

    //input -> change new task title
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    //press key Enter -> addTask
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask()
        }
    }

    //click button -> change filter
    const onClickFilterButtonHandler = (value: FilterValuesType) => props.changeFilter(value, props.todolistId)

    //delete todolist
    const onClickDeleteTodoListHandler = () => props.deleteTodoList(props.todolistId)

    return (
        <div className='todolist'>
                <h3>{props.title}<button onClick={onClickDeleteTodoListHandler}>del</button></h3>
            <div>
                <input type="text"
                       placeholder={'Task title'}
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
            </div>
            {error && <div className='error-message'>{error}</div>}
            <ul>
                {props.tasks.map(task => {
                    //button -> delete task
                    const onClickTaskDeleteHandler = () => {
                        props.removeTask(task.id, props.todolistId)
                    }
                    //checkbox
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistId)
                    }

                    return <li key={task.id} className={task.isDone ? 'completed-task' : ''}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                    <span>{task.title}</span>
                    <button onClick={onClickTaskDeleteHandler}>X</button></li>})}
            </ul>
            <div>
                <button onClick={() => onClickFilterButtonHandler('all')}
                        className={props.filter === 'all' ? 'active-filter' : ''}>All</button>
                <button onClick={() => onClickFilterButtonHandler('active')}
                        className={props.filter === 'active' ? 'active-filter' : ''}>Active</button>
                <button onClick={() => onClickFilterButtonHandler('completed')}
                        className={props.filter === 'completed' ? 'active-filter' : ''}>Completed</button>
            </div>
        </div>
    )
}