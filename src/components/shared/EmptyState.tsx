import { SearchX } from 'lucide-react';
import Button from '../ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  title = "هیچ آگهی‌ای یافت نشد",
  description = "متاسفانه با فیلترهای فعلی آگهی‌ای پیدا نکردیم. لطفاً فیلترها را تغییر دهید یا دوباره جستجو کنید.",
  actionLabel,
  onAction
}: EmptyStateProps) => {
  return (
    // ✅ پس‌زمینه و حاشیه‌ی خط‌چین برای حالت دارک
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 transition-colors duration-300">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4 transition-colors">
        <SearchX size={32} className="text-slate-400 dark:text-slate-500" />
      </div>
      
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 transition-colors">{title}</h3>
      
      <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6 leading-relaxed transition-colors">
        {description}
      </p>
      
      {actionLabel && onAction && (
        // دکمه‌ها به صورت خودکار از کامپوننت Button که قبلاً آپدیت کردیم، دارک می‌شوند
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;