import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import daisyui from 'daisyui';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // o 'media' si prefieres basarte en la preferencia del sistema
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#000000",
        blue: {
          50: "#e6f1fe",
          100: "#cce3fd",
          200: "#99c7fb",
          300: "#66aaf9",
          400: "#338ef7",
          500: "#006FEE",
          600: "#005bc4",
          700: "#004493",
          800: "#002e62",
          900: "#001731",
        },
        purple: {
          50: "#F2EAFA",
          100: "#E4D4F4",
          200: "#C9A9E9",
          300: "#AE7EDE",
          400: "#9353D3",
          500: "#7828C8",
          600: "#6020A0",
          700: "#481878",
          800: "#301050",
          900: "#180828",
        },
        green: {
          50: "#E8FAF0",
          100: "#D1F4E0",
          200: "#A2E9C1",
          300: "#74DFA2",
          400: "#45D483",
          500: "#17C964",
          600: "#12A150",
          700: "#0E793C",
          800: "#095028",
          900: "#052814",
        },
        red: {
          50: "#FEE7EF",
          100: "#FDD0DF",
          200: "#FAA0BF",
          300: "#F871A0",
          400: "#F54180",
          500: "#F31260",
          600: "#C20E4D",
          700: "#920B3A",
          800: "#610726",
          900: "#310413",
        },
        pink: {
          50: "#FFEDFA",
          100: "#FFDCF5",
          200: "#FFB8EB",
          300: "#FF95E1",
          400: "#FF71D7",
          500: "#FF4ECD",
          600: "#CC3EA4",
          700: "#992F7B",
          800: "#661F52",
          900: "#331029",
        },
        yellow: {
          50: "#FEFCE8",
          100: "#FDEDD3",
          200: "#FBDBA7",
          300: "#F9C97C",
          400: "#F7B750",
          500: "#F5A524",
          600: "#C4841D",
          700: "#936316",
          800: "#62420E",
          900: "#312107",
        },
        cyan: {
          50: "#F0FCFF",
          100: "#E6FAFE",
          200: "#D7F8FE",
          300: "#C3F4FD",
          400: "#A5EEFD",
          500: "#7EE7FC",
          600: "#06B7DB",
          700: "#09AACD",
          800: "#0E8AAA",
          900: "#053B48",
        },
        zinc: {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },
      },
      transitionProperty: {
        height: "height",
      },
      animation: {
        fade: "fadeIn 2s ease-in-out",
        blob: "blob 7s infinite",
        'text-gradient': 'gradient 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "50%": { transform: "translate(30px, -20px) scale(1.1)" },
        },
        gradient: {
          '0%': { color: '#e64a19' },
          '20%': { color: '#f57c00' },
          '40%': { color: '#fbc02d' },
          '60%': { color: '#388e3c' },
          '80%': { color: '#1976d2' },
          '100%': { color: '#7b1fa2' },
        },
      },
    },
    daisyui: {
      themes: [
        {
          light: {
            primary: "#006FEE",
            secondary: "#7828C8",
            accent: "#17C964",
            neutral: "#3D4451",
            "base-100": "#FFFFFF",
            info: "#3ABFF8",
            success: "#36D399",
            warning: "#FBBD23",
            error: "#F87272",
          },
          dark: {
            primary: "#338ef7",
            secondary: "#AE7EDE",
            accent: "#45D483",
            neutral: "#191D24",
            "base-100": "#2A2E37",
            info: "#3ABFF8",
            success: "#36D399",
            warning: "#FBBD23",
            error: "#F87272",
          },
        },
      ],
    },
    plugins: [
      tailwindcss(),
      autoprefixer(),
      daisyui,
      forms,
      typography,
      aspectRatio,
      scrollbarHide,
    ],
  },
};
