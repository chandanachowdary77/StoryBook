import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputFieldProps {
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
  type?: React.HTMLInputTypeAttribute;
  clearable?: boolean;
  passwordToggle?: boolean;
  id?: string;
  loading?: boolean;
  className?: string;
}

const sizeMap: Record<NonNullable<InputFieldProps['size']>, string> = {
  sm: 'text-sm px-3 py-2 rounded-lg',
  md: 'text-base px-4 py-2.5 rounded-xl',
  lg: 'text-lg px-5 py-3 rounded-2xl',
};

const baseStyle = 'w-full outline-none transition ring-offset-2 focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed';

const variantMap: Record<NonNullable<InputFieldProps['variant']>, string> = {
  filled: 'bg-gray-100 dark:bg-gray-800 focus:ring-blue-500',
  outlined: 'border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-blue-500',
  ghost: 'bg-transparent focus:ring-blue-500',
};

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(function InputField(
  {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled,
    invalid,
    variant = 'outlined',
    size = 'md',
    type = 'text',
    clearable = false,
    passwordToggle = false,
    id,
    loading = false,
    className,
  },
  ref
) {
  const [internalType, setInternalType] = React.useState(type);
  React.useEffect(() => setInternalType(type), [type]);

  const inputId = React.useId();
  const resolvedId = id ?? inputId;
  const helperId = `${resolvedId}-helper`;
  const errorId = `${resolvedId}-error`;

  const showError = Boolean(errorMessage) || invalid;
  const describedBy = showError ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={resolvedId} className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className={cn('relative flex items-center')}>
        <input
          id={resolvedId}
          ref={ref}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          aria-invalid={showError || undefined}
          aria-describedby={describedBy}
          type={internalType}
          className={cn(
            baseStyle,
            sizeMap[size],
            variantMap[variant],
            showError && 'border border-red-500 focus:ring-red-500',
            'pr-12'
          )}
        />

        {loading && (
          <span aria-hidden className="absolute right-2 inline-flex h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent dark:border-gray-600" />
        )}

        {clearable && !loading && value && value.length > 0 && !disabled && (
          <button
            type="button"
            aria-label="Clear input"
            className="absolute right-2 rounded-full p-1 hover:bg-gray-100 active:scale-95 dark:hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={(e) => {
              const target = e.currentTarget.previousElementSibling as HTMLInputElement | null;
              if (target && onChange) {
                const ev = { target: { value: '' } } as unknown as React.ChangeEvent<HTMLInputElement>;
                onChange(ev);
                target.focus();
              }
            }}
          >
            <span className="block h-4 w-4">✕</span>
          </button>
        )}

        {passwordToggle && internalType === 'password' && !loading && (
          <button
            type="button"
            aria-label="Show password"
            className="absolute right-2 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setInternalType('text')}
          >
            Show
          </button>
        )}
        {passwordToggle && internalType === 'text' && type === 'password' && !loading && (
          <button
            type="button"
            aria-label="Hide password"
            className="absolute right-2 rounded-md px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            onClick={() => setInternalType('password')}
          >
            Hide
          </button>
        )}
      </div>

      {helperText && !showError && (
        <p id={helperId} className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {showError && (
        <p id={errorId} className="mt-1 text-xs text-red-600">{errorMessage || 'Invalid input'}</p>
      )}
    </div>
  );
});

export default InputField;
