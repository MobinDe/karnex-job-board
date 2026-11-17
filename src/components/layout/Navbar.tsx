import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Menu, 
  User, 
  LayoutDashboard, 
  LogOut, 
  ChevronDown, 
  Bell,
  Search,
  Building2,
  Info,
  Phone,
  Sun,
  Moon,
  CheckCheck
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { cn } from '../../utils/cn';

const mockNotifications = [
  { id: 1, title: 'رزومه شما بررسی شد', desc: 'کارفرمای شرکت دیجی‌کالا رزومه شما را مشاهده کرد.', time: '۵ دقیقه پیش', isRead: false, type: 'success' },
  { id: 2, title: 'آگهی جدید متناسب با شما', desc: 'یک آگهی جدید برای موقعیت "توسعه‌دهنده فرانت‌اند" ثبت شد.', time: '۲ ساعت پیش', isRead: false, type: 'info' },
  { id: 3, title: 'پیام جدید', desc: 'تیم منابع انسانی اسنپ برای شما پیامی ارسال کرد.', time: 'دیروز', isRead: true, type: 'message' },
  { id: 4, title: 'خوش آمدید', desc: 'به خانواده بزرگ کارنکس خوش آمدید! پروفایل خود را تکمیل کنید.', time: '۲ روز پیش', isRead: true, type: 'info' },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const initialize = useAuthStore((state) => state.initialize);
  const isLoggedIn = !!user;

  const { isDarkMode, toggleTheme } = useThemeStore();

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'صفحه اصلی', path: '/', icon: Briefcase },
    { name: 'آگهی‌های شغلی', path: '/jobs', icon: Search },
    { name: 'شرکت‌ها', path: '/companies', icon: Building2 },
    { name: 'درباره ما', path: '/about', icon: Info },
    { name: 'تماس با ما', path: '/contact', icon: Phone },
  ];

  const roleLabel = user?.role === 'employer' ? 'کارفرما' : 'کارجو';

  return (
    <header 
      dir="rtl"
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg shadow-sm border-slate-200/60 dark:border-slate-800" 
          : "bg-white dark:bg-slate-900 border-transparent dark:border-transparent"
      )}
    >
      {/* ✅ فقط این خط تغییر کرد: max-w-7xl و پدینگ افقی بیشتر (px-6 lg:px-12) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* ارتفاع، سایز فونت‌ها و آیکون‌ها دقیقاً به حالت اول برگشتند */}
        <div className="flex items-center justify-between h-20 transition-all duration-300">
          
          {/* لوگو */}
          <Link to="/" className="flex items-center gap-2 text-blue-600 dark:text-blue-500 group shrink-0">
            <div className="relative">
              <Briefcase size={28} className="fill-blue-600/20 dark:fill-blue-500/20 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">کارنکس</span>
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive 
                        ? "text-blue-600 bg-blue-50/50 dark:text-blue-400 dark:bg-blue-900/30" 
                        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-800"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon size={16} className={cn("transition-colors", isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400 dark:text-slate-500")} />
                      <span>{link.name}</span>
                      {isActive && (
                        <span className="absolute -bottom-1 right-4 left-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full animate-in fade-in slide-in-from-bottom-1" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* سمت چپ */}
          <div className="hidden lg:flex items-center gap-2">
            
            {/* دکمه تم */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors dark:text-slate-400 dark:hover:text-yellow-400 dark:hover:bg-slate-800"
              aria-label="تغییر تم"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isLoggedIn ? (
              <>
                {/* دکمه اعلان‌ها */}
                <div className="relative" ref={notifRef}>
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={cn(
                      "relative p-2.5 rounded-full transition-colors",
                      isNotificationsOpen 
                        ? "bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400" 
                        : "text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800"
                    )}
                    aria-label="اعلان‌ها"
                  >
                    <Bell size={20} />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-800 dark:text-white">اعلان‌ها</h3>
                          {unreadCount > 0 && (
                            <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">
                              {unreadCount} جدید
                            </span>
                          )}
                        </div>
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          <CheckCheck size={14} />
                          خواندن همه
                        </button>
                      </div>

                      <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                        {mockNotifications.map((notif) => (
                          <div 
                            key={notif.id}
                            className={cn(
                              "p-4 border-b border-slate-100 dark:border-slate-700/50 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors",
                              !notif.isRead && "bg-blue-50/50 dark:bg-blue-900/10"
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div className={cn(
                                "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
                                notif.type === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                                notif.type === 'message' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                                'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              )}>
                                <Bell size={16} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{notif.title}</p>
                                  {!notif.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">{notif.desc}</p>
                                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Link 
                        to="/dashboard/messages" 
                        onClick={() => setIsNotificationsOpen(false)}
                        className="block p-3 text-center text-sm font-bold text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        مشاهده همه اعلان‌ها
                      </Link>
                    </div>
                  )}
                </div>

                {/* منوی کاربر */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 pr-2 pl-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all duration-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">
                      {user?.name?.charAt(0) || '?'}
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200 max-w-[100px] truncate">{user?.name}</span>
                    <ChevronDown 
                      size={14} 
                      className={cn("text-slate-400 dark:text-slate-500 transition-transform duration-200", isUserMenuOpen && "rotate-180")} 
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                          {user?.name?.charAt(0) || '?'}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user?.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{roleLabel}</p>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <Link to="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <LayoutDashboard size={16} />
                          پنل کاربری
                        </Link>
                        <Link to="/dashboard/profile" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          <User size={16} />
                          پروفایل من
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 dark:border-slate-700 pt-1">
                        <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <LogOut size={16} />
                          خروج از حساب
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">ورود</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="shadow-md shadow-blue-500/20">ثبت‌نام</Button>
                </Link>
              </>
            )}
          </div>

          {/* دکمه منوی موبایل */}
          <button
            className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="باز کردن منو"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks} 
      />
    </header>
  );
};

export default Navbar;