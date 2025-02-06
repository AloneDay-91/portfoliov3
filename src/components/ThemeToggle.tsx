// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Button } from '@/components/ui/button.tsx';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)!; // Utilisation de `!` pour garantir que le context n'est pas `undefined`

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {/* Mode clair - soleil */}
            {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-sun">
                    <circle cx="12" cy="12" r="4"/>
                    <path d="M12 2v2"/>
                    <path d="M12 20v2"/>
                    <path d="m4.93 4.93 1.41 1.41"/>
                    <path d="m17.66 17.66 1.41 1.41"/>
                    <path d="M2 12h2"/>
                    <path d="M20 12h2"/>
                    <path d="m6.34 17.66-1.41 1.41"/>
                    <path d="m19.07 4.93-1.41 1.41"/>
                </svg>
            ) : (
                // Mode sombre - lune
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     className="lucide lucide-moon">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
            )}
        </Button>
    );
};

export default ThemeToggle;