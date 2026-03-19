// ─── TOAST NOTIFICATION SYSTEM ────────────────────────────────────────────────
import { createContext, useContext, useState, useCallback } from 'react';

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration);
  }, []);

  const icons = { success: '✓', error: '✕', info: '◈' };
  const colors = {
    success: { bg: '#06B6D420', border: '#06B6D440', icon: '#06B6D4' },
    error:   { bg: '#F43F5E20', border: '#F43F5E40', icon: '#F43F5E' },
    info:    { bg: '#8B5CF620', border: '#8B5CF640', icon: '#8B5CF6' },
  };

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="fixed top-20 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => {
          const c = colors[t.type] || colors.success;
          return (
            <div
              key={t.id}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white animate-fade-in"
              style={{
                backgroundColor: c.bg,
                border: `1px solid ${c.border}`,
                backdropFilter: 'blur(12px)',
                minWidth: 200,
              }}
            >
              <span style={{ color: c.icon, fontWeight: 700 }}>{icons[t.type]}</span>
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
