import * as React from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const uniqueId = React.useId();
    const checkboxId = id || uniqueId;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            className={cn(
              'h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer transition-colors',
              'focus:ring-2 focus:ring-blue-600 focus:ring-offset-2',
              // ✅ کلاس‌های حالت تاریک
              'dark:border-slate-600 dark:bg-slate-700 dark:checked:bg-blue-500 dark:focus:ring-blue-500 dark:focus:ring-offset-slate-800',
              'disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          />
          {label && (
            // ✅ رنگ لیبل در حالت تاریک
            <label 
              htmlFor={checkboxId} 
              className="text-sm text-slate-700 dark:text-slate-300 cursor-pointer select-none transition-colors"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          // ✅ رنگ خطا در حالت تاریک
          <p className="text-xs text-red-500 dark:text-red-400 mt-0.5 transition-colors">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;