
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    function applyTheme() {
      const root = window.document.documentElement;
      
      if (theme === 'system') {
        const systemTheme = media.matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
      } else {
        root.classList.toggle('dark', theme === 'dark');
      }
    }
    
    applyTheme();
    
    const listener = () => {
      if (theme === 'system') {
        applyTheme();
      }
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [theme]);

  function setThemeAndStore(newTheme: Theme) {
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  }

  return { theme, setTheme: setThemeAndStore };
}
