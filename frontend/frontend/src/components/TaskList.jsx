import { Card, CardContent, Typography, Button, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { markTaskDone } from "../api/taskApi";
import axios from "axios";
import { useState } from "react";

function TaskList({ tasks, refreshTasks }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [currentTask, setCurrentTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const handleDone = async (id) => {
    await markTaskDone(id);
    refreshTasks();
  };

  const handleOpenEdit = (task) => {
    setCurrentTask(task);
    setEditTitle(task.title);
    setEditDesc(task.description);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/tasks/${currentTask.id}`, {
      title: editTitle,
      description: editDesc
    });
    setOpenEdit(false);
    refreshTasks();
  };

  const handleOpenDelete = (task) => {
    setCurrentTask(task);
    setOpenDelete(true);
  };

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/tasks/${currentTask.id}`);
    setOpenDelete(false);
    refreshTasks();
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              background: "#e6e8eb",
              position: "relative",
              background: "#e6e8eb",
              width: "450px",
              padding: 2,
              minHeight: "120px",    
              boxShadow: 3,           
              borderRadius: 2     
            }}
          >
            {/* Top Right Icons */}
            <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
              <IconButton onClick={() => handleOpenEdit(task)}>
                <EditIcon color="primary" />
              </IconButton>
              <IconButton onClick={() => handleOpenDelete(task)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>

            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {task.title}
              </Typography>

              <Typography sx={{ mb: 2 }}>
                {task.description}
              </Typography>

              <Button
                variant="contained"
                color="success"
                sx={{background: "#e6e8eb",color:"black"}}
                onClick={() => handleDone(task.id)}
              >
                Done
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            minRows={3}
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            sx={{ marginTop: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Task?</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TaskList;



