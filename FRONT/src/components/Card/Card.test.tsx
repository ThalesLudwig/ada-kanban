import { afterEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent } from '@testing-library/react'

import Card from './Card'
import { renderWithProviders } from '../../config/renderWithProviders'

describe("Card Component", () => {
    afterEach(() => {
        vi.clearAllMocks();
        cleanup();
    });

    test('renders card with title and content', () => {
        const { getByText } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={() => {}} onUpdate={() => {}} />)
        expect(getByText('Test Title')).toBeTruthy()
        expect(getByText('Test Content')).toBeTruthy()
    })
    
    test('clicking edit button shows input fields', () => {
        const { getByDisplayValue, getByRole } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={() => {}} onUpdate={() => {}} />)
        fireEvent.click(getByRole('button', { name: 'edit' }))
        expect(getByDisplayValue('Test Title')).toBeTruthy()
        expect(getByDisplayValue('Test Content')).toBeTruthy()
    })
    
    test('clicking cancel button hides input fields', () => {
        const { getByRole, queryByDisplayValue } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={() => {}} onUpdate={() => {}} />)
        fireEvent.click(getByRole('button', { name: 'edit' }))
        fireEvent.click(getByRole('button', { name: 'cancel-edit' }))
        expect(queryByDisplayValue('Test Title')).toBeFalsy()
        expect(queryByDisplayValue('Test Content')).toBeFalsy()
    })
    
    test('clicking update button calls onUpdate with new values', () => {
        const onUpdate = vi.fn()
        const { getByRole, getByDisplayValue } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={() => {}} onUpdate={onUpdate} />)
        fireEvent.click(getByRole('button', { name: 'edit' }))
        fireEvent.change(getByDisplayValue('Test Title'), { target: { value: 'New Title' } })
        fireEvent.change(getByDisplayValue('Test Content'), { target: { value: 'New Content' } })
        fireEvent.click(getByRole('button', { name: 'update' }))
        expect(onUpdate).toHaveBeenCalledWith({ id: '1', lista: 'ToDo', titulo: 'New Title', conteudo: 'New Content' })
    })
    
    test('clicking trash icon button displays confirmation alert', () => {
        const onRemove = vi.fn()
        const { getByRole, getByText } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={onRemove} onUpdate={() => {}} />)
        fireEvent.click(getByRole('button', { name: 'show-alert' }))
        expect(getByText('Are you sure?')).toBeTruthy()
    })
    
    test('clicking remove button calls onRemove', () => {
        const onRemove = vi.fn()
        const { getByRole } = renderWithProviders(<Card id="1" lista="ToDo" titulo="Test Title" conteudo="Test Content" onRemove={onRemove} onUpdate={() => {}} />)
        fireEvent.click(getByRole('button', { name: 'show-alert' }))
        fireEvent.click(getByRole('button', { name: 'remove' }))
        expect(onRemove).toHaveBeenCalled()
    })
});

