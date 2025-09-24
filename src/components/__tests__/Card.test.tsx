import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card";

describe("Card component", () => {
  const mockClick = vi.fn();

  it("renders back side initially", () => {
    render(<Card id={1} image="/images/1.jpg" isFlipped={false} isMatched={false} onClick={mockClick} />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
  });

  it("renders front side when flipped", () => {
    render(<Card id={1} image="/images/1.jpg" isFlipped={true} isMatched={false} onClick={mockClick} />);
    expect(screen.getByAltText("card")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", async () => {
    render(<Card id={1} image="/images/1.jpg" isFlipped={false} isMatched={false} onClick={mockClick} />);
    await userEvent.click(screen.getByAltText("Logo"));
    expect(mockClick).toHaveBeenCalled();
  });
});
