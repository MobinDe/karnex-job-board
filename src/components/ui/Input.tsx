import * as React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, leftIcon, rightIcon, id, ...props }, ref) => {
    const uniqueId = React.useId();
    const inputId = id || uniqueId;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative flex items-center">
          {rightIcon && <div className="absolute right-3 text-slate-400 dark:text-slate-500 transition-colors">{rightIcon}</div>}
          
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              // ✅ کلاس‌های پایه و حالت تاریک
              'flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 transition-colors',
              'dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400',
              // حالت فوکوس
              'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:focus:ring-blue-500',
              // حالت غیرفعال
              'disabled:cursor-not-allowed disabled:opacity-50',
              // پدینگ آیکون‌ها
              rightIcon && 'pr-10',
              leftIcon && 'pl-10',
              // حالت خطا
              error && 'border-red-500 focus:ring-red-500 dark:border-red-500',
              className
            )}
            {...props}
          />
          
          {leftIcon && <div className="absolute left-3 text-slate-400 dark:text-slate-500 transition-colors">{leftIcon}</div>}
        </div>
        
        {error && (
          <p className="text-xs text-red-500 dark:text-red-400 mt-0.5 transition-colors">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;