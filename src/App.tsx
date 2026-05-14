/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Section, UserStats } from './types';
import MarketView from './components/MarketView';
import ScreenerView from './components/ScreenerView';
import PortfolioView from './components/PortfolioView';
import CommunityView from './components/CommunityView'; // Keep for discussion
import SocialView from './components/SocialView'; // New combined view
import StockDetailView from './components/StockDetailView';
import BottomNavBar from './components/BottomNavBar';
import TopAppBar from './components/TopAppBar';
import UserStatusBar from './components/UserStatusBar';
import { INITIAL_USER_STATS } from './constants';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('market');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>(INITIAL_USER_STATS);

  const awardRewards = useCallback((xpAmount: number, coinAmount: number) => {
    setStats(prev => {
      let newXp = prev.xp + xpAmount;
      let newLevel = prev.level;
      let newCoins = prev.coins + coinAmount;
      
      const xpForNext = newLevel * 100;
      if (newXp >= xpForNext) {
        newXp -= xpForNext;
        newLevel += 1;
        newCoins += 50; // Bonus for level up
      }
      return { ...prev, xp: newXp, level: newLevel, coins: newCoins };
    });
  }, []);

  const convertCoinsToCash = useCallback((coinAmount: number) => {
    setStats(prev => {
      if (prev.coins < coinAmount) return prev;
      const cashToAdd = (coinAmount / 100) * 10; // $10 for every 100 coins
      return { 
        ...prev, 
        coins: prev.coins - coinAmount,
        balance: prev.balance + cashToAdd
      };
    });
  }, []);

  const handleStockClick = (ticker: string) => {
    setSelectedTicker(ticker);
    setActiveSection('stockDetail');
  };

  const renderView = () => {
    switch (activeSection) {
      case 'market':
        return <MarketView onStockClick={handleStockClick} />;
      case 'screener':
        return <ScreenerView onStockClick={handleStockClick} />;
      case 'portfolio':
        return <PortfolioView onStockClick={handleStockClick} onConvert={convertCoinsToCash} stats={stats} />;
      case 'social':
        return <SocialView stats={stats} />;
      case 'stockDetail':
        return (
          <StockDetailView 
            ticker={selectedTicker || 'D05.SI'} 
            onBack={() => setActiveSection('market')} 
            onTradeComplete={() => awardRewards(20, 5)}
          />
        );
      default:
        return <MarketView onStockClick={handleStockClick} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <TopAppBar />
      <UserStatusBar stats={stats} />
      <main className="flex-grow">
        {renderView()}
      </main>
      <BottomNavBar 
        activeSection={activeSection} 
        onSectionChange={(section) => {
          setActiveSection(section);
          if (section !== 'stockDetail') setSelectedTicker(null);
        }} 
      />
    </div>
  );
}
