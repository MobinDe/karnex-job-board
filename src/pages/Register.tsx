import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Lock, UserCircle, ArrowRight, Briefcase, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [role, setRole] = useState<'candidate' | 'employer' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await api.post('/auth/register', { name, email, password, role });
      login(response.data.user, response.data.token);
      navigate('/dashboard');
    } catch (err) {
      const error = err as { response?: { data?: { error?: string } } };
      setErrorMsg(error.response?.data?.error || 'خطا در ثبت‌نام');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ✅ پس‌زمینه در حالت روشن خاکستری روشن، در حالت تاریک تیره
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 relative overflow-hidden px-4 py-12 transition-colors duration-300" dir="rtl">
      
      {/* افکت‌های نوری پس‌زمینه */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 dark:bg-blue-600/30 blur-[120px] rounded-full animate-pulse transition-colors" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/30 blur-[120px] rounded-full animate-pulse transition-colors" />
      <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-purple-400/10 dark:bg-purple-600/20 blur-[100px] rounded-full transition-colors" />

      <div className="w-full max-w-md relative z-10">
        {/* ✅ کارت شیشه‌ای */}
        <div className="bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-slate-200 dark:border-white/20 rounded-3xl shadow-xl dark:shadow-2xl p-8 md:p-10 relative transition-colors duration-300">
          
          {role && (
            <button 
              type="button" 
              onClick={() => setRole(null)} 
              className="absolute top-6 left-6 text-xs text-slate-500 dark:text-white/60! hover:text-slate-800 dark:hover:text-white! transition-colors flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:bg-white/10"
            >
              <ArrowRight size={14} className="rotate-180" /> تغییر نوع حساب
            </button>
          )}

          <div className="text-center mb-8 mt-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <Briefcase size={28} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-extrabold text-slate-800 dark:text-white! tracking-tight transition-colors">کارنکس</span>
            </Link>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white! transition-colors">
              {!role ? 'ایجاد حساب کاربری' : (role === 'candidate' ? 'ثبت‌نام کارجو' : 'ثبت‌نام کارفرما')}
            </h1>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-500/20 border border-red-200 dark:border-red-500/50 text-red-600 dark:text-red-200 text-sm rounded-xl text-center transition-colors">
              {errorMsg}
            </div>
          )}

          {!role ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button onClick={() => setRole('candidate')} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-slate-800 dark:text-white! text-base transition-colors">من کارجو هستم</h3>
                    <p className="text-xs text-slate-500 dark:text-white/50! mt-0.5 transition-colors">به دنبال فرصت شغلی می‌گردم</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400 dark:text-white/30! group-hover:text-blue-600 dark:group-hover:text-blue-400! transition-colors" />
              </button>

              <button onClick={() => setRole('employer')} className="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Building2 size={24} />
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-slate-800 dark:text-white! text-base transition-colors">من کارفرما هستم</h3>
                    <p className="text-xs text-slate-500 dark:text-white/50! mt-0.5 transition-colors">به دنبال جذب نیرو هستم</p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-slate-400 dark:text-white/30! group-hover:text-indigo-600 dark:group-hover:text-indigo-400! transition-colors" />
              </button>
            </div>
          ) : (
            <form className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300" onSubmit={handleSubmit}>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-white/90! block transition-colors">نام و نام خانوادگی</label>
                <div className="relative">
                  <UserCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40! transition-colors" size={18} />
                  <input name="name" type="text" placeholder={role === 'candidate' ? 'مثلاً علی رضایی' : 'مثلاً شرکت فناوری نوین'} className="w-full h-11 pr-10 pl-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white! placeholder:text-slate-400 dark:placeholder:text-white/30! focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-white/90! block transition-colors">ایمیل</label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40! transition-colors" size={18} />
                  <input name="email" type="email" placeholder="example@email.com" className="w-full h-11 pr-10 pl-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white! placeholder:text-slate-400 dark:placeholder:text-white/30! focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-white/90! block transition-colors">رمز عبور</label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40! transition-colors" size={18} />
                  <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="w-full h-11 pr-10 pl-10 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-slate-900 dark:text-white! placeholder:text-slate-400 dark:placeholder:text-white/30! focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-white/40! hover:text-slate-600 dark:hover:text-white! transition-colors focus:outline-none">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2">
                <input type="checkbox" id="terms" className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-white/20 bg-white dark:bg-white/5 text-blue-600 focus:ring-blue-500/50 focus:ring-offset-0 cursor-pointer transition-colors" required />
                <label htmlFor="terms" className="text-xs text-slate-500 dark:text-white/60! leading-relaxed cursor-pointer transition-colors">
                  با ثبت‌نام، <a href="#" className="text-blue-600 dark:text-blue-400! hover:underline">قوانین</a> و <a href="#" className="text-blue-600 dark:text-blue-400! hover:underline">حریم خصوصی</a> را می‌پذیرم.
                </label>
              </div>

              <button type="submit" className="w-full h-12 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:hover:bg-blue-500 text-white! font-bold text-base shadow-lg shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2" disabled={isLoading}>
                {isLoading ? <span className="flex items-center gap-2"><Loader2 size={20} className="animate-spin" /> در حال ثبت‌نام...</span> : 'ایجاد حساب کاربری'}
              </button>
            </form>
          )}

          <div className="mt-8 text-center text-sm text-slate-500 dark:text-white/60! border-t border-slate-200 dark:border-white/10 pt-6 transition-colors">
            قبلاً ثبت‌نام کرده‌اید؟ <Link to="/login" className="text-blue-600 dark:text-white! font-bold hover:underline transition-colors">وارد شوید</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;