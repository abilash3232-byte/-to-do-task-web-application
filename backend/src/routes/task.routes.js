const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.put("/:id/complete", taskController.markComplete);
router.get("/all", taskController.getAllTasks);
router.get("/completed", taskController.getCompletedTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);


module.exports = router;
