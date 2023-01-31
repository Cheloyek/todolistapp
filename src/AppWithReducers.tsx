import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    removeTodolistAC,
    TodoListDomainType,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "./api/todolists-api";

// export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }

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
        const action = addTaskAC({id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi})
        dispatchToTasksReducer(action)
    }

    //change task status
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        const action = updateTaskAC(todoListId, taskId, {status})
        dispatchToTasksReducer(action)
    }

    //change task title
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        const action = updateTaskAC(todoListId, taskId, {title: newTitle})
        dispatchToTasksReducer(action)
    }

    //delete task
    const removeTask = (id: string, todoListId: string) => {
        const action = removeTaskAC(todoListId, id)
        dispatchToTasksReducer(action)
    }

    //add new todoList
    const addTodoList = (todoListTitle: string) => {
        // const action = addTodolistAC(todoListTitle)
        const action = addTodolistAC({id: v1(), title: todoListTitle, order: 0, addedDate: ''})
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    //delete todoList
    const removeTodoList = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action)
    }

    //change todoList title
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        const action = changeTodolistTitleAC(todoListId, newTitle)
        dispatchToTodolistsReducer(action)
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        const action = changeTodolistFilterAC(todolistId, value)
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

export default AppWithReducers;
