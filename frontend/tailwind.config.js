    /** @type {import('tailwindcss').Config} */
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
        colors: {
            primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            900: '#0c4a6e',
            }
        },
        animation: {
            'gradient': 'gradient 3s ease infinite',
            'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
        keyframes: {
            gradient: {
            '0%, 100%': {
                'background-size': '200% 200%',
                'background-position': 'left center'
            },
            '50%': {
                'background-size': '200% 200%',
                'background-position': 'right center'
            },
            }
        }
        },
    },
    plugins: [],
    }