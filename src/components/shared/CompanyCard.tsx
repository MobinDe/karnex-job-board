import { MapPin, Users, Briefcase, Building2 } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface CompanyCardProps {
  name: string;
  industry: string;
  location: string;
  employeeCount: string;
  openJobsCount: number;
  logo?: string;
}

const CompanyLogoLarge = ({ companyName, logoUrl }: { companyName: string; logoUrl?: string }) => {
  if (logoUrl) {
    return <img src={logoUrl} alt={companyName} className="w-20 h-20 rounded-2xl object-contain bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 p-2 group-hover:scale-110 transition-transform" />;
  }

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
    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border ${colorClass} group-hover:scale-110 transition-transform`}>
      <Building2 size={32} />
    </div>
  );
};

const CompanyCard = ({ name, industry, location, employeeCount, openJobsCount, logo }: CompanyCardProps) => {
  return (
    // ✅ استفاده از کلاس‌های dark: برای کارت شرکت
    <Card className="hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-900/10 transition-all group cursor-pointer border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
        
        <CompanyLogoLarge companyName={name} logoUrl={logo} />
        
        <div>
          <h3 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{name}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors">{industry}</p>
        </div>

        <div className="w-full flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-700 pt-4 mt-2 transition-colors">
          <span className="flex items-center gap-1"><MapPin size={14}/> {location}</span>
          <span className="flex items-center gap-1"><Users size={14}/> {employeeCount} نفر</span>
        </div>
        
        <div className="w-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
          <Briefcase size={16} />
          {openJobsCount} آگهی فعال
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;