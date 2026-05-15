import { LayoutDashboard, Filter, Eye, Wallet, MessageSquare } from 'lucide-react';
import { Section } from '../types';
import { motion } from 'motion/react';

interface Props {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export default function BottomNavBar({ activeSection, onSectionChange }: Props) {
  const items = [
    { id: 'market' as Section, label: 'Market', icon: LayoutDashboard },
    { id: 'screener' as Section, label: 'Screener', icon: Filter },
    { id: 'watchlist' as Section, label: 'Watchlist', icon: Eye },
    { id: 'social' as Section, label: 'Social', icon: MessageSquare },
    { id: 'portfolio' as Section, label: 'Portfolio', icon: Wallet },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-surface-container border-t border-outline-variant z-50">
      {items.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex flex-col items-center justify-center transition-all relative py-2 px-6 rounded-full ${
              isActive ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-current' : ''}`} />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wide">{item.label}</span>
            {isActive && (
              <motion.div
                layoutId="nav-pill"
                className="absolute inset-0 bg-secondary-container -z-10 rounded-full"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
