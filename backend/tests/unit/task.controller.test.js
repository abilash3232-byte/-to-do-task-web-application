const taskController = require("../../src/controllers/task.controller");
const db = require("../../src/db/connection");

// Mock the db.query function
jest.mock("../../src/db/connection", () => ({
  query: jest.fn(),
}));

describe("Task Controller - Unit Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createTask should insert a record and return id", async () => {
    const req = {
      body: { title: "Unit Test Task", description: "Test Desc" },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock DB response
    db.query.mockResolvedValue([{ insertId: 123 }]);

    await taskController.createTask(req, res);

    expect(db.query).toHaveBeenCalledWith(
      "INSERT INTO task (title, description) VALUES (?, ?)",
      ["Unit Test Task", "Test Desc"]
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 123 });
  });

  test("getTasks should return a list of tasks", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const fakeRows = [
      { id: 1, title: "Task 1", is_completed: 0 },
      { id: 2, title: "Task 2", is_completed: 0 },
    ];

    db.query.mockResolvedValue([fakeRows]);

    await taskController.getTasks(req, res);

    expect(db.query).toHaveBeenCalledWith(
      "SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC LIMIT 5"
    );
    expect(res.json).toHaveBeenCalledWith(fakeRows);
  });
});

test("getAllTasks should return all tasks ordered by created_at", async () => {
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  const fakeRows = [
    { id: 10, title: "A", is_completed: 0 },
    { id: 11, title: "B", is_completed: 1 },
  ];

  db.query.mockResolvedValue([fakeRows]);

  await taskController.getAllTasks(req, res);

  expect(db.query).toHaveBeenCalledWith(
    "SELECT * FROM task WHERE is_completed = FALSE ORDER BY created_at DESC"
  );
  expect(res.json).toHaveBeenCalledWith(fakeRows);
});

test("getCompletedTasks should return only completed tasks", async () => {
  const req = {};
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  const fakeRows = [
    { id: 1, title: "Done 1", is_completed: 1 },
    { id: 2, title: "Done 2", is_completed: 1 },
  ];

  db.query.mockResolvedValue([fakeRows]);

  await taskController.getCompletedTasks(req, res);

  expect(db.query).toHaveBeenCalledWith(
    "SELECT * FROM task WHERE is_completed = TRUE ORDER BY created_at DESC"
  );

  expect(res.json).toHaveBeenCalledWith(fakeRows);
});

test("markComplete should update task as completed", async () => {
  const req = { params: { id: 5 } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  db.query.mockResolvedValue([{}]);

  await taskController.markComplete(req, res);

  expect(db.query).toHaveBeenCalledWith(
    "UPDATE task SET is_completed = TRUE WHERE id = ?",
    [5]
  );

  expect(res.json).toHaveBeenCalledWith({ message: "Task completed" });
});

test("updateTask should update title and description", async () => {
  const req = {
    params: { id: 3 },
    body: { title: "Updated", description: "Updated desc" },
  };

  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  db.query.mockResolvedValue([{}]);

  await taskController.updateTask(req, res);

  expect(db.query).toHaveBeenCalledWith(
    "UPDATE task SET title = ?, description = ? WHERE id = ?",
    ["Updated", "Updated desc", 3]
  );

  expect(res.json).toHaveBeenCalledWith({ message: "Task updated" });
});

test("deleteTask should remove task by id", async () => {
  const req = { params: { id: 99 } };
  const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

  db.query.mockResolvedValue([{}]);

  await taskController.deleteTask(req, res);

  expect(db.query).toHaveBeenCalledWith(
    "DELETE FROM task WHERE id = ?",
    [99]
  );

  expect(res.json).toHaveBeenCalledWith({ message: "Task deleted" });
});
