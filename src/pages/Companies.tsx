import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building2, Briefcase, MapPin } from 'lucide-react';
import CompanyCard from '../components/shared/CompanyCard';
import EmptyState from '../components/shared/EmptyState';
import Button from '../components/ui/Button';

interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employeeCount: string;
  openJobsCount: number;
  description: string;
}

const mockCompanies: Company[] = [
  { id: 1, name: 'دیجی‌کالا', industry: 'فروشگاه اینترنتی', location: 'تهران', employeeCount: '+۲۰۰۰', openJobsCount: 45, description: 'بزرگترین فروشگاه اینترنتی خاورمیانه' },
  { id: 2, name: 'اسنپ', industry: 'حمل و نقل و لجستیک', location: 'تهران', employeeCount: '+۱۰۰۰', openJobsCount: 32, description: 'سوپراپلیکیشن اسنپ' },
  { id: 3, name: 'تپسی', industry: 'حمل و نقل', location: 'تهران', employeeCount: '+۵۰۰', openJobsCount: 18, description: 'اولین اپلیکیشن تاکسی اینترنتی ایران' },
  { id: 4, name: 'کافه‌بازار', industry: 'فناوری اطلاعات و اپلیکیشن', location: 'تهران', employeeCount: '+۳۰۰', openJobsCount: 22, description: 'بزرگترین مارکت‌پلیس اندروید ایران' },
  { id: 5, name: 'علی‌بابا', industry: 'گردشگری', location: 'تهران', employeeCount: '+۴۰۰', openJobsCount: 15, description: 'پلتفرم رزرو آنلاین بلیط و هتل' },
  { id: 6, name: 'دیوار', industry: 'آگهی آنلاین', location: 'تهران', employeeCount: '+۳۰۰', openJobsCount: 12, description: 'بزرگترین سایت آگهی رایگان ایران' },
];

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.industry.toLowerCase().includes(query)
    );
  });

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        // ✅ اسکلتون‌ها دارک شدند
        <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col items-center animate-pulse transition-colors">
          <div className="w-20 h-20 rounded-2xl bg-slate-200 dark:bg-slate-700 mb-4" />
          <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-700 rounded-md mb-2" />
          <div className="h-4 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-md mb-6" />
          <div className="w-full flex justify-between">
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // ✅ پس‌زمینه اصلی صفحه دارک شد
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen py-10 transition-colors duration-300" dir="rtl">
      <div className="container mx-auto px-4">
        
        {/* هدر صفحه */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-4 transition-colors">
            شرکت‌های برتر کارنکس
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed transition-colors">
            با بزرگ‌ترین و معتبرترین کارفرمایان ایران آشنا شوید و فرصت‌های شغلی آن‌ها را بررسی کنید.
          </p>

          {/* نوار جستجوی شرکت‌ها */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <Search size={20} className="text-slate-400 dark:text-slate-500 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="جستجوی نام شرکت یا صنعت..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // ✅ اینپوت جستجو دارک شد
              className="w-full h-14 pr-12 pl-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 shadow-sm transition-all text-sm"
            />
          </div>
        </div>

        {/* بخش آمار کلی */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* ✅ کارت‌های آمار دارک شدند */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">شرکت‌های ثبت‌شده</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">{mockCompanies.length.toLocaleString('fa-IR')} شرکت</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center transition-colors">
              <Briefcase size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">آگهی‌های فعال</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">
                {mockCompanies.reduce((acc, curr) => acc + curr.openJobsCount, 0).toLocaleString('fa-IR')} آگهی
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center transition-colors">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1 transition-colors">شهرهای تحت پوشش</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">۲۵+ شهر</p>
            </div>
          </div>
        </div>

        {/* لیست شرکت‌ها */}
        {loading ? (
          renderSkeletons()
        ) : filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <Link to={`/companies/${company.id}`} key={company.id} className="block h-full">
                <CompanyCard
                  name={company.name}
                  industry={company.industry}
                  location={company.location}
                  employeeCount={company.employeeCount}
                  openJobsCount={company.openJobsCount}
                />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="شرکتی یافت نشد"
            description="با این عبارت جستجو، هیچ شرکتی در سیستم ثبت نشده است. عبارت دیگری را امتحان کنید."
            actionLabel="پاک کردن جستجو"
            onAction={() => setSearchQuery('')}
          />
        )}

        {/* بخش CTA */}
        <div className="mt-20 bg-white dark:bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-200 dark:border-slate-700 shadow-sm text-center relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 transition-colors" />
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">شرکت شما در کارنکس نیست؟</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto transition-colors">
            همین حالا پروفایل شرکت خود را بسازید، اطلاعات و مزایای خود را نمایش دهید و بهترین نیروها را جذب کنید.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8">
              ثبت‌نام شرکت
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Companies;