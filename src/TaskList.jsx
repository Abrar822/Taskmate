import './App.css'

export default function TaskList({ tasks, search, setTask, setMsg, editId, setEditId, setInput, input, activeFilter }) {

  let filtered = (search.trim() !== '') ? tasks.filter(t => t.task.toLowerCase().includes(search.trim().toLowerCase())) : tasks.map(t => t)

  if(activeFilter === 'completed') {
    filtered = filtered.filter(t => t.completed)
  }
  if(activeFilter === 'pending') {
    filtered = filtered.filter(t => t.completed === false)
  }

  function toggle(id) {
    let arr = tasks.map(t => t.id === id ? {...t , completed : !t.completed} : t)
    setTask(arr)
    setMsg('Task Status Updated.')
  }

  function editTask(id) {
    setEditId(id)
    let editedTask = tasks.find(t => t.id === id)
    setInput(editedTask.task)
  }

  function deleteTask(id) {
    setTask(tasks.filter(t => t.id !== id))
    setMsg('Task Deleted Successfully.')
  }

  return (
    <>
      <div className="list">
        <ul>
          {
            tasks && 
            filtered.map((t) => (
              <li className={t.id === editId && input.trim() !== '' ? 'edited' : ''} key={t.id} >{t.task}
                <div className="btns">
                  <button title="Edit Task" className="editTask" onClick={() => editTask(t.id)}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button title='Delete Task' className="deleteTask" onClick={() => deleteTask(t.id)}><i className="fa-regular fa-trash-can"></i></button>
                  {
                    <button title={t.completed ? 'Set Incomplete' : 'Set Completed'} className={t.completed ? 'check' : 'incomplete'} onClick={() => toggle(t.id)}>{t.completed ? <i className="fa-solid fa-check"></i> : <i className="fa-regular fa-square"></i>}</button>
                  }
                </div>
              </li>
            ))
          }
          {
            tasks.length === 0 && <li>No Tasks There</li>
          }
          {
            tasks.length != 0 && filtered.length === 0 && <li>No Results</li>
          }
        </ul>
      </div>
    </>
  )
}