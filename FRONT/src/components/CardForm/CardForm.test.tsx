import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent } from '@testing-library/react'

import CardForm from './CardForm'
import { renderWithProviders } from '../../config/renderWithProviders'

describe("CardForm Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test("renders the component", () => {
        const { getByText } = renderWithProviders(<CardForm onAdd={() => {}} onCancel={() => {}} />);
        expect(getByText("New Card")).toBeTruthy();
    });

    test("calls onAdd when form is submitted", () => {
        const onAddMock = vi.fn();
        const { getByRole, getByPlaceholderText } = renderWithProviders(<CardForm onAdd={onAddMock} onCancel={() => {}} />);
        const titleInput = getByPlaceholderText("Title");
        const contentInput = getByPlaceholderText("Content");
        const submitButton = getByRole("button", { name: "submit" });

        fireEvent.change(titleInput, { target: { value: "Test Title" } });
        fireEvent.change(contentInput, { target: { value: "Test Content" } });
        fireEvent.click(submitButton);

        expect(onAddMock).toHaveBeenCalledWith("Test Title", "Test Content");
    });

    test("calls onCancel when cancel button is clicked", () => {
        const onCancelMock = vi.fn();
        const { getByRole } = renderWithProviders(<CardForm onAdd={() => {}} onCancel={onCancelMock} />);
        const cancelButton = getByRole("button", { name: "cancel" });

        fireEvent.click(cancelButton);

        expect(onCancelMock).toHaveBeenCalled();
    });
});

