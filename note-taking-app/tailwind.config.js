// tailwind.config.js
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#4CAF50", // Example custom color
          secondary: "#FF5722", // Example custom color
        },
      },
    },
    plugins: [],
  };