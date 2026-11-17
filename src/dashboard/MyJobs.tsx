import { useState, useEffect } from 'react';
import { Briefcase, Clock, CheckCircle2, XCircle, } from 'lucide-react';
import Badge from '../../src/components/ui/Badge';
import api from '../services/api';

interface Application {
  id: number;
  status: string;
  createdAt: string;
  job: {
    id: number;
    title: string;
    companyName: string;
  };
}

const MyJobs = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await api.get('/applications');
        setApplications(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApps();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending': return <Badge variant="warning"><Clock size={12} className="ml-1"/> در حال بررسی</Badge>;
      case 'accepted': return <Badge variant="success"><CheckCircle2 size={12} className="ml-1"/> تایید شده</Badge>;
      case 'rejected': return <Badge variant="danger"><XCircle size={12} className="ml-1"/> رد شده</Badge>;
      default: return null;
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-slate-500 dark:text-slate-400 transition-colors">در حال بارگذاری اطلاعات...</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">آگهی‌های من</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">لیست موقعیت‌های شغلی که برای آن‌ها درخواست ارسال کرده‌اید.</p>
      </div>

      {/* ✅ جدول دارک شده */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm transition-colors">
              <tr>
                <th className="px-6 py-4 font-medium">عنوان شغلی</th>
                <th className="px-6 py-4 font-medium">شرکت</th>
                <th className="px-6 py-4 font-medium">تاریخ ارسال</th>
                <th className="px-6 py-4 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm transition-colors">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400">
                    شما هنوز برای هیچ آگهی‌ای رزومه ارسال نکرده‌اید.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white flex items-center gap-2 transition-colors">
                      <Briefcase size={16} className="text-blue-500 dark:text-blue-400" /> {app.job.title}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300 transition-colors">{app.job.companyName}</td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400 transition-colors">{new Date(app.createdAt).toLocaleDateString('fa-IR')}</td>
                    <td className="px-6 py-4">{getStatusBadge(app.status)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyJobs;