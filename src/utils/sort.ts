export type SortDirection = 'asc' | 'desc' | null;

export function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  const an = typeof a === 'string' ? Number(a) : (a as number);
  const bn = typeof b === 'string' ? Number(b) : (b as number);
  const bothNumeric = !Number.isNaN(an as number) && !Number.isNaN(bn as number);
  if (bothNumeric) return (an as number) - (bn as number);
  return String(a).localeCompare(String(b), undefined, { sensitivity: 'base', numeric: true });
}
