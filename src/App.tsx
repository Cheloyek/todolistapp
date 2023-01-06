import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";

export type FilterValuesType = 'active' | 'completed' | 'all' //фильтр tasks

function App() {

    //initialState
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'task1', isDone: true},
        {id: 2, title: 'task2', isDone: false},
        {id: 3, title: 'task3', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterValuesType>('all')

    //delete task
    const removeTask = (id: number) => {
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

  return (
    <div className="App">
        <Todolist title='Todolist'
                  tasks={tasksForTodoLists}
                  removeTask={removeTask}
                  changeFilter={changeFilter}/>
    </div>
  );
}

export default App;
