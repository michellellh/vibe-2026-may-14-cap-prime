import { STOCKS } from '../constants';
import { RotateCcw, ChevronDown, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onStockClick: (ticker: string) => void;
}

export default function ScreenerView({ onStockClick }: Props) {
  const sectors = ['ALL SECTORS', 'REITS', 'BANKS', 'INDUSTRIALS', 'REAL ESTATE'];

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-on-surface font-display">Equity Screener</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant rounded-xl text-on-surface-variant hover:text-on-surface transition-colors">
          <RotateCcw className="w-5 h-5" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Reset</span>
        </button>
      </div>

      {/* Sector Chips */}
      <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
        {sectors.map((sector, i) => (
          <button
            key={sector}
            className={`shrink-0 px-6 py-3 border rounded-full font-mono text-xs font-black uppercase tracking-wide transition-all ${
              i === 0 
                ? 'bg-secondary-container text-on-secondary-container border-primary/20' 
                : 'bg-surface-container border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {sector}
          </button>
        ))}
      </div>

      {/* Advanced Filters Bento */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container p-5 rounded-2xl border border-outline-variant space-y-4">
          <label className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest block">Dividend Yield</label>
          <div className="flex items-end justify-between">
            <span className="font-data text-2xl text-primary font-bold tracking-tight">&gt; 4.5%</span>
          </div>
          <div className="h-1.5 w-full bg-outline-variant rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-[60%] bg-primary rounded-full"></div>
            <div className="absolute left-[60%] top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-surface shadow-xl"></div>
          </div>
        </div>

        <div className="bg-surface-container p-5 rounded-2xl border border-outline-variant space-y-4">
          <label className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest block">P/E Ratio</label>
          <div className="flex items-end justify-between">
            <span className="font-data text-2xl text-primary font-bold tracking-tight">&lt; 12x</span>
          </div>
          <div className="h-1.5 w-full bg-outline-variant rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-[40%] bg-primary rounded-full"></div>
            <div className="absolute left-[40%] top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-surface shadow-xl"></div>
          </div>
        </div>

        <div className="col-span-2 bg-surface-container p-5 rounded-2xl border border-outline-variant space-y-4">
          <div className="flex justify-between items-center text-center sm:text-left">
            <label className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest">Market Cap (SGD)</label>
            <span className="font-data text-base text-primary font-bold">$1B — $50B</span>
          </div>
          <div className="h-1.5 w-full bg-outline-variant rounded-full relative">
            <div className="absolute left-[20%] top-0 h-full w-[50%] bg-primary rounded-full"></div>
            <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-surface"></div>
            <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full border-4 border-surface"></div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <section className="space-y-4 mb-10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-on-surface-variant font-bold tracking-widest leading-none">32 STOCKS FOUND</span>
          <div className="flex items-center gap-1.5 cursor-pointer group">
            <span className="font-mono text-sm text-primary font-bold uppercase tracking-tight group-hover:underline leading-none">Sort by Yield</span>
            <ArrowDown className="text-primary w-5 h-5 transition-transform group-hover:translate-y-0.5" />
          </div>
        </div>

        <div className="overflow-hidden bg-surface-container rounded-2xl border border-outline-variant shadow-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-high border-b border-outline-variant">
                <th className="py-5 px-5 font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-widest">Ticker</th>
                <th className="py-5 px-5 font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-widest text-right">Price</th>
                <th className="py-5 px-5 font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-widest text-right">Yield</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {STOCKS.map((stock) => (
                <tr 
                  key={stock.ticker} 
                  onClick={() => onStockClick(stock.ticker)}
                  className="hover:bg-surface-container-highest transition-colors cursor-pointer group active:opacity-80 transition-opacity"
                >
                  <td className="py-5 px-5">
                    <div className="flex flex-col">
                      <span className="font-data font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-none mb-1">{stock.ticker}</span>
                      <span className="text-xs text-on-surface-variant font-medium uppercase tracking-tight">{stock.name}</span>
                    </div>
                  </td>
                  <td className="py-5 px-5 text-right">
                    <span className="font-data text-base font-bold text-on-surface">{stock.price.toFixed(2)}</span>
                    <div className={`text-xs mt-1 font-bold ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                    </div>
                  </td>
                  <td className="py-5 px-5 text-right">
                    <span className="font-data text-lg text-primary font-bold">{stock.yield}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button className="w-full py-5 border border-dashed border-outline-variant rounded-2xl flex items-center justify-center gap-3 hover:bg-surface-container transition-colors group">
          <span className="font-mono text-xs font-bold text-on-surface-variant tracking-widest group-hover:text-on-surface transition-colors uppercase">Load More Results</span>
          <ChevronDown className="text-on-surface-variant w-6 h-6 transition-transform group-hover:translate-y-0.5" />
        </button>
      </section>
    </div>
  );
}
