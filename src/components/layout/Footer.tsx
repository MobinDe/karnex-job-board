import { Briefcase } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // ✅ اضافه کردن پس‌زمینه تیره‌تر و حاشیه بالایی برای حالت دارک
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-transparent dark:border-slate-800 text-slate-300 dark:text-slate-400 py-12 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* درباره کارنکس */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2 text-white">
            <Briefcase size={24} className="text-blue-500 dark:text-blue-400" />
            <span className="text-xl font-bold">کارنکس</span>
          </Link>
          <p className="text-sm leading-relaxed">
            کارنکس پلتفرم اتصال بهترین استعدادها به بهترین فرصت‌های شغلی است. مسیر شغلی خود را با ما هموار کنید.
          </p>
        </div>

        {/* لینک‌های سریع */}
        <div>
          <h4 className="text-white font-bold mb-4">دسترسی سریع</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/jobs" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">آگهی‌های شغلی</Link></li>
            <li><Link to="/companies" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">لیست شرکت‌ها</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">درباره ما</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">تماس با ما</Link></li>
          </ul>
        </div>

        {/* قوانین */}
        <div>
          <h4 className="text-white font-bold mb-4">قوانین و مقررات</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">حریم خصوصی</Link></li>
            <li><Link to="/terms" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">شرایط استفاده</Link></li>
            <li><Link to="/faq" className="hover:text-blue-400 dark:hover:text-blue-400 transition-colors">سوالات متداول</Link></li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <div>
          <h4 className="text-white font-bold mb-4">ما را دنبال کنید</h4>
          <div className="flex items-center gap-3">
            {/* ✅ دکمه‌های شبکه‌های اجتماعی با پس‌زمینه تیره‌تر در دارک مود */}
            <a href="#" className="p-2 bg-slate-800 dark:bg-slate-800/50 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-600 transition-colors group">
              <FaLinkedin size={18} className="text-slate-300 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="p-2 bg-slate-800 dark:bg-slate-800/50 rounded-lg hover:bg-pink-600 dark:hover:bg-pink-600 transition-colors group">
              <FaInstagram size={18} className="text-slate-300 group-hover:text-white transition-colors" />
            </a>
            <a href="#" className="p-2 bg-slate-800 dark:bg-slate-800/50 rounded-lg hover:bg-sky-500 dark:hover:bg-sky-500 transition-colors group">
              <FaTwitter size={18} className="text-slate-300 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
      
      {/* کپی‌رایت */}
      <div className="container mx-auto px-4 mt-12 pt-6 border-t border-slate-800 dark:border-slate-800/50 text-center text-xs text-slate-500 transition-colors">
        © {new Date().getFullYear()} کارنکس. تمامی حقوق محفوظ است.
      </div>
    </footer>
  );
};

export default Footer;