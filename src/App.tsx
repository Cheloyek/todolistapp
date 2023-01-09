import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    //initialState

    let todoListId1 = v1()
    let todoListId2 = v1()
    let todoListId3 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'Todolist1', filter: 'all'},
        {id: todoListId2, title: 'Todolist2', filter: 'all'},
        {id: todoListId3, title: 'Todolist3', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListId1]:[
        {id: v1(), title: 'task1', isDone: true},
        {id: v1(), title: 'task2', isDone: false},
        {id: v1(), title: 'task3', isDone: false}
    ],
        [todoListId2]:[
            {id: v1(), title: 'task1', isDone: true},
            {id: v1(), title: 'task2', isDone: false},
            {id: v1(), title: 'task3', isDone: false}
        ],
        [todoListId3]:[
            {id: v1(), title: 'task1', isDone: true},
            {id: v1(), title: 'task2', isDone: false},
            {id: v1(), title: 'task3', isDone: false}
        ]
    })

    //delete task
    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(task => task.id !== id)
        setTasks({...tasks})
    }

    //add task

    const addTask = (title: string, todoListId: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [newTask, ...todoListTasks]
        setTasks({...tasks})
    }

    //change task status
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks({...tasks})
    }

    //delete todoList
    const removeTodoList = (todolistId: string) => {
        let newTodoLists = todoLists.filter((tl) => tl.id !== todolistId)
        delete tasks[todolistId]
        setTodoLists([...newTodoLists])
        setTasks({...tasks})
    }

    //add new todoList
    const addTodoList = (todoListTitle: string) => {
        let newTodoList: TodolistType = {id: v1(), title: todoListTitle, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({
            ...tasks,
            [newTodoList.id]:[]
        })
    }

  return (
    <div className="App">
        <AddItemForm addItem={addTodoList}/>
        {todoLists.map(todolist => {
                //filter tasks
                let tasksForTodoList = tasks[todolist.id]
                if (todolist.filter === 'active') {
                    tasksForTodoList = tasksForTodoList.filter((t) => !t.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodoList = tasksForTodoList.filter((t) => t.isDone)
                }

                const changeFilter = (value: FilterValuesType, todolistId: string) => {
                    let todoList = todoLists.find(tl => tl.id === todolistId)
                    if (todoList) {
                        todolist.filter = value
                        setTodoLists([...todoLists])
                    }
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

            return <Todolist key={todolist.id}
                             todolistId={todolist.id}
                             title={todolist.title}
                             tasks={tasksForTodoList}
                             removeTask={removeTask}
                             changeFilter={changeFilter}
                             addTask={addTask}
                             changeTaskStatus={changeTaskStatus}
                             changeTaskTitle={changeTaskTitle}
                             filter={todolist.filter}
                             deleteTodoList={removeTodoList}
        />}
            )}

    </div>
  );
}

export default App;
