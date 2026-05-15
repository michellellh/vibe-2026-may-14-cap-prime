import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type ColorScale = 'blue' | 'green' | 'orange' | 'purple';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colorScale: ColorScale;
  setColorScale: (scale: ColorScale) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark';
  });

  const [colorScale, setColorScale] = useState<ColorScale>(() => {
    const saved = localStorage.getItem('colorScale');
    if (saved === 'blue' || saved === 'green' || saved === 'orange' || saved === 'purple') return saved;
    return 'blue';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'scale-blue', 'scale-green', 'scale-orange', 'scale-purple');
    root.classList.add(theme);
    root.classList.add(`scale-${colorScale}`);
    localStorage.setItem('theme', theme);
    localStorage.setItem('colorScale', colorScale);
  }, [theme, colorScale]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScale, setColorScale }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
