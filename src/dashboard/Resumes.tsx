import { UploadCloud, File, Download, Trash2, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button';

const Resumes = () => {
  const resumes = [
    { id: 1, name: 'رزومه_فرانت_اند_۱۴۰۳.pdf', size: '۲.۴ مگابایت', date: '۱۴۰۳/۰۸/۱۵', isDefault: true },
    { id: 2, name: 'رزومه_انگلیسی.pdf', size: '۱.۸ مگابایت', date: '۱۴۰۳/۰۷/۲۰', isDefault: false },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">رزومه‌های من</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">رزومه‌های خود را مدیریت کنید و برای کارفرمایان ارسال کنید.</p>
      </div>

      {/* باکس آپلود */}
      {/* ✅ باکس آپلود دارک شد */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-dashed border-slate-300 dark:border-slate-700 p-10 text-center hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors cursor-pointer group">
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} />
        </div>
        <h3 className="font-bold text-slate-800 dark:text-white mb-1 transition-colors">آپلود رزومه جدید</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 transition-colors">فایل PDF یا Word خود را (حداکثر ۵ مگابایت) اینجا رها کنید.</p>
        <Button variant="outline" className="dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700">انتخاب فایل</Button>
      </div>

      {/* لیست رزومه‌ها */}
      {/* ✅ لیست رزومه‌ها دارک شد */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white mb-4 transition-colors">رزومه‌های آپلود شده</h3>
        <div className="space-y-3">
          {resumes.map((resume) => (
            <div key={resume.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-center justify-center transition-colors">
                  <File size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-slate-800 dark:text-white text-sm transition-colors">{resume.name}</p>
                    {resume.isDefault && (
                      <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full flex items-center gap-1 transition-colors">
                        <CheckCircle2 size={10}/> پیش‌فرض
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 transition-colors">{resume.size} • {resume.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors" title="دانلود">
                  <Download size={18} />
                </button>
                <button className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="حذف">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resumes;