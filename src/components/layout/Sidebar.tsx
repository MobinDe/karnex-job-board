import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { name: 'داشبورد', path: '/dashboard', icon: LayoutDashboard },
  { name: 'پروفایل من', path: '/dashboard/profile', icon: User },
  { name: 'آگهی‌های من', path: '/dashboard/my-jobs', icon: Briefcase },
  { name: 'رزومه‌ها', path: '/dashboard/resumes', icon: FileText },
  { name: 'پیام‌ها', path: '/dashboard/messages', icon: MessageSquare, badge: 3 },
  { name: 'تنظیمات', path: '/dashboard/settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* ✅ سایدبار در حالت دارک یک لایه تیره‌تر از پس‌زمینه می‌شود */}
      <aside
        className={cn(
          "fixed md:sticky top-0 right-0 z-50 h-screen bg-slate-900 dark:bg-slate-950 text-white flex flex-col transition-all duration-300 ease-in-out border-l border-slate-800 dark:border-slate-800 shadow-2xl md:shadow-none",
          isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 dark:border-slate-800 shrink-0 transition-colors">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Briefcase size={18} className="text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-xl font-extrabold text-white tracking-tight animate-in fade-in">
                کارنکس
              </span>
            )}
          </NavLink>
          
          <button onClick={onClose} className="md:hidden text-white hover:text-slate-300 transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => { if (window.innerWidth < 768) onClose(); }}
                className={({ isActive }) =>
                  cn(
                    "flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                      : "text-slate-300 dark:text-slate-400 hover:bg-slate-800 dark:hover:bg-slate-800/50 hover:text-white dark:hover:text-white"
                  )
                }
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} className={cn("shrink-0", isCollapsed && "mx-auto")} />
                  {!isCollapsed && (
                    <span className="font-medium text-sm animate-in fade-in whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </div>
                
                {item.badge && !isCollapsed && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                
                {item.badge && isCollapsed && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-800 dark:border-slate-800 space-y-2 shrink-0 transition-colors">
          <button 
            onClick={() => { /* منطق خروج */ }}
            className={cn(
              "flex items-center gap-3 px-3 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 transition-colors",
              isCollapsed && "justify-center"
            )}
            title={isCollapsed ? "خروج" : undefined}
          >
            <LogOut size={20} className="shrink-0" />
            {!isCollapsed && <span className="font-medium text-sm">خروج از حساب</span>}
          </button>

          <button
            onClick={onToggleCollapse}
            className="hidden md:flex items-center justify-center w-full py-2 bg-slate-800 dark:bg-slate-800/50 hover:bg-slate-700 dark:hover:bg-slate-700 text-slate-400 dark:text-slate-400 hover:text-white rounded-xl transition-colors"
          >
            {isCollapsed ? <ChevronLeft size={20} /> : <div className="flex items-center gap-2 text-sm"><ChevronRight size={16} /> جمع کردن</div>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;