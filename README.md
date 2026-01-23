# 📝 To-Do App – Smart Task Manager

A clean, responsive, and feature-rich **Task Management Web Application** built using **React.js**. This app helps users manage daily tasks efficiently with a smooth user experience and modern UI.

---

## 🚀 Features

✨ **Core Functionality**

* Add new tasks instantly
* Edit existing tasks
* Delete tasks
* Mark tasks as **Completed / Incomplete**

🔍 **Smart Search & Filters**

* Real-time task search
* Case-insensitive filtering
* **Filter tasks by status:** All / Completed / Pending (with active button highlight)

📊 **Task Statistics**

* Total tasks count
* Completed tasks
* Pending tasks

💾 **Persistent Storage**

* Tasks are saved in **localStorage**
* Data remains even after page refresh

⌨️ **Keyboard Shortcuts**

* `Enter` → Add / Edit task
* `Escape` → Cancel edit mode

🎨 **User Experience**

* Responsive design (mobile-friendly)
* Visual edit highlight
* Status messages for actions
* Active filter buttons with clear color feedback

---

## 🛠️ Tech Stack

* **Frontend:** React.js
* **Styling:** CSS3 (Responsive Design)
* **State Management:** React Hooks (`useState`, `useEffect`)
* **Storage:** Browser LocalStorage

---

## 📂 Project Structure

```
src/
│── App.jsx        # Root component & state management
│── Header.jsx     # Add/Edit task logic & keyboard handling
│── TaskList.jsx   # Task rendering & operations
│── Search.jsx     # Search & filter functionality
│── App.css        # Styling & responsiveness
```

---

## ⚙️ How It Works

1. User adds a task using the input field or `Enter` key
2. Tasks are stored in component state and synced to localStorage
3. Users can edit, delete, search, toggle task status, and filter tasks by status
4. App dynamically updates statistics and UI

---

## 🔮 Future Enhancements

* Backend integration (Node.js + MongoDB)
* User authentication
* Drag-and-drop task reordering
* Task categories and deadlines

---

## 📌 Author

**Shekh Abrar**
Computer Engineering Student
Passionate about Web Development 🚀

---

⭐ *If you like this project, don’t forget to star the repository!*
