import { useState } from 'react';
import { Bell, Lock, ShieldAlert, User, Save, Mail, Smartphone, KeyRound } from 'lucide-react';
import Button from '../components/ui/Button';

// ✅ کامپوننت اختصاصی برای سوییچ‌های زیبا
const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-blue-600' : 'bg-slate-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? '-translate-x-6' : '-translate-x-1'
      }`}
    />
  </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'account'>('notifications');

  // استیت‌های اعلان‌ها
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [jobAlerts, setJobAlerts] = useState(true);

  const tabs = [
    { id: 'notifications', label: 'اعلان‌ها', icon: Bell },
    { id: 'security', label: 'امنیت و رمز عبور', icon: Lock },
    { id: 'account', label: 'حساب کاربری', icon: User },
  ] as const;

  return (
    <div className="space-y-6 max-w-5xl mx-auto" dir="rtl">
      
      {/* هدر صفحه */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">تنظیمات</h1>
        <p className="text-sm text-slate-500 mt-1">تنظیمات حساب کاربری، امنیت و اعلان‌های خود را مدیریت کنید.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* ==================== منوی کناری (تب‌ها) ==================== */}
        <div className="md:col-span-1 flex flex-col gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ==================== محتوای تب انتخاب شده ==================== */}
        <div className="md:col-span-3 space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
          
          {/* --- تب اعلان‌ها --- */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Bell size={18} className="text-blue-600" /> تنظیمات اعلان‌ها
                </h3>
                <p className="text-xs text-slate-500 mt-1">انتخاب کنید که چه زمانی و از چه طریقی با شما تماس بگیریم.</p>
              </div>
              
              <div className="divide-y divide-slate-100 p-2">
                {/* اعلان ایمیلی */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">اعلان‌های ایمیلی</p>
                      <p className="text-xs text-slate-500 mt-1">دریافت ایمیل برای آگهی‌های جدید متناسب با رزومه شما.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />
                </div>

                {/* اعلان پیامکی */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">پیامک‌های فوری</p>
                      <p className="text-xs text-slate-500 mt-1">دریافت پیامک برای تغییر وضعیت درخواست‌های شغلی شما.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={smsNotifs} onChange={() => setSmsNotifs(!smsNotifs)} />
                </div>

                {/* پیشنهاد شغل */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 text-sm">پیشنهادهای شغلی هفتگی</p>
                      <p className="text-xs text-slate-500 mt-1">خلاصه‌ای از بهترین موقعیت‌های شغلی هفته در ایمیل شما.</p>
                    </div>
                  </div>
                  <ToggleSwitch enabled={jobAlerts} onChange={() => setJobAlerts(!jobAlerts)} />
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button className="flex items-center gap-2"><Save size={16} /> ذخیره تنظیمات</Button>
              </div>
            </div>
          )}

          {/* --- تب امنیت --- */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Lock size={18} className="text-blue-600" /> تغییر رمز عبور
                </h3>
                <p className="text-xs text-slate-500 mt-1">برای حفظ امنیت حساب، رمز عبور خود را به صورت دوره‌ای تغییر دهید.</p>
              </div>
              
              <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">رمز عبور فعلی</label>
                  <div className="relative">
                    <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="password" placeholder="••••••••" className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">رمز عبور جدید</label>
                    <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">تکرار رمز عبور جدید</label>
                    <input type="password" placeholder="••••••••" className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-sm" />
                  </div>
                </div>

                <div className="bg-blue-50 text-blue-800 text-xs p-4 rounded-xl flex items-start gap-2">
                  <ShieldAlert size={16} className="shrink-0 mt-0.5" />
                  <p>رمز عبور جدید باید حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک و اعداد باشد.</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
                <Button className="flex items-center gap-2"><Save size={16} /> بروزرسانی رمز عبور</Button>
              </div>
            </div>
          )}

          {/* --- تب حساب کاربری (منطقه خطر) --- */}
          {activeTab === 'account' && (
            <div className="bg-white rounded-2xl shadow-sm border border-red-200 overflow-hidden">
              <div className="p-6 border-b border-red-100 bg-red-50">
                <h3 className="font-bold text-red-800 flex items-center gap-2">
                  <ShieldAlert size={18} /> منطقه خطر (Danger Zone)
                </h3>
                <p className="text-xs text-red-600 mt-1">عملیات زیر غیرقابل بازگشت است و نیاز به دقت دارد.</p>
              </div>
              
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  با حذف حساب کاربری، تمام اطلاعات، رزومه‌های آپلود شده و تاریخچه درخواست‌های شغلی شما برای همیشه از سیستم کارنکس پاک می‌شود. آیا مطمئن هستید؟
                </p>
                <Button variant="danger" className="w-full md:w-auto">
                  حذف دائمی حساب کاربری
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;