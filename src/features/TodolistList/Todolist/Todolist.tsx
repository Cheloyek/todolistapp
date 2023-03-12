import React, {useCallback, useEffect} from 'react'
import './todolistStyle.css';
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan/EditableSpan";
import {Button, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {Task} from "./Task/Task";
import {FilterValuesType, TodoListDomainType} from "../todolists-reducer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {useDispatch} from "react-redux";
import {fetchTasksThunkCreator} from "../tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";

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

//type for task
// export type TaskType = {
//     id: string
//     title: string
//     status: TaskStatuses
// }

export const Todolist = React.memo ( ({demo = false, ...props}: TodolistPropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (demo) {
            return;
        }
        // @ts-ignore
        dispatch(fetchTasksThunkCreator(props.todolist.id))
    }, [])

    //click button -> change filter
    const changeTodoListFilter = useCallback ((value: FilterValuesType) => {
        props.changeFilter(value, props.todolist.id)}, [props.changeFilter, props.todolist.id])
    //click button -> delete todolist
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
        <div className='todolist' >
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle} disabled={props.todolistStatus === 'loading'}/>
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

