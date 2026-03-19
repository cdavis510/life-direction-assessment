// ─── LIFESTYLE VISION CARD ─────────────────────────────────────────────────────
// Visual lifestyle tier display — shows what life actually looks like at each
// income level so the boys can see what they're working toward (or away from).
// ─────────────────────────────────────────────────────────────────────────────

const LIFESTYLE_TIERS = [
  {
    id: 'struggling',
    label: 'Struggling',
    monthlyIncome: '$1,500 – $2,800',
    annualIncome: '$18,000 – $34,000',
    color: '#EF4444',
    bg: 'bg-red-950',
    border: 'border-red-900',

    car: {
      icon: '🚗',
      description: '1995–2010 sedan or hatchback with 150k+ miles. You\'re hoping it passes smog. You know the check engine light by heart.',
      example: 'Honda Civic with a cracked bumper. Paid $1,800 cash.',
    },
    home: {
      icon: '🏠',
      description: 'Shared apartment with roommates, or still at home with family. Maybe a room in a boarding house. You split bills with 2–3 people.',
      example: 'Section 8 housing or $800/month shared room in someone\'s house.',
    },
    food: {
      icon: '🍔',
      description: 'Fast food most days. Dollar menu. Ramen when money is really short. Maybe cooking at home when you plan ahead. No restaurants.',
      example: 'McDonald\'s, Popeyes, or whatever is cheapest near you.',
    },
    weekends: {
      icon: '📱',
      description: 'Staying home. Scrolling. Maybe a friend\'s house. No budget for entertainment. Every dollar has to stretch.',
      example: 'Watching Netflix on someone else\'s account. Can\'t afford new clothes.',
    },
    vacation: {
      icon: '🚌',
      description: 'No vacation. Maybe a road trip if someone else drives. Definitely not flying anywhere.',
      example: 'Taking the bus to visit family in the next city.',
    },
    savingsRate: 'Zero savings. Living paycheck to paycheck. One emergency away from crisis.',
    motivation: 'This is where you end up if nothing changes. Not a judgment — a data point. You were built for more than this.',
  },
  {
    id: 'working',
    label: 'Working Class',
    monthlyIncome: '$3,000 – $4,500',
    annualIncome: '$36,000 – $54,000',
    color: '#F59E0B',
    bg: 'bg-amber-950',
    border: 'border-amber-900',

    car: {
      icon: '🚙',
      description: 'A reliable used car — 4–8 years old. Nothing flashy but it runs clean and you can afford the insurance. Maybe still making payments.',
      example: '2017 Toyota Camry or Honda Accord. $12,000 used. $280/month payment.',
    },
    home: {
      icon: '🏡',
      description: 'Your own 1-bedroom apartment. Small, but it\'s yours. In a working-class neighborhood — not dangerous, not glamorous. You pay your own rent.',
      example: '$1,400–1,800/month 1-bedroom apartment. You own a couch and a bed.',
    },
    food: {
      icon: '🍕',
      description: 'Cooking most meals at home. Fast food occasionally. You can go to Chili\'s or Applebee\'s for a birthday. Nothing fancy, but you eat.',
      example: 'Grocery store runs. Meal prepping on Sundays. Chipotle as a treat.',
    },
    weekends: {
      icon: '🎮',
      description: 'You can go out occasionally. Maybe movies, a local event, or a friend\'s cookout. You budget for fun but think about every purchase.',
      example: 'AMC movie once a month. A few nights out per month with a $50 budget.',
    },
    vacation: {
      icon: '🚗',
      description: 'A road trip once a year, maybe a budget airline flight to see family. You plan for it months in advance.',
      example: 'Southwest airlines. 3-night trip. Splitting an Airbnb with someone.',
    },
    savingsRate: 'Saving $100–300/month when possible. Enough for a small emergency fund over time.',
    motivation: 'Steady ground. You\'re stable but not free. One big bill could still shake you. This is where you are going if you put in moderate effort. But you can do better.',
  },
  {
    id: 'comfortable',
    label: 'Comfortable',
    monthlyIncome: '$5,500 – $8,000',
    annualIncome: '$66,000 – $96,000',
    color: '#10B981',
    bg: 'bg-emerald-950',
    border: 'border-emerald-900',

    car: {
      icon: '🚘',
      description: 'A newer car — 2–4 years old. You have options. Clean, reliable, maybe a small luxury package. People notice it without being flashy.',
      example: '2022 Toyota Camry XSE, Honda Accord Sport, or Kia Telluride. $28,000. You own it.',
    },
    home: {
      icon: '🏠',
      description: 'A 2-bedroom apartment in a decent neighborhood, or you\'re starting to think about buying. You have space. You can have people over without embarrassment.',
      example: '$2,000–2,500/month 2-bed apartment or condo in a good area.',
    },
    food: {
      icon: '🍽️',
      description: 'You cook but you can eat out without stress. Real restaurants a few times a month. You don\'t check your bank account before ordering.',
      example: 'Date night at a $60 restaurant. Brunch on Sundays. Groceries from Whole Foods sometimes.',
    },
    weekends: {
      icon: '🎤',
      description: 'You can actually do things. Concerts, games, weekend getaways, dinners. You have a social life and you can afford to show up for it.',
      example: 'Warriors game with actual seats. A weekend in LA or Vegas with friends.',
    },
    vacation: {
      icon: '✈️',
      description: 'A real vacation once a year. Flying. Hotel, not someone\'s couch. You can afford to relax without thinking about every meal price.',
      example: 'Cancun, Atlanta, or Miami. One week. Actual hotel room. Rental car.',
    },
    savingsRate: 'Saving $500–1,000/month. Building a real emergency fund. Starting a 401k.',
    motivation: 'This is where your career puts you after 3–5 years of real effort. You feel the difference. You\'re not rich but you\'re free from financial panic. This is the floor — not the ceiling.',
  },
  {
    id: 'affluent',
    label: 'Affluent',
    monthlyIncome: '$9,000 – $18,000+',
    annualIncome: '$108,000 – $220,000+',
    color: '#8B5CF6',
    bg: 'bg-violet-950',
    border: 'border-violet-900',

    car: {
      icon: '🏎️',
      description: 'You drive what you want. A luxury sedan, an SUV with the full package, or something that turns heads on the block. It\'s not about status — it\'s about the fact that you can.',
      example: '2024 BMW 5-Series, Mercedes C-Class, or a loaded Escalade. You have multiple cars.',
    },
    home: {
      icon: '🏰',
      description: 'You own your home — or you\'re renting something that feels like you own it. A house, a nice condo, somewhere your family can come to without you apologizing for the space.',
      example: '$450,000 home in a suburb or $3,500/month high-end apartment with amenities and a view.',
    },
    food: {
      icon: '🥩',
      description: 'You eat well — consistently. Real restaurants, quality groceries, meal delivery when you\'re tired. You think about what you want to eat, not what you can afford.',
      example: 'Steakhouse for celebrations. Sushi when you feel like it. Organic groceries. Meal service subscription.',
    },
    weekends: {
      icon: '🎲',
      description: 'Your weekends are yours. Courtside tickets. Private events. Golf. Trips you planned because you wanted to — not because you saved up for two years.',
      example: 'Season tickets to the Warriors or Raiders. Weekend in Vegas in an actual suite.',
    },
    vacation: {
      icon: '🌎',
      description: 'Multiple vacations a year. International destinations. First-class or business class when it makes sense. Your kids travel.',
      example: 'Two weeks in Europe. A trip to Jamaica. Business class from Oakland to New York.',
    },
    savingsRate: 'Investing $2,000–5,000/month. Building generational wealth. Setting money aside for your kids.',
    motivation: 'This is what happens when you choose the career, do the degree, stay the course. This is not a dream — this is the documented outcome of the path in front of you RIGHT NOW. The difference between this life and the first tier is one decision, made consistently, over time.',
  },
];

export default function LifestyleVisionCard({ lifestyleBudget, accent }) {
  const currentTier = lifestyleBudget?.tier || 'comfortable';

  // Map our budget tiers to lifestyle tier IDs
  const tierMap = { modest: 'working', comfortable: 'comfortable', aspirational: 'affluent' };
  const selectedTierId = tierMap[currentTier] || 'comfortable';
  const selectedIndex = LIFESTYLE_TIERS.findIndex(t => t.id === selectedTierId);

  return (
    <div className="space-y-4">
      <div className="card border border-white/10">
        <p className={`text-xs font-semibold uppercase tracking-widest mb-1`} style={{ color: accent?.hex || '#06B6D4' }}>
          Financial Life Vision
        </p>
        <p className="text-white text-sm font-semibold mb-1">What does the life you described actually look like?</p>
        <p className="text-white/40 text-xs mb-4">
          Based on your answers, this is the lifestyle you said you want. Here is what that life actually costs — and what it looks like day to day. This is why the work matters.
        </p>

        {/* Tier selector */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {LIFESTYLE_TIERS.map((tier, i) => (
            <div
              key={tier.id}
              className={`p-3 rounded-xl border text-left transition-all ${
                tier.id === selectedTierId
                  ? `${tier.border} ${tier.bg}`
                  : 'border-white/10 bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold text-white/70">{tier.label}</p>
                {tier.id === selectedTierId && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full text-white/90" style={{ backgroundColor: tier.color, fontSize: '10px' }}>
                    Your Goal
                  </span>
                )}
              </div>
              <p className="text-white text-xs font-bold">{tier.annualIncome}/yr</p>
              <p className="text-white/30 text-xs">{tier.monthlyIncome}/mo</p>
            </div>
          ))}
        </div>

        {/* Selected tier detail */}
        {LIFESTYLE_TIERS.filter(t => t.id === selectedTierId).map(tier => (
          <div key={tier.id} className={`rounded-xl border ${tier.border} ${tier.bg} p-4`}>
            <p className="font-bold text-white text-base mb-4" style={{ color: tier.color }}>
              The {tier.label} Life — What It Really Looks Like
            </p>

            <div className="space-y-4">
              {[
                { label: 'Your Car', data: tier.car },
                { label: 'Where You Live', data: tier.home },
                { label: 'How You Eat', data: tier.food },
                { label: 'Your Weekends', data: tier.weekends },
                { label: 'Your Vacations', data: tier.vacation },
              ].map(({ label, data }) => (
                <div key={label} className="border-t border-white/10 pt-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{data.icon}</span>
                    <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">{label}</p>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-1">{data.description}</p>
                  <p className="text-white/40 text-xs italic">{data.example}</p>
                </div>
              ))}

              <div className="border-t border-white/10 pt-3">
                <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">Savings Reality</p>
                <p className="text-white/70 text-sm">{tier.savingsRate}</p>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-white/80 text-sm leading-relaxed font-medium" style={{ color: tier.color }}>
                  {tier.motivation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* What separates the tiers */}
      <div className="card border border-white/10">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">What Separates Each Tier</p>
        <div className="space-y-2">
          {[
            { from: 'Struggling → Working', action: 'Getting any consistent job and keeping it for 12+ months' },
            { from: 'Working → Comfortable', action: 'Completing your degree and entering your target career field' },
            { from: 'Comfortable → Affluent', action: 'Staying in your career 5+ years, getting promoted, and not lifestyle-creeping your raises' },
          ].map(({ from, action }) => (
            <div key={from} className="flex items-start gap-3 p-3 rounded-xl bg-white/5">
              <span className="text-white/30 text-xs flex-shrink-0 mt-0.5 font-mono">{from}</span>
              <p className="text-white/70 text-xs leading-snug">{action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
