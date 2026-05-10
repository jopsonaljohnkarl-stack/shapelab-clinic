import puppeteer from './node_modules/puppeteer/lib/esm/puppeteer/puppeteer.js';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = './temporary screenshots';
if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter(f => f.endsWith('.png'));
const numbers = existing.map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1] ?? '0')).filter(Boolean);
const next = numbers.length ? Math.max(...numbers) + 1 : 1;

const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`;
const filepath = join(dir, filename);

const browser = await puppeteer.launch({
  executablePath: '/Users/dominiqueannjopson/.cache/puppeteer/chrome/mac_arm-148.0.7778.97/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle0' });
await page.screenshot({ path: filepath, fullPage: true });
await browser.close();

console.log(`Saved: ${filepath}`);
