import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base:'./',
  build:{
    assetsDir:'./'

  },
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
      $utils: path.resolve("./src/utils"),
    },
  },
});
