import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tsconfigPaths from "vite-tsconfig-paths";
import mockServer from 'vite-plugin-mock-dev-server';
const isDev = process.env.NODE_ENV === 'development';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tsconfigPaths(),
    isDev && mockServer()
  ].filter(Boolean),
  server: {
    proxy: {
      '^/api': 'http://example.com/',
    },
  }
});
