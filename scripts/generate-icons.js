#!/usr/bin/env node

const { spawnSync } = require("node:child_process");
const { existsSync, mkdirSync } = require("node:fs");
const { writeFile } = require("node:fs/promises");
const { join } = require("node:path");
const sharp = require("sharp");
const ffmpegPath = require("ffmpeg-static");

const SOURCE_URL =
  "https://images.microcms-assets.io/assets/a7ae1fd8de334cbd89904d2a1b138e3c/b5a805d8abbf42f0930db01c699155da/%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%202025-05-03%2023.08.05.png";

const tmpDir = join(process.cwd(), "tmp");
const publicDir = join(process.cwd(), "public");
const sourcePath = join(tmpDir, "icon-source.png");

const ensureDir = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
};

const run = (args) => {
  const result = spawnSync(ffmpegPath, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed with status ${result.status}`);
  }
};

const downloadSource = () => {
  ensureDir(tmpDir);
  const result = spawnSync("curl", ["-L", "-o", sourcePath, SOURCE_URL], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    throw new Error("icon source download failed");
  }
};

const RADIUS_RATIO = 0.22;

const generatePng = async (size, destination) => {
  const radius = Math.round(size * RADIUS_RATIO);
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
  );
  const data = await sharp(sourcePath)
    .resize(size, size, { fit: "cover", position: "centre" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
  await writeFile(destination, data);
};

const main = async () => {
  ensureDir(publicDir);
  downloadSource();

  await generatePng(512, join(publicDir, "icon-512.png"));
  await generatePng(192, join(publicDir, "icon-192.png"));
  await generatePng(256, join(tmpDir, "icon-256.png"));
  await generatePng(128, join(tmpDir, "icon-128.png"));
  await generatePng(64, join(tmpDir, "icon-64.png"));
  await generatePng(32, join(tmpDir, "icon-32.png"));
  await generatePng(16, join(tmpDir, "icon-16.png"));

  run([
    "-y",
    "-i",
    join(tmpDir, "icon-256.png"),
    "-i",
    join(tmpDir, "icon-128.png"),
    "-i",
    join(tmpDir, "icon-64.png"),
    "-i",
    join(tmpDir, "icon-32.png"),
    "-i",
    join(tmpDir, "icon-16.png"),
    join(publicDir, "favicon.ico"),
  ]);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
