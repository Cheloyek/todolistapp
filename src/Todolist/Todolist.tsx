import React, {useCallback, useEffect} from 'react'
import './todolistStyle.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task";
import {FilterValuesType, TodoListDomainType} from "../state/todolists-reducer";
import {TaskStatuses, TaskType} from "../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTasksThunkCreator} from "../state/tasks-reducer";
import {RequestStatusType} from "../app-reducer";

type TodolistPropsType = {
    todolist: TodoListDomainType
    // title: string
    // todolistId: string
    tasks: TaskType[]
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    todolistStatus: RequestStatusType
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
    // filter: FilterValuesType
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
        dispatch(fetchTasksThunkCreator(props.todolist.id))
    }, [])

    //click button -> change filter
    // const changeTodoListFilter = useCallback ((value: FilterValuesType) => {
    //     // props.changeFilter(value, props.todolist.id)}, [props.changeFilter, props.todolist.id])
    //     props.changeFilter(value, props.todolist.id)}, [props.changeFilter, props.todolist.id])
    const changeTodoListFilter = useCallback ((value: FilterValuesType) => {
        console.log('filter')
        console.log(value)
        console.log(props.todolist.id)
        console.log(props.changeFilter(value, props.todolist.id))
        props.changeFilter(value, props.todolist.id)}, [props.changeFilter, props.todolist.id])
    //click button -> delete todolist
    const removeTodoList = useCallback(() => props.deleteTodoList(props.todolist.id), [props.deleteTodoList, props.todolist.id, props.todolist.filter])

    //обертка addTask
    const addTask = useCallback ((title: string) => {
        props.addTask(title, props.todolist.id)
    }, [props.addTask, props.todolist.id])

    //input todoList title
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
        <div className='todolist' >
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle}/>
                <IconButton aria-label="delete" size="medium" disabled={props.todolistStatus === 'loading'}>
                    <DeleteIcon fontSize="small" onClick={removeTodoList}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolistStatus === 'loading'}/>

            <div>
                {tasksForTodoList.map(task =>
                    <Task
                    removeTask={props.removeTask}
                    task={task}
                    todolistId={props.todolist.id}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    key={task.id}
                    />
                )}
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

