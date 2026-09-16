import { defineConfig } from "vite";

const base = process.env.SNAPSHOT_TAG
  ? `/one-more-run/builds/${process.env.SNAPSHOT_TAG}/`
  : "/one-more-run/";

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
