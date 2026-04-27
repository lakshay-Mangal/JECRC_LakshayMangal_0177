import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { selectToasts, removeToast } from '../store/slices/uiSlice';

export default function ToastContainer() {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector(selectToasts);

  useEffect(() => {
    toasts.forEach(toast => {
      const timer = setTimeout(() => dispatch(removeToast(toast.id)), 3000);
      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '🗑️' : 'ℹ️'}
          </span>
          {toast.message}
          <button className="toast-close" onClick={() => dispatch(removeToast(toast.id))}>✕</button>
        </div>
      ))}
    </div>
  );
}
