import { Zap, Coins, Wallet } from 'lucide-react';
import { UserStats } from '../types';
import { motion } from 'motion/react';

interface Props {
  stats: UserStats;
  onCoinClick?: () => void;
}

export default function UserStatusBar({ stats, onCoinClick }: Props) {
  const xpForNextLevel = stats.level * 100;
  const progress = (stats.xp / xpForNextLevel) * 100;

  return (
    <div className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-3 flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {/* Enriched Level Graphic */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-container to-primary flex flex-col items-center justify-center text-on-primary-container shadow-lg shadow-primary/20 border border-primary/30">
            <span className="font-mono text-[8px] font-black uppercase leading-none opacity-80 mb-0.5">Level</span>
            <span className="font-display font-bold text-xl leading-none">{stats.level}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 min-w-[120px]">
          <div className="flex justify-between items-end font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-tight">
            <span>Progress</span>
            <span className="text-primary">{stats.xp} / {xpForNextLevel} XP</span>
          </div>
          <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/50">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary/80 to-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: 'backOut' }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCoinClick}
          className="flex items-center gap-2 bg-surface-container-high hover:bg-surface-container-highest px-4 py-2 rounded-xl border border-outline-variant transition-all cursor-pointer group"
        >
          <Coins className="w-4 h-4 text-tertiary group-hover:rotate-12 transition-transform" />
          <div className="flex flex-col items-start leading-none">
            <span className="font-data text-sm font-bold text-on-surface tabular-nums">{stats.coins}</span>
            <span className="font-mono text-[8px] text-tertiary font-bold uppercase mt-0.5">Redeem</span>
          </div>
        </motion.button>
        
        <div className="hidden sm:flex items-center gap-2 bg-surface-container-high px-4 py-2 rounded-xl border border-outline-variant">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="font-data text-sm font-bold text-on-surface tabular-nums">
            ${stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
