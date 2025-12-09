import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  Dialog, 
  DialogContent, 
  DialogActions, 
  DialogTitle, 
  Button 
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";

function CompletedTaskList({ tasks, refreshTasks }) {
  const [openDelete, setOpenDelete] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.length === 0 && (
          <Typography>No completed tasks</Typography>
        )}

        {tasks.map((task) => (
          <Card
            key={task.id}
            sx={{
              background: "#e8ffe8",
              borderLeft: "5px solid green",
              position: "relative",
              padding: 2,
              boxShadow: 2
            }}
          >

            {/* DELETE ICON TOP RIGHT */}
            <Box sx={{ position: "absolute", top: 10, right: 10 }}>
              <IconButton onClick={() => handleOpenDelete(task)}>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>

            <CardContent>
              <Typography variant="h6" sx={{ color: "green", fontWeight: "bold" }}>
                {task.title}
              </Typography>

              <Typography sx={{ mt: 1 }}>
                {task.description}
              </Typography>

              <Typography sx={{ mt: 1, fontSize: "12px", color: "gray" }}>
                Completed
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* DELETE CONFIRMATION DIALOG */}
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

export default CompletedTaskList;
