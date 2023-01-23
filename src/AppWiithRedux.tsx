import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, setTodolistsAC, TodoListDomainType,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {TaskStatuses, TaskType, todoListsApi} from "./api/todolists-api";

// export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    useEffect(() => {
        todoListsApi.getTodoLists()
            .then((res) => dispatch(setTodolistsAC(res.data)))
    }, [])

    console.log('App is called')
    let dispatch = useDispatch()
    let todoLists = useSelector<AppRootState, Array<TodoListDomainType>>( (state) => state.todolists)
    let tasks = useSelector<AppRootState, TasksStateType>( (state) => state.tasks)

    //add task
    const addTask = useCallback ((title: string, todoListId: string) => {
        const action = addTaskAC(todoListId, title)
        dispatch(action)
    }, [dispatch])

    //change task status
    const changeTaskStatus = useCallback ((taskId: string, status: TaskStatuses, todoListId: string) => {
        const action = changeTaskStatusAC(todoListId, taskId, status)
        dispatch(action)
    }, [dispatch])

    //change task title
    const changeTaskTitle = useCallback ((todoListId: string, taskId: string, newTitle: string) => {
        const action = changeTaskTitleAC(todoListId, taskId, newTitle)
        dispatch(action)
    }, [dispatch])

    //delete task
    const removeTask = useCallback ((id: string, todoListId: string) => {
        const action = removeTaskAC(todoListId, id)
        dispatch(action)
    }, [dispatch])

    //add new todoList
    const addTodoList = useCallback ((todoListTitle: string) => {
        const action = addTodolistAC(todoListTitle)
        dispatch(action)
    }, [dispatch])

    //delete todoList
    const removeTodoList = useCallback((todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)
    }, [dispatch])

    //change todoList title
    const changeTodoListTitle = useCallback ((todoListId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todoListId, newTitle)
        dispatch(action)
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
