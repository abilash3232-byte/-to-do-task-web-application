const request = require("supertest");
const app = require("../../src/app");
const db = require("../../src/db/connection");

// Mock DB for integration tests
jest.mock("../../src/db/connection", () => ({
  query: jest.fn(),
}));

describe("Task Routes - Integration Tests", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("POST /tasks - should create a new task", async () => {
    db.query.mockResolvedValue([{ insertId: 10 }]);

    const response = await request(app)
      .post("/tasks")
      .send({ title: "Integration Task", description: "Desc" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id", 10);
  });

  test("GET /tasks - should return uncompleted tasks", async () => {
    const fakeTasks = [
      { id: 1, title: "Test A", is_completed: 0 },
      { id: 2, title: "Test B", is_completed: 0 }
    ];

    db.query.mockResolvedValue([fakeTasks]);

    const response = await request(app).get("/tasks");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0].title).toBe("Test A");
  });

  test("GET /tasks/all - should return all tasks", async () => {
    const fakeAll = [
      { id: 1, title: "Task A" },
      { id: 2, title: "Task B" }
    ];

    db.query.mockResolvedValue([fakeAll]);

    const response = await request(app).get("/tasks/all");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[1].title).toBe("Task B");
  });

  test("PUT /tasks/:id - should update a task", async () => {
    db.query.mockResolvedValue([{}]);

    const response = await request(app)
      .put("/tasks/5")
      .send({ title: "Updated", description: "Updated Desc" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task updated");
  });

 test("PUT /tasks/:id/complete - should mark a task as done", async () => {
  db.query.mockResolvedValue([{}, undefined]);

  const response = await request(app).put("/tasks/7/complete");

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Task completed");
});


  test("DELETE /tasks/:id - should delete a task", async () => {
    db.query.mockResolvedValue([{}]);

    const response = await request(app).delete("/tasks/9");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Task deleted");
  });
});
