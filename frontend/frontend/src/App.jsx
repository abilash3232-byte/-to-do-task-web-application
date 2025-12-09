import { useState, useEffect } from "react";
import { Box, Tabs, Tab, Typography, Grid, Divider } from "@mui/material";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import AllTaskList from "./components/AllTaskList";
import CompletedTaskList from "./components/CompletedTaskList";

import { getTasks, getAllTasks, getCompletedTasks } from "./api/taskApi";

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const loadTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const loadAllTasks = async () => {
    const response = await getAllTasks();
    setAllTasks(response.data);
  };

  const loadCompletedTasks = async () => {
    const response = await getCompletedTasks();
    setCompletedTasks(response.data);
  };

  const refreshAll = () => {
    loadTasks();
    loadAllTasks();
    loadCompletedTasks();
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return (
    <Box sx={{ width: "55%", margin: "auto", paddingTop: 4, paddingBottom: 6 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        Todo Task App
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        indicatorColor="primary"
        textColor="primary"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="Add a Task" />
        <Tab label="Pending Tasks" />
        <Tab label="Completed Tasks" />
      </Tabs>

      {activeTab === 0 && (
        <Grid container spacing={3}>

          {/* LEFT: Add Task Form */}
          <Grid item xs={12} md={4}>
            <TaskForm refreshTasks={refreshAll} />
          </Grid>

          <Grid
            item
            xs={12}
            md={1}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Divider orientation="vertical" flexItem />
          </Grid>

          <Grid item xs={12} md={7}>
            <TaskList tasks={tasks} refreshTasks={refreshAll} />
          </Grid>
        </Grid>
      )}

      {activeTab === 1 && (
        <AllTaskList tasks={allTasks} refreshTasks={refreshAll} />
      )}

      {activeTab === 2 && (
        <CompletedTaskList tasks={completedTasks} refreshTasks={refreshAll} />
      )}


    </Box>
  );
}

export default App;
