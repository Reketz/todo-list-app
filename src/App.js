import { useReducer, useState } from 'react';
import AddTask from './components/AddTask.js';
import TaskList from './components/TaskList.js';
import './App.css'

let nextId = 0;
const initialTasks = [];

function taskReducer(tasks, action) {
    switch(action.type) {
        case "add":
            return [
                    ...tasks,
                    {
                        id: nextId++,
                        text: action.text,
                        done: false,
                    },
                ]
        case "update":
            return tasks.map((t) => {
                if (t.id === action.task.id) {
                    return action.task;
                }

                return t;
                
            })
        case "delete":
            return tasks.filter((t) => t.id !== action.taskId)
        default:
            console.log("O tipo não existe");
    }

}

export default function TaskApp() {
    const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

    function handleAddTask(text) {
        dispatch({
            type: "add",
            text:text
        });
    }

    function handleChangeTask(task) {
        dispatch({
            type: "update",
            task: task
        });
    }

    function handleDeleteTask(taskId) {
        dispatch({
            type: "delete",
            taskId: taskId
        });
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
