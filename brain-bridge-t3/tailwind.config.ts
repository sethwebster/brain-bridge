import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
  safelist: [
    {
    pattern: /grid-cols-.*/,
    variants: ['sm', 'md', 'lg', 'xl', '2xl'],
    }
    
  ]
} satisfies Config;
