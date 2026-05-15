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
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20">
            <Star className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-on-surface font-display tracking-tight">Market Watchlist</h2>
            <p className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none mt-1">{watchlist.length} Stocks Tracked</p>
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-2.5 bg-surface-container-high border border-outline-variant rounded-xl group hover:brightness-110 transition-all">
          <Search className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">Search</span>
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="bg-surface-container rounded-3xl p-16 border-2 border-dashed border-outline-variant/50 flex flex-col items-center justify-center text-center gap-6 shadow-sm">
          <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center shadow-inner">
            <Eye className="w-10 h-10 text-outline-variant/70" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-on-surface font-display">Your list is empty</h3>
            <p className="text-on-surface-variant text-base mt-2 max-w-sm leading-relaxed">Add stocks to your watchlist to track their real-time performance and receive alerts.</p>
          </div>
          <button className="mt-4 bg-primary-container text-on-primary-container px-8 py-3.5 rounded-2xl font-mono text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary-container/20">
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
              className="bg-surface-container p-5 rounded-2xl border border-outline-variant flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer group shadow-sm"
            >
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-surface-container-highest rounded-2xl flex items-center justify-center border border-outline-variant group-hover:border-primary/50 transition-all">
                   <div className="flex flex-col items-center">
                    <span className="font-data text-sm font-black text-primary">{stock.ticker.split('.')[0]}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-on-surface group-hover:text-primary transition-colors leading-tight">{stock.name}</h4>
                  <p className="font-mono text-xs text-on-surface-variant font-black uppercase tracking-widest mt-1">{stock.sector}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="font-data text-on-surface font-black text-xl tracking-tight leading-none mb-1">{stock.price.toFixed(2)}</div>
                  <div className={`font-mono text-xs font-black flex items-center justify-end ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </div>
                </div>
                <div className="h-12 w-px bg-outline-variant/30 hidden sm:block"></div>
                <button 
                  className="p-2.5 text-on-surface-variant hover:text-loss transition-all opacity-0 group-hover:opacity-100 hidden sm:block hover:bg-loss/10 rounded-lg"
                  onClick={(e) => { e.stopPropagation(); /* Logic handled via detail view for now */ }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Suggested Stocks for Watchlist */}
      {watchlist.length > 0 && (
        <section className="space-y-6 mb-20 pt-6">
          <h3 className="font-mono text-xs text-on-surface-variant font-black uppercase tracking-[0.2em] px-1">Trending in SGX</h3>
          <div className="overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 flex gap-4">
            {STOCKS.filter(s => !watchlist.includes(s.ticker)).slice(0, 3).map((stock) => (
              <div 
                key={stock.ticker}
                onClick={() => onStockClick(stock.ticker)}
                className="min-w-[190px] bg-surface-container-low p-5 rounded-2xl border border-outline-variant flex flex-col gap-3 hover:bg-surface-container hover:border-primary/30 transition-all cursor-pointer shadow-sm group"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-xs text-primary font-black tracking-widest">{stock.ticker}</span>
                  <div className={`font-data text-xs font-black ${stock.changePercent >= 0 ? 'text-gain' : 'text-loss'}`}>
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%
                  </div>
                </div>
                <div className="font-data text-on-surface font-black text-xl leading-none mt-1">{stock.price.toFixed(2)}</div>
                <button className="mt-2 w-full py-2.5 bg-surface-container-high border border-outline-variant rounded-xl font-mono text-[10px] font-black uppercase tracking-widest text-on-surface-variant group-hover:text-primary group-hover:border-primary/20 transition-all">
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
