
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';


const App = () => {
  const [showTaskAddForm, setTaskAddForm] = useState(false)

  // I have put this default/initial state as empty array
  // setTasks is a setter function that can be called to change the state
  const [tasks, setTasks] = useState([])

  // useEffect is a function where the first argument is a function
  // this function is called when (component mounts, state changes, component dismount)
  // basically this useEffect is called when the page loads
  useEffect(() => {
    // fetch the data from server and update the state
    const getTasks = async () => {
      const tasks = await fetchTasks()
      setTasks(tasks)
    }
    getTasks()
  }, [])

  // above a the empty array is a dependency array i.e no dependency which means
  // useEffect will only run once when the component is mounted/initialized
  
  // if we haven't used the empty array as a dependency array above
  // then there would have been an infinite loop i.e the useEffect would be 
  // called when page loads then it fetches the data 
  // after fetch it updates the state which then triggers another fetch and so on, thus infinite loop

  // there might be other case where we might want to rerun the function any time a state changes
  // then we can add the state in the dependency array [tasks] 


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


  const toggleReminder = async (id) => {

    const task = await fetchTask(id)
    const updateTask = { ...task, reminder: !task.reminder }

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
