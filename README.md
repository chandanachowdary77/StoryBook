# React UI Components Library

Reusable UI components built with **React, TypeScript, TailwindCSS, Storybook, and Jest**.  
This repository contains two core components — `InputField` and `DataTable` — designed with scalability, accessibility, and reusability in mind.

---

## 🚀 Tech Stack
- React + TypeScript  
- TailwindCSS (with light/dark theme support)  
- Storybook (for component documentation & isolated testing)  
- Jest + React Testing Library (unit tests)  

---

## 📂 Folder Structure
StoryBook/
├── .storybook/ # Storybook configuration
├── src/
│ ├── components/
│ │ ├── InputField/
│ │ │ ├── InputField.tsx
│ │ │ ├── InputField.stories.tsx
│ │ │ ├── InputField.test.tsx
│ │ ├── DataTable/
│ │ │ ├── DataTable.tsx
│ │ │ ├── DataTable.stories.tsx
│ │ │ ├── DataTable.test.tsx
│ ├── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── README.md


---

## 🛠️ Getting Started

Clone the repository:
```bash
git clone https://github.com/your-username/StoryBook
cd StoryBook

Install dependencies:
npm install

Run Storybook:
npm run storybook

Open http://localhost:6006 in your browser.
npm test

## 📦 Components

### 1. InputField
A flexible text input component with multiple variants, states, and optional features.

**Features**
- Label, placeholder, helper text, error message  
- Variants: `filled` | `outlined` | `ghost`  
- Sizes: `sm` | `md` | `lg`  
- States: `disabled`, `invalid`, `loading`  
- Optional: clear button, password toggle  
- Theme-aware (light/dark)  

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
## 2. DataTable

A generic data table component supporting sorting, selection, and custom columns.

### Features
- Display tabular data  
- Column sorting  
- Row selection (single/multiple)  
- Loading and empty states  

### Props
```ts
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
## 📝 Approach

The development approach was guided by **reusability, scalability, and accessibility**:

### Component Architecture
- Each component lives in its own folder (`InputField/`, `DataTable/`) with `.tsx`, `.stories.tsx`, and `.test.tsx` files for clarity and maintainability.  

### TypeScript Strong Typing
- Component props are fully typed, ensuring safer usage and better developer experience.  

### Styling
- TailwindCSS used for responsive design and easy theming.  
- Variants (size, style) are handled through conditional class utilities.  

### Documentation & Testing
- Storybook stories cover different states, variants, and edge cases.  
- Jest + React Testing Library ensure functional correctness of core features.  

---

## ✅ Requirements Met
- TypeScript with strong typing  
- TailwindCSS for responsive design  
- Accessibility support (ARIA, focus states)  
- Storybook stories for all props & states  
- Unit tests with Jest + React Testing Library  
- Clean, reusable component structure  


