import { createContext } from 'react';

export const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

export type Theme = 'dark' | 'light' | 'system';

export type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);
