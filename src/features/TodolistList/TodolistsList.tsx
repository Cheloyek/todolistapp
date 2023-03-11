import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodoListThunkCreator, changeTodolistFilterAC, changeTodoListTitleThunkCreator,
    fetchTodolistsThunkCreator, FilterValuesType,
    removeTodolistThunkCreator,
    TodoListDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskThunkCreator, removeTaskThunkCreator, updateTaskThunkCreator} from "./tasks-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {DemoPropsType} from "../../app/AppWithRedux";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";

export const TodolistsList = ({demo= false}: DemoPropsType) => {
    let dispatch = useDispatch<AppThunkType>()

    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>((state) => state.todolists)
    console.log("todoLists", todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>((state) => state.tasks)

    useEffect(() => {
        if (demo) {
            return
        }
        const thunk = fetchTodolistsThunkCreator()
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        const thunk = addTaskThunkCreator(title, todoListId)
        dispatch(thunk)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        const thunk = updateTaskThunkCreator(todoListId, taskId, {status})
        dispatch(thunk)
    }, [dispatch])

    const changeTaskTitle = useCallback((todoListId: string, taskId: string, newTitle: string) => {
        const thunk = updateTaskThunkCreator(todoListId, taskId, {title: newTitle})
        dispatch(thunk)
    }, [dispatch])

    const removeTask = useCallback((id: string, todoListId: string) => {
        const thunk = removeTaskThunkCreator(todoListId, id)
        dispatch(thunk)
    }, [dispatch])

    const addTodoList = useCallback((todoListTitle: string) => {
        const thunk = addTodoListThunkCreator(todoListTitle)
        dispatch(thunk)
    }, [dispatch])

    const removeTodoList = useCallback((todolistId: string) => {
        dispatch(removeTodolistThunkCreator(todolistId))
    }, [dispatch])

    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        const thunk = changeTodoListTitleThunkCreator(todoListId, newTitle)
        dispatch(thunk)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }
    return (
        <>
            <Grid container>
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={1}>
                {todoLists.map((todolist: TodoListDomainType) => {
                        let tasksForTodoList = tasks[todolist.id]
                        return <Grid className='todoList'>
                            <Paper elevation={3} style={{margin: '30px', padding: '10px', backgroundColor: "#5a8b96",}}>
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

type AppThunkType = ThunkDispatch<AppRootStateType, void, Action>
export type TasksStateType = {
    [key: string]: Array<TaskType>
}