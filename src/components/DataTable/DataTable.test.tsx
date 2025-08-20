import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { DataTable, Column } from './DataTable';

type Row = { id: number; name: string; age: number };
const columns: Column<Row>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
];
const data: Row[] = [
  { id: 1, name: 'Bob', age: 35 },
  { id: 2, name: 'Alice', age: 29 },
  { id: 3, name: 'Charlie', age: 27 }
];

it('sorts by column when header clicked', () => {
  render(<DataTable<Row> data={data} columns={columns} />);
  const nameHeader = screen.getByText('Name');
  fireEvent.click(nameHeader);
  const rows = screen.getAllByRole('row').slice(1);
  expect(within(rows[0]).getByText('Alice')).toBeInTheDocument();
  fireEvent.click(nameHeader);
  const rows2 = screen.getAllByRole('row').slice(1);
  expect(within(rows2[0]).getByText('Charlie')).toBeInTheDocument();
});

it('selects rows and calls callback', () => {
  const spy = jest.fn();
  render(<DataTable<Row> data={data} columns={columns} selectable onRowSelect={spy} />);
  const row1 = screen.getByLabelText('Select row 1');
  fireEvent.click(row1);
  expect(spy).toHaveBeenCalled();
  const headerCheckbox = screen.getByLabelText('Select all rows') as HTMLInputElement;
  fireEvent.click(headerCheckbox);
  expect(headerCheckbox.checked).toBe(true);
});
