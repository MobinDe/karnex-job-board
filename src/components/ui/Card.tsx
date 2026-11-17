import * as React from 'react';
import { cn } from '../../utils/cn';

// ==================== کامپوننت اصلی کارت ====================
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        // ✅ استایل‌های پایه، گوشه‌های گرد، حاشیه با شفافیت ملایم و سایه
        "rounded-2xl border border-slate-200/80 bg-white text-slate-950 shadow-sm transition-all duration-300",
        // ✅ استایل‌های حالت تاریک
        "dark:border-slate-700/80 dark:bg-slate-800 dark:text-slate-50",
        // ✅ افکت هاور (برای کارت‌هایی که کلیک‌پذیر هستند)
        "hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-900/10 dark:hover:border-slate-600",
        // ✅ جلوگیری از بیرون زدن محتوا (مثلاً هدر رنگی) از گوشه‌های گرد
        "overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

// ==================== هدر کارت ====================
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-5 md:p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

// ==================== عنوان کارت ====================
const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-bold leading-none tracking-tight text-slate-800 dark:text-white transition-colors",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

// ==================== توضیحات کارت ====================
const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-slate-500 dark:text-slate-400 transition-colors", className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

// ==================== محتوای کارت ====================
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 md:p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

// ==================== فوتر کارت ====================
const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-5 md:p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };