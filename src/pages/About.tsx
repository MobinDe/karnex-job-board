import { Users, Target, Rocket, Heart, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const About = () => {
  const values = [
    { icon: Target, title: 'شفافیت کامل', desc: 'ما اطلاعات حقوق و شرایط کاری را شفاف در اختیار شما قرار می‌دهیم.', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { icon: Heart, title: 'انسان‌محوری', desc: 'ما باور داریم که کار فقط یک قرارداد نیست، بلکه بخشی از زندگی است.', color: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    { icon: Rocket, title: 'نوآوری', desc: 'ما از تکنولوژی‌های روز برای بهبود تجربه استخدام استفاده می‌کنیم.', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
    { icon: ShieldCheck, title: 'اعتماد و امنیت', desc: 'اطلاعات کاربران و شرکت‌ها با بالاترین استانداردهای امنیتی محافظت می‌شود.', color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  ];

  return (
    // ✅ پس‌زمینه اصلی دارک شد
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300" dir="rtl">
      
      {/* هدر (Hero) */}
      <section className="relative bg-slate-900 dark:bg-slate-900/80 py-24 px-4 text-center overflow-hidden border-b border-transparent dark:border-slate-800 transition-colors">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] bg-blue-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[80%] bg-indigo-600/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Zap size={16} className="text-white!" />
            <span className="text-white! text-sm font-medium">داستان ما</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-white! mb-6 leading-tight">
            درباره <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">کارنکس</span>
          </h1>
          
          <p className="text-white! text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            ما در کارنکس معتقدیم که هر فرد شایسته‌ای باید بتواند بهترین فرصت شغلی متناسب با استعدادش را پیدا کند. مسیر ما ایجاد پلی شفاف بین استعدادها و فرصت‌هاست.
          </p>
        </div>
      </section>

      {/* ماموریت */}
      <section className="py-20 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 transition-colors">ماموریت ما</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-loose text-base md:text-lg transition-colors">
            کارنکس با هدف شفاف‌سازی بازار کار ایران راه‌اندازی شده است. ما با ایجاد پلی بین کارجویان مستعد و کارفرمایان معتبر، تلاش می‌کنیم فرآیند استخدام را سریع‌تر، ساده‌تر و انسانی‌تر کنیم. ما به دنبال حذف واسطه‌های غیرضروری و ایجاد ارتباطی مستقیم و شفاف هستیم تا هر دو طرف بتوانند بهترین انتخاب را داشته باشند.
          </p>
        </div>
      </section>

      {/* ارزش‌ها */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-3 transition-colors">ارزش‌های ما</h2>
            <p className="text-slate-500 dark:text-slate-400 transition-colors">اصولی که ما را در مسیر رسیدن به هدفمان هدایت می‌کنند.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((item, idx) => {
              const Icon = item.icon;
              return (
                // ✅ کارت‌های ارزش‌ها دارک شدند
                <Card key={idx} className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-slate-800">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">{item.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* آمار */}
      <section className="py-16 px-4 bg-white dark:bg-slate-900 transition-colors">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 dark:from-blue-800 dark:to-indigo-950 rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white">+۱۰,۰۰۰</span>
                <span className="text-white/80 font-medium">کارجوی فعال</span>
              </div>
              <div className="flex flex-col gap-2 border-y md:border-y-0 md:border-x border-white/20 py-6 md:py-0">
                <span className="text-4xl md:text-5xl font-extrabold text-white">+۵,۰۰۰</span>
                <span className="text-white/80 font-medium">آگهی شغلی موفق</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-white">+۲,۰۰۰</span>
                <span className="text-white/80 font-medium">شرکت معتبر</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* فراخوان (CTA) */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-950 transition-colors">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors">
            <Users size={32} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 transition-colors">به جامعه کارنکس بپیوندید</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto transition-colors">
            چه به دنبال شغل باشید و چه به دنبال جذب نیرو، کارنکس بهترین نقطه شروع برای شماست.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-8">ثبت‌نام رایگان</Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full px-8 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">تماس با ما</Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;