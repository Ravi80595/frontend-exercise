import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./Home";
import { useGameContext } from "../context/GameContext";
import { BrowserRouter } from "react-router-dom";

// Mock GameContext
vi.mock("../context/GameContext", () => ({
  useGameContext: vi.fn(),
}));

// Mock useNavigate using partial mock
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("Home Component", () => {
  const resetGameMock = vi.fn();
  const setPlayerNameMock = vi.fn();

  beforeEach(() => {
    (useGameContext as vi.Mock).mockReturnValue({
      resetGame: resetGameMock,
      setPlayerName: setPlayerNameMock,
    });
    vi.clearAllMocks();
  });

  it("renders input, select and start button", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
  });

  it("updates name input value on change", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    await userEvent.type(input, "Ravi");
    expect((input as HTMLInputElement).value).toBe("Ravi");
  });

  it("enables start button only when name is valid", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /start game/i });
    const input = screen.getByPlaceholderText(/enter your name/i);

    // Initially disabled
    expect(button).toBeDisabled();

    // Enter valid name
    await userEvent.type(input, "Buddy");
    expect(button).toBeEnabled();

    // Enter only spaces
    fireEvent.change(input, { target: { value: "   " } });
    expect(button).toBeDisabled();
  });

  it("calls resetGame, setPlayerName and navigate on start", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/enter your name/i);
    const select = screen.getByRole("combobox");
    const button = screen.getByRole("button", { name: /start game/i });

    await userEvent.type(input, "Buddy");
    fireEvent.change(select, { target: { value: "6x6" } });
    await userEvent.click(button);

    expect(resetGameMock).toHaveBeenCalled();
    expect(setPlayerNameMock).toHaveBeenCalledWith("Buddy");
    expect(mockedNavigate).toHaveBeenCalledWith("/game", { state: { boardSize: "6x6" } });
  });

  it("does not start game if name is empty or spaces", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /start game/i });
    await userEvent.click(button);

    expect(resetGameMock).not.toHaveBeenCalled();
    expect(setPlayerNameMock).not.toHaveBeenCalled();
    expect(mockedNavigate).not.toHaveBeenCalled();
  });
});
