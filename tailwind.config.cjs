module.exports = {
    content: [
      "./routes/**/*.{tsx,ts}",
      "./islands/**/*.{tsx,ts}",
      "./components/**/*.{tsx,ts}",
    ],
    theme: {},
    plugins: [
        require('@tailwindcss/forms'),
    ],
  };