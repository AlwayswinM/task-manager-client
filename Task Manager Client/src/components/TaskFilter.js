import React from 'react';
import { ToggleButton } from "@mui/material";

const TaskFilter = ({ setFilter }) => {
  return (
    <div>
      <ToggleButton onClick={() => setFilter('All')}>All</ToggleButton>
      <ToggleButton onClick={() => setFilter('Completed')}>Completed</ToggleButton>
      <ToggleButton onClick={() => setFilter('Incomplete')}>Incomplete</ToggleButton>
    </div>
  );
};

export default TaskFilter;
