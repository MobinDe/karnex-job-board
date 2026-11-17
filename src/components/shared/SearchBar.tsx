import { Search } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "عنوان شغل، مهارت یا نام شرکت..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      // ✅ پس‌زمینه، حاشیه و افکت فوکوس برای حالت دارک
      className="flex w-full items-center gap-2 bg-white dark:bg-slate-800 p-2 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-blue-600/20 dark:focus-within:ring-blue-500/30 focus-within:border-blue-600 dark:focus-within:border-blue-500 transition-all duration-300"
    >
      <div className="flex-1 flex items-center px-3 gap-2">
        <Search className="text-slate-400 dark:text-slate-500 transition-colors" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          // ✅ رنگ متن و placeholder در حالت دارک
          className="w-full h-10 bg-transparent outline-none text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm transition-colors"
        />
      </div>
      <Button type="submit" className="h-10 px-6">
        جستجو
      </Button>
    </form>
  );
};

export default SearchBar;