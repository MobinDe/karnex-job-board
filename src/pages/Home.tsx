import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Building2, Sparkles, TrendingUp, Users, Briefcase } from 'lucide-react';
import SearchBar from '../components/shared/SearchBar';
import JobCategoryList from '../components/shared/JobCategoryList';
import JobCard, { type Job } from '../components/shared/JobCard';
import CompanyCard from '../components/shared/CompanyCard';
import Button from '../components/ui/Button';
import api from '../services/api';

// اینترفیس برای داده‌های دریافتی از بک‌اند
interface ApiJob {
  id: number;
  title: string;
  companyName: string;
  location: string;
  salary: string | null;
  jobType: string;
  isUrgent: boolean;
  createdAt: string;
}

// داده‌های تستی برای شرکت‌ها
const topCompanies = [
  { name: 'دیجی‌کالا', industry: 'فروشگاه اینترنتی', location: 'تهران', employeeCount: '+۲۰۰۰', openJobsCount: 45 },
  { name: 'اسنپ', industry: 'حمل و نقل', location: 'تهران', employeeCount: '+۱۰۰۰', openJobsCount: 32 },
  { name: 'تپسی', industry: 'حمل و نقل', location: 'تهران', employeeCount: '+۵۰۰', openJobsCount: 18 },
  { name: 'فیلیمو', industry: 'سرگرمی و رسانه', location: 'تهران', employeeCount: '+۳۰۰', openJobsCount: 12 },
];

const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  // دریافت ۴ آگهی جدیدترین از دیتابیس
  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      try {
        const response = await api.get('/jobs?limit=4&sort=newest');
        const formatted = response.data.jobs.map((job: ApiJob) => ({
          id: job.id.toString(),
          title: job.title,
          companyName: job.companyName,
          location: job.location,
          salary: job.salary || undefined,
          jobType: job.jobType as Job['jobType'],
          postedAt: new Date(job.createdAt).toLocaleDateString('fa-IR'),
          isUrgent: job.isUrgent,
        }));
        setFeaturedJobs(formatted);
      } catch (error) {
        console.error('خطا در دریافت آگهی‌های ویژه:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedJobs();
  }, []);

  return (
    <div className="flex flex-col" dir="rtl">
      
      {/* ==================== ۱. بخش هیرو (Hero Section) ==================== */}
      {/* ✅ هیرو در حالت دارک کمی تیره‌تر می‌شود */}
      <section className="relative bg-slate-900 dark:bg-slate-950 pt-24 pb-32 px-4 overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-indigo-600/20 blur-[120px] rounded-full" />
        </div>
        
        <div className="container mx-auto max-w-7xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-white text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Sparkles size={16} className="text-white" />
            <span className="text-white">پلتفرم اتصال بهترین استعدادها به بهترین شرکت‌ها</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="text-white!">مسیر شغلی خود را با </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">کارنکس</span>
            <span className="text-white!"> هموار کنید</span>
          </h1>
          
          <p className="text-white! text-lg md:text-xl mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 leading-relaxed">
            هزاران فرصت شغلی از معتبرترین شرکت‌های ایران، تنها با یک کلیک. رزومه خود را بسازید و همین حالا جستجو کنید!
          </p>
          
          <div className="w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700">
            <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl mx-auto border-t border-white/10 pt-10 animate-in fade-in duration-1000">
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-3xl font-bold text-white">+۱۰۰</span>
              <span className="text-sm text-white flex items-center gap-1.5"><TrendingUp size={18} className="text-white"/> آگهی شغلی فعال</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 border-y md:border-y-0 md:border-x border-white/10 py-6 md:py-0">
              <span className="text-3xl font-bold text-white">+۲۰</span>
              <span className="text-sm text-white flex items-center gap-1.5"><Building2 size={18} className="text-white"/> شرکت معتبر</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <span className="text-3xl font-bold text-white">+۵۰۰</span>
              <span className="text-sm text-white flex items-center gap-1.5"><Users size={18} className="text-white"/> کارجوی فعال</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ۲. بخش دسته‌بندی‌ها ==================== */}
      {/* ✅ پس‌زمینه دسته‌بندی‌ها دارک شد */}
      <section className="py-20 bg-white dark:bg-slate-900 relative -mt-8 rounded-t-3xl z-20 shadow-[0_-8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">دسته‌بندی‌های محبوب</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">در هر حوزه‌ای که تخصص دارید، فرصت شغلی وجود دارد.</p>
            </div>
            <Link to="/jobs" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors shrink-0">
              مشاهده همه <ArrowLeft size={16} />
            </Link>
          </div>
          <JobCategoryList />
        </div>
      </section>

      {/* ==================== ۳. بخش آگهی‌های ویژه ==================== */}
      {/* ✅ پس‌زمینه آگهی‌های ویژه دارک شد */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">جدیدترین آگهی‌های شغلی</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">آخرین فرصت‌هایی که امروز در کارنکس ثبت شده‌اند.</p>
            </div>
            <Link to="/jobs" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors shrink-0">
              مشاهده همه <ArrowLeft size={16} />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                // ✅ اسکلتون‌ها دارک شدند
                <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 flex gap-4 items-center transition-colors">
                  <div className="w-14 h-14 shrink-0 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-5 w-2/3 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
                    <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} job={job} className="h-full" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==================== ۴. بخش شرکت‌های برتر ==================== */}
      {/* ✅ پس‌زمینه شرکت‌ها دارک شد */}
      <section className="py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">شرکت‌های برتر</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm transition-colors">با بزرگ‌ترین کارفرمایان کشور آشنا شوید.</p>
            </div>
            <Link to="/companies" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors shrink-0">
              مشاهده همه <ArrowLeft size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCompanies.map((company, index) => (
              <CompanyCard 
                key={index} 
                name={company.name}
                industry={company.industry}
                location={company.location}
                employeeCount={company.employeeCount}
                openJobsCount={company.openJobsCount}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ۵. بخش فراخوان کارفرما (CTA) ==================== */}
      {/* ✅ در حالت دارک، گرادیانت تیره‌تر و جذاب‌تر می‌شود */}
      <section className="py-24 bg-gradient-to-br from-blue-700 to-indigo-900 dark:from-blue-900 dark:to-indigo-950 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 text-center relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
            <Briefcase size={32} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">به دنبال استخدام نیروهای متخصص هستید؟</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            با ثبت نام در کارنکس، آگهی شغلی خود را در معرض دید هزاران کارجوی آماده قرار دهید و بهترین استعدادها را جذب کنید.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-white text-blue-800 hover:bg-slate-100 dark:bg-white dark:text-blue-900 dark:hover:bg-slate-200 font-bold px-8">
                ثبت‌نام کارفرما
              </Button>
            </Link>
            <Link to="/pricing" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full text-white border-white/30 hover:bg-white/10 dark:text-white dark:border-white/20 dark:hover:bg-white/10">
                تعرفه‌ها
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;