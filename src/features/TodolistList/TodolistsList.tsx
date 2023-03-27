import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodoListDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses, TaskType} from "api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "components";
import {Todolist} from "./Todolist";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "../Auth/selectors";

export const TodolistsList = ({demo= false}) => {
    const dispatch = useAppDispatch()
    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)
    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isLoggedIn = useSelector(selectIsLoggedIn)

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        if (!todoLists.length) {
            dispatch(fetchTodolistsTC())
        }
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        // const callbacks = bindActionCreators({addTaskTC}, dispatch)
        // callbacks.addTaskTC({title, todoListId})

        dispatch(addTaskTC({title, todoListId}))
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        dispatch(updateTaskTC({todolistId, taskId, model: {status}
    }))
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, newTitle: string) => {
        dispatch(updateTaskTC({todolistId, taskId, model: {title: newTitle}}))
    }, [])

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC({todolistId, taskId}))
    }, [dispatch])

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(addTodolistTC({title: todoListTitle}))
    }, [])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistTC({id: todolistId}))
    }, [])

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        dispatch(changeTodolistTitleTC({id: todoListId, title: newTitle}))
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC({id: todolistId, filter: value}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container sx={{marginTop: "70px", zIndex: 1}}>
                <AddItemForm addItem={addTodoList} />
            </Grid>
            <Grid container spacing={1} style={{flexWrap: "nowrap", overflowX: "scroll", marginTop: "10px"}}>
                {todoLists.map((todolist: TodoListDomainType) => {
                        let tasksForTodoList = tasks[todolist.id]
                        return <Grid className='todoList'>
                            <Paper elevation={3} style={{margin: '10px', padding: '10px', backgroundColor: "#5a8b96", width: "300px"}}>
                                <Todolist key={todolist.id}
                                          todolist={todolist}
                                          tasks={tasksForTodoList}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeTaskStatus}
                                          todolistStatus={todolist.todolistStatus}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}
                                          deleteTodoList={removeTodoList}
                                          demo={demo}
                                />
                            </Paper>
                        </Grid>
                    }
                )}
            </Grid>
        </>
    )
}

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}