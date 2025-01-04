import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //   server: {
  //     proxy: {
  //       "/api":
  //     },
  //   },
  // });
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "https://job-board-application-be.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
