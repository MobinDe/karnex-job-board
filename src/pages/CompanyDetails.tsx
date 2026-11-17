import { Link } from 'react-router-dom';
import { Building2, MapPin, Users, Briefcase, Globe, ChevronRight, CheckCircle2 } from 'lucide-react';
import JobCard, { type Job } from '../components/shared/JobCard';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';

const CompanyDetails = () => {
  const company = {
    name: 'دیجی‌کالا',
    industry: 'فروشگاه اینترنتی',
    location: 'تهران، خیابان ولیعصر',
    employeeCount: '+۲۰۰۰ نفر',
    website: 'www.digikala.com',
    description: 'دیجی‌کالا بزرگترین فروشگاه اینترنتی خاورمیانه است که با هدف ارائه تجربه خرید آنلاین بی‌نظیر به کاربران فعالیت می‌کند. ما همواره به دنبال جذب بهترین استعدادها برای رشد و نوآوری هستیم.',
  };

  const companyJobs: Job[] = [
    { id: '1', title: 'توسعه‌دهنده ارشد فرانت‌اند', companyName: company.name, location: 'تهران', salary: '۳۰ تا ۴۰ میلیون', jobType: 'full-time', postedAt: '۲ ساعت پیش', isUrgent: true },
    { id: '2', title: 'کارشناس دیجیتال مارکتینگ', companyName: company.name, location: 'تهران', salary: '۱۵ تا ۲۰ میلیون', jobType: 'remote', postedAt: 'دیروز' },
  ];

  return (
    // ✅ پس‌زمینه اصلی صفحه دارک شد
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300" dir="rtl">
      
      {/* هدر شرکت (Cover) */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-700 to-indigo-900 dark:from-blue-900 dark:to-indigo-950 relative transition-colors">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
          <Link to="/" className="hover:text-white transition-colors">خانه</Link>
          <ChevronRight size={16} />
          <Link to="/companies" className="hover:text-white transition-colors">شرکت‌ها</Link>
          <ChevronRight size={16} />
          <span className="text-white font-medium">{company.name}</span>
        </div>

        {/* ✅ کارت اصلی شرکت دارک شد */}
        <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 transition-colors">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
              <div className="flex items-end gap-6">
                <div className="w-28 h-28 md:w-32 md:h-32 bg-white dark:bg-slate-700 rounded-2xl border-4 border-white dark:border-slate-800 shadow-md flex items-center justify-center shrink-0 transition-colors">
                  <Building2 size={48} className="text-slate-300 dark:text-slate-500" />
                </div>
                <div className="mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white transition-colors">{company.name}</h1>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 transition-colors">{company.industry}</p>
                </div>
              </div>
              <Button size="lg" className="w-full md:w-auto">دنبال کردن شرکت</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 transition-colors">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors"><MapPin size={18} className="text-blue-500 dark:text-blue-400"/> {company.location}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors"><Users size={18} className="text-blue-500 dark:text-blue-400"/> {company.employeeCount}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors"><Globe size={18} className="text-blue-500 dark:text-blue-400"/> {company.website}</div>
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 transition-colors"><Briefcase size={18} className="text-blue-500 dark:text-blue-400"/> {companyJobs.length} آگهی فعال</div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* توضیحات و آگهی‌ها */}
          <div className="lg:col-span-2 space-y-6">
            {/* ✅ کارت درباره شرکت دارک شد */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 transition-colors">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4 transition-colors">درباره {company.name}</h2>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm transition-colors">
                  {company.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['محیط صمیمی', 'بیمه تکمیلی', 'امکان دورکاری', 'غذای رایگان', 'توسعه مهارت'].map((tag) => (
                    // ✅ تگ‌های مزایا دارک شدند
                    <span key={tag} className="flex items-center gap-1 text-xs bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800 transition-colors">
                      <CheckCircle2 size={14} /> {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">فرصت‌های شغلی فعال</h2>
              <div className="space-y-4">
                {companyJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>

          {/* سایدبار اطلاعات تماس */}
          <div className="lg:col-span-1">
            {/* ✅ کارت اطلاعات تماس دارک شد */}
            <Card className="border-0 shadow-sm sticky top-24 bg-white dark:bg-slate-800 transition-colors">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-slate-800 dark:text-white mb-2 transition-colors">اطلاعات تماس</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 dark:text-slate-500 text-xs transition-colors">وب‌سایت</span>
                    <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline transition-colors">{company.website}</a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-400 dark:text-slate-500 text-xs transition-colors">آدرس</span>
                    <span className="text-slate-700 dark:text-slate-300 transition-colors">{company.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;