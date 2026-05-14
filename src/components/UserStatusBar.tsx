import { Zap, Coins, Wallet } from 'lucide-react';
import { UserStats } from '../types';
import { motion } from 'motion/react';

interface Props {
  stats: UserStats;
}

export default function UserStatusBar({ stats }: Props) {
  const xpForNextLevel = stats.level * 100;
  const progress = (stats.xp / xpForNextLevel) * 100;

  return (
    <div className="w-full bg-surface-container-low border-b border-outline-variant px-4 py-2 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-display font-bold text-lg border border-primary/20">
            {stats.level}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-surface-container-highest px-1.5 rounded-full border border-outline-variant">
            <span className="font-mono text-[8px] font-bold text-primary uppercase">LVL</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 min-w-[80px]">
          <div className="flex justify-between items-center font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">
            <span>XP Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/30">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant">
          <Coins className="w-3.5 h-3.5 text-tertiary" />
          <span className="font-data text-xs font-bold text-on-surface tabular-nums">{stats.coins}</span>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-high px-3 py-1.5 rounded-lg border border-outline-variant">
          <Wallet className="w-3.5 h-3.5 text-primary" />
          <span className="font-data text-xs font-bold text-on-surface tabular-nums">
            ${stats.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  );
}
