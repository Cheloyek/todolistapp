import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodolistList/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    FilterValuesType, removeTodolistTC,
    TodoListDomainType,
    todolistsReducer
} from "../features/TodolistList/todolists-reducer";
import {addTaskTC, removeTaskTC, tasksReducer, updateTaskTC} from "../features/TodolistList/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

function AppWithReducers() {

    //initialState

    let todoListId1 = v1()
    let todoListId2 = v1()
    let todoListId3 = v1()

    let [todoLists, dispatchToTodolistsReducer] = useReducer(todolistsReducer, [
        {id: todoListId1, title: 'Todolist1', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
        {id: todoListId2, title: 'Todolist2', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'},
        {id: todoListId3, title: 'Todolist3', filter: 'all', order: 0, addedDate: '', todolistStatus: 'idle'}
    ])

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task2', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task3', status: TaskStatuses.New, todoListId: todoListId1, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ],
        [todoListId2]: [
            {id: v1(), title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task2', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task3', status: TaskStatuses.New, todoListId: todoListId2, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ],
        [todoListId3]: [
            {id: v1(), title: 'task1', status: TaskStatuses.Completed, todoListId: todoListId3, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task2', status: TaskStatuses.New, todoListId: todoListId3, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi},
            {id: v1(), title: 'task3', status: TaskStatuses.New, todoListId: todoListId3, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        ]
    })

    //add task
    const addTask = (title: string, todoListId: string) => {
        // const action = addTaskAC(todoListId, title)
        // const action = addTaskAC({id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi})
        const action = addTaskTC({title: title, todoListId: todoListId})
        // @ts-ignore
        dispatchToTasksReducer(action)
    }

    //change task status
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todolistId: string) => {
        const action = updateTaskTC({todolistId, taskId, model: {status}})
        // @ts-ignore
        dispatchToTasksReducer(action)
    }

    //change task title
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        // const action = updateTaskAC(todoListId, taskId, {title: newTitle})
        const action = updateTaskTC({todolistId, taskId, model: {title: newTitle}})
        // @ts-ignore
        dispatchToTasksReducer(action)
    }
    //"jest:integration": "jest -c integration/jest.config.js --transformIgnorePatterns \"node_modules/(?!axios)/\"",
//"test:integration": "start-server-and-test storybook http-get://localhost:9009 jest:integration --transformIgnorePatterns \"node_modules/(?!axios)/\""
    //delete task
    const removeTask = (taskId: string, todolistId: string) => {
        // const action = removeTaskAC({todolistId, taskId})
        let param = {todolistId, taskId}
        const action = removeTaskTC.fulfilled(param, 'requestId', param)
        dispatchToTasksReducer(action)
    }

    //add new todoList
    const addTodoList = (todoListTitle: string) => {
        // const action = addTodolistAC(todoListTitle)
        let payload = {todoList: {id: v1(), title: todoListTitle, order: 0, addedDate: ''}};
        const action = addTodolistTC.fulfilled(payload, 'requestId', {title: todoListTitle})
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    //delete todoList
    const removeTodoList = (todolistId: string) => {
        let payload = {id: todolistId};
        const action = removeTodolistTC.fulfilled(payload, 'requestId', payload)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    //change todoList title
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        let payload = {id: todoListId, title: newTitle};
        const action = changeTodolistTitleTC.fulfilled(payload, 'requestId', payload)
        dispatchToTodolistsReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC({id: todolistId, filter: value})
        dispatchToTodolistsReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
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
                            if (todolist.filter === 'active') {
                                // tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                                tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatuses.New)
                            }
                            if (todolist.filter === 'completed') {
                                tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatuses.Completed)
                            }

                            return <Grid className='todoList'>
                                <Paper elevation={3} style={{margin: '30px', padding: '10px', backgroundColor: "#5a8b96",}}>
                                    <Todolist key={todolist.id}
                                              todolist={todolist}
                                              // todolistId={todolist.id}
                                              // title={todolist.title}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              todolistStatus={todolist.todolistStatus}
                                              changeTaskTitle={changeTaskTitle}
                                              changeTodoListTitle={changeTodoListTitle}
                                              // filter={todolist.filter}
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

export default AppWithReducers;
