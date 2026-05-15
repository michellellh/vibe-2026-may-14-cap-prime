import React from 'react';
import { ArrowLeft, Star, Landmark, ChevronRight, Fullscreen } from 'lucide-react';
import { STOCKS, NEWS } from '../constants';
import { motion } from 'motion/react';

interface Props {
  ticker: string;
  onBack: () => void;
  onTradeComplete?: () => void;
  isInWatchlist?: boolean;
  onToggleWatchlist?: () => void;
}

export default function StockDetailView({ 
  ticker, 
  onBack, 
  onTradeComplete, 
  isInWatchlist, 
  onToggleWatchlist 
}: Props) {
  const stock = STOCKS.find(s => s.ticker === ticker) || STOCKS[0];

  const handleTrade = () => {
    // Simulate trade logic
    if (onTradeComplete) {
      onTradeComplete();
    }
    alert(`Trade executed for ${stock.ticker}. You earned 20 XP and 5 Coins!`);
  };

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWatchlist) {
      onToggleWatchlist();
    }
  };

  return (
    <div className="flex flex-col animate-in zoom-in-95 duration-500">
      {/* Stock Sub-Header */}
      <section className="px-4 py-8 border-b border-outline-variant bg-surface-container-lowest">
        <button onClick={onBack} className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface transition-colors mb-8 group">
          <ArrowLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">Back to Markets</span>
        </button>
        
        <div className="flex justify-between items-start">
          <div>
            <span className="font-mono text-xs text-primary font-bold tracking-[0.2em] uppercase">SGX: {stock.ticker.split('.')[0]}</span>
            <h2 className="text-3xl font-bold text-on-surface font-display mt-2">{stock.name}</h2>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-on-surface font-display tracking-tight leading-none">{stock.price.toFixed(2)}</div>
            <div className={`flex items-center justify-end font-data text-base mt-2 font-bold ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
               {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}% 
               <span className="text-sm ml-1.5 opacity-70">({(stock.price * stock.changePercent / 100).toFixed(2)})</span>
            </div>
          </div>
        </div>
      </section>

      <main className="px-4 py-6 space-y-8">
        {/* Chart Container */}
        <div className="bg-surface-container border border-outline-variant rounded-2xl p-6 shadow-inner">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              {['1D', '1W', '1M', '1Y', 'ALL'].map((range, i) => (
                <button 
                  key={range} 
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all ${
                    i === 0 ? 'bg-primary-container text-on-primary-container' : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            <Fullscreen className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-on-surface transition-colors" />
          </div>

          <div className="h-64 w-full relative">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              {/* Candlesticks Mockup */}
              {[120, 100, 110, 70, 50, 60, 30, 40, 55, 20, 10, 15].map((y, i) => {
                const isLoss = i === 2 || i === 5 || i === 8;
                const color = isLoss ? 'var(--loss)' : 'var(--gain)';
                const height = 40 + Math.random() * 30;
                return (
                  <g key={i}>
                    <line x1={30 + i * 30} x2={30 + i * 30} y1={y-10} y2={y+height+10} stroke={color} strokeWidth="1" />
                    <rect x={26 + i * 30} y={y} width="8" height={height} fill={color} />
                  </g>
                );
              })}
            </svg>
            <div className="absolute top-4 right-4 bg-surface-container-highest/80 backdrop-blur border border-outline-variant p-4 rounded-xl shadow-xl">
              <div className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none mb-1">Val 1.2M</div>
              <div className="font-data text-base text-primary font-bold">{stock.price.toFixed(2)}</div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              onClick={handleToggleWatchlist}
              className={`flex-1 h-14 flex items-center justify-center gap-2 border transition-all rounded-xl active:scale-95 group ${
                isInWatchlist 
                  ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(183,196,255,0.1)]' 
                  : 'bg-surface-container-high border-outline-variant text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              <Star className={`w-5 h-5 transition-colors ${isInWatchlist ? 'fill-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest">
                {isInWatchlist ? 'In Watchlist' : 'Watchlist'}
              </span>
            </button>
            <button 
              onClick={handleTrade}
              className="flex-1 bg-primary-container text-on-primary-container h-14 flex items-center justify-center gap-2 hover:brightness-110 transition-all rounded-xl active:scale-95 shadow-lg shadow-primary-container/20"
            >
              <Landmark className="w-5 h-5" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest">Trade</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <section className="grid grid-cols-2 gap-4">
          {[
            { label: 'Market Cap', val: stock.marketCap },
            { label: 'P/E Ratio', val: stock.peRatio },
            { label: 'Div Yield', val: `${stock.yield}%` },
            { label: 'Beta (5Y)', val: stock.beta || '0.92' }
          ].map((metric) => (
            <div key={metric.label} className="bg-surface-container p-5 border border-outline-variant rounded-xl hover:border-primary/30 transition-colors shadow-sm">
              <div className="font-mono text-on-surface-variant text-[11px] font-bold uppercase tracking-widest mb-1">{metric.label}</div>
              <div className="font-data text-on-surface text-xl font-bold tracking-tight">{metric.val}</div>
            </div>
          ))}
        </section>

        {/* Financial News Feed */}
        <section className="space-y-6 pb-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-on-surface font-display">Financial News</h3>
            <span className="font-mono text-xs text-primary font-bold tracking-tight cursor-pointer hover:underline uppercase">View All</span>
          </div>
          
          <div className="space-y-8 divide-y divide-outline-variant/30">
            {NEWS.map((item) => (
              <motion.div key={item.id} whileHover={{ x: 4 }} className="flex gap-6 pt-8 first:pt-0 group cursor-pointer transition-all">
                <div className="flex-grow">
                  <span className="font-mono text-gain text-[10px] font-bold uppercase tracking-[0.25em]">{item.source}</span>
                  <h4 className="text-lg font-bold text-on-surface leading-snug mt-1.5 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-on-surface-variant text-sm mt-2.5 font-medium leading-relaxed">{item.time} • {item.readTime}</p>
                </div>
                <div className="w-28 h-28 bg-surface-container-highest rounded-2xl overflow-hidden flex-shrink-0 border border-outline-variant">
                  <img className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 active:scale-110" src={item.image} alt={item.imageAlt} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
