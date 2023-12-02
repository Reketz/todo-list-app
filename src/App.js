import { useReducer, useState } from 'react';
import AddTask from './components/AddTask.js';
import TaskList from './components/TaskList.js';
import './App.css'

let nextId = 0;
const initialTasks = [];

export default function TaskApp() {
    const [tasks, setTasks] = useState(initialTasks);
    useReducer()

    function handleAddTask(text) {
        setTasks([
            ...tasks,
            {
                id: nextId++,
                text: text,
                done: false,
            },
        ]);
    }

    function handleChangeTask(task) {
        setTasks(
            tasks.map((t) => {
                if (t.id === task.id) {
                    return task;
                } else {
                    return t;
                }
            })
        );
    }

    function handleDeleteTask(taskId) {
        setTasks(tasks.filter((t) => t.id !== taskId));
    }

    return (
        <div className='App'>
            <h1>Todo List</h1>
            <AddTask onAddTask={handleAddTask} />
            <TaskList
                tasks={tasks}
                onChangeTask={handleChangeTask}
                onDeleteTask={handleDeleteTask}
            />
        </div>
    );
}
