
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light' | 'system';

export function useTheme() {
  const [theme] = useState<Theme>('system');
  
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    
    function applyTheme() {
      const root = window.document.documentElement;
      const systemTheme = media.matches ? 'dark' : 'light';
      root.classList.toggle('dark', systemTheme === 'dark');
    }
    
    applyTheme();
    
    const listener = () => {
      applyTheme();
    };
    
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Return a dummy setTheme function to maintain API compatibility
  // but it won't actually change the theme since we're using system only
  return { theme, setTheme: () => {} };
}
