import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useThemeStore } from './store/themeStore';

// ==================== ایمپورت لایه‌ها (Layouts) ====================
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';

// ==================== ایمپورت صفحات عمومی ====================
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// ==================== ایمپورت صفحات پنل کاربری ====================
import Profile from "./dashboard/Profile";
import MyJobs from "./dashboard/MyJobs";
import Resumes from "./dashboard/Resumes";
import Messages from "./dashboard/Messages";
import Settings from "./dashboard/Settings";
function App() {
  // ✅ راه‌اندازی حالت تاریک/روشن هنگام باز شدن سایت
  const initializeTheme = useThemeStore((state) => state.initializeTheme);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ==================== مسیرهای عمومی سایت ==================== */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* صفحه 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <h1 className="text-6xl font-extrabold text-slate-200 dark:text-slate-800 mb-4">404</h1>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">صفحه مورد نظر یافت نشد</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">آدرسی که وارد کرده‌اید وجود ندارد یا حذف شده است.</p>
              </div>
            }
          />
        </Route>

        {/* ==================== مسیرهای پنل کاربری ==================== */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">به داشبورد خوش آمدید!</h2>
                <p className="text-slate-500 dark:text-slate-400">از منوی سمت راست می‌توانید به بخش‌های مختلف پنل کاربری دسترسی داشته باشید.</p>
              </div>
            }
          />
          <Route path="profile" element={<Profile />} />
          <Route path="my-jobs" element={<MyJobs />} />
          <Route path="resumes" element={<Resumes />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;