/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './page';
import userEvent from '@testing-library/user-event';

it('Add New Task ', () => {
	render(<Home />);

	const field = screen.getByRole('InputTask').querySelector('input');
	expect(field).toBeInTheDocument();

	fireEvent.change(field, { target: { value: 'some text' } });
	expect(field.value).toBe('some text');
	fireEvent.click(screen.getByRole('AddNewTask'));
	expect(screen.getByRole('task-0')).toHaveTextContent('some text');
});
it('Complete Second Task ', () => {
	const { rerender } = render(<Home />);

	const field = screen.getByRole('InputTask').querySelector('input');
	expect(field).toBeInTheDocument();

	fireEvent.change(field, { target: { value: 'task-0' } });
	expect(field.value).toBe('task-0');
	fireEvent.click(screen.getByRole('AddNewTask'));
	
	fireEvent.change(field, { target: { value: 'task-1' } });
	expect(field.value).toBe('task-1');
	fireEvent.click(screen.getByRole('AddNewTask'));
	expect(screen.getByRole('task-0')).toHaveTextContent('task-0');
	expect(screen.getByRole('task-1')).toHaveTextContent('task-1');
	fireEvent.click(screen.getByRole('checkbox-task-0'));
	fireEvent.click(screen.getByRole('CompletedTask'));
	expect(screen.getByRole('task-0')).toHaveTextContent('task-0');
  
});
