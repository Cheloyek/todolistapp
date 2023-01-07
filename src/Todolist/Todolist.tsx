import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import './todolistStyle.css';
import {FilterValuesType} from "../App";

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

//type for task
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    //add new task
    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    //input -> change new task title
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    //press key Enter -> addTask
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }

    //click button -> change filter
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div className='todolist'>
                <h3>{props.title}</h3>
            <div>
                <input type="text"
                       placeholder={'Task title'}
                       value={newTaskTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(task => {
                    //button -> delete task
                    const onClickTaskDeleteHandler = () => {
                        props.removeTask(task.id)
                    }
                    //checkbox
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked)
                        // console.log(e.currentTarget.checked)
                    }

                    return <li key={task.id}>
                    <input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>
                    <span>{task.title}</span>
                    <button onClick={onClickTaskDeleteHandler}>X</button></li>})}
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}