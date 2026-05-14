import { UserStats } from '../types';
import { STOCKS } from '../constants';
import { TrendingUp, ArrowUpRight, Coins, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onStockClick: (ticker: string) => void;
  onConvert?: (amount: number) => void;
  stats: UserStats;
}

export default function PortfolioView({ onStockClick, onConvert, stats }: Props) {
  const handleConvert = () => {
    if (onConvert) {
      if (stats.coins >= 100) {
        onConvert(100);
      } else {
        alert("You need at least 100 coins to convert to cash!");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in fade-in duration-700">
      {/* Portfolio Summary Card */}
      <section className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 flex flex-col items-end gap-2">
          <div className="bg-primary/20 text-primary px-3 py-1 rounded text-[10px] font-bold font-mono border border-primary/30 tracking-widest">LIVE</div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={handleConvert}
            className="bg-tertiary-container/20 text-tertiary px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono border border-tertiary/30 cursor-pointer flex items-center gap-2 hover:bg-tertiary-container/30 transition-all"
          >
            <RefreshCw className="w-3 h-3" />
            <span>CONVERT 100 🪙</span>
          </motion.div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div>
            <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Total Portfolio Value</p>
            <h2 className="text-4xl font-bold text-on-surface tracking-tight font-display">SGD {stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Today's P/L</p>
              <p className="font-data text-gain font-bold">+$1,240.15 (+0.87%)</p>
            </div>
            <div className="space-y-1 border-l border-outline-variant pl-4">
              <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Total P/L</p>
              <p className="font-data text-gain font-bold">+${stats.totalEarnings.toLocaleString()} (+11.04%)</p>
            </div>
          </div>
        </div>

        {/* Allocation Bar */}
        <div className="space-y-2">
          <div className="flex justify-between font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-widest">
            <span>Sector Allocation</span>
            <span>100% Deployed</span>
          </div>
          <div className="h-2 w-full flex rounded-full overflow-hidden bg-surface-container-highest">
            <div className="h-full bg-primary w-[40%]" title="REITS"></div>
            <div className="h-full bg-secondary w-[25%]" title="Finance"></div>
            <div className="h-full bg-tertiary w-[20%]" title="Industrial"></div>
            <div className="h-full bg-outline w-[15%]" title="Others"></div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="font-mono text-[10px] text-on-surface font-bold">REITS 40%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <span className="font-mono text-[10px] text-on-surface font-bold">FINANCE 25%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-tertiary"></div>
              <span className="font-mono text-[10px] text-on-surface font-bold">IND 20%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Holdings */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-on-surface font-display">Holdings</h3>
          <span className="font-mono text-xs text-primary font-bold tracking-tight cursor-pointer hover:underline uppercase">View All</span>
        </div>
        
        <div className="grid gap-3">
          {[STOCKS[0], STOCKS[1]].map((stock) => (
            <motion.div
              key={stock.ticker}
              whileHover={{ y: -2 }}
              onClick={() => onStockClick(stock.ticker)}
              className="bg-surface-container-low p-5 rounded-xl border border-outline-variant hover:bg-surface-container-high transition-all cursor-pointer shadow-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-data text-primary font-bold text-lg leading-tight tracking-tight">{stock.ticker.split('.')[0]}</h4>
                  <p className="text-[11px] text-on-surface-variant font-medium mt-0.5">{stock.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-data text-on-surface font-bold">{stock.price.toFixed(2)}</p>
                  <p className={`font-mono text-[10px] font-bold ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.changePercent >= 0 ? '+' : '-'}{Math.abs(stock.changePercent)}%
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-end">
                <div className="flex gap-4">
                  <div>
                    <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">Qty</p>
                    <p className="font-data text-xs font-bold text-on-surface">1,200</p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">Avg</p>
                    <p className="font-data text-xs font-bold text-on-surface">31.20</p>
                  </div>
                </div>
                <div className="text-right">
                   <p className="font-data text-gain font-bold text-md tracking-tight">+$4,344.00</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Market Sentiment Chart */}
      <section className="bg-surface-container-low p-5 rounded-xl border border-outline-variant mb-10 overflow-hidden relative">
        <div className="flex justify-between items-center mb-6">
          <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Market Sentiment (STI)</p>
          <TrendingUp className="text-primary w-4 h-4" />
        </div>
        <div className="h-32 w-full relative">
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(183, 196, 255, 0.2)" />
                <stop offset="100%" stopColor="rgba(183, 196, 255, 0)" />
              </linearGradient>
            </defs>
            <path d="M0,80 Q50,70 100,75 T200,40 T300,50 T400,20 L400,100 L0,100 Z" fill="url(#sentimentGradient)" />
            <path d="M0,80 Q50,70 100,75 T200,40 T300,50 T400,20" fill="transparent" stroke="#b7c4ff" strokeWidth="2.5" />
          </svg>
        </div>
        <div className="flex justify-between mt-3 font-mono text-[9px] text-on-surface-variant font-bold">
          <span>09:00</span>
          <span>12:00</span>
          <span>15:00</span>
          <span>17:00 (CLOSE)</span>
        </div>
      </section>
    </div>
  );
}
