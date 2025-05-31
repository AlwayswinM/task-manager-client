const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// Apply authentication middleware to all task routes
router.use(authMiddleware);

// GET - Fetch all tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    console.log("Received task data:", req.body); // Debugging

    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// POST - Create a new task
router.post('/', async (req, res) => {
  try {
    console.log("Received task data:", req.body); // Debugging

    const { title } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const newTask = await Task.create({ userId: req.user.id, title, completed: false });
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Failed to create task' });
  }
});

// PUT - Update a task by ID
router.put('/:id', async (req, res) => {
  try {
    console.log("Received task data:", req.body); // Debugging

    const { title, completed } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title, completed },
      { new: true }
    );

    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Failed to update task' });
  }
});

// DELETE - Remove a task by ID
router.delete('/:id', async (req, res) => {
  try {
    console.log("Received task data:", req.body); // Debugging
    
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!deletedTask) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

module.exports = router;
