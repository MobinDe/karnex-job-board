import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Clock, Banknote, Building2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { cn } from '../../utils/cn';

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  salary?: string;
  jobType: 'full-time' | 'part-time' | 'remote' | 'contract';
  postedAt: string;
  isUrgent?: boolean;
}

interface JobCardProps {
  job: Job;
  className?: string;
}

const jobTypeLabels = {
  'full-time': 'تمام‌وقت',
  'part-time': 'پاره‌وقت',
  'remote': 'دورکاری',
  'contract': 'پیمانکاری',
};

// ✅ کامپوننت هوشمند لوگو با پشتیبانی از حالت تاریک
const CompanyLogo = ({ companyName, logoUrl }: { companyName: string; logoUrl?: string }) => {
  if (logoUrl) {
    return (
      <img 
        src={logoUrl} 
        alt={companyName} 
        className="w-14 h-14 rounded-xl object-contain bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-1.5 shadow-sm" 
      />
    );
  }

  const colors = [
    'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
    'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
    'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800',
    'bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800',
    'bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800',
  ];
  
  // تولید رنگ ثابت بر اساس نام شرکت
  const colorIndex = companyName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const colorClass = colors[colorIndex];

  return (
    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border shadow-sm", colorClass)}>
      <Building2 size={26} />
    </div>
  );
};

const JobCard = ({ job, className }: JobCardProps) => {
  return (
    <Link to={`/jobs/${job.id}`} className="block outline-none">
      <Card 
        className={cn(
          // ✅ انیمیشن‌های نرم برای هاور، و گوشه‌های گردتر
          "group relative cursor-pointer rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10",
          "dark:border-slate-700/80 dark:bg-slate-800 dark:hover:border-blue-500 dark:hover:shadow-blue-900/20",
          className
        )}
      >
        <CardContent className="p-5 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
          
          {/* لوگوی شرکت */}
          <CompanyLogo companyName={job.companyName} logoUrl={job.companyLogo} />

          {/* اطلاعات اصلی */}
          <div className="flex-1 min-w-0 space-y-2.5">
            
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="font-bold text-lg md:text-xl text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {job.title}
              </h3>
              {job.isUrgent && <Badge variant="danger">فوری</Badge>}
            </div>
            
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              {job.companyName}
            </p>
            
            {/* متادیتا (مکان، نوع همکاری، حقوق) */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-slate-400 dark:text-slate-500" /> 
                {job.location}
              </span>
              
              <span className="flex items-center gap-1.5">
                <Briefcase size={15} className="text-slate-400 dark:text-slate-500" /> 
                {jobTypeLabels[job.jobType]}
              </span>
              
              {job.salary && (
                <span className="flex items-center gap-1.5 font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-md">
                  <Banknote size={15} /> 
                  {job.salary}
                </span>
              )}
            </div>
          </div>

          {/* زمان انتشار */}
          <div className="mt-2 md:mt-0 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 md:self-start whitespace-nowrap bg-slate-50 dark:bg-slate-900/50 px-2.5 py-1.5 rounded-lg">
            <Clock size={14} />
            <span>{job.postedAt}</span>
          </div>
          
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;