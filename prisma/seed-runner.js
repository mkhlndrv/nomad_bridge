/* eslint-disable no-console */
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const projectRoot = path.resolve(__dirname, "..");
console.log("[seed-runner] projectRoot:", projectRoot);
console.log(
  "[seed-runner] prisma/seed.ts exists:",
  fs.existsSync(path.join(projectRoot, "prisma", "seed.ts")),
);

function run(cmd) {
  console.log(`\n[seed-runner] ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd: projectRoot });
}

// Compile TypeScript seed to CommonJS JS so we can run it with plain `node`
// (tsx fails in some restricted environments due to IPC pipe restrictions).
run(
  "npx tsc --noEmit false --module CommonJS --target ES2019 --outDir prisma/.seed-build --rootDir . --moduleResolution node --esModuleInterop true --allowSyntheticDefaultImports --skipLibCheck prisma/seed.ts",
);

run("node prisma/.seed-build/prisma/seed.js");

