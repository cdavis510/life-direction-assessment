// ─── NotesCard — reflection textarea with save ───────────────────────────────
import { useState } from 'react';
import SectionCard from './SectionCard.jsx';

export default function NotesCard({ glow, theme, onSave }) {
  const [notes, setNotes] = useState('');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (onSave) onSave(notes);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  }

  return (
    <SectionCard title="Notes / Reflection" glow={glow}>
      <div className="space-y-3">
        <textarea
          value={notes}
          onChange={e => { setNotes(e.target.value); setSaved(false); }}
          placeholder="Write your thoughts, reactions, or next decisions here…"
          className={[
            'min-h-[148px] w-full rounded-[18px] border border-white/10 bg-black/20',
            'px-4 py-3 text-sm text-white/90 outline-none placeholder:text-white/28',
            'resize-none transition-colors duration-180',
            theme.ring,
          ].join(' ')}
        />
        <div className="flex items-center justify-between">
          <span className={`text-xs transition-opacity duration-220 ${saved ? 'text-white/50 opacity-100' : 'opacity-0'}`}>
            Saved
          </span>
          <button
            type="button"
            onClick={handleSave}
            disabled={!notes.trim()}
            className={[
              'rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-180',
              'bg-white/8 hover:bg-white/14 disabled:opacity-30 disabled:cursor-not-allowed',
            ].join(' ')}
          >
            Save Notes
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
