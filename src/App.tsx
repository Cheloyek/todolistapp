import React, {useId, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    //initialState

    let todoListId1 = useId()
    let todoListId2 = useId()

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: todoListId1, title: 'Todolist1', filter: 'all'},
        {id: todoListId2, title: 'Todolist2', filter: 'all'}
    ])

    let [tasks, setTasks] = useState({
        [todoListId1]:[
        {id: useId(), title: 'task1', isDone: true},
        {id: useId(), title: 'task2', isDone: false},
        {id: useId(), title: 'task3', isDone: false}
    ],
        [todoListId2]:[
            {id: useId(), title: 'task1', isDone: true},
            {id: useId(), title: 'task2', isDone: false},
            {id: useId(), title: 'task3', isDone: false}
        ]
    })

    // let [filter, setFilter] = useState<FilterValuesType>('all')

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

  return (
    <div className="App">
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

                //delete todoLists
                const removeTodoList = (todolistId: string) => {
                    let newTodoLists = todoLists.filter((tl) => tl.id !== todolistId)
                    setTodoLists([...newTodoLists])
                }

            return <Todolist key={todolist.id}
                             todolistId={todolist.id}
                             title={todolist.title}
                             tasks={tasksForTodoList}
                             removeTask={removeTask}
                             changeFilter={changeFilter}
                             addTask={addTask}
                             changeTaskStatus={changeTaskStatus}
                             filter={todolist.filter}
                             deleteTodoList={removeTodoList}
        />}
            )}

    </div>
  );
}

export default App;
