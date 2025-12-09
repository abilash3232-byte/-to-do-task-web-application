import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import CompletedTaskList from "../components/CompletedTaskList";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

test("delete dialog opens and deletes task", async () => {
  const mock = new MockAdapter(axios);
  const refreshMock = jest.fn();

  mock.onDelete("http://localhost:5000/tasks/3").reply(200);

  const tasks = [
    { id: 3, title: "Done Task", description: "Done desc", is_completed: 1 }
  ];

  render(<CompletedTaskList tasks={tasks} refreshTasks={refreshMock} />);

  // open delete dialog
  const deleteIconButton = screen.getAllByTestId("DeleteIcon")[0].closest("button");

  await act(async () => {
    fireEvent.click(deleteIconButton);
  });

  expect(screen.getByText(/Delete Task/i)).toBeInTheDocument();

  const deleteButtons = screen.getAllByText(/Delete/i);
  const dialogDelete = deleteButtons[deleteButtons.length - 1];

  await act(async () => {
    fireEvent.click(dialogDelete);
  });

  await waitFor(() => {
    expect(refreshMock).toHaveBeenCalled();
  });
});
