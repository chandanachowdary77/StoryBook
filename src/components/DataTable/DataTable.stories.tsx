import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { DataTable, Column } from './DataTable';

type User = { id: number; name: string; email: string; age: number };

const columns: Column<User>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true }
];

const sample: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', age: 29 },
  { id: 2, name: 'Bob', email: 'bob@example.com', age: 35 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 27 }
];

const meta: Meta<typeof DataTable<User>> = {
  title: 'Components/DataTable',
  component: DataTable
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sample,
    columns
  }
};

export const SortableAndSelectable: Story = {
  render: (args) => {
    const [selected, setSelected] = React.useState<User[]>([]);
    return (
      <div className="max-w-3xl">
        <DataTable<User>
          {...args}
          data={sample}
          columns={columns}
          selectable
          onRowSelect={(rows) => setSelected(rows)}
        />
        <pre className="mt-4 text-xs">{JSON.stringify(selected, null, 2)}</pre>
      </div>
    );
  }
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true
  }
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    loading: false
  }
};
