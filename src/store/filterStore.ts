import { create } from 'zustand';

// ==================== تعریف اینترفیس برای State ====================
interface FilterState {
  // مقادیر (Values)
  searchQuery: string;
  selectedJobTypes: string[];
  selectedExperienceLevels: string[];
  selectedLocation: string;
  selectedSalaryRange: string;
  selectedDatePosted: string;
  sortBy: string;
  currentPage: number;

  // اکشن‌ها (Actions)
  setSearchQuery: (query: string) => void;
  setSelectedJobTypes: (types: string[]) => void;
  setSelectedExperienceLevels: (levels: string[]) => void;
  setSelectedLocation: (location: string) => void;
  setSelectedSalaryRange: (range: string) => void;
  setSelectedDatePosted: (date: string) => void;
  setSortBy: (sort: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

// ==================== مقادیر اولیه ====================
const initialState = {
  searchQuery: '',
  selectedJobTypes: [],
  selectedExperienceLevels: [],
  selectedLocation: '',
  selectedSalaryRange: '',
  selectedDatePosted: 'all',
  sortBy: 'newest',
  currentPage: 1,
};

// ==================== ساخت استور ====================
export const useFilterStore = create<FilterState>((set) => ({
  // مقداردهی اولیه
  ...initialState,

  // اکشن‌ها
  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),
  
  setSelectedJobTypes: (types) => set({ selectedJobTypes: types, currentPage: 1 }),
  
  setSelectedExperienceLevels: (levels) => set({ selectedExperienceLevels: levels, currentPage: 1 }),
  
  setSelectedLocation: (location) => set({ selectedLocation: location, currentPage: 1 }),
  
  setSelectedSalaryRange: (range) => set({ selectedSalaryRange: range, currentPage: 1 }),
  
  setSelectedDatePosted: (date) => set({ selectedDatePosted: date, currentPage: 1 }),
  
  setSortBy: (sort) => set({ sortBy: sort, currentPage: 1 }),
  
  setCurrentPage: (page) => set({ currentPage: page }),

  // ریست کردن همه فیلترها
  resetFilters: () => set({ ...initialState }),
}));