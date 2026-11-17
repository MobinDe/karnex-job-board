import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, Briefcase } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await api.post('/auth/login', { email, password });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      const error = err as { response?: { data?: { error?: string } } };
      setErrorMsg(error.response?.data?.error || 'خطا در برقراری ارتباط با سرور');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ✅ پس‌زمینه در حالت روشن خاکستری روشن، در حالت تاریک تیره
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden px-4 transition-colors duration-300" dir="rtl">
      
      {/* افکت‌های نوری پس‌زمینه (در حالت روشن ملایم‌تر) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/40 blur-[120px] rounded-full animate-pulse transition-colors" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/40 blur-[120px] rounded-full animate-pulse transition-colors" />
      <div className="absolute top-[40%] left-[30%] w-[20%] h-[20%] bg-purple-400/20 dark:bg-purple-600/30 blur-[100px] rounded-full transition-colors" />

      <div className="w-full max-w-md relative z-10">
        {/* ✅ کارت شیشه‌ای در حالت روشن سفید، در حالت تاریک شفاف */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-3xl shadow-xl dark:shadow-2xl p-8 md:p-10 transition-colors duration-300">
          
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <Briefcase size={28} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-extrabold text-slate-800 dark:text-white! tracking-tight transition-colors">کارنکس</span>
            </Link>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white! mb-2 transition-colors">خوش آمدید</h1>
            <p className="text-slate-500 dark:text-white/70! text-sm transition-colors">برای ادامه وارد حساب کاربری خود شوید.</p>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-200 text-sm rounded-xl text-center transition-colors">
              {errorMsg}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* اینپوت ایمیل */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-white/90! block transition-colors">ایمیل</label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50! transition-colors" size={18} />
                <input 
                  name="email"
                  type="email" 
                  placeholder="example@email.com" 
                  // ✅ اینپوت در حالت روشن سفید/خاکستری، در حالت تاریک شفاف
                  className="w-full h-12 pr-10 pl-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white! placeholder:text-slate-400 dark:placeholder:text-white/40! focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* اینپوت رمز عبور */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-white/90! block transition-colors">رمز عبور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50! transition-colors" size={18} />
                <input 
                  name="password"
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  className="w-full h-12 pr-10 pl-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white! placeholder:text-slate-400 dark:placeholder:text-white/40! focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/50! hover:text-slate-600 dark:hover:text-white! transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 transition-colors" />
                <span className="text-sm text-slate-600 dark:text-white/80! transition-colors">مرا به خاطر بسپار</span>
              </label>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400! hover:text-blue-700 dark:hover:text-blue-300! transition-colors">
                فراموشی رمز؟
              </a>
            </div>

            <button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white! font-bold text-base shadow-lg shadow-blue-600/30 mt-4 rounded-xl flex items-center justify-center transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2"><Loader2 size={20} className="animate-spin" /> در حال ورود...</span>
              ) : (
                <span className="flex items-center gap-2">ورود به حساب <ArrowRight size={18} /></span>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-white/60! transition-colors">
            حساب کاربری ندارید؟{' '}
            <Link to="/register" className="text-blue-600 dark:text-white! font-bold hover:underline transition-colors">
              ثبت‌نام کنید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;