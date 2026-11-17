import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden" dir="rtl">
      <Sidebar 
        isOpen={isMobileOpen} 
        onClose={() => setIsMobileOpen(false)} 
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />

      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-semibold text-slate-800">پنل کاربری</h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-left hidden sm:block">
              <p className="text-sm font-bold text-slate-800">کاربر عزیز</p>
              <p className="text-xs text-slate-500">نقش: کارجو</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center text-blue-700 font-bold cursor-pointer hover:bg-blue-200 transition-colors">
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

export default DashboardLayout; // <--- این خط خیلی مهم است