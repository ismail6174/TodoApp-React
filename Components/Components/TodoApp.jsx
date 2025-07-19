import React, { useState } from 'react';
import styles from "./TodoApp.module.css"

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      // Update existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setTasks([...tasks, task]);
    }

    setTask('');
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    // If editing the same task being deleted
    if (editIndex === index) {
      setTask('');
      setEditIndex(null);
    }
  };

  return (
  <>
    <div style={styles.container}>
      <h2>📝 To-Do App (useState only)</h2>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Enter task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleAddTask} style={styles.addBtn}>
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      <ul style={styles.list}>
        {tasks.map((t, index) => (
          <li key={index} style={styles.listItem}>
            <span>{t}</span>
            <div>
              <button onClick={() => handleEdit(index)} style={styles.editBtn}>Edit</button>
              <button onClick={() => handleDelete(index)} style={styles.deleteBtn}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};


export default TodoApp;