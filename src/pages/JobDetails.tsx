import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, Briefcase, Banknote, Clock, Building2, ChevronRight, 
  CheckCircle2, Loader2, ListChecks, Gift, FileText, Share2, Bookmark, AlertCircle
} from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Toast from '../components/ui/Toast';
import api from '../services/api';

// ==================== اینترفیس داده‌ها ====================
interface JobData {
  id: number;
  title: string;
  companyName: string;
  location: string;
  salary: string | null;
  jobType: string;
  isUrgent: boolean;
  description: string;
  requirements: string;
  benefits: string;
  createdAt: string;
}

// ==================== کامپوننت لوگو ====================
const CompanyLogo = ({ companyName }: { companyName: string }) => {
  const colors = [
    'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
    'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800',
    'bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800',
  ];
  const colorIndex = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-800 shadow-xl ${colorClass} transition-colors`}>
      <Building2 size={48} />
    </div>
  );
};

// ==================== کامپوننت اصلی ====================
const JobDetails = () => {
  const { id } = useParams(); 
 
  
  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // دریافت اطلاعات آگهی
  useEffect(() => {
    const fetchJob = async () => {
      try {
        // در حالت واقعی بهتر است API جداگانه ای برای دریافت یک آگهی داشته باشیم
        const response = await api.get('/jobs?limit=100'); 
        const foundJob = response.data.jobs.find((j: JobData) => j.id.toString() === id);
        if (foundJob) {
          setJob(foundJob);
        }
      } catch (error) {
        console.error('خطا در دریافت اطلاعات آگهی:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  // ارسال رزومه
  const handleApply = async () => {
    setIsApplying(true);
    setErrorMsg('');
    
    try {
      await api.post(`/jobs/${id}/apply`);
      setShowToast(true);
    } catch (err) {
      const error = err as { response?: { data?: { error?: string } } };
      const message = error.response?.data?.error || 'خطا در ارسال رزومه. لطفاً وارد حساب کاربری خود شوید.';
      
      if (message.includes('وارد')) {
        // اگر خطا مربوط به لاگین نبودن بود، به صفحه لاگین هدایت شود
        setErrorMsg(message);
      } else {
        setErrorMsg(message);
      }
    } finally {
      setIsApplying(false);
    }
  };

  // حالت لودینگ
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={40} className="animate-spin text-blue-600 dark:text-blue-500" />
          <p className="text-slate-500 dark:text-slate-400">در حال بارگذاری اطلاعات آگهی...</p>
        </div>
      </div>
    );
  }

  // حالت پیدا نشدن آگهی
  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">آگهی یافت نشد</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">آگهی مورد نظر حذف شده است یا آدرس وارد شده صحیح نیست.</p>
          <Link to="/jobs">
            <Button size="lg">بازگشت به لیست آگهی‌ها</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen pb-12 transition-colors duration-300" dir="rtl">
      
      {/* Toast پیام موفقیت */}
      <Toast 
        message="رزومه شما با موفقیت برای کارفرما ارسال شد!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      {/* ==================== هدر آگهی (Cover) ==================== */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-blue-600 to-indigo-800 dark:from-blue-900 dark:to-indigo-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-20 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/80 mb-6 bg-black/20 backdrop-blur-md w-fit px-3 py-1.5 rounded-full">
          <Link to="/" className="hover:text-white transition-colors">خانه</Link>
          <ChevronRight size={14} />
          <Link to="/jobs" className="hover:text-white transition-colors">آگهی‌های شغلی</Link>
          <ChevronRight size={14} />
          <span className="text-white font-medium truncate max-w-[200px]">{job.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* ==================== ستون اصلی (توضیحات) ==================== */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* کارت هدر (لوگو و عنوان) */}
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-3xl overflow-hidden transition-colors">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 text-center md:text-right">
                  <CompanyLogo companyName={job.companyName} />
                  
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-white transition-colors">{job.title}</h1>
                        {job.isUrgent && <Badge variant="danger" className="text-sm px-3 py-1">استخدام فوری</Badge>}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 hover:text-blue-600 hover:border-blue-600 transition-colors" title="اشتراک‌گذاری">
                          <Share2 size={18} />
                        </Button>
                        <Button variant="outline" size="icon" className="rounded-full w-10 h-10 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700 hover:text-yellow-500 hover:border-yellow-500 transition-colors" title="ذخیره">
                          <Bookmark size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <Link to="/companies" className="text-lg font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-block mb-6">
                      {job.companyName}
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* شرح موقعیت شغلی */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 rounded-2xl transition-colors">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                    <FileText size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  شرح موقعیت شغلی
                </h2>
                <p className="text-slate-600 dark:text-slate-300 leading-loose text-[15px] whitespace-pre-line transition-colors">
                  {job.description || 'توضیحاتی برای این آگهی ثبت نشده است.'}
                </p>
              </CardContent>
            </Card>

            {/* وظایف و مهارت‌ها */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 rounded-2xl transition-colors">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                    <ListChecks size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  وظایف و مهارت‌های مورد نیاز
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.requirements ? job.requirements.split('\n').map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                      <CheckCircle2 size={18} className="text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{req}</span>
                    </li>
                  )) : <li className="text-slate-500 dark:text-slate-400">مهارتی ذکر نشده است.</li>}
                </ul>
              </CardContent>
            </Card>

            {/* مزایا */}
            <Card className="border-0 shadow-sm bg-white dark:bg-slate-800 rounded-2xl transition-colors">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center">
                    <Gift size={20} className="text-orange-600 dark:text-orange-400" />
                  </div>
                  مزایای شغلی
                </h2>
                <div className="flex flex-wrap gap-3">
                  {job.benefits ? job.benefits.split('\n').map((benefit, idx) => (
                    <span key={idx} className="flex items-center gap-2 text-sm bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-xl border border-green-200 dark:border-green-800/50 transition-colors">
                      <CheckCircle2 size={16} /> {benefit}
                    </span>
                  )) : <span className="text-slate-500 dark:text-slate-400">مزایایی ذکر نشده است.</span>}
                </div>
              </CardContent>
            </Card>

          </div>

          {/* ==================== ستون کناری (سایدبار) ==================== */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg bg-white dark:bg-slate-800 rounded-3xl sticky top-24 transition-colors">
              <CardContent className="p-6 md:p-8 space-y-8">
                
                {/* اطلاعات کلیدی */}
                <div className="space-y-5">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-3 transition-colors">اطلاعات کلیدی</h3>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-colors">
                      <Banknote size={18} className="text-green-500" /> حقوق
                    </span>
                    <span className="text-base font-extrabold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">{job.salary || 'توافقی'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-colors">
                      <Briefcase size={18} className="text-blue-500" /> نوع همکاری
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{job.jobType}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-colors">
                      <MapPin size={18} className="text-red-500" /> موقعیت
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{job.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 transition-colors">
                      <Clock size={18} className="text-orange-500" /> زمان انتشار
                    </span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{new Date(job.createdAt).toLocaleDateString('fa-IR')}</span>
                  </div>
                </div>

                {/* پیام خطا */}
                {errorMsg && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm rounded-xl flex items-start gap-2 transition-colors">
                    <AlertCircle size={18} className="shrink-0" />
                    <p>{errorMsg}</p>
                  </div>
                )}

                {/* دکمه ارسال رزومه */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                  <Button 
                    onClick={handleApply} 
                    disabled={isApplying} 
                    className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-xl shadow-blue-600/30 dark:shadow-none rounded-2xl"
                  >
                    {isApplying ? (
                      <span className="flex items-center gap-3"><Loader2 size={22} className="animate-spin" /> در حال ارسال...</span>
                    ) : (
                      'ارسال رزومه برای این شغل'
                    )}
                  </Button>
                  <p className="text-xs text-center text-slate-400 dark:text-slate-500 leading-relaxed mt-3 transition-colors">
                    با کلیک روی دکمه بالا، رزومه ثبت‌شده شما برای کارفرما ارسال می‌شود.
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetails;