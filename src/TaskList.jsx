import "./App.css";

export default function TaskList({
  tasks,
  search,
  setTask,
  setMsg,
  editId,
  setEditId,
  setInput,
  activeFilter,
  setDeleteMsg,
  setDeleteId,
}) {
  let filtered =
    search.trim() !== ""
      ? tasks.filter((t) =>
          t.task.toLowerCase().includes(search.trim().toLowerCase()),
        )
      : tasks.map((t) => t);

  if (activeFilter === "completed") {
    filtered = filtered.filter((t) => t.completed);
  }
  if (activeFilter === "pending") {
    filtered = filtered.filter((t) => t.completed === false);
  }
  filtered = [...filtered].sort((a, b) => {
    if (a.deadline === null && b.deadline === null) return 0;
    if (a.deadline === null) return 1;
    if (b.deadline === null) return -1;
    return a.deadline - b.deadline;
  });

  function toggle(id) {
    let arr = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t,
    );
    setTask(arr);
    setMsg("Task Status Updated.");
  }

  function editTask(id) {
    if (editId === id) {
      setEditId(null);
      setMsg("Task Edit Disabled.");
      setInput("");
    } else {
      setMsg("Task Edit Enabled.");
      window.scrollTo({ top: 0, behavior: "smooth" })
      setEditId(id);
      let editedTask = tasks.find((t) => t.id === id);
      setInput(editedTask.task);
    }
  }

  function deleteTask(id) {
    setDeleteId(id);
    setDeleteMsg(true);
  }

  function formatDate(ts) {
    return new Date(ts).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  function submitDate(id) {
    const myTask = tasks.find((t) => t.id === id);
    if (myTask.deadlineDraft === null) {
      setMsg("Enter Deadline.");
      return;
    }

    setTask(
      tasks.map((task) =>
        task.id === id && task.deadlineDraft !== ""
          ? {
              ...task,
              deadline: new Date(task.deadlineDraft).getTime(),
              deadlineDraft: null,
            }
          : task,
      ),
    );
    setMsg("Deadline Added.");
  }

  return (
    <>
      <div className="list">
        <ul>
          {tasks &&
            filtered.map((t) => (
              <li className={t.id === editId ? "edited" : ""} key={t.id}>
                <div className="date">
                  {/* <span title="Created at">
                    <strong>Created: </strong>
                    {formatDate(t.date)}
                  </span> */}

                  {t.deadline === null || editId === t.id ? (
                    <div className="dateInputContainer">
                      <label
                        htmlFor={`datelabel-${t.id}`}
                        className="dateLabel"
                      >
                        Due
                      </label>
                      <input
                        id={`datelabel-${t.id}`}
                        type="datetime-local"
                        className="deadline"
                        title="Set Deadline"
                        value={t.deadlineDraft ?? ''}
                        onChange={(e) => {
                          setTask(
                            tasks.map((myTask) =>
                              myTask.id === t.id
                                ? { ...myTask, deadlineDraft: e.target.value }
                                : myTask,
                            ),
                          );
                        }}
                      />
                      <button
                        title="Set Deadline"
                        className="submitDeadline"
                        onClick={() => {
                          submitDate(t.id);
                        }}
                      >
                        Set Due
                      </button>
                    </div>
                  ) : (
                    <span title="Deadline" className="deadlineText">
                      <strong>Due: </strong>
                      {formatDate(t.deadline)}
                    </span>
                  )}
                </div>
                <div className="taskContainer">
                  <span className="text">{t.task}</span>
                  <div className="btns">
                    <button
                      title={t.id == editId ? "Cancel Edit" : "Edit Task"}
                      className="editTask"
                      onClick={() => editTask(t.id)}
                    >
                      {editId == t.id ? (
                        <i className="fa-solid fa-xmark"></i>
                      ) : (
                        <i className="fa-solid fa-pen-to-square"></i>
                      )}
                    </button>
                    <button
                      title="Delete Task"
                      className="deleteTask"
                      onClick={() => deleteTask(t.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </button>
                    {
                      <button
                        title={t.completed ? "Set Incomplete" : "Set Completed"}
                        className={t.completed ? "check" : "incomplete"}
                        onClick={() => toggle(t.id)}
                      >
                        {t.completed ? (
                          <i className="fa-solid fa-check"></i>
                        ) : (
                          <i className="fa-regular fa-square"></i>
                        )}
                      </button>
                    }
                  </div>
                </div>
              </li>
            ))}
          {tasks.length === 0 && <li>No Tasks There</li>}
          {tasks.length != 0 && filtered.length === 0 && <li>No Results</li>}
        </ul>
      </div>
    </>
  );
}
