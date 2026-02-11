import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",

  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  assetsInclude: ["**/*.svg", "**/*.csv"],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // puerto de php artisan serve
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
