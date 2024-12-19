import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LeftItems from "../LeftItems";

describe("Left items component", () => {
  it("should render the correct amount of incomplete tasks", () => {
    render(<LeftItems num={5} />);
    const paragraphElement = screen.getByRole("paragraph");
    expect(paragraphElement).toBeInTheDocument();
  });

  it("should render 'task' when the number of incomplete tasks is one", () => {
    render(<LeftItems num={1} />);
    const paragraphElement = screen.getByRole("paragraph");
    expect(paragraphElement.textContent).toBe("1 item left");
  });
});
