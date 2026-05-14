import { STOCKS } from '../constants';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  onStockClick: (ticker: string) => void;
}

export default function MarketView({ onStockClick }: Props) {
  const topGainers = [...STOCKS].sort((a, b) => b.changePercent - a.changePercent).slice(0, 4);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-500">
      {/* STI Index Banner */}
      <section className="px-4 py-4 bg-surface-container-low border-b border-outline-variant">
        <div className="flex justify-between items-end">
          <div>
            <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Straits Times Index (STI)</span>
            <div className="flex items-baseline gap-2 mt-1">
              <h2 className="text-2xl font-bold text-on-surface font-display">3,245.18</h2>
              <span className="font-data text-gain">+12.45 (0.38%)</span>
            </div>
          </div>
          <div className="h-10 w-24">
            <svg className="w-full h-full stroke-gain fill-none stroke-2" viewBox="0 0 100 40">
              <path d="M0 35 Q 20 25, 40 30 T 80 10 T 100 5"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Market Heatmap */}
      <section className="px-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-mono text-xs text-primary font-bold uppercase tracking-widest">Market Heatmap</h3>
          <span className="font-mono text-[10px] text-on-surface-variant uppercase bg-surface-container-high px-2 py-0.5 rounded-sm">By Mkt Cap</span>
        </div>
        <div className="grid grid-cols-6 grid-rows-4 gap-1 h-64">
          <div className="col-span-3 row-span-4 bg-gain/20 border border-gain/40 flex flex-col items-center justify-center rounded-sm hover:brightness-125 transition-all cursor-pointer" onClick={() => onStockClick('D05.SI')}>
            <span className="font-mono text-xs font-bold">DBS</span>
            <span className="font-data text-xs text-gain">+1.2%</span>
          </div>
          <div className="col-span-3 row-span-2 bg-gain/10 border border-gain/20 flex flex-col items-center justify-center rounded-sm hover:brightness-125 transition-all cursor-pointer" onClick={() => onStockClick('U11.SI')}>
            <span className="font-mono text-xs font-bold">UOB</span>
            <span className="font-data text-xs text-gain">+0.4%</span>
          </div>
          <div className="col-span-2 row-span-2 bg-loss/20 border border-loss/40 flex flex-col items-center justify-center rounded-sm hover:brightness-125 transition-all cursor-pointer">
            <span className="font-mono text-xs font-bold text-on-surface">Z74</span>
            <span className="font-data text-xs text-loss">-2.1%</span>
          </div>
          <div className="col-span-1 row-span-2 bg-surface-container-highest border border-outline-variant flex flex-col items-center justify-center rounded-sm">
            <span className="font-mono text-[10px] text-on-surface-variant font-bold">C31</span>
            <span className="font-data text-[10px] text-on-surface-variant">0.0%</span>
          </div>
        </div>
      </section>

      {/* Top Gainers */}
      <section className="px-4">
        <div className="flex gap-4 border-b border-outline-variant mb-4 overflow-x-auto scrollbar-hide py-1">
          <button className="pb-2 border-b-2 border-primary text-primary font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Gainers</button>
          <button className="pb-2 text-on-surface-variant font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Losers</button>
          <button className="pb-2 text-on-surface-variant font-mono text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">Volume</button>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 py-1 bg-surface-container-low rounded-t-sm border-x border-t border-outline-variant/30">
            <span className="font-mono text-[9px] text-on-surface-variant uppercase w-1/2">Instrument</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase w-1/4 text-right">Price</span>
            <span className="font-mono text-[9px] text-on-surface-variant uppercase w-1/4 text-right">Change</span>
          </div>
          {topGainers.map((stock) => (
            <motion.div
              key={stock.ticker}
              whileHover={{ x: 4 }}
              onClick={() => onStockClick(stock.ticker)}
              className="flex items-center justify-between p-3 bg-surface-container border border-outline-variant/30 cursor-pointer hover:bg-surface-container-high transition-colors"
            >
              <div className="w-1/2">
                <div className="text-sm font-bold text-on-surface">{stock.name}</div>
                <div className="font-mono text-[10px] text-on-surface-variant">{stock.ticker}</div>
              </div>
              <div className="w-1/4 text-right font-data text-sm">{stock.price.toFixed(3)}</div>
              <div className="w-1/4 text-right">
                <span className={`px-2 py-0.5 rounded-sm font-data text-[11px] ${stock.changePercent >= 0 ? 'bg-gain/10 text-gain' : 'bg-loss/10 text-loss'}`}>
                  {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sector Trends */}
      <section className="px-4 mb-4">
        <h3 className="font-mono text-xs text-primary font-bold uppercase tracking-widest mb-4">Sector Trends</h3>
        <div className="flex overflow-x-auto gap-3 scrollbar-hide -mx-4 px-4 pb-2">
          {['Financials', 'REITs', 'Telecom', 'Industrial'].map((sector) => (
            <div key={sector} className="min-w-[140px] bg-surface-container p-4 border border-outline-variant rounded-sm hover:border-primary/50 transition-colors">
              <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">{sector}</span>
              <div className={`font-data text-lg mt-1 ${sector === 'REITs' || sector === 'Telecom' ? 'text-loss' : 'text-gain'}`}>
                {sector === 'REITs' || sector === 'Telecom' ? '-' : '+'}{(Math.random() * 2).toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
