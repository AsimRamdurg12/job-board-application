import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
   base: "/",
  build: {
    outDir: "dist", // Ensure the output directory matches your backend's static folder configuration
  },
  server: {
    proxy: {
      "/api" : {
        target: "https://job-board-application-be.onrender.com",
        changeOrigin: true,
      }
    }
  }
});
