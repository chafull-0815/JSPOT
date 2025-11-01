const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},  // ← v4 ではこちら
    autoprefixer: {},
  },
}