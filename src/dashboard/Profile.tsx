import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl mx-auto" dir="rtl">
      
      {/* هدر صفحه */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">پروفایل من</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">اطلاعات شخصی و حرفه‌ای خود را مدیریت کنید.</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? 'outline' : 'primary'}>
          {isEditing ? 'انصراف' : 'ویرایش پروفایل'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* کارت اطلاعات کاربر */}
        <div className="lg:col-span-1">
          {/* ✅ کارت کاربر در حالت دارک */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 text-center transition-colors">
            <div className="relative w-28 h-28 mx-auto mb-4 group cursor-pointer">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                ک
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white transition-colors">کاربر کارنکس</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 transition-colors">توسعه‌دهنده فرانت‌اند</p>
            
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-700 flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 py-2 rounded-lg transition-colors">
              <ShieldCheck size={18} />
              حساب شما تایید شده است
            </div>
          </div>
        </div>

        {/* فرم اطلاعات */}
        <div className="lg:col-span-2">
          {/* ✅ کارت فرم در حالت دارک */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 md:p-8 transition-colors">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 text-lg transition-colors">اطلاعات شخصی</h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">نام و نام خانوادگی</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" size={18} />
                    <input type="text" defaultValue="کاربر کارنکس" disabled={!isEditing} className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm" />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">ایمیل</label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" size={18} />
                    <input type="email" defaultValue="user@karnex.ir" disabled={!isEditing} className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm" dir="ltr" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">شماره تماس</label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" size={18} />
                    <input type="text" defaultValue="۰۹۱۲۳۴۵۶۷۸۹" disabled={!isEditing} className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">موقعیت مکانی</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" size={18} />
                    <input type="text" defaultValue="تهران" disabled={!isEditing} className="w-full h-11 pr-10 pl-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">درباره من (بیوگرافی)</label>
                <textarea rows={4} defaultValue="برنامه‌نویس فرانت‌اند با علاقه به طراحی رابط کاربری و تجربه کاربری..." disabled={!isEditing} className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white disabled:opacity-70 focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all resize-none text-sm" />
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button className="flex items-center gap-2">
                    <Save size={18} /> ذخیره تغییرات
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;