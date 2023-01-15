import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react'
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
export const Todolist = React.memo ( (props: TodolistPropsType) => {
    console.log('TodoList is called')
    //click button -> change filter
    const onClickFilterButtonHandler = (value: FilterValuesType) => props.changeFilter(value, props.todolistId)

    //click button -> delete todolist
    const onClickRemoveTodoListHandler = () => props.deleteTodoList(props.todolistId)

    //обертка addTask
    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.title])

    //input todoList title
    const changeTodoListTitle = useCallback ((newTitle: string) => {
        props.changeTodoListTitle(props.todolistId, newTitle)
    }, [])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((t) => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((t) => t.isDone)
    }

    return (
        <div className='todolist' >
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete" size="medium">
                    <DeleteIcon fontSize="small" onClick={onClickRemoveTodoListHandler}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>

            <div>
                {tasksForTodoList.map(task => {
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

                    return <div key={task.id} className={task.isDone ? 'completed-task' : ''}>
                        <Checkbox checked={task.isDone} onChange={onChangeStatusHandler}/>
                        <EditableSpan title={task.title} onChange={onChangeTaskTitleHandler}/>
                        <IconButton aria-label="delete" size="small">
                            <DeleteIcon fontSize="small" onClick={onClickTaskDeleteHandler}/>
                        </IconButton>
                    </div>

                })}
            </div>
            <div>
                <Button onClick={() => onClickFilterButtonHandler('all')}
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                style={{backgroundColor: props.filter === 'all' ? '#e17a02' : ''}}>All
                </Button>
                <Button onClick={() => onClickFilterButtonHandler('active')}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        style={{backgroundColor: props.filter === 'active' ? '#e17a02' : '#649663'}}>Active
                </Button>
                <Button onClick={() => onClickFilterButtonHandler('completed')}
                        variant={props.filter === 'completed' ? 'contained' : 'text'} color='inherit'
                        style={{backgroundColor: props.filter === 'completed' ? '#e17a02' : '#747974'}}>Completed
                </Button>
            </div>
        </div>
    )
} )
