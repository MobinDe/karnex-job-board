import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../layout/Sidebar';

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    // ✅ پس‌زمینه اصلی دارک شد
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-300" dir="rtl">
      
      <Sidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        {/* ✅ هدر بالای داشبورد دارک شد */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-6 shadow-sm z-30 sticky top-0 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white transition-colors">پنل کاربری</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-slate-800 dark:text-white transition-colors">کاربر عزیز</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">نقش: کارجو</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-400 font-bold cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
              ک
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;