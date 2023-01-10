/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
      {
        find: "@Auth",
        replacement: path.join(__dirname, "/src/components/Auth"),
      },
      {
        find: "@Content",
        replacement: path.join(__dirname, "/src/components/Content"),
      },
    ],
  },
});
