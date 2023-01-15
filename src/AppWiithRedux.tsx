import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    console.log('App is called')
    let dispatch = useDispatch()
    let todoLists = useSelector<AppRootState, Array<TodolistType>>( (state) => state.todolists)
    let tasks = useSelector<AppRootState, TasksStateType>( (state) => state.tasks)

    //add task
    const addTask = useCallback ((title: string, todoListId: string) => {
        const action = addTaskAC(todoListId, title)
        dispatch(action)
    }, [])

    //change task status
    const changeTaskStatus = useCallback ((taskId: string, isDone: boolean, todoListId: string) => {
        const action = changeTaskStatusAC(todoListId, taskId, isDone)
        dispatch(action)
    }, [])

    //change task title
    const changeTaskTitle = useCallback ((todoListId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, newTitle)
        dispatch(action)
    }, [])

    //delete task
    const removeTask = useCallback ((id: string, todoListId: string) => {
        const action = removeTaskAC(todoListId, id)
        dispatch(action)
    }, [])

    //add new todoList
    const addTodoList = useCallback ((todoListTitle: string) => {
        const action = addTodolistAC(todoListTitle)
        dispatch(action)
    }, [])

    //delete todoList
    const removeTodoList = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [])

    //change todoList title
    const changeTodoListTitle = useCallback ((todoListId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todoListId, newTitle)
        dispatch(action)
    }, [])

    const changeFilter = useCallback ((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense" style={{backgroundColor: '#5a8b96'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        {/*<MenuList />*/}
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={1}>
                    {todoLists.map((todolist: TodolistType) => {
                            //filter tasks
                            let tasksForTodoList = tasks[todolist.id]
                            // let tasksForTodoList = tasks[todolist.id]
                            // if (todolist.filter === 'active') {
                            //     tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                            // }
                            // if (todolist.filter === 'completed') {
                            //     tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                            // }

                            return <Grid className='todoList'>
                                <Paper elevation={3} style={{margin: '30px', padding: '10px', backgroundColor: "#5a8b96",}}>
                                    <Todolist key={todolist.id}
                                              todolistId={todolist.id}
                                              title={todolist.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                              filter={todolist.filter}
                                              deleteTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        }
                    )}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
