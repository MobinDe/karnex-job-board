import * as React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // منطق تولید شماره صفحات با ...
  const generatePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="صفحه‌بندی">
      {/* دکمه قبلی */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronRight size={18} />
      </button>

      {/* شماره صفحات */}
      {generatePages().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-2 text-slate-400">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors",
                currentPage === page
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              )}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* دکمه بعدی */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <ChevronLeft size={18} />
      </button>
    </nav>
  );
};

export default Pagination;