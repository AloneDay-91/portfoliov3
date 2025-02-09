// src/context/ThemeContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Définir les types
type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

// Vérifier le stockage local ou appliquer "dark" par défaut
const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        return savedTheme ?? 'dark'; // Par défaut, on force "dark"
    }
    return 'dark';
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
