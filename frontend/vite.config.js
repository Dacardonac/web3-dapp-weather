import { defineConfig } from 'vite';

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
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