const production = !process.env.ROLLUP_WATCH;
module.exports = {
  content: ["./src/**/*.svelte"],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
}
