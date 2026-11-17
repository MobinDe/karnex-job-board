import { useState, useEffect } from 'react';
import { SlidersHorizontal, ListFilter } from 'lucide-react';
import SearchBar from '../components/shared/SearchBar';
import JobFilter from '../components/shared/JobFilter';
import JobCard, { type Job } from '../components/shared/JobCard';
import EmptyState from '../components/shared/EmptyState';
import Pagination from '../components/ui/Pagination';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Select from '../components/ui/Select';
import api from '../services/api';

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

interface ApiResponse {
  jobs: ApiJob[];
  total: number;
  page: number;
  totalPages: number;
}

const sortOptions = [
  { value: 'newest', label: 'جدیدترین' },
  { value: 'salary', label: 'بیشترین حقوق' },
  { value: 'relevant', label: 'مرتبط‌ترین' },
];

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const [selectedDatePosted, setSelectedDatePosted] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const jobTypesQuery = selectedJobTypes.join(',');
  const experienceQuery = selectedExperienceLevels.join(',');

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (jobTypesQuery) params.set('jobType', jobTypesQuery);
        if (experienceQuery) params.set('experienceLevel', experienceQuery);
        if (selectedLocation) params.set('location', selectedLocation);
        if (selectedSalaryRange) params.set('salaryRange', selectedSalaryRange);
        if (selectedDatePosted !== 'all') params.set('datePosted', selectedDatePosted);
        
        params.set('sort', sortBy);
        params.set('page', currentPage.toString());
        params.set('limit', '10');

        const response = await api.get<ApiResponse>(`/jobs?${params.toString()}`);

        const formatted = response.data.jobs.map((job) => ({
          id: job.id.toString(),
          title: job.title,
          companyName: job.companyName,
          location: job.location,
          salary: job.salary || undefined,
          jobType: job.jobType as Job['jobType'],
          postedAt: new Date(job.createdAt).toLocaleDateString('fa-IR'),
          isUrgent: job.isUrgent,
        }));

        setJobs(formatted);
        setTotalPages(response.data.totalPages);
        setTotal(response.data.total);
      } catch (error) {
        console.error('خطا در دریافت داده‌ها:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchQuery, jobTypesQuery, experienceQuery, selectedLocation, selectedSalaryRange, selectedDatePosted, sortBy, currentPage]);

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedLocation('');
    setSelectedSalaryRange('');
    setSelectedDatePosted('all');
    setCurrentPage(1);
  };

  const renderSkeletons = () => (
    <div className="flex flex-col gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        // ✅ اسکلتون‌ها دارک شدند
        <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex gap-4 items-center transition-colors">
          <div className="w-14 h-14 shrink-0 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-xl" />
          <div className="flex-1 space-y-3">
            <div className="h-5 w-1/3 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
            <div className="h-4 w-1/4 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
            <div className="flex gap-4 mt-2">
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
              <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 animate-pulse rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    // ✅ پس‌زمینه اصلی صفحه دارک شد
    <div className="bg-slate-50/50 dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300" dir="rtl">
      
      {/* هدر صفحه (Banner) */}
      <div className="bg-slate-900 dark:bg-slate-900 pt-12 pb-20 px-4 relative overflow-hidden border-b border-transparent dark:border-slate-800 transition-colors">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute top-[-50%] right-[-10%] w-[40%] h-[100%] bg-blue-600/20 blur-[100px] rounded-full" />
        
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white! mb-6">فرصت‌های شغلی کارنکس</h1>
          <p className="text-white/80! mb-8 max-w-2xl mx-auto text-sm md:text-base">
            هزاران آگهی شغلی از معتبرترین شرکت‌های ایران. با استفاده از فیلترهای هوشمند، شغل رویایی خود را پیدا کنید.
          </p>
          <div className="max-w-3xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="container mx-auto max-w-7xl px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* سایدبار فیلترها */}
          <aside className="hidden lg:block lg:col-span-1">
            {/* ✅ پس‌زمینه سایدبار دارک شد */}
            <div className="sticky top-24 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-1 transition-colors">
              <JobFilter
                selectedJobTypes={selectedJobTypes}
                onJobTypeChange={(types) => { setCurrentPage(1); setSelectedJobTypes(types); }}
                selectedExperienceLevels={selectedExperienceLevels}
                onExperienceLevelChange={(levels) => { setCurrentPage(1); setSelectedExperienceLevels(levels); }}
                selectedLocation={selectedLocation}
                onLocationChange={(loc) => { setCurrentPage(1); setSelectedLocation(loc); }}
                selectedSalaryRange={selectedSalaryRange}
                onSalaryRangeChange={(range) => { setCurrentPage(1); setSelectedSalaryRange(range); }}
                selectedDatePosted={selectedDatePosted}
                onDatePostedChange={(date) => { setCurrentPage(1); setSelectedDatePosted(date); }}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* لیست آگهی‌ها */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* نوار ابزار (Toolbar) */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm gap-4 transition-colors">
              
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 w-full sm:w-auto">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 transition-colors">
                  <ListFilter size={18} />
                </div>
                <span>نمایش <strong className="text-slate-900 dark:text-white font-bold">{total.toLocaleString('fa-IR')}</strong> آگهی شغلی</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                {/* دکمه فیلتر موبایل */}
                <div
                  role="button"
                  tabIndex={0}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 text-sm font-medium bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  onClick={() => setIsMobileFilterOpen(true)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setIsMobileFilterOpen(true); }}
                >
                  <SlidersHorizontal size={16} />
                  <span>فیلترها</span>
                </div>

                {/* مرتب‌سازی */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap hidden sm:inline">مرتب‌سازی:</span>
                  <Select
                    options={sortOptions}
                    value={sortBy}
                    onChange={(e) => { setCurrentPage(1); setSortBy(e.target.value); }}
                    className="h-10 py-1 w-36 text-sm rounded-xl border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* لیست کارت‌ها */}
            {loading ? (
              renderSkeletons()
            ) : jobs.length > 0 ? (
              <>
                <div className="flex flex-col gap-4">
                  {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>

                {/* صفحه‌بندی */}
                {totalPages > 1 && (
                  <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex justify-center transition-colors">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              // ✅ حالت خالی دارک شد
              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-8 shadow-sm transition-colors">
                <EmptyState
                  title="آگهی‌ای یافت نشد"
                  description="با فیلترهای فعلی آگهی‌ای پیدا نکردیم. لطفاً فیلترها را تغییر دهید یا کلمه دیگری جستجو کنید."
                  actionLabel="حذف همه فیلترها"
                  onAction={handleClearFilters}
                />
              </div>
            )}
          </main>
        </div>
      </div>

      {/* مودال فیلترها (موبایل) */}
      <Modal 
        isOpen={isMobileFilterOpen} 
        onClose={() => setIsMobileFilterOpen(false)} 
        title="فیلترهای پیشرفته"
      >
        <div className="max-h-[65vh] overflow-y-auto px-1 pb-4 custom-scrollbar">
          <JobFilter
            selectedJobTypes={selectedJobTypes}
            onJobTypeChange={(types) => { setCurrentPage(1); setSelectedJobTypes(types); }}
            selectedExperienceLevels={selectedExperienceLevels}
            onExperienceLevelChange={(levels) => { setCurrentPage(1); setSelectedExperienceLevels(levels); }}
            selectedLocation={selectedLocation}
            onLocationChange={(loc) => { setCurrentPage(1); setSelectedLocation(loc); }}
            selectedSalaryRange={selectedSalaryRange}
            onSalaryRangeChange={(range) => { setCurrentPage(1); setSelectedSalaryRange(range); }}
            selectedDatePosted={selectedDatePosted}
            onDatePostedChange={(date) => { setCurrentPage(1); setSelectedDatePosted(date); }}
            onClear={handleClearFilters}
          />
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 mt-2">
          <Button className="w-full h-11" onClick={() => setIsMobileFilterOpen(false)}>
            مشاهده {total} نتیجه
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Jobs;