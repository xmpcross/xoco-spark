// Renders cover.png for posts whose `cover` points at one: a line icon on a glass
// tile over a flat colour with a light dither. Posts choose the icon and tone in
// frontmatter (`coverArt`, any file name from src/icons/lucide; `coverTone`, iris,
// night or lilac). Photo covers are skipped.
//
//   npm run covers              covers for posts that have none
//   npm run covers -- --force   every cover again

import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const postsDir = path.join(root, "src/content/blog");
const iconsDir = path.join(root, "src/icons/lucide");
const force = process.argv.includes("--force");

const W = 1600;
const H = 1000;
const TILE = 340;
const ICON = 170;

const tones = {
  iris: { base: "#4b3bff", ink: "#ffffff", glass: 0.14 },
  night: { base: "#0a0a19", ink: "#ffffff", glass: 0.08 },
  lilac: { base: "#e7e3ff", ink: "#0c0c1d", glass: 0.5 },
};

function coverSvg(icon, tone) {
  const t = tones[tone];
  const source = readFileSync(path.join(iconsDir, `${icon}.svg`), "utf8");
  const inner = source
    .replace(/<!--[\s\S]*?-->/, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "");
  const x = (W - TILE) / 2;
  const y = (H - TILE) / 2;
  const scale = ICON / 24;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="30"/></filter>
    </defs>
    <rect x="${x}" y="${y + 30}" width="${TILE}" height="${TILE}" rx="84" fill="#000" opacity="${tone === "lilac" ? 0.1 : 0.3}" filter="url(#shadow)"/>
    <rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="84" fill="#fff" fill-opacity="${t.glass}" stroke="#fff" stroke-opacity="${tone === "lilac" ? 0.9 : 0.28}" stroke-width="2"/>
    <g transform="translate(${(W - ICON) / 2} ${(H - ICON) / 2}) scale(${scale})" fill="none" stroke="${t.ink}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
  </svg>`;
}

/* The dither the site uses behind headers, tinted for the cover background. */
async function ditherLayer(width, height, rgb, opacity) {
  const texture = path.join(root, "public/textures/dither.png");
  // The middle stays light for headlines; covers take the denser left side.
  const alpha = await sharp(texture)
    .extract({ left: 0, top: 220, width, height })
    .extractChannel(3)
    .raw()
    .toBuffer();
  for (let i = 0; i < alpha.length; i++) alpha[i] = Math.round(alpha[i] * opacity);
  return sharp({ create: { width, height, channels: 3, background: rgb } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

function frontmatter(file) {
  const block = readFileSync(file, "utf8").match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? "";
  const get = (key) => block.match(new RegExp(`^${key}:\\s*"?([^"\\r\\n]+)"?`, "m"))?.[1]?.trim();
  return { cover: get("cover"), art: get("coverArt"), tone: get("coverTone") };
}

for (const [n, slug] of readdirSync(postsDir).entries()) {
  const dir = path.join(postsDir, slug);
  const source = ["index.md", "index.mdx"].map((f) => path.join(dir, f)).find(existsSync);
  if (!source) continue;
  const out = path.join(dir, "cover.png");
  if (existsSync(out) && !force) continue;

  const meta = frontmatter(source);
  if (meta.cover && !meta.cover.endsWith("cover.png")) continue;
  const icon =
    meta.art && existsSync(path.join(iconsDir, `${meta.art}.svg`)) ? meta.art : "sparkles";
  const tone = tones[meta.tone] ? meta.tone : ["iris", "night", "lilac"][n % 3];
  const ink = tone === "lilac" ? { r: 12, g: 12, b: 29 } : { r: 255, g: 255, b: 255 };
  await sharp({ create: { width: W, height: H, channels: 3, background: tones[tone].base } })
    .composite([
      { input: await ditherLayer(W, H, ink, tone === "lilac" ? 0.1 : 0.08), left: 0, top: 0 },
      { input: Buffer.from(coverSvg(icon, tone)), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9, palette: true, colours: 256, dither: 0.6 })
    .toFile(out);
  console.log(`${slug}  ${icon} / ${tone}`);
}
