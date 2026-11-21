import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { DATA } from "./data";

// Starting tasks: Eat (completed), Sleep, Repeat

function renderApp() {
  // userEvent simulates real typing and clicking, including focus changes
  const user = userEvent.setup();
  render(<App initialTasks={DATA} />);
  return { user };
}

function listHeading() {
  return screen.getByRole("heading", { name: /remaining/ });
}

describe("task list", () => {
  it("shows the starting tasks", () => {
    renderApp();
    expect(screen.getByRole("checkbox", { name: "Eat" })).toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Sleep" })).not.toBeChecked();
    expect(screen.getByRole("checkbox", { name: "Repeat" })).not.toBeChecked();
  });

  it("counts only unfinished tasks in the heading", () => {
    renderApp();
    expect(listHeading()).toHaveTextContent("2 tasks remaining");
  });

  it("keeps counting unfinished tasks on the Completed filter", async () => {
    const { user } = renderApp();
    const completedFilter = screen.getByRole("button", { name: "Show Completed tasks" });

    await user.click(completedFilter);

    expect(completedFilter).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("checkbox", { name: "Eat" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Sleep" })).not.toBeInTheDocument();
    expect(listHeading()).toHaveTextContent("2 tasks remaining");
  });

  it("updates the checkbox and the count when a task is completed", async () => {
    const { user } = renderApp();
    const sleep = screen.getByRole("checkbox", { name: "Sleep" });

    await user.click(sleep);

    expect(sleep).toBeChecked();
    expect(listHeading()).toHaveTextContent("1 task remaining");
  });

  it("adds a task and clears the input", async () => {
    const { user } = renderApp();
    const input = screen.getByLabelText("What needs to be done?");

    await user.type(input, "Study");
    await user.click(screen.getByRole("button", { name: "Add" }));

    expect(screen.getByRole("checkbox", { name: "Study" })).not.toBeChecked();
    expect(listHeading()).toHaveTextContent("3 tasks remaining");
    expect(input).toHaveValue("");
  });

  // MDN's exercise, left for students: see the NOTE in Form.jsx
  it.todo("does not add a task when the name is empty");
});

describe("editing a task", () => {
  it("opens the edit field with the current name and focuses it", async () => {
    const { user } = renderApp();

    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));

    const field = screen.getByLabelText("New name for Sleep");
    expect(field).toHaveValue("Sleep");
    expect(field).toHaveFocus();
  });

  it("gives the edit field a different id from the checkbox", async () => {
    const { user } = renderApp();
    const checkboxId = screen.getByRole("checkbox", { name: "Sleep" }).id;

    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));

    expect(screen.getByLabelText("New name for Sleep").id).not.toBe(checkboxId);
  });

  it("renames the task and returns focus to its Edit button", async () => {
    const { user } = renderApp();
    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));

    const field = screen.getByLabelText("New name for Sleep");
    await user.clear(field);
    await user.type(field, "Nap");
    await user.click(screen.getByRole("button", { name: "Save new name for Sleep" }));

    expect(screen.getByRole("checkbox", { name: "Nap" })).toBeInTheDocument();
    expect(screen.queryByRole("checkbox", { name: "Sleep" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Edit Nap" })).toHaveFocus();
  });

  it("discards typed text on Cancel and returns focus to the Edit button", async () => {
    const { user } = renderApp();
    await user.click(screen.getByRole("button", { name: "Edit Sleep" }));
    await user.type(screen.getByLabelText("New name for Sleep"), " more");

    await user.click(screen.getByRole("button", { name: "Cancel renaming Sleep" }));

    const editButton = screen.getByRole("button", { name: "Edit Sleep" });
    expect(editButton).toHaveFocus();

    await user.click(editButton);
    expect(screen.getByLabelText("New name for Sleep")).toHaveValue("Sleep");
  });
});

describe("deleting a task", () => {
  it("removes the task and moves focus to the list heading", async () => {
    const { user } = renderApp();

    await user.click(screen.getByRole("button", { name: "Delete Sleep" }));

    expect(screen.queryByRole("checkbox", { name: "Sleep" })).not.toBeInTheDocument();
    expect(listHeading()).toHaveTextContent("1 task remaining");
    expect(listHeading()).toHaveFocus();
  });
});
