import { CandlestickChart, Search, MoreVertical } from 'lucide-react';

export default function TopAppBar() {
  return (
    <header className="w-full top-0 sticky z-40 bg-surface border-b border-outline-variant flex items-center justify-between px-4 h-14">
      <div className="flex items-center gap-2">
        <CandlestickChart className="text-primary w-6 h-6" />
        <h1 className="text-lg font-bold text-primary">SGX Terminal</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full">
          <Search className="text-on-surface-variant w-5 h-5" />
        </button>
        <button className="hover:bg-surface-container-high transition-colors p-2 rounded-full">
          <MoreVertical className="text-on-surface-variant w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
