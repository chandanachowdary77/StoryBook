import * as React from 'react';
import { cn } from '../../utils/cn';
import { compareValues } from '../../utils/sort';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  emptyMessage?: string;
}

type SortDir = 'asc' | 'desc' | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = 'No data',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const cmp = compareValues(a[sortKey], b[sortKey]);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [data, sortKey, sortDir]);

  const allSelected = selectable && sorted.length > 0 && selected.size === sorted.length;
  const someSelected = selectable && selected.size > 0 && selected.size < sorted.length;

  const toggleHeaderSelect = () => {
    if (!selectable) return;
    if (allSelected) {
      setSelected(new Set());
      onRowSelect?.([]);
    } else {
      const all = new Set(sorted.map((_, i) => i));
      setSelected(all);
      onRowSelect?.(sorted);
    }
  };

  const toggleRowSelect = (index: number) => {
    if (!selectable) return;
    const next = new Set(selected);
    if (next.has(index)) next.delete(index); else next.add(index);
    setSelected(next);
    onRowSelect?.(Array.from(next).map(i => sorted[i]));
  };

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    const key = col.dataIndex as keyof T;
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir('asc');
    } else {
      setSortDir(prev => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') {
        setSortKey(null);
      }
    }
  };

  return (
    <div className={cn('relative w-full overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800', className)}>
      <table className="w-full border-collapse text-left">
        <thead className="bg-gray-50 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          <tr>
            {selectable && (
              <th scope="col" className="w-10 px-3 py-3">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={allSelected}
                  ref={el => { if (el) el.indeterminate = Boolean(someSelected); }}
                  onChange={toggleHeaderSelect}
                  className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                />
              </th>
            )}
            {columns.map((col) => {
              const key = col.dataIndex as keyof T;
              const ariaSort = sortKey === key ? (sortDir === 'asc' ? 'ascending' : sortDir === 'desc' ? 'descending' : 'none') : 'none';
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort as any}
                  className={cn('px-4 py-3 font-medium', col.sortable && 'cursor-pointer select-none')}
                  onClick={() => handleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden className="text-xs">
                        {sortKey !== key && '↕'}
                        {sortKey === key && sortDir === 'asc' && '↑'}
                        {sortKey === key && sortDir === 'desc' && '↓'}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-sm dark:divide-gray-800">
          {!loading && sorted.length === 0 && (
            <tr>
              <td colSpan={(selectable ? 1 : 0) + columns.length} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading && sorted.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              {selectable && (
                <td className="px-3 py-3">
                  <input
                    aria-label={`Select row ${rowIndex + 1}`}
                    type="checkbox"
                    checked={selected.has(rowIndex)}
                    onChange={() => toggleRowSelect(rowIndex)}
                    className="h-4 w-4 rounded border-gray-300 dark:border-gray-700"
                  />
                </td>
              )}
              {columns.map((col) => {
                const val = row[col.dataIndex];
                return (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {col.render ? col.render(val, row) : String(val ?? '')}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="absolute inset-0 grid place-items-center bg-white/60 dark:bg-black/40">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-transparent dark:border-gray-600" aria-label="Loading" />
        </div>
      )}
    </div>
  );
}

export default DataTable;
