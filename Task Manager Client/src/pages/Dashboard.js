import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskItem from '../components/TaskItem';
import { Button, Typography, Container } from "@mui/material";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All'); // "All", "Completed", "Incomplete"

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
          return;
        }else{
          console.log("Token in frontend:", token); // Debugging
          const response = await axios.get('http://localhost:5000/api/tasks', {headers: { Authorization: `Bearer ${token}`}});
          setTasks(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
          return;
      }
      console.log("Token in frontend:", token); // Debugging
      const response = await axios.post('http://localhost:5000/api/tasks', { title: newTask }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:',error);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
          return;
      }
      console.log("Token in frontend:", token); // Debugging
      const response = await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
          alert("Session expired. Please log in again.");
          window.location.href = "/login"; // Redirect to login page
          return;
      }
      console.log("Token in frontend:", token); // Debugging
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.completed;
    if (filter === 'Incomplete') return !task.completed;
    return true;
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  return (
    <Container >
      <Typography variant="h4" sx={{ textAlign: "center", color: "blue",padding: "30px" }}>Task Manager Client</Typography>
      <Button variant="contained" color="error" onClick={handleLogout} startIcon={<FaSignOutAlt />} sx={{ marginBottom: "40px" }}>Logout</Button>
      
      <TaskFilter setFilter={setFilter} sx={{ marginBottom: "20px" }} />
      <TaskForm addTask={addTask} sx={{ marginBottom: "40px" }} />

      <div>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />))
        }
      </div>
    </Container>
  );
};

export default Dashboard;
