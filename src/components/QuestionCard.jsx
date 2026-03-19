// ─── QUESTION CARD ─────────────────────────────────────────────────────────────
import { useState } from 'react';

export default function QuestionCard({ question, value, onChange, accent }) {
  if (!question) return null;

  const accentHex = {
    'user-mekhi':  '#06B6D4',
    'user-melvin': '#8B5CF6',
    'user-mom':    '#F43F5E',
  }[accent?.class] || '#06B6D4';

  return (
    <div
      className="animate-slide-up rounded-3xl p-6 md:p-8"
      style={{
        backgroundColor: '#16161D',
        border: `1px solid ${accentHex}18`,
        boxShadow: `0 0 60px ${accentHex}08, 0 2px 40px rgba(0,0,0,0.4)`,
      }}
    >
      {/* Subtle top accent bar */}
      <div
        className="w-12 h-0.5 rounded-full mb-6"
        style={{ backgroundColor: accentHex, opacity: 0.6 }}
      />

      <h2
        className="text-xl md:text-2xl font-semibold text-white leading-relaxed mb-8"
        style={{ fontFamily: 'Inter, sans-serif', lineHeight: 1.5 }}
      >
        {question.text}
      </h2>

      {question.type === 'text' && (
        <TextInput value={value} onChange={onChange} accentHex={accentHex} />
      )}
      {question.type === 'multiple' && (
        <MultipleChoice
          options={question.options}
          value={value}
          onChange={onChange}
          accentHex={accentHex}
        />
      )}
      {question.type === 'slider' && (
        <SliderInput
          value={value}
          onChange={onChange}
          min={question.min || 1}
          max={question.max || 10}
          minLabel={question.minLabel}
          maxLabel={question.maxLabel}
          accentHex={accentHex}
        />
      )}
    </div>
  );
}

function TextInput({ value, onChange, accentHex }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      className="w-full rounded-2xl px-5 py-4 text-white placeholder-white/20 text-sm leading-relaxed resize-none outline-none transition-all duration-200"
      style={{
        backgroundColor: '#0E0C0A',
        border: `1px solid ${focused || value ? accentHex + '40' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: focused ? `0 0 0 3px ${accentHex}12` : 'none',
        minHeight: 150,
      }}
      placeholder="Take your time. Write what's actually true for you..."
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rows={5}
    />
  );
}

function MultipleChoice({ options, value, onChange, accentHex }) {
  return (
    <div className="space-y-3">
      {options.map((option, i) => {
        const selected = value === option;
        return (
          <button
            key={i}
            onClick={() => onChange(option)}
            className="w-full text-left rounded-2xl transition-all duration-200 font-medium text-sm md:text-base"
            style={{
              padding: '14px 20px',
              backgroundColor: selected ? `${accentHex}15` : 'rgba(255,255,255,0.04)',
              border: `1.5px solid ${selected ? accentHex + '70' : 'rgba(255,255,255,0.1)'}`,
              color: selected ? '#fff' : 'rgba(255,255,255,0.6)',
              transform: selected ? 'translateX(4px)' : 'none',
              boxShadow: selected ? `0 0 20px ${accentHex}15` : 'none',
            }}
          >
            <span className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200"
                style={{
                  borderColor: selected ? accentHex : 'rgba(255,255,255,0.2)',
                  backgroundColor: selected ? `${accentHex}20` : 'transparent',
                }}
              >
                {selected && (
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentHex }} />
                )}
              </span>
              {option}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function SliderInput({ value, onChange, min, max, minLabel, maxLabel, accentHex }) {
  const current = value ?? Math.round((min + max) / 2);

  const labels = {
    1: 'Not at all', 2: 'Barely', 3: 'A little', 4: 'Somewhat',
    5: 'In the middle', 6: 'Mostly', 7: 'Pretty well', 8: 'Very much',
    9: 'Almost fully', 10: 'Completely',
  };

  const pct = ((current - min) / (max - min)) * 100;

  return (
    <div className="space-y-6">
      {/* Big number */}
      <div className="flex flex-col items-center justify-center py-4">
        <div
          className="text-7xl font-bold transition-all duration-150"
          style={{ color: accentHex, fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '0.05em' }}
        >
          {current}
        </div>
        <p className="text-white/40 text-sm mt-1">{labels[current] || ''}</p>
      </div>

      {/* Custom slider track */}
      <div className="px-1">
        <div className="relative h-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <div
            className="absolute h-full rounded-full transition-all duration-150"
            style={{ width: `${pct}%`, backgroundColor: accentHex, opacity: 0.8 }}
          />
        </div>
        <input
          type="range" min={min} max={max} value={current}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full opacity-0 absolute"
          style={{ marginTop: -8, height: 16, cursor: 'pointer', position: 'relative' }}
        />
        <div className="flex justify-between text-white/25 text-xs mt-3">
          <span>{minLabel || min}</span>
          <span>{maxLabel || max}</span>
        </div>
      </div>
    </div>
  );
}
