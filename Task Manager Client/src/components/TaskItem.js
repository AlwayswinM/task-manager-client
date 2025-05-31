import React, { useState } from 'react';
import { Card, CardContent, Typography,TextField, Button, IconButton } from "@mui/material";
import { CheckCircle, Edit, Delete } from "@mui/icons-material";

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const [editing, setEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleToggle = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  const handleEdit = () => {
    updateTask(task._id, { title: editedTitle });
    setEditing(false);
  };

  return (
    <Card sx={{ marginBottom: 2, backgroundColor: task.completed ? "#e0f7fa" : "#fff" }}>
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {editing ? (
          <>
            <TextField value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
            {/* Wrapping Save & Cancel in a flex container */}
            <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
            <Button onClick={handleEdit} variant="contained" color="success">
            Save
            </Button>
            <Button onClick={() => setEditing(false)} variant="outlined" color="error">
            Cancel
            </Button>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h6" sx={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title}
            </Typography>
              {/* Wrapping Action Buttons */}
              <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
              <IconButton onClick={handleToggle} color={task.completed ? "secondary" : "primary"}>
                <CheckCircle />
              </IconButton>
              <IconButton onClick={() => setEditing(true)} color="warning">
                <Edit />
              </IconButton>
              <IconButton onClick={() => deleteTask(task._id)} color="error">
                <Delete />
              </IconButton>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskItem;

