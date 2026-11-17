import { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare,  } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('پیام شما ارسال شد! (شبیه‌سازی)');
    }, 1500);
  };

  return (
    // ✅ پس‌زمینه اصلی دارک شد
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 px-4 transition-colors duration-300" dir="rtl">
      <div className="container mx-auto max-w-6xl">
        
        {/* هدر تمیز صفحه */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transition-colors">
            <MessageSquare size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white mb-4 transition-colors">
            با ما در ارتباط باشید
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg transition-colors">
            تیم کارنکس همیشه آماده شنیدن نظرات، پیشنهادات و پاسخ به سوالات شماست.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* ستون اطلاعات تماس */}
          <div className="lg:col-span-2 space-y-4">
            
            {/* کارت تلفن */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1 transition-colors">تلفن تماس</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors" dir="ltr">۰۲۱-۱۲۳۴۵۶۷۸</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors">شنبه تا چهارشنبه، ۹ تا ۱۷</p>
              </div>
            </div>

            {/* کارت ایمیل */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1 transition-colors">ایمیل پشتیبانی</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm font-medium transition-colors" dir="ltr">support@karnex.ir</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 transition-colors">پاسخگویی حداکثر تا ۲۴ ساعت</p>
              </div>
            </div>

            {/* کارت آدرس */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0 transition-colors">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white mb-1 transition-colors">دفتر مرکزی</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-1 transition-colors">
                  تهران، خیابان ولیعصر، بالاتر از پارک ساعی، برج کارنکس، طبقه ۱۰
                </p>
              </div>
            </div>

            {/* شبکه‌های اجتماعی */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between transition-colors">
              <span className="font-bold text-slate-800 dark:text-white text-sm transition-colors">ما را دنبال کنید</span>
              <div className="flex gap-2">
                <a href="#" className="w-10 h-10 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-colors">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white transition-colors">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white transition-colors">
                  <FaTwitter size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* ستون فرم تماس */}
          <div className="lg:col-span-3">
            {/* ✅ کارت فرم دارک شد */}
            <Card className="border border-slate-200 dark:border-slate-700 shadow-sm rounded-2xl bg-white dark:bg-slate-800 h-full transition-colors">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 transition-colors">ارسال پیام مستقیم</h2>
                
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">نام و نام خانوادگی</label>
                      <input 
                        type="text" 
                        placeholder="مثلاً علی رضایی" 
                        // ✅ اینپوت دارک شد
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">ایمیل</label>
                      <input 
                        type="email" 
                        placeholder="example@email.com" 
                        className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">موضوع</label>
                    <input 
                      type="text" 
                      placeholder="موضوع پیام شما" 
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all text-sm"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors">متن پیام</label>
                    <textarea 
                      rows={6}
                      className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:focus:ring-blue-500/30 focus:border-blue-600 dark:focus:border-blue-500 transition-all resize-none text-sm"
                      placeholder="پیام خود را اینجا بنویسید..."
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-md shadow-blue-600/20"
                    disabled={isLoading}
                  >
                    {isLoading ? 'در حال ارسال...' : (
                      <span className="flex items-center gap-2">
                        <Send size={18} /> ارسال پیام
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;