import { Card, CardContent, Typography, Button, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { markTaskDone } from "../api/taskApi";
import axios from "axios";
import { useState } from "react";

function AllTaskList({ tasks, refreshTasks }) {
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
        {tasks.length === 0 && (
          <Typography>No tasks found</Typography>
        )}

        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              background: task.is_completed ? "#e6e8eb" : "#e6e8eb",
              opacity: task.is_completed ? 0.7 : 1,
              position: "relative",
              padding: 2,
              boxShadow: 3,
            }}
          >
            {/* Icons */}
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

              <Typography sx={{ mb: 2, paddingTop:"10px" }}>{task.description}</Typography>

              {!task.is_completed && (
                <Button sx={{background: "#e6e8eb",color:"black"}} variant="contained" color="success" onClick={() => handleDone(task.id)}>
                  Done
                </Button>
              )}
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

      {/* Delete Confirmation */}
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

export default AllTaskList;
