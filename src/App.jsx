import { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import TaskList from "./TaskList";
import Search from "./Search";

export default function App() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [tasks, setTask] = useState(() => {
    let arr = localStorage.getItem("tasks");
    return arr ? JSON.parse(arr) : [];
  });
  const [msg, setMsg] = useState("");
  const [deleteMsg, setDeleteMsg] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  let totalTask = tasks.length;
  let totalComplete = tasks.filter((t) => t.completed === true).length;

  useEffect(() => {
    if (msg !== "" && !deleteMsg) {
      const id = setTimeout(() => setMsg(""), 2000);
      return () => clearTimeout(id);
    }
  }, [msg]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleDeleteConfirmation() {
    setTask(tasks.filter((t) => t.id !== deleteId));
    setMsg("Task Deleted Successfully.");
    setDeleteMsg(false);
    setDeleteId(null);
  }

  function handleDeleteCancellation() {
    setMsg("Task Deletion Cancelled.");
    setDeleteMsg(false);
    setDeleteId(null);
  }

  return (
    <>
      <div className="titleMsgContainer">
        <div className="header">
          <h1 className="title">Taskmate</h1>
        </div>
        {deleteMsg && (
          <div className="deleteMsg">
            <strong>Shall We Delete The Task ?</strong>
            <div className="btns">
              <button
                onClick={handleDeleteConfirmation}
                className="deletionBtns"
              >
                Yes
              </button>
              <button
                className="deletionBtns"
                onClick={handleDeleteCancellation}
              >
                No
              </button>
            </div>
          </div>
        )}
        {!msg && totalTask > 0 && (
          <div className="topContainer">
            <div className="stats">
              Total: {totalTask} <pre>  |  </pre> Completed: {totalComplete}{" "}
              <pre>  |  </pre> Pending: {totalTask - totalComplete}
            </div>
          </div>
        )}
        {!deleteMsg && msg && (
          <div className="msg">
            <strong>{msg}</strong>
          </div>
        )}
      </div>
      <Header
        input={input}
        setInput={setInput}
        setTask={setTask}
        tasks={tasks}
        setMsg={setMsg}
        editId={editId}
        setEditId={setEditId}
      />

      <Search
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <TaskList
        tasks={tasks}
        search={search}
        setTask={setTask}
        setMsg={setMsg}
        setInput={setInput}
        editId={editId}
        setEditId={setEditId}
        input={input}
        activeFilter={activeFilter}
        setDeleteMsg={setDeleteMsg}
        deleteMsg={deleteMsg}
        setDeleteId={setDeleteId}
      />
    </>
  );
}
