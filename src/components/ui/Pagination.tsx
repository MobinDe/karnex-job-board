import * as React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

// دقیقا همه چیز را تعریف کردیم تا هیچ بهانه‌ای برای ارور نباشد
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  variant?: string;
  size?: string;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  className 
}) => {
  const generatePages = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, '...', totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  return (
    <nav className={cn("flex items-center justify-center gap-1", className)}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white disabled:opacity-50">
        <ChevronRight size={18} />
      </button>
      {generatePages().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 text-slate-400">...</span>
          ) : (
            <button onClick={() => onPageChange(page as number)} className={cn("inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm", currentPage === page ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white")}>
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white disabled:opacity-50">
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
};

export default Pagination;