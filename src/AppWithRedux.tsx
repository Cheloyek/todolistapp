import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodoListThunkCreator,
    changeTodolistFilterAC,
    changeTodoListTitleThunkCreator,
    fetchTodolistsThunkCreator,
    FilterValuesType,
    removeTodolistThunkCreator,
    TodoListDomainType,
} from "./state/todolists-reducer";
import {addTaskThunkCreator, removeTaskThunkCreator, updateTaskThunkCreator} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {ThunkDispatch} from "redux-thunk";
import {Action} from "redux";
import ErrorSnackbar from "./snackbars/errorSnackbar";

type AppThunkType = ThunkDispatch<AppRootStateType, void, Action>

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    //получение листов с сервера
    useEffect(() => {
        const thunk = fetchTodolistsThunkCreator()
        dispatch(thunk)
    }, [])

    console.log('App is called')
    // let dispatch = useAppDispatch()
    let dispatch = useDispatch<AppThunkType>()
    let todoLists = useSelector<AppRootStateType, Array<TodoListDomainType>>( (state) => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>( (state) => state.tasks)

    //add task
    // const addTask = useCallback ((title: string, todoListId: string) => {
    //     const action = addTaskAC(todoListId, title)
    //     dispatch(action)
    // }, [dispatch])

    const addTask = useCallback ((title: string, todoListId: string) => {
        const thunk = addTaskThunkCreator(title, todoListId)
        dispatch(thunk)
    }, [dispatch])


    //change task status
    const changeTaskStatus = useCallback ((taskId: string, status: TaskStatuses, todoListId: string) => {
        // const action = changeTaskStatusAC(todoListId, taskId, status)
        const thunk = updateTaskThunkCreator(todoListId, taskId, {status})
        dispatch(thunk)
    }, [dispatch])

    //change task title
    const changeTaskTitle = useCallback ((todoListId: string, taskId: string, newTitle: string) => {
        // const action = changeTaskTitleAC(todoListId, taskId, newTitle)
        const thunk = updateTaskThunkCreator(todoListId, taskId, {title: newTitle})
        dispatch(thunk)
    }, [dispatch])

    //delete task
    const removeTask = useCallback ((id: string, todoListId: string) => {
        // const action = removeTaskAC(todoListId, id)
        const thunk = removeTaskThunkCreator(todoListId, id)
        dispatch(thunk)
    }, [dispatch])

    //add new todoList
    const addTodoList = useCallback ((todoListTitle: string) => {
        // const action = addTodolistAC(todoListTitle)
        const thunk = addTodoListThunkCreator(todoListTitle)
        dispatch(thunk)
    }, [dispatch])

    //delete todoList
    const removeTodoList = useCallback((todolistId: string) => {
        // const action = removeTodolistAC(todolistId)

        dispatch(removeTodolistThunkCreator(todolistId))
    }, [dispatch])

    //change todoList title
    const changeTodoListTitle = useCallback ((todoListId: string, newTitle: string) => {
        // const action = changeTodolistTitleAC(todoListId, newTitle)
        const thunk = changeTodoListTitleThunkCreator(todoListId, newTitle)
        dispatch(thunk)
    }, [dispatch])

    const changeFilter = useCallback ((value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
        dispatch(action)
    }, [dispatch])

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
                <LinearProgress style={{backgroundColor: "#e17a02" }}/>
                <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={1}>
                    {todoLists.map((todolist: TodoListDomainType) => {
                            //filter tasks
                            let tasksForTodoList = tasks[todolist.id]

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
