import { useState, useEffect } from 'react';
import { Users, Trophy, MessageSquare, UserPlus, Flame } from 'lucide-react';
import { FRIENDS, LEADERBOARD } from '../constants';
import { UserStats } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface Props {
  stats: UserStats;
}

export default function SocialView({ stats }: Props) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'friends' | 'chat'>('leaderboard');

  useEffect(() => {
    if (activeTab === 'chat') {
      if (!document.getElementById('disqus-script')) {
        const d = document;
        const s = d.createElement('script');
        s.id = 'disqus-script';
        s.src = 'https://capital-prime.disqus.com/embed.js';
        s.setAttribute('data-timestamp', String(+new Date()));
        (d.head || d.body).appendChild(s);
      }
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col gap-6 px-4 pt-6 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-on-surface font-display tracking-tight">Social Terminal</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-primary-container text-on-primary-container rounded-lg text-xs font-bold font-mono group hover:brightness-110 transition-all">
          <UserPlus className="w-3.5 h-3.5" />
          <span>FIND FRIENDS</span>
        </button>
      </div>

      {/* Social Tabs */}
      <div className="flex bg-surface-container rounded-xl p-1 border border-outline-variant">
        {[
          { id: 'leaderboard', label: 'Rankings', icon: Trophy },
          { id: 'friends', label: 'Friends', icon: Users },
          { id: 'chat', label: 'Chat', icon: MessageSquare },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all relative ${
              activeTab === tab.id ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'fill-primary/20' : ''}`} />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="social-tab-bg" className="absolute inset-0 bg-primary/5 rounded-lg -z-10 border border-primary/20" />
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
            <div className="bg-surface-container rounded-xl border border-outline-variant overflow-hidden">
              <div className="bg-surface-container-high px-4 py-3 border-b border-outline-variant flex justify-between items-center">
                <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Global Earnings Leaderboard</span>
                <span className="font-mono text-[9px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">UPDATED LIVE</span>
              </div>
              <div className="divide-y divide-outline-variant/30">
                {LEADERBOARD.map((entry) => (
                  <div 
                    key={entry.rank} 
                    className={`flex items-center justify-between p-4 transition-colors ${
                      entry.isUser ? 'bg-primary/5 border-l-4 border-l-primary' : 'hover:bg-surface-container-highest'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-6 text-center font-data font-bold text-sm ${
                        entry.rank === 1 ? 'text-yellow-400' : entry.rank === 2 ? 'text-slate-300' : entry.rank === 3 ? 'text-orange-400' : 'text-on-surface-variant'
                      }`}>
                        #{entry.rank}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-display font-bold ${entry.isUser ? 'text-primary' : 'text-on-surface'}`}>
                          {entry.name}
                        </span>
                        <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">Level {entry.level}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-data text-gain font-bold tracking-tight">
                        +${entry.earnings.toLocaleString()}
                      </div>
                      <div className="font-mono text-[8px] text-on-surface-variant font-bold uppercase">Total Profit</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-low border border-dashed border-outline-variant p-4 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
                <div>
                  <p className="text-sm font-bold text-on-surface">You're in the Top 5%!</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">Keep trading to climb higher in the SGX rankings.</p>
                </div>
              </div>
              <button className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">REWARDS</button>
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
              <div key={friend.id} className="bg-surface-container p-4 rounded-xl border border-outline-variant flex items-center justify-between hover:border-primary/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={friend.avatar} alt={friend.name} className="w-12 h-12 rounded-full border-2 border-surface shadow-lg grayscale group-hover:grayscale-0 transition-all" />
                    {friend.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-gain rounded-full border-2 border-surface"></div>}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-on-surface group-hover:text-primary transition-colors">{friend.name}</h4>
                    <p className="font-mono text-[9px] text-on-surface-variant font-bold uppercase tracking-wider">Level {friend.level}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-data text-xs font-bold text-on-surface">+${friend.earnings.toLocaleString()}</p>
                  <button className="px-2 py-1 bg-surface-container-high border border-outline-variant rounded-md font-mono text-[8px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all">VIEW STATS</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'chat' && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="bg-surface-container rounded-xl p-6 border border-outline-variant shadow-lg mb-10 min-h-[400px]">
              <div id="disqus_thread"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
