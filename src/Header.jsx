import './App.css'
import { useEffect } from 'react'

export default function Header({ input, setInput, setTask, tasks, setMsg, editId, setEditId }) {

  useEffect(() => {
    function handleKeyDown(e) {
      if(input.trim() !== '' && e.key === 'Enter') {
        addTask()
      }
      if(editId !== null && e.key === 'Escape') {
        setInput('')
        setMsg('Edit Cancelled.')
        setEditId(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return (() => {
      window.removeEventListener('keydown', handleKeyDown)
    })
  }, [tasks, input, editId])

  function addTask() {
    if(input.trim() !== '') {
      if(editId) {
        setTask(tasks.map(t => (t.id === editId ? {...t, task: input} : t)))
        setMsg('Task Edited.')
        setInput('')
        setEditId(null)
      } else {
        setTask([...tasks, {
          id: Date.now() + Math.random(),
          task: input.trim(),
          completed : false
        }])
        setMsg('New Task Added.')
        setInput('')
      }
    }
  }

  return ( 
    <>
      <div className="header">
        <h1 className="title">To-Do-App</h1>
      </div>
      <div className="inputContainer">
        <input type="text" placeholder='Add Your New To-Do' value={input} onChange={(e) => setInput(e.target.value)}/>
        <button title={editId  && input.trim() !== ''? 'Edit Task' : 'Add Task'} className="addTask" onClick={addTask}><i className="fa-solid fa-plus"></i></button>
      </div>
    </>
  )
}