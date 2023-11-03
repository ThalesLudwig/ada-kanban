import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import App from "./App";
import { renderWithProviders } from "../config/renderWithProviders";

describe("Column Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("renders the app", () => {
    const { getByText } = renderWithProviders(<App />);
    expect(getByText("Task Board")).toBeTruthy();
  });
});
