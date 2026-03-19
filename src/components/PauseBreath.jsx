import { useState, useEffect } from 'react';

export default function PauseBreath({ message, nextSectionTitle, accent, onContinue }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 ${accent.class}`}>
      <div className="w-full max-w-xl text-center animate-fade-in">

        {/* Breathing circle */}
        <div className="mb-10 relative flex items-center justify-center">
          <div
            className={`w-24 h-24 rounded-full ${accent.bg} opacity-20 animate-ping`}
            style={{ animationDuration: '3s' }}
          />
          <div
            className={`absolute w-16 h-16 rounded-full ${accent.bg} opacity-40`}
            style={{
              animation: 'breathe 4s ease-in-out infinite',
            }}
          />
          <div className={`absolute w-8 h-8 rounded-full ${accent.bg}`} />
        </div>

        <style>{`
          @keyframes breathe {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.3); opacity: 0.7; }
          }
        `}</style>

        {/* Message */}
        <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-medium mb-4">
          {message}
        </p>

        {nextSectionTitle && (
          <p className={`text-sm ${accent.text} font-semibold mt-6 mb-8`}>
            Next: {nextSectionTitle}
          </p>
        )}

        {/* Continue button */}
        <button
          onClick={onContinue}
          disabled={!ready}
          className={`btn-primary ${accent.bg} text-navy font-bold px-10 py-4 text-base`}
        >
          {ready ? 'Continue →' : 'Take a breath...'}
        </button>

        {!ready && (
          <p className="text-white/25 text-xs mt-3">Continue will be available in a moment</p>
        )}
      </div>
    </div>
  );
}
