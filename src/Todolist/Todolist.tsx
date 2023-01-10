import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import './todolistStyle.css';
import {FilterValuesType} from "../App";
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import { styled } from '@mui/material/styles';
import {Button, ButtonProps, Checkbox, IconButton} from "@mui/material";
import {red} from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void
}

//type for task
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    padding: 0,
    margin: 5,
    '&:hover': {
        backgroundColor: red[700],
    },
}));
export const Todolist = (props: TodolistPropsType) => {
    //click button -> change filter
    const onClickFilterButtonHandler = (value: FilterValuesType) => props.changeFilter(value, props.todolistId)

    //click button -> delete todolist
    const onClickRemoveTodoListHandler = () => props.deleteTodoList(props.todolistId)

    //обертка addTask
    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }

    //input todoList title
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.todolistId, newTitle)
    }

    return (
        <div className='todolist'>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                {/*<button onClick={onClickRemoveTodoListHandler}>del</button>*/}
                <IconButton aria-label="delete" size="medium">
                    <DeleteIcon fontSize="small" onClick={onClickRemoveTodoListHandler}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

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

                    //input task title
                    const onChangeTaskTitleHandler = (newTitle: string) => {
                        props.changeTaskTitle(props.todolistId, task.id, newTitle)
                    }

                    return <li key={task.id} className={task.isDone ? 'completed-task' : ''}>
                        {/*<input type="checkbox" checked={task.isDone} onChange={onChangeStatusHandler}/>*/}
                        <Checkbox checked={task.isDone} onChange={onChangeStatusHandler}/>
                        {/*<span>{task.title}</span>*/}
                        <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                        {/*<button onClick={onClickTaskDeleteHandler}>X</button>*/}
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" onClick={onClickTaskDeleteHandler}/>
                        </IconButton>
                    </li>

                })}
            </ul>
            <div>
                <Button onClick={() => onClickFilterButtonHandler('all')}
                        variant={props.filter === 'all' ? 'contained' : 'text'} >All
                </Button>
                <Button onClick={() => onClickFilterButtonHandler('active')}
                        variant={props.filter === 'active' ? 'contained' : 'text'} color='success'>Active
                </Button>
                <Button onClick={() => onClickFilterButtonHandler('completed')}
                        variant={props.filter === 'completed' ? 'contained' : 'text'} color='inherit'>Completed
                </Button>
            </div>
        </div>
    )
}
