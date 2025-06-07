// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import { Button } from '@/components/ui/button.tsx';
import { SunIcon, MoonIcon } from "@radix-ui/react-icons"

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext)!; // Utilisation de `!` pour garantir que le context n'est pas `undefined`

    return (
        <Button variant="ghost" size="icon" className="md:flex" onClick={toggleTheme}>
            {/* Mode clair - soleil */}
            {theme === 'dark' ? (
                <SunIcon />
            ) : (
                // Mode sombre - lune
                <MoonIcon />
            )}
        </Button>
    );
};

export default ThemeToggle;