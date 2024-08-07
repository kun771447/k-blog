import { defineConfig } from "vite";

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: './',
  server: {
    port: 3000,
  },
});
