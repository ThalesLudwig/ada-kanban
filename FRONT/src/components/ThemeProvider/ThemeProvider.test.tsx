import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import ThemeProvider from "./ThemeProvider";
import { renderWithProviders } from "../../config/renderWithProviders";

describe("ThemeProvider Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

    test("should render correctly", () => {
        const { container, findByText } = renderWithProviders(<ThemeProvider>foobar</ThemeProvider>);
        expect(container).toMatchSnapshot();
        expect(findByText("foobar")).toBeTruthy();
    });
});
