import { useEffect, useState } from "react";
import './App.css'
import Header from "./Header";
import TaskList from "./TaskList";
import Search from "./Search";

export default function App() {

  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [tasks, setTask] = useState(() => {
    let arr = localStorage.getItem('tasks')
    return arr ? JSON.parse(arr) : []
  })
  const [msg, setMsg] = useState('')
  let totalTask = tasks.length
  let totalComplete = tasks.filter(t => t.completed === true).length

  useEffect(() => {
    if(msg !== '') {
      const id = setTimeout(() => setMsg(''), 2000)
      return () => clearTimeout(id)
    }
  }, [msg])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <>
      {
        !msg && totalTask > 0 &&
        <div className="topContainer">
          <div className="stats">Total: {totalTask} <pre>    |    </pre> Completed: {totalComplete} <pre>    |    </pre> Pending: {totalTask - totalComplete}</div>
        </div>
      }
      {
        msg && 
        <div className="msg">
          <strong>{msg}</strong>
        </div>
      }
      <Header input={input} setInput={setInput} setTask={setTask} tasks={tasks} setMsg={setMsg} editId={editId} setEditId={setEditId}/>

      <Search search={search} setSearch={setSearch} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>

      <TaskList tasks={tasks} search={search} setTask={setTask} setMsg={setMsg} setInput={setInput} editId={editId} setEditId={setEditId} input={input} activeFilter={activeFilter}/>
    </>
  )
}
