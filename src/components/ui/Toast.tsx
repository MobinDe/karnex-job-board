import { CheckCircle2, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  // ✅ بستن خودکار بعد از ۳ ثانیه
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    // ✅ باکس سفید زیبا در بالای صفحه (وسط)
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] animate-in slide-in-from-top-4 fade-in duration-300">
      <div className="flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-xl px-5 py-3 min-w-[300px]">
        <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle2 size={20} className="text-green-600" />
        </div>
        <p className="text-sm font-medium text-slate-800 flex-1">{message}</p>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toast;