import type { Config } from 'tailwindcss'

export default {
    important: true,
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            animation: {
                'background-shine': 'background-shine 10s infinite',
            },
            keyframes: {
                'background-shine': {
                    '0%': {
                        backgroundPosition: '100% 0',
                    },
                    '100%': {
                        backgroundPosition: '0 0',
                    },
                },
                "shiny-text": {
                    "0%, 90%, 100%": {
                        "background-position": "calc(-100% - var(--shimmer-width)) 0",
                    },
                    "30%, 60%": {
                        "background-position": "calc(100% + var(--shimmer-width)) 0",
                    },
                },
            },
        },
    },
    plugins: [],
} satisfies Config

