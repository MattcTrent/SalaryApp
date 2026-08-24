import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
const usePolling = process.env.CHOKIDAR_USEPOLLING === "true";

export default defineConfig({
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    watch: usePolling
      ? { usePolling: true, interval: 300 }
      : undefined,
    hmr: usePolling
      ? {
          host: "localhost",
          port: 5173,
          clientPort: 5173,
        }
      : true,
  },
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
