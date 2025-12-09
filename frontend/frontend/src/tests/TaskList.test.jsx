import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import TaskList from "../components/TaskList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test("renders tasks and marks one as done", async () => {
  const mock = new MockAdapter(axios);
  const refreshMock = jest.fn();

  mock.onPut("http://localhost:5000/tasks/1/complete").reply(200);

  const tasks = [
    { id: 1, title: "Task A", description: "A desc", is_completed: 0 },
    { id: 2, title: "Task B", description: "B desc", is_completed: 0 }
  ];

  render(<TaskList tasks={tasks} refreshTasks={refreshMock} />);

  const doneButtons = screen.getAllByText(/Done/i);

  await act(async () => {
    fireEvent.click(doneButtons[0]);
  });

  await waitFor(() => {
    expect(refreshMock).toHaveBeenCalled();
  });
});
