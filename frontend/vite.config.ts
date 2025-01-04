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
    port: 5000,
    proxy: {
      "/api": {
        target: "https://job-board-application-be.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
