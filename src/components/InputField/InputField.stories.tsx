import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';
import React from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    variant: 'outlined',
    size: 'md'
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['filled', 'outlined', 'ghost'] },
    size: { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] }
  }
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  render: (args) => {
    const [val, setVal] = React.useState('');
    return <div className="max-w-sm"><InputField {...args} value={val} onChange={(e)=>setVal(e.target.value)} /></div>;
  }
};

export const Variants: Story = {
  render: (args) => {
    const [val, setVal] = React.useState('');
    return (
      <div className="grid max-w-xl grid-cols-1 gap-4">
        <InputField {...args} label="Outlined" variant="outlined" value={val} onChange={(e)=>setVal(e.target.value)} />
        <InputField {...args} label="Filled" variant="filled" value={val} onChange={(e)=>setVal(e.target.value)} />
        <InputField {...args} label="Ghost" variant="ghost" value={val} onChange={(e)=>setVal(e.target.value)} />
      </div>
    );
  }
};

export const Sizes: Story = {
  render: (args) => (
    <div className="grid max-w-xl grid-cols-1 gap-4">
      <InputField {...args} label="Small" size="sm" />
      <InputField {...args} label="Medium" size="md" />
      <InputField {...args} label="Large" size="lg" />
    </div>
  )
};

export const States: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-1 gap-4">
      <InputField label="Disabled" placeholder="Disabled" disabled />
      <InputField label="Invalid" placeholder="Invalid" invalid errorMessage="This field is required" />
      <InputField label="Loading" placeholder="Loading" loading />
    </div>
  )
};

export const WithExtras: Story = {
  render: () => {
    const [p, setP] = React.useState('secret');
    const [q, setQ] = React.useState('clear me');
    return (
      <div className="grid max-w-xl grid-cols-1 gap-4">
        <InputField label="Password" type="password" passwordToggle value={p} onChange={(e)=>setP(e.target.value)} />
        <InputField label="Clearable" clearable value={q} onChange={(e)=>setQ(e.target.value)} />
      </div>
    );
  }
};
