import { defineConfig } from 'vite';

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: "index.html",
    },
  },
  publicDir: "public",
  server: {
    port: 3000,
    open: true,
  },
});