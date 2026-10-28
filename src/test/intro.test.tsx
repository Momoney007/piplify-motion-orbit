import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { Intro } from "@/components/site/Intro";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  document.body.style.overflow = "";
});

describe("Opening animation", () => {
  it("allows visitors to skip immediately and restores scrolling", () => {
    vi.useFakeTimers();
    const onDone = vi.fn();
    render(<Intro onDone={onDone} />);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("button", { name: /skip intro/i }));
    expect(onDone).toHaveBeenCalledOnce();
    act(() => vi.advanceTimersByTime(1400));
    expect(document.body.style.overflow).toBe("");
    expect(screen.queryByRole("button", { name: /skip intro/i })).not.toBeInTheDocument();
  });

  it("skips animation for visitors who request reduced motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({ matches: true } as MediaQueryList);
    const onDone = vi.fn();
    render(<Intro onDone={onDone} />);
    expect(onDone).toHaveBeenCalledOnce();
    expect(document.body.style.overflow).toBe("");
    expect(screen.queryByRole("button", { name: /skip intro/i })).not.toBeInTheDocument();
  });

  it("restores the prior scroll state when unmounted during loading", () => {
    document.body.style.overflow = "auto";
    const { unmount } = render(<Intro onDone={vi.fn()} />);
    unmount();
    expect(document.body.style.overflow).toBe("auto");
  });
});
