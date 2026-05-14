import { StockInfo, NewsItem, UserStats, Friend, LeaderboardEntry } from './types';

export const INITIAL_USER_STATS: UserStats = {
  balance: 142850.42,
  coins: 450,
  xp: 750,
  level: 8,
  totalEarnings: 14200.80
};

export const FRIENDS: Friend[] = [
  { id: 'f1', name: 'Alvin T.', avatar: 'https://i.pravatar.cc/150?u=a', level: 12, earnings: 25400.50, online: true },
  { id: 'f2', name: 'Sarah L.', avatar: 'https://i.pravatar.cc/150?u=s', level: 9, earnings: 18200.20, online: false },
  { id: 'f3', name: 'Wei Ken', avatar: 'https://i.pravatar.cc/150?u=w', level: 15, earnings: 42100.00, online: true },
  { id: 'f4', name: 'Mei Ling', avatar: 'https://i.pravatar.cc/150?u=m', level: 7, earnings: 9500.75, online: true },
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, name: 'Wei Ken', earnings: 42100, level: 15 },
  { rank: 2, name: 'Alvin T.', earnings: 25400, level: 12 },
  { rank: 3, name: 'Sarah L.', earnings: 18200, level: 9 },
  { rank: 4, name: 'You (Prime)', earnings: 14200, level: 8, isUser: true },
  { rank: 5, name: 'Mei Ling', earnings: 9500, level: 7 },
  { rank: 6, name: 'John Doe', earnings: 5200, level: 4 },
];

export const STOCKS: StockInfo[] = [
  {
    ticker: 'D05.SI',
    name: 'DBS Group',
    price: 36.42,
    change: 0.45,
    changePercent: 1.24,
    marketCap: 'S$92.41B',
    peRatio: 9.14,
    yield: 5.2,
    sector: 'Financials',
    volume: '2.4M',
    beta: 0.86
  },
  {
    ticker: 'M44U.SI',
    name: 'Mapletree Pan Asia',
    price: 1.28,
    change: -0.01,
    changePercent: -0.78,
    marketCap: 'S$4.2B',
    peRatio: 12.5,
    yield: 6.8,
    sector: 'REITs',
    volume: '5.1M'
  },
  {
    ticker: 'C31.SI',
    name: 'CapitaLand Inv',
    price: 2.91,
    change: 0.01,
    changePercent: 0.34,
    marketCap: 'S$15.0B',
    peRatio: 14.2,
    yield: 4.1,
    sector: 'Real Estate',
    volume: '3.2M'
  },
  {
    ticker: 'A17U.SI',
    name: 'Ascendas REIT',
    price: 2.68,
    change: -0.03,
    changePercent: -1.12,
    marketCap: 'S$11.4B',
    peRatio: 13.8,
    yield: 5.9,
    sector: 'REITs',
    volume: '4.5M'
  },
  {
    ticker: 'U11.SI',
    name: 'UOB Limited',
    price: 30.15,
    change: 0,
    changePercent: 0,
    marketCap: 'S$50.3B',
    peRatio: 8.9,
    yield: 5.5,
    sector: 'Financials',
    volume: '1.8M'
  },
  {
    ticker: 'S50',
    name: 'Samudera Ship',
    price: 1.340,
    change: 0.104,
    changePercent: 8.42,
    marketCap: 'S$720M',
    peRatio: 4.5,
    yield: 7.2,
    sector: 'Industrials',
    volume: '1.2M'
  },
  {
    ticker: 'G13',
    name: 'Genting Sing',
    price: 0.895,
    change: 0.04,
    changePercent: 4.67,
    marketCap: 'S$10.8B',
    peRatio: 18.2,
    yield: 3.5,
    sector: 'Leisure',
    volume: '15.4M'
  }
];

export const NEWS: NewsItem[] = [
  {
    id: '1',
    source: 'STRAITS TIMES',
    title: 'DBS Q3 net profit rises 15% to S$2.63b, beating market estimates.',
    time: '2 hours ago',
    readTime: '4 min read',
    imageAlt: 'DBS headquarters architecture Marina Bay',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=400',
    category: 'BANKING'
  },
  {
    id: '2',
    source: 'SGX OBSERVER',
    title: 'Singapore Banks resilient amid global interest rate volatility.',
    time: '5 hours ago',
    readTime: '6 min read',
    imageAlt: 'Trading desk candlestick charts',
    image: 'https://images.unsplash.com/photo-1611974717525-58a436cc56b9?auto=format&fit=crop&q=80&w=400',
    category: 'MARKET'
  },
  {
    id: '3',
    source: 'ANALYSIS',
    title: 'What the new ESG framework means for SGX blue-chip stocks.',
    time: 'Yesterday',
    readTime: '8 min read',
    imageAlt: 'Digital display financial ESG data',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    category: 'ESG'
  }
];
