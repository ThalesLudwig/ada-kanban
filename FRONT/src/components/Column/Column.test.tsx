import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import Column from "./Column";
import { renderWithProviders } from "../../config/renderWithProviders";

describe("Column Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("renders the column name", () => {
    const { getByText } = renderWithProviders(
      <Column name="ToDo" onDrag={() => {}}>
        <div>Test Column</div>
      </Column>,
    );

    expect(getByText("Test Column")).toBeTruthy();
  });

  test("renders the children", () => {
    const { getByText } = renderWithProviders(
      <Column name="ToDo" onDrag={() => {}}>
        <div>Test Card</div>
      </Column>,
    );

    expect(getByText("Test Card")).toBeTruthy();
  });
});
