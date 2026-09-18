import { defineConfig } from "vite";

const base = process.env.SNAPSHOT_TAG
  ? `/borrowed-dawn/builds/${process.env.SNAPSHOT_TAG}/`
  : "/borrowed-dawn/";

export default defineConfig({
  base,
  build: {
    target: "es2022",
    sourcemap: true
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
