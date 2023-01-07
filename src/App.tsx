import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks

function App() {

    //initialState
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'task1', isDone: true},
        {id: v1(), title: 'task2', isDone: false},
        {id: v1(), title: 'task3', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    //delete task
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }

    //filter tasks
    let tasksForTodoLists = tasks
    if (filter === 'active') {
        tasksForTodoLists = tasks.filter((t) => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForTodoLists = tasks.filter((t) => t.isDone)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
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
        <Todolist title='Todolist'
                  tasks={tasksForTodoLists}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  filter={filter}/>
    </div>
  );
}

export default App;
