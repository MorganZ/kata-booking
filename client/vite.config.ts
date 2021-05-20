import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    server: {
        proxy: {
           // "/api": "http://localhost:5000/api",
            '/api': {
              target: "http://localhost:5000/api",
              changeOrigin: true,
              rewrite: (path) => path.replace(/^\/api/, '')
            },
        },
    },
});
