import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        reset_spin: "reset_spin 500ms linear", // spinning reset icon
      },
      transitionDuration: {
        0: "0ms",
        1200: "1200ms",
      },
      transitionProperty: {
        opacity: "opacity",
      },
      transitionTimingFunction: {
        linear: "linear",
      },
    },
  },
  daisyui: {
    themes: ["dark", "light", "dracula"],
    styled: true,
  },
  plugins: [daisyui],
};
