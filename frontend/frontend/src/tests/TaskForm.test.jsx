import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import TaskForm from "../components/TaskForm";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test("renders TaskForm fields and submits", async () => {
  const mock = new MockAdapter(axios);
  const refreshMock = jest.fn();

  mock.onPost("http://localhost:5000/tasks").reply(201, { id: 10 });

  render(<TaskForm refreshTasks={refreshMock} />);

  fireEvent.change(screen.getByLabelText(/Task Title/i), {
    target: { value: "New Task" }
  });

  fireEvent.change(screen.getByLabelText(/Description/i), {
    target: { value: "Test Desc" }
  });

  const button = screen.getByRole("button", { name: /add task/i });

  await act(async () => {
    fireEvent.click(button);
  });

  await waitFor(() => {
    expect(refreshMock).toHaveBeenCalled();
  });
});
