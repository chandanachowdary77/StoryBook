# React UI Components Library

Reusable UI components built with **React, TypeScript, TailwindCSS, Storybook, and Jest**.  
This project contains two core components — `InputField` and `DataTable` — designed for scalability, accessibility, and modern React best practices.

---

## 🚀 Tech Stack
- React + TypeScript  
- TailwindCSS (with light/dark theme support)  
- Storybook (for component documentation & testing in isolation)  
- Jest + React Testing Library (unit tests)  

---

## 📦 Components

### 1. InputField
A flexible text input component with multiple variants, states, and optional features.

**Features**
- Label, placeholder, helper text, error message  
- Variants: `filled` | `outlined` | `ghost`  
- Sizes: `sm` | `md` | `lg`  
- States: `disabled`, `invalid`, `loading`  
- Optional: clear button, password toggle  
- Light/Dark theme support  

**Props**
```ts
interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}
2. DataTable

A generic data table component supporting sorting, selection, and custom columns.

Features

Display tabular data

Column sorting

Row selection (single/multiple)

Loading and empty states

Props

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

🛠️ Getting Started

Clone the repository:

git clone https://github.com/your-username/react-ui-components.git
cd react-ui-components


Install dependencies:
npm install

Run Storybook:
npm run storybook


Open http://localhost:6006 to view components in isolation.

Run Tests:
npm test
