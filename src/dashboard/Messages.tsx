import { Search, User } from 'lucide-react';

const Messages = () => {
  const chats = [
    { id: 1, name: 'تیم استخدام دیجی‌کالا', message: 'سلام، رزومه شما بررسی شد. برای مصاحبه دعوت هستید.', time: '۱۰:۳۰', unread: 2 },
    { id: 2, name: 'شرکت اسنپ', message: 'با تشکر از درخواست شما، در حال بررسی مدارک هستیم.', time: 'دیروز', unread: 1 },
    { id: 3, name: 'کارشناس منابع انسانی تپسی', message: 'ممنون از پاسخ شما. در صورت تایید با شما تماس می‌گیریم.', time: '۳ روز پیش', unread: 0 },
  ];

  return (
    // ✅ کانتینر اصلی دارک شد
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors" dir="rtl">
      
      {/* ستون لیست چت‌ها */}
      {/* ✅ سایدبار پیام‌ها دارک شد */}
      <div className="w-full md:w-80 border-l border-slate-200 dark:border-slate-700 flex flex-col bg-slate-50/50 dark:bg-slate-900/50 transition-colors">
        
        {/* هدر جستجو */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors">
          <h2 className="font-bold text-slate-800 dark:text-white mb-4 transition-colors">پیام‌ها</h2>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="جستجوی پیام..." 
              className="w-full h-9 pr-9 pl-3 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors" 
            />
          </div>
        </div>
        
        {/* لیست چت‌ها */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id} 
              // ✅ آیتم‌های چت دارک شدند
              className={`p-4 border-b border-slate-100 dark:border-slate-700/50 cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors ${chat.unread > 0 ? 'bg-blue-50/30 dark:bg-blue-900/20' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0 transition-colors">
                  <User size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate transition-colors">{chat.name}</h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap transition-colors">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate transition-colors">{chat.message}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ستون نمایش پیام (Placeholder) */}
      {/* ✅ بخش خالی پیام دارک شد */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-800 transition-colors">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-4 transition-colors">
          <Search size={32} className="text-slate-300 dark:text-slate-600 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors">یک گفتگو را انتخاب کنید</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs transition-colors">
          برای مشاهده تاریخچه پیام‌ها و پاسخ دادن، یکی از گفتگوهای سمت راست را انتخاب کنید.
        </p>
      </div>
    </div>
  );
};

export default Messages;