export type Section = 'market' | 'screener' | 'watchlist' | 'portfolio' | 'stockDetail' | 'social';

export interface UserStats {
  balance: number;
  coins: number;
  xp: number;
  level: number;
  totalEarnings: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  earnings: number;
  online: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  earnings: number;
  level: number;
  isUser?: boolean;
}

export interface StockInfo {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  yield: number;
  sector: string;
  volume: string;
  beta?: number;
}

export interface NewsItem {
  id: string;
  source: string;
  title: string;
  time: string;
  readTime: string;
  imageAlt: string;
  image: string;
  category?: string;
}
