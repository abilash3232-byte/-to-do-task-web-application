import { useState } from "react";
import { TextField, Button, Paper, Box } from "@mui/material";
import { createTask } from "../api/taskApi";

function TaskForm({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({ title, description });
    setTitle("");
    setDescription("");
    refreshTasks();
  };

  return (
    <Paper sx={{ padding: 5, marginBottom: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Task Title"
            variant="outlined"
            sx={{ width: "250px" }}
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Description"
            multiline
            minRows={2}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button variant="contained" type="submit">
            Add Task
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default TaskForm;
