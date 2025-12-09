const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Backend running" });
});

const taskRoutes = require("./routes/task.routes");
app.use("/tasks", taskRoutes);


module.exports = app;
