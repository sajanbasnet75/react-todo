
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


const App = () => {
  const [showTaskAddForm, setTaskAddForm] = useState(false)
  const [tasks, setTasks] = useState([])


  useEffect(() => {
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    getTasks()
  }, [])


  const fetchTasks = async () => {
    const resp = await fetch(`http://localhost:5000/tasks`)
    const data = await resp.json()

    return data
  }

  const fetchTask = async (id) => {
    const resp = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await resp.json()

    return data
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  const addTask = async (task) => {
    const resp = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await resp.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }


  const toggleReminder = async(id) => {

    const task = await fetchTask(id)
    const updateTask = {...task, reminder: !task.reminder}

    const resp = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updateTask)
    })

    const data = await resp.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task)
    )
  }

  const triggerForm = () => {
    setTaskAddForm(!showTaskAddForm)
  }

  return (
    <div className='container'>
      <Header
        onAdd={triggerForm}
        showTaskAddForm={showTaskAddForm}
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
