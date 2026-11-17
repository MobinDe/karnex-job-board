import { useState, type ReactNode } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import Checkbox from '../ui/Checkbox';
import Select from '../ui/Select';

interface JobFilterProps {
  selectedJobTypes: string[];
  onJobTypeChange: (types: string[]) => void;
  selectedExperienceLevels: string[];
  onExperienceLevelChange: (levels: string[]) => void;
  selectedLocation: string;
  onLocationChange: (location: string) => void;
  selectedSalaryRange: string;
  onSalaryRangeChange: (range: string) => void;
  selectedDatePosted: string;
  onDatePostedChange: (date: string) => void;
  onClear: () => void;
}

const jobTypeOptions = [
  { value: 'full-time', label: 'تمام‌وقت' },
  { value: 'part-time', label: 'پاره‌وقت' },
  { value: 'remote', label: 'دورکاری' },
  { value: 'contract', label: 'پیمانکاری' },
];

const experienceOptions = [
  { value: 'intern', label: 'کارآموز' },
  { value: 'junior', label: 'جونیور (Junior)' },
  { value: 'mid', label: 'مید-لول (Mid)' },
  { value: 'senior', label: 'سنیور (Senior)' },
  { value: 'lead', label: 'لید / مدیر (Lead)' },
];

// ✅ لیست کامل ۳۱ استان ایران
const provinces = [
  { value: '', label: 'همه استان‌ها' },
  { value: 'تهران', label: 'تهران' },
  { value: 'البرز', label: 'البرز' },
  { value: 'اصفهان', label: 'اصفهان' },
  { value: 'خراسان رضوی', label: 'خراسان رضوی' },
  { value: 'فارس', label: 'فارس' },
  { value: 'آذربایجان شرقی', label: 'آذربایجان شرقی' },
  { value: 'خوزستان', label: 'خوزستان' },
  { value: 'مازندران', label: 'مازندران' },
  { value: 'آذربایجان غربی', label: 'آذربایجان غربی' },
  { value: 'کرمان', label: 'کرمان' },
  { value: 'گیلان', label: 'گیلان' },
  { value: 'سیستان و بلوچستان', label: 'سیستان و بلوچستان' },
  { value: 'کرمانشاه', label: 'کرمانشاه' },
  { value: 'گلستان', label: 'گلستان' },
  { value: 'هرمزگان', label: 'هرمزگان' },
  { value: 'همدان', label: 'همدان' },
  { value: 'کردستان', label: 'کردستان' },
  { value: 'مرکزی', label: 'مرکزی' },
  { value: 'قزوین', label: 'قزوین' },
  { value: 'لرستان', label: 'لرستان' },
  { value: 'بوشهر', label: 'بوشهر' },
  { value: 'اردبیل', label: 'اردبیل' },
  { value: 'زنجان', label: 'زنجان' },
  { value: 'قم', label: 'قم' },
  { value: 'یزد', label: 'یزد' },
  { value: 'سمنان', label: 'سمنان' },
  { value: 'خراسان شمالی', label: 'خراسان شمالی' },
  { value: 'چهارمحال و بختیاری', label: 'چهارمحال و بختیاری' },
  { value: 'خراسان جنوبی', label: 'خراسان جنوبی' },
  { value: 'ایلام', label: 'ایلام' },
  { value: 'کهگیلویه و بویراحمد', label: 'کهگیلویه و بویراحمد' },
];

const salaryOptions = [
  { value: '', label: 'همه حقوق‌ها' },
  { value: '0-10', label: 'زیر ۱۰ میلیون' },
  { value: '10-20', label: '۱۰ تا ۲۰ میلیون' },
  { value: '20-30', label: '۲۰ تا ۳۰ میلیون' },
  { value: '30-50', label: '۳۰ تا ۵۰ میلیون' },
  { value: '50+', label: 'بالای ۵۰ میلیون' },
];

const dateOptions = [
  { value: 'all', label: 'همه زمان‌ها' },
  { value: '24h', label: '۲۴ ساعت گذشته' },
  { value: '7d', label: 'هفته گذشته' },
  { value: '30d', label: 'ماه گذشته' },
];

// کامپوننت آکاردئونی
const FilterSection = ({ title, children, defaultOpen = true }: { title: string, children: ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    // ✅ حاشیه پایین بخش‌ها در حالت تاریک
    <div className="border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 last:pb-0 transition-colors">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center justify-between w-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        {title}
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="mt-3 space-y-2.5 animate-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
  );
};

const JobFilter = ({ 
  selectedJobTypes, onJobTypeChange,
  selectedExperienceLevels, onExperienceLevelChange,
  selectedLocation, onLocationChange,
  selectedSalaryRange, onSalaryRangeChange,
  selectedDatePosted, onDatePostedChange,
  onClear 
}: JobFilterProps) => {
  
  const handleToggle = (currentList: string[], item: string, onChange: (list: string[]) => void) => {
    if (currentList.includes(item)) {
      onChange(currentList.filter(i => i !== item));
    } else {
      onChange([...currentList, item]);
    }
  };

  return (
    // ✅ پس‌زمینه، حاشیه و سایه برای حالت تاریک
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm space-y-5 transition-colors duration-300">
      
      {/* هدر فیلترها */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4 transition-colors">
        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Filter size={18} className="text-blue-600 dark:text-blue-400" />
          فیلترهای پیشرفته
        </h3>
        <button onClick={onClear} className="text-xs text-blue-600 dark:text-blue-400 hover:underline transition-colors">
          حذف همه
        </button>
      </div>

      <FilterSection title="نوع همکاری">
        {jobTypeOptions.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={selectedJobTypes.includes(opt.value)}
            onChange={() => handleToggle(selectedJobTypes, opt.value, onJobTypeChange)}
          />
        ))}
      </FilterSection>

      <FilterSection title="سطح ارشدیت">
        {experienceOptions.map((opt) => (
          <Checkbox
            key={opt.value}
            label={opt.label}
            checked={selectedExperienceLevels.includes(opt.value)}
            onChange={() => handleToggle(selectedExperienceLevels, opt.value, onExperienceLevelChange)}
          />
        ))}
      </FilterSection>

      <FilterSection title="محدوده حقوق">
        <Select options={salaryOptions} value={selectedSalaryRange} onChange={(e) => onSalaryRangeChange(e.target.value)} />
      </FilterSection>

      <FilterSection title="استان / موقعیت مکانی">
        <Select options={provinces} value={selectedLocation} onChange={(e) => onLocationChange(e.target.value)} />
      </FilterSection>

      <FilterSection title="زمان انتشار" defaultOpen={false}>
        <Select options={dateOptions} value={selectedDatePosted} onChange={(e) => onDatePostedChange(e.target.value)} />
      </FilterSection>
    </div>
  );
};

export default JobFilter;