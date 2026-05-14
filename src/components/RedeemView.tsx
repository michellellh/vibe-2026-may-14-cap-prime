import { Coins, ArrowRight, Wallet, CheckCircle2, Info } from 'lucide-react';
import { UserStats } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface Props {
  stats: UserStats;
  onConvert: (amount: number) => void;
}

export default function RedeemView({ stats, onConvert }: Props) {
  const [amount, setAmount] = useState(100);
  const [success, setSuccess] = useState(false);

  const handleRedeem = () => {
    if (stats.coins >= amount) {
      onConvert(amount);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const cashValue = (amount / 100) * 10;

  return (
    <div className="flex flex-col gap-8 px-4 pt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 bg-tertiary/10 rounded-2xl border border-tertiary/20 mb-2">
          <Coins className="w-8 h-8 text-tertiary" />
        </div>
        <h2 className="text-3xl font-bold text-on-surface font-display tracking-tight">Redeem Rewards</h2>
        <p className="text-on-surface-variant text-sm max-w-md mx-auto">Convert your hard-earned Terminal Coins into trading capital. Every 100 coins yields $10.00 SGD.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-high p-5 rounded-2xl border border-outline-variant shadow-lg flex flex-col items-center">
          <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Available Coins</span>
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-tertiary" />
            <span className="font-data text-2xl font-bold text-on-surface">{stats.coins}</span>
          </div>
        </div>
        <div className="bg-surface-container-high p-5 rounded-2xl border border-outline-variant shadow-lg flex flex-col items-center">
          <span className="font-mono text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mb-1">Trading Balance</span>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <span className="font-data text-2xl font-bold text-on-surface">
              ${stats.balance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant shadow-2xl space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="space-y-6">
          <label className="font-mono text-[11px] text-on-surface-variant font-bold uppercase tracking-widest block text-center">Select Redemption Amount</label>
          
          <div className="flex justify-between items-center bg-surface-container-lowest p-2 rounded-2xl border border-outline-variant/30">
            {[100, 200, 500, 1000].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`flex-1 py-3 rounded-xl font-data text-sm font-bold transition-all ${
                  amount === val 
                    ? 'bg-primary-container text-on-primary-container shadow-lg' 
                    : 'text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 py-6 border-y border-outline-variant/30">
          <div className="text-center">
             <div className="flex items-center gap-2 justify-center mb-1">
                <Coins className="w-5 h-5 text-tertiary" />
                <span className="font-data text-3xl font-bold text-on-surface">{amount}</span>
             </div>
             <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">Coins Spent</span>
          </div>
          <ArrowRight className="w-6 h-6 text-outline-variant mt-[-16px]" />
          <div className="text-center">
             <div className="flex items-center gap-2 justify-center mb-1">
                <Wallet className="w-5 h-5 text-gain" />
                <span className="font-data text-3xl font-bold text-gain">${cashValue.toFixed(2)}</span>
             </div>
             <span className="font-mono text-[9px] text-on-surface-variant font-bold uppercase">Cash Received</span>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            disabled={stats.coins < amount || success}
            onClick={handleRedeem}
            className={`w-full py-5 rounded-2xl font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              stats.coins < amount 
                ? 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed' 
                : 'bg-primary-container text-on-primary-container hover:brightness-110 shadow-xl shadow-primary/20 active:scale-[0.98]'
            }`}
          >
            {success ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Success!</span>
              </>
            ) : (
              <span>Redeem Now</span>
            )}
          </button>
          
          {stats.coins < amount && (
             <p className="text-center text-loss font-mono text-[10px] font-bold uppercase tracking-tight">
               Insufficient Coins. Need {amount - stats.coins} more.
             </p>
          )}
        </div>
      </div>

      <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant flex items-start gap-4">
        <Info className="w-5 h-5 text-primary shrink-0" />
        <div className="space-y-1">
          <h4 className="font-display font-bold text-sm text-on-surface">Redemption Rules</h4>
          <ul className="text-on-surface-variant text-[11px] list-disc list-inside space-y-1 font-medium">
            <li>Minimum redemption is 100 Coins.</li>
            <li>Redeemed cash is added instantly to your trading balance.</li>
            <li>Levels can be earned by completing trade cycles and social quests.</li>
          </ul>
        </div>
      </div>
      
      <div className="h-20"></div>
    </div>
  );
}
