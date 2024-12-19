import { describe, it, expect } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import Todo from "../TodoApp";

const addTodo = (tasks) => {
  const inputElement = screen.getByPlaceholderText("Create a new todo...");
  const formElement = screen.getByTestId("form");
  tasks.forEach((task) => {
    fireEvent.change(inputElement, { target: { value: task } });
    fireEvent.submit(formElement);
  });
};

describe("TodoApp", () => {
  it("should render same text passed from add input", () => {
    render(<Todo />);
    addTodo(["do laundry"]);
    const divElement = screen.getByText(/do laundry/i);
    expect(divElement.textContent).toMatch("do laundry");
  });

  it("should render the items in the Todos plus the passed into addTodo", () => {
    render(<Todo />);
    addTodo(["do laundry", "practice chinese", "walk the dog"]);
    const divElement = screen.getAllByTestId("todo-list");
    expect(divElement.length).toBe(9);
  });

  it("task should not have active class when initially rendered", () => {
    render(<Todo />);
    addTodo(["do laundry"]);
    const divElement = screen.getByText(/do laundry/i);
    expect(divElement).not.toHaveClass("active");
  });
});
