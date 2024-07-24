import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        'line-width': `${(2 * 3 + 4 * 2) * 1.4142135623731}px`,
      },
      boxShadow: {
        bottom: '0 4px 4px -4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
