import React, {useState} from 'react';
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
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'task1', isDone: true},
        {id: v1(), title: 'task2', isDone: false},
        {id: v1(), title: 'task3', isDone: false}
    ])

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
        {id: v1(), title: 'Todolist1', filter: 'all'},
        {id: v1(), title: 'Todolist2', filter: 'all'}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    //delete task
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    //add task
    const addTask = (title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
            setTasks([newTask, ...tasks])
    }

    //change task status
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }

  return (
    <div className="App">
        {todoLists.map(todolist => {
                //filter tasks
                let tasksForTodoList = tasks
                if (todolist.filter === 'active') {
                    tasksForTodoList = tasks.filter((t) => !t.isDone)
                }
                if (todolist.filter === 'completed') {
                    tasksForTodoList = tasks.filter((t) => t.isDone)
                }

                const changeFilter = (value: FilterValuesType, todolistId: string) => {
                    let todoList = todoLists.find(tl => tl.id === todolistId)
                    if (todoList) {
                        todolist.filter = value
                        setTodoLists([...todoLists])
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
                             filter={todolist.filter}
        />}
            )}

    </div>
  );
}

export default App;
