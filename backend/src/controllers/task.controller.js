const db = require("../db/connection");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const [result] = await db.query(
      "INSERT INTO task (title, description) VALUES (?, ?)",
      [title, description]
    );

    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC LIMIT 5"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE task SET is_completed = TRUE WHERE id = ?",
      [id]
    );

    res.json({ message: "Task completed" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM task WHERE is_completed = TRUE ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    await db.query(
      "UPDATE task SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );

    res.json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM task WHERE id = ?", [id]);

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
};
