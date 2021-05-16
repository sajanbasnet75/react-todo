
import { useState } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


const App = () => {
  const [showTaskAddForm, setTaskAddForm] = useState(false)
  const [tasks, setTasks] = useState(
    [
      { id: 1, text: 'First task', reminder: false },
      { id: 2, text: 'Sec task', reminder: false },
      { id: 3, text: 'third task', reminder: false },
      { id: 4, text: 'Fourth task', reminder: false },
    ]
  )

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task)
    )
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  const triggerForm = () => {
    setTaskAddForm(!showTaskAddForm)
  }

  return (
    <div className='container'>
      <Header 
        onAdd={triggerForm} 
        showTaskAddForm = {showTaskAddForm}
      />
      {showTaskAddForm ?
        <AddTask onAdd={addTask} /> : ''
      }
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder} />
      ) : (
        'No tasks'
      )}
    </div>
  )
}

export default App
