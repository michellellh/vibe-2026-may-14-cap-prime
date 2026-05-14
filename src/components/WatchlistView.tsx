import { STOCKS } from '../constants';
import { motion } from 'motion/react';
import { Eye, Search, Landmark, Star, Trash2 } from 'lucide-react';

interface Props {
  onStockClick: (ticker: string) => void;
  watchlist: string[];
}

export default function WatchlistView({ onStockClick, watchlist }: Props) {
  const watchedStocks = STOCKS.filter(s => watchlist.includes(s.ticker));

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
            <Star className="w-5 h-5 text-primary fill-primary/20" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-on-surface font-display tracking-tight">Market Watchlist</h2>
            <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">{watchlist.length} Stocks Tracked</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-surface-container-high border border-outline-variant rounded-lg group hover:brightness-110 transition-all">
          <Search className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Search</span>
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="bg-surface-container rounded-2xl p-12 border border-dashed border-outline-variant flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 bg-surface-container-high rounded-full flex items-center justify-center">
            <Eye className="w-8 h-8 text-outline-variant opacity-50" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface font-display">Your list is empty</h3>
            <p className="text-on-surface-variant text-sm mt-1 max-w-xs">Add stocks to your watchlist to track their real-time performance and receive alerts.</p>
          </div>
          <button className="mt-2 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-xl font-mono text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all">
            Find Stocks
          </button>
        </div>
      ) : (
        <div className="grid gap-3 mb-10">
          {watchedStocks.map((stock) => (
            <motion.div
              layout
              key={stock.ticker}
              whileHover={{ x: 4 }}
              onClick={() => onStockClick(stock.ticker)}
              className="bg-surface-container p-4 rounded-xl border border-outline-variant flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center border border-outline-variant group-hover:border-primary/30 transition-colors">
                   <div className="flex flex-col items-center">
                    <span className="font-data text-xs font-bold text-primary">{stock.ticker.split('.')[0]}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-on-surface">{stock.name}</h4>
                  <p className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-tighter">{stock.sector}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-data text-on-surface font-bold text-lg">{stock.price.toFixed(2)}</div>
                  <div className={`font-mono text-[10px] font-bold flex items-center justify-end ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </div>
                </div>
                <div className="h-10 w-px bg-outline-variant/30 hidden sm:block"></div>
                <button 
                  className="p-2 text-on-surface-variant hover:text-loss transition-colors opacity-0 group-hover:opacity-100 hidden sm:block"
                  onClick={(e) => { e.stopPropagation(); /* Logic handled via detail view for now */ }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Suggested Stocks for Watchlist */}
      {watchlist.length > 0 && (
        <section className="space-y-4 mb-20">
          <h3 className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Trending in SGX</h3>
          <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 flex gap-3">
            {STOCKS.filter(s => !watchlist.includes(s.ticker)).slice(0, 3).map((stock) => (
              <div 
                key={stock.ticker}
                onClick={() => onStockClick(stock.ticker)}
                className="min-w-[160px] bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col gap-2 hover:bg-surface-container transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] text-primary font-bold">{stock.ticker}</span>
                  <div className={`font-data text-[10px] font-bold ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </div>
                </div>
                <div className="font-data text-on-surface font-bold text-lg">{stock.price}</div>
                <button className="mt-1 w-full py-2 bg-surface-container-high border border-outline-variant rounded-lg font-mono text-[8px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all">
                  Quick Add
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
