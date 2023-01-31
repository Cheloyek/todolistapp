import React, {useCallback, useEffect} from 'react'
import './todolistStyle.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {FilterValuesType} from "../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTasksThunkCreator} from "../state/tasks-reducer";
import {RequestStatusType} from "../app-reducer";

type TodolistPropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    todolistStatus: RequestStatusType
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    filter: FilterValuesType
    deleteTodoList: (todoListId: string) => void
    demo?: boolean
}

//type for task
// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }

export const Todolist = React.memo ( ({demo = false, ...props}: TodolistPropsType) => {
    console.log('TodoList is called')
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        // @ts-ignore
        dispatch(fetchTasksThunkCreator(props.todolistId))
    }, [])

    //click button -> change filter
    const changeTodoListFilter = useCallback ((value: FilterValuesType) => props.changeFilter(value, props.todolistId), [props.changeFilter, props.todolistId])
    //click button -> delete todolist
    const removeTodoList = useCallback(() => props.deleteTodoList(props.todolistId), [props.deleteTodoList, props.todolistId])

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
                <IconButton aria-label="delete" size="medium" disabled={props.todolistStatus === 'loading'}>
                    <DeleteIcon fontSize="small" onClick={removeTodoList}/>
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
                <Button onClick={() => changeTodoListFilter('all')}
                        variant={props.filter === 'all' ? 'contained' : 'text'}
                style={{backgroundColor: props.filter === 'all' ? '#e17a02' : ''}}>All
                </Button>
                <Button onClick={() => changeTodoListFilter('active')}
                        variant={props.filter === 'active' ? 'contained' : 'text'}
                        style={{backgroundColor: props.filter === 'active' ? '#e17a02' : '#649663'}}>Active
                </Button>
                <Button onClick={() => changeTodoListFilter('completed')}
                        variant={props.filter === 'completed' ? 'contained' : 'text'} color='inherit'
                        style={{backgroundColor: props.filter === 'completed' ? '#e17a02' : '#747974'}}>Completed
                </Button>
            </div>
        </div>
    )
} )

