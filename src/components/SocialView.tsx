import { useState, useEffect } from 'react';
import { Users, Trophy, MessageSquare, UserPlus, Flame } from 'lucide-react';
import { FRIENDS, LEADERBOARD } from '../constants';
import { UserStats } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  stats: UserStats;
}

export default function SocialView({ stats }: Props) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends'>('leaderboard');

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-on-surface font-display tracking-tight">Social Terminal</h2>
        <button className="flex items-center gap-2.5 px-4 py-2 bg-primary-container text-on-primary-container rounded-xl text-xs font-black font-mono group hover:brightness-110 transition-all tracking-wider">
          <UserPlus className="w-4 h-4" />
          <span>FIND FRIENDS</span>
        </button>
      </div>

      {/* Social Tabs */}
      <div className="flex bg-surface-container rounded-2xl p-1.5 border border-outline-variant shadow-md">
        {[
          { id: 'leaderboard', label: 'Rankings', icon: Trophy },
          { id: 'friends', label: 'Friends', icon: Users },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'fill-primary/20' : ''}`} />
            <span className="font-mono text-xs font-bold uppercase tracking-widest leading-none">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="social-tab-bg" className="absolute inset-0 bg-primary/5 rounded-xl -z-10 border border-primary/20 shadow-sm" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'leaderboard' && (
          <motion.div
            key="leaderboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="bg-surface-container rounded-2xl border border-outline-variant shadow-lg overflow-hidden">
              <div className="bg-surface-container-high px-5 py-4 border-b border-outline-variant flex justify-between items-center">
                <span className="font-mono text-xs text-on-surface-variant font-bold uppercase tracking-widest leading-none">Global P/L % Leaderboard</span>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-3 py-1 rounded-full font-bold leading-none">UPDATED LIVE</span>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {LEADERBOARD.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-5 transition-all ${
                      entry.isUser ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <div className={`w-8 text-center font-data font-black text-lg ${
                        entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-slate-300' : entry.rank === 3 ? 'text-orange-400' : 'text-on-surface-variant'
                      }`}>
                        #{entry.rank}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-display font-bold text-lg ${entry.isUser ? 'text-primary' : 'text-on-surface'}`}>
                          {entry.name}
                        </span>
                        <span className="font-mono text-[10px] text-on-surface-variant font-black uppercase tracking-wider mt-0.5">Level {entry.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-data text-gain font-bold text-xl tracking-tight leading-tight">
                        +{entry.earningsPercent}%
                      </div>
                      <div className="font-mono text-[9px] text-on-surface-variant font-black uppercase tracking-tight mt-0.5">Total Return</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-low border-2 border-dashed border-outline-variant/50 p-6 rounded-2xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-4">
                <Flame className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                <div>
                  <p className="text-base font-bold text-on-surface leading-tight">You're in the Top 5%!</p>
                  <p className="text-xs text-on-surface-variant font-medium mt-1">Keep trading to climb higher in the SGX rankings.</p>
                </div>
              </div>
              <button className="font-mono text-xs font-black text-primary uppercase tracking-widest hover:underline transition-all active:scale-95">REWARDS</button>
            </div>
          </motion.div>
        )}

        {activeTab === 'friends' && (
          <motion.div
            key="friends"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-3"
          >
            {FRIENDS.map((friend) => (
              <div key={friend.id} className="bg-surface-container p-5 rounded-2xl border border-outline-variant flex items-center justify-between hover:border-primary/50 transition-all group shadow-sm">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-14 h-14 rounded-full border-2 border-surface shadow-lg grayscale group-hover:grayscale-0 transition-all duration-500" />
                    {friend.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gain rounded-full border-2 border-surface"></div>}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{friend.name}</h4>
                    <p className="font-mono text-[11px] text-on-surface-variant font-black uppercase tracking-widest mt-0.5">Level {friend.level}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-data text-base font-black text-on-surface tracking-tight">+{friend.earningsPercent}%</p>
                  <button className="px-4 py-1.5 bg-surface-container-high border border-outline-variant rounded-lg font-mono text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest hover:border-primary/30 transition-all active:scale-95">VIEW STATS</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
