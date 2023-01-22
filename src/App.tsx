import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskPriorities, TaskStatuses, TaskType} from "./api/todolists-api";
import {FilterValuesType, TodoListDomainType} from "./state/todolists-reducer";

// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //initialState

    let todoListId1 = v1()
    let todoListId2 = v1()
    let todoListId3 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListDomainType>>([
        {id: todoListId1, title: 'Todolist1', filter: 'all', order: 0, addedDate: ''},
        {id: todoListId2, title: 'Todolist2', filter: 'all', order: 0, addedDate: ''},
        {id: todoListId3, title: 'Todolist3', filter: 'all', order: 0, addedDate: ''}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        const newTask = {id: v1(), title: title, status: TaskStatuses.New, todoListId: todoListId, addedDate: '', deadline: '', description: '', order: 0, startDate: '', priority: TaskPriorities.Hi}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    //change task status
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            // task.isDone = isDone
            task.status = status
        }
        setTasks({...tasks})
    }

    //change task title
    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasks})
        }
    }

    //delete task
    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    //add new todoList
    const addTodoList = (todoListTitle: string) => {
        let newTodoList: TodoListDomainType = {id: v1(), title: todoListTitle, filter: 'all', order: 0, addedDate: ''}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoList.id]: []
        })
    }

    //delete todoList
    const removeTodoList = (todolistId: string) => {
        let newTodoLists = todoLists.filter((tl) => tl.id !== todolistId)
        delete tasks[todolistId]
        setTodoLists([...newTodoLists])
        setTasks({...tasks})
    }

    //change todoList title
    const changeTodoListTitle = (todoListId: string, newTitle: string) => {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.title = newTitle
            setTodoLists([...todoLists])
        }
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
                    {todoLists.map(todolist => {
                            //filter tasks
                            let tasksForTodoList = tasks[todolist.id]
                            if (todolist.filter === 'active') {
                                // tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                                tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatuses.New)
                            }
                            if (todolist.filter === 'completed') {
                                // tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                                tasksForTodoList = tasksForTodoList.filter((t) => t.status === TaskStatuses.Completed)
                            }

                            const changeFilter = (value: FilterValuesType, todolistId: string) => {
                                let todoList = todoLists.find(tl => tl.id === todolistId)
                                if (todoList) {
                                    todolist.filter = value
                                    setTodoLists([...todoLists])
                                }
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

export default App;
