import React, {useCallback} from 'react'
import './todolistStyle.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {FilterValuesType} from "../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void
}

//type for task
// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }

export const Todolist = React.memo ( (props: TodolistPropsType) => {
    console.log('TodoList is called')
    //click button -> change filter
    const onClickFilterButtonHandler = useCallback ((value: FilterValuesType) => props.changeFilter(value, props.todolistId), [props.changeFilter, props.todolistId])

    //click button -> delete todolist
    const onClickRemoveTodoListHandler = useCallback(() => props.deleteTodoList(props.todolistId), [props.deleteTodoList, props.todolistId])

    //обертка addTask
    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.todolistId)
    }, [props.addTask, props.title])

    //input todoList title
    const changeTodoListTitle = useCallback ((newTitle: string) => {
        props.changeTodoListTitle(props.todolistId, newTitle)
    }, [props.changeTodoListTitle, props.todolistId])

    let tasksForTodoList = props.tasks
    if (props.filter === 'active') {
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
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
                {tasksForTodoList.map(task =>
                    <Task
                    removeTask={props.removeTask}
                    task={task}
                    todolistId={props.todolistId}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    key={task.id}
                    />
                )}
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

