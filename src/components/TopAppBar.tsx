import { CandlestickChart, Search, MoreVertical, Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function TopAppBar() {
  const { theme, toggleTheme, colorScale, setColorScale } = useTheme();
  const [showScales, setShowScales] = useState(false);

  const scales: { id: 'blue' | 'green' | 'orange' | 'purple', color: string }[] = [
    { id: 'blue', color: '#2e62ff' },
    { id: 'green', color: '#00875a' },
    { id: 'orange', color: '#d9480f' },
    { id: 'purple', color: '#7950f2' },
  ];

  return (
    <header className="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant flex items-center justify-between px-5 h-16 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-3">
        <CandlestickChart className="text-primary w-7 h-7" />
        <h1 className="text-xl font-black text-primary tracking-tight">SGX Terminal</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="hover:bg-surface-container-high transition-colors p-2.5 rounded-full transition-all active:scale-95 text-on-surface-variant hover:text-on-surface">
          <Search className="w-6 h-6" />
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowScales(!showScales)}
            className={`transition-colors p-2.5 rounded-full transition-all active:scale-95 ${showScales ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'}`}
          >
            <Palette className="w-6 h-6" />
          </button>
          
          <AnimatePresence>
            {showScales && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 p-2 bg-surface-container-highest border border-outline-variant rounded-2xl shadow-2xl z-50 flex gap-2"
              >
                {scales.map((scale) => (
                  <button
                    key={scale.id}
                    onClick={() => {
                      setColorScale(scale.id);
                      setShowScales(false);
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all active:scale-90 ${colorScale === scale.id ? 'border-on-surface' : 'border-transparent'}`}
                    style={{ backgroundColor: scale.color }}
                    title={scale.id}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="hover:bg-surface-container-high transition-colors p-2.5 rounded-full transition-all active:scale-95 text-on-surface-variant hover:text-on-surface"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === 'dark' ? 0 : 180, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {theme === 'dark' ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </motion.div>
        </button>

        <button className="hover:bg-surface-container-high transition-colors p-2.5 rounded-full transition-all active:scale-95 text-on-surface-variant hover:text-on-surface">
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
