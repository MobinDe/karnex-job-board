import * as React from 'react';
import { cn } from '../../utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string | number; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, id, ...props }, ref) => {
    const uniqueId = React.useId();
    const selectId = id || uniqueId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          // ✅ لیبل با پشتیبانی از حالت تاریک
          <label htmlFor={selectId} className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              // ✅ پس‌زمینه، متن و حاشیه در حالت تاریک
              'flex h-10 w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 transition-colors',
              'dark:border-slate-600 dark:bg-slate-700 dark:text-white',
              // حالت فوکوس
              'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:focus:ring-blue-500',
              // حالت غیرفعال
              'disabled:cursor-not-allowed disabled:opacity-50',
              // حالت خطا
              error && 'border-red-500 focus:ring-red-500 dark:border-red-500',
              className
            )}
            {...props}
          >
            <option value="" disabled className="dark:bg-slate-700 dark:text-white">
              انتخاب کنید...
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="dark:bg-slate-700 dark:text-white">
                {opt.label}
              </option>
            ))}
          </select>
          
          {/* آیکون فلش سفارشی */}
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-slate-300 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-0.5 transition-colors">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;