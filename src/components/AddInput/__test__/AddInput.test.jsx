import { describe, it, expect, vitest } from "vitest";
import { screen, render, fireEvent } from "@testing-library/react";
import AddInput from "../AddInput";

const mockedAddTodo = vitest.fn();

describe("AddInput", () => {
  it("should render input element", () => {
    render(<AddInput addTodo={mockedAddTodo} />);
    const inputElement = screen.getByPlaceholderText("Create a new todo...");
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type in input", () => {
    render(<AddInput addTodo={mockedAddTodo} />);
    const inputElement = screen.getByPlaceholderText("Create a new todo...");
    fireEvent.change(inputElement, {
      target: { value: "Go grocery shopping" },
    });
    expect(inputElement.value).toBe("Go grocery shopping");
  });
});
