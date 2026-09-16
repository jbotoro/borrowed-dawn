import { execSync } from "node:child_process";
import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";

const tag = process.argv[2];
if (!tag || !/^m\d-[a-z0-9-]+$/.test(tag)) {
  console.error("usage: npm run snapshot -- m1-skeleton   (tag must look like m<digit>-<slug>)");
  process.exit(1);
}

const dest = `public/builds/${tag}`;
if (existsSync(dest)) {
  console.error(`${dest} already exists; milestone snapshots are immutable`);
  process.exit(1);
}

execSync("npx vite build --outDir dist-snapshot", {
  stdio: "inherit",
  env: { ...process.env, SNAPSHOT_TAG: tag }
});
mkdirSync("public/builds", { recursive: true });
cpSync("dist-snapshot", dest, { recursive: true });
rmSync("dist-snapshot", { recursive: true, force: true });
console.log(`snapshot written to ${dest}; commit it and tag the repo ${tag}`);
