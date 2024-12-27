/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-dark': '#0a0e17',
                'brand-green': '#00ff00',
                'brand-blue': '#7fdbff'
            }
        },
    },
    plugins: [],
}
