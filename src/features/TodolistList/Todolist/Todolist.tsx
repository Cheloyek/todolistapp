import React, {useCallback, useEffect} from 'react'
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
// import './todolistStyle.css';
import {AddItemForm, EditableSpan} from "components";
import {Task} from "./Task";
import {RequestStatusType} from "app";
import {TaskStatuses, TaskType} from "api";
import {useAppDispatch} from "app/store";
import {fetchTasksTC} from "../tasks-reducer";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";

export const Todolist = React.memo ( ({demo = false, ...props}: TodolistPropsType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        if (!props.tasks.length) {
            dispatch(fetchTasksTC(props.todolist.id))
        }
    }, [])

    //click button -> change filter
    const changeTodoListFilter = useCallback ((value: FilterValuesType) => {
        props.changeFilter(value, props.todolist.id)}, [props.changeFilter, props.todolist.id])

    const removeTodoList = useCallback(() => props.deleteTodoList(props.todolist.id), [props.deleteTodoList, props.todolist.id, props.todolist.filter])

    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    const changeTodoListTitle = useCallback ((newTitle: string) => {
        props.changeTodoListTitle(props.todolist.id, newTitle)
    }, [props.changeTodoListTitle, props.todolist.id])

    let tasksForTodoList = props.tasks
    if (props.todolist.filter === 'active') {
        console.log(tasksForTodoList)
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.New)
        console.log(tasksForTodoList)
    }
    if (props.todolist.filter === 'completed') {
        console.log(tasksForTodoList)
        tasksForTodoList = props.tasks.filter((t) => t.status === TaskStatuses.Completed)
        console.log(tasksForTodoList)
    }

    return (
        <div className='todolist'>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
                   <h3 style={{width: "250px", wordWrap: "break-word"}}>
                    <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle} disabled={props.todolistStatus === 'loading'}/>
                </h3>

                <IconButton aria-label="delete" size="medium" disabled={props.todolistStatus === 'loading'} style={{ left: "7px"}}>
                    <DeleteIcon fontSize="small" onClick={removeTodoList}/>
                </IconButton>
            </div>

            <AddItemForm addItem={addTask} disabled={props.todolistStatus === 'loading'}/>
            <div>
                {tasksForTodoList.length === 0 ? <div style={{padding: "15px", color: "white"}}>No tasks!</div> : tasksForTodoList.map(task =>
                    <Task
                    removeTask={props.removeTask}
                    task={task}
                    todolistId={props.todolist.id}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    key={task.id}
                    />
                )}
                {/*{tasksForTodoList.length === 0 ? <div> No Task</div> : <div>task</div>}*/}
            </div>
            <div>
                <Button onClick={() => changeTodoListFilter('all')}
                        variant={props.todolist.filter === 'all' ? 'contained' : 'text'}
                style={{backgroundColor: props.todolist.filter === 'all' ? '#e17a02' : ''}}>All
                </Button>
                <Button onClick={() => changeTodoListFilter('active')}
                        variant={props.todolist.filter === 'active' ? 'contained' : 'text'}
                        style={{backgroundColor: props.todolist.filter === 'active' ? '#e17a02' : '#649663'}}>Active
                </Button>
                <Button onClick={() => changeTodoListFilter('completed')}
                        variant={props.todolist.filter === 'completed' ? 'contained' : 'text'} color='inherit'
                        style={{backgroundColor: props.todolist.filter === 'completed' ? '#e17a02' : '#747974'}}>Completed
                </Button>
            </div>
        </div>
    )
} )

//types
type TodolistPropsType = {
    todolist: TodoListDomainType
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    todolistStatus: RequestStatusType
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    deleteTodoList: (todoListId: string) => void
    demo?: boolean
}