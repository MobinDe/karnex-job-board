import { Code2, Megaphone, PenTool, Wallet, Headphones, Settings, type LucideIcon } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  jobCount: number;
  icon: LucideIcon;
  color: string;
}

const categories: Category[] = [
  { id: '1', title: 'برنامه‌نویسی و IT', jobCount: 1240, icon: Code2, color: 'text-blue-600 bg-blue-50 border-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:border-blue-800' },
  { id: '2', title: 'بازاریابی و فروش', jobCount: 850, icon: Megaphone, color: 'text-orange-600 bg-orange-50 border-orange-100 dark:text-orange-400 dark:bg-orange-900/30 dark:border-orange-800' },
  { id: '3', title: 'طراحی و گرافیک', jobCount: 430, icon: PenTool, color: 'text-pink-600 bg-pink-50 border-pink-100 dark:text-pink-400 dark:bg-pink-900/30 dark:border-pink-800' },
  { id: '4', title: 'مالی و حسابداری', jobCount: 320, icon: Wallet, color: 'text-green-600 bg-green-50 border-green-100 dark:text-green-400 dark:bg-green-900/30 dark:border-green-800' },
  { id: '5', title: 'پشتیبانی و خدمات', jobCount: 610, icon: Headphones, color: 'text-purple-600 bg-purple-50 border-purple-100 dark:text-purple-400 dark:bg-purple-900/30 dark:border-purple-800' },
  { id: '6', title: 'مهندسی و فنی', jobCount: 290, icon: Settings, color: 'text-slate-700 bg-slate-100 border-slate-200 dark:text-slate-300 dark:bg-slate-700/50 dark:border-slate-600' },
];

const JobCategoryList = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories.map((cat) => {
        const Icon = cat.icon;
        return (
          <button
            key={cat.id}
            // ✅ اضافه شدن پس‌زمینه، حاشیه و متن دارک به کارت‌ها
            className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border transition-transform group-hover:scale-110 ${cat.color}`}>
              <Icon size={24} />
            </div>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-white mb-1 transition-colors">{cat.title}</h4>
            <span className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{cat.jobCount.toLocaleString('fa-IR')} آگهی</span>
          </button>
        );
      })}
    </div>
  );
};

export default JobCategoryList;