import { createPortal } from 'react-dom';
import { X, LogOut, Phone, Mail, LayoutDashboard, User, Briefcase, type LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

interface MenuLink {
  name: string;
  path: string;
  icon?: LucideIcon;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: MenuLink[];
}

const MobileMenu = ({ isOpen, onClose, links }: MobileMenuProps) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const isLoggedIn = !!user;

  // قفل کردن اسکرول پس‌زمینه
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // بستن با Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleLogout = () => {
    logout();
    onClose();
  };

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] lg:hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      {/* اورلی تیره */}
      <div 
        className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* پنل منو */}
      <div 
        className={`absolute top-0 right-0 h-full w-[85vw] max-w-sm bg-white dark:bg-slate-900 flex flex-col shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="منوی موبایل"
      >
        {/* هدر منو */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 dark:border-slate-800 shrink-0 transition-colors">
          <Link to="/" onClick={onClose} className="flex items-center gap-2 text-blue-600 dark:text-blue-500">
            <Briefcase size={26} className="fill-blue-600/20 dark:fill-blue-500/20" />
            <span className="text-xl font-extrabold tracking-tight">کارنکس</span>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-white rounded-lg transition-colors"
            aria-label="بستن منو"
          >
            <X size={22} />
          </button>
        </div>

        {/* بخش کاربر (اگر لاگین باشد) */}
        {isLoggedIn && (
          <div className="px-6 py-5 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {user?.name?.charAt(0) || '?'}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {user?.role === 'employer' ? 'کارفرما' : 'کارجو'}
                </p>
              </div>
            </div>
            <Link 
              to="/dashboard" 
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-600 hover:text-blue-600 dark:hover:text-white hover:border-blue-200 dark:hover:border-slate-500 rounded-lg transition-colors"
            >
              <LayoutDashboard size={16} />
              رفتن به پنل کاربری
            </Link>
          </div>
        )}

        {/* لینک‌های منو */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3.5 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-xl hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
              >
                {Icon && (
                  <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-blue-100 dark:group-hover:bg-slate-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center justify-center transition-colors">
                    <Icon size={18} />
                  </div>
                )}
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* فوتر منو */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 shrink-0 space-y-3 bg-slate-50 dark:bg-slate-800/50 transition-colors">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard/profile" onClick={onClose} className="block">
                <Button variant="outline" className="w-full justify-start gap-2 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">
                  <User size={18} />
                  پروفایل من
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900/50 dark:text-red-400 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                خروج از حساب
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={onClose} className="block">
                <Button variant="outline" className="w-full dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">ورود به حساب</Button>
              </Link>
              <Link to="/register" onClick={onClose} className="block">
                <Button className="w-full shadow-md shadow-blue-500/20">ثبت‌نام رایگان</Button>
              </Link>
            </>
          )}

          {/* اطلاعات تماس */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex flex-col gap-2 text-xs text-slate-500 dark:text-slate-400 transition-colors">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span dir="ltr">support@karnex.ir</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileMenu;