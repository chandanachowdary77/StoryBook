import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from './InputField';

it('renders label and placeholder', () => {
  render(<InputField label="Email" placeholder="Enter email" />);
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
});

it('shows error message when invalid', () => {
  render(<InputField label="Name" invalid errorMessage="Required" />);
  expect(screen.getByText('Required')).toBeInTheDocument();
  expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
});

it('clear button resets value', () => {
  const Wrapper = () => {
    const [v, setV] = React.useState('hello');
    return <InputField label="X" value={v} onChange={(e)=>setV(e.target.value)} clearable />;
  };
  render(<Wrapper />);
  const input = screen.getByLabelText('X') as HTMLInputElement;
  expect(input.value).toBe('hello');
  const clearBtn = screen.getByRole('button', { name: /clear input/i });
  fireEvent.click(clearBtn);
  expect(input.value).toBe('');
});

it('password toggle shows and hides text', () => {
  const Wrapper = () => {
    const [v, setV] = React.useState('secret');
    return <InputField label="Pwd" type="password" value={v} onChange={(e)=>setV(e.target.value)} passwordToggle />;
  };
  render(<Wrapper />);
  const input = screen.getByLabelText('Pwd') as HTMLInputElement;
  expect(input.type).toBe('password');
  fireEvent.click(screen.getByRole('button', { name: /show password/i }));
  expect(input.type).toBe('text');
  fireEvent.click(screen.getByRole('button', { name: /hide password/i }));
  expect(input.type).toBe('password');
});
