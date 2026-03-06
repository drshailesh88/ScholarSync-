import { chromium } from '@playwright/test';

const baseUrl = 'http://127.0.0.1:3001';
const results = [];

async function runCheck(name, fn) {
  process.stdout.write(`START ${name}\n`);
  try {
    const details = await fn();
    results.push({ name, pass: true, details: details || '' });
    process.stdout.write(`PASS ${name}${details ? ` :: ${details}` : ''}\n`);
  } catch (error) {
    results.push({ name, pass: false, details: String(error) });
    process.stdout.write(`FAIL ${name} :: ${String(error)}\n`);
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ acceptDownloads: true });
await context.addCookies([{ name: '__playwright', value: 'true', domain: '127.0.0.1', path: '/' }]);
const page = await context.newPage();
page.setDefaultTimeout(30000);

await runCheck('S5-001 page load', async () => {
  await page.goto(`${baseUrl}/notebook`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForSelector('text=Notebook Chat', { timeout: 120000 });
});

await runCheck('load conversation', async () => {
  await page.getByRole('button', { name: 'Past conversations' }).click();
  await page.getByRole('button', { name: 'Audio QA Conversation' }).click();
  await page.waitForTimeout(1200);
});

const audioBtn = page.getByRole('button', { name: 'Audio Overview' }).first();

await runCheck('S5-001 panel opens', async () => {
  await audioBtn.click();
  await page.waitForSelector('text=Audio Overview', { timeout: 20000 });
});

await runCheck('S5-002 audio ready', async () => {
  await page.waitForFunction(() => !!document.querySelector('audio[src]'), undefined, { timeout: 30000 });
  await page.waitForSelector('button[title="Play"], button[title="Pause"]', { timeout: 30000 });
});

const playBtn = page.locator('button[title="Play"], button[title="Pause"]').first();

await runCheck('S5-003 play advances time', async () => {
  await playBtn.click();
  await page.waitForTimeout(2500);
  const currentAfterPlay = await page.locator('audio').evaluate((el) => el.currentTime);
  if (!(currentAfterPlay > 1)) throw new Error(`currentTime=${currentAfterPlay}`);
  return `currentTime=${currentAfterPlay.toFixed(2)}`;
});

await runCheck('S5-003 pause works', async () => {
  await playBtn.click();
  await page.waitForTimeout(600);
  const paused = await page.locator('audio').evaluate((el) => el.paused);
  if (!paused) throw new Error('audio not paused');
});

await runCheck('S5-004 seek works', async () => {
  const range = page.locator('input[type="range"]').first();
  const maxVal = await range.evaluate((el) => Number(el.getAttribute('max') || '0'));
  const target = Math.max(1, Math.floor(maxVal / 2));
  await range.evaluate((el, value) => {
    el.value = String(value);
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, target);
  await page.waitForTimeout(600);
  const currentAfterSeek = await page.locator('audio').evaluate((el) => el.currentTime);
  if (Math.abs(currentAfterSeek - target) >= 3) {
    throw new Error(`target=${target} actual=${currentAfterSeek}`);
  }
  return `target=${target} actual=${currentAfterSeek.toFixed(2)}`;
});

await runCheck('S5-005 speed cycles', async () => {
  const speedBtn = page.getByTitle('Playback speed');
  const seen = new Set();
  for (let i = 0; i < 5; i += 1) {
    const txt = ((await speedBtn.textContent()) || '').trim();
    seen.add(txt);
    await speedBtn.click();
    await page.waitForTimeout(100);
  }
  const required = ['1x', '1.25x', '1.5x', '2x'];
  const missing = required.filter((v) => !seen.has(v));
  if (missing.length) throw new Error(`missing=${missing.join(',')} seen=${[...seen].join(',')}`);
  return [...seen].join(' -> ');
});

await runCheck('S5-006 transcript visible', async () => {
  await page.getByText('Show transcript').click();
  const transcript = page.locator('div.max-h-32 p').first();
  await transcript.waitFor({ state: 'visible', timeout: 10000 });
  const text = (await transcript.textContent()) || '';
  if (text.trim().length < 200) throw new Error('transcript too short');
});

await runCheck('S5-015 download trigger', async () => {
  const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
  await page.getByTitle('Download audio').click();
  const download = await downloadPromise;
  const name = download.suggestedFilename();
  if (!name.includes('audio-overview')) throw new Error(`filename=${name}`);
  return name;
});

await runCheck('S5-016 close hides panel', async () => {
  await page.getByTitle('Close audio overview').click();
  await page.waitForTimeout(800);
  const panelCount = await page.locator('text=Audio Overview').count();
  if (panelCount !== 0) throw new Error(`panelCount=${panelCount}`);
});

await runCheck('S5-016 reopen starts at beginning', async () => {
  await audioBtn.click();
  await page.waitForSelector('button[title="Play"], button[title="Pause"]', { timeout: 20000 });
  const resetTime = (await page.locator('span.text-\\[10px\\].text-ink-muted.tabular-nums.w-8.text-right').first().textContent())?.trim();
  if (resetTime !== '0:00') throw new Error(`timeLabel=${resetTime}`);
});

await runCheck('S5-017 chat usable with panel', async () => {
  const chatInput = page.locator('input[placeholder*="Ask"], input[placeholder*="explore"]').first();
  await chatInput.fill('Quick QA ping');
  await page.locator('button[type="submit"]').first().click();
  await page.waitForTimeout(1200);
  const hasUserMsg = await page.locator('text=Quick QA ping').first().isVisible().catch(() => false);
  if (!hasUserMsg) throw new Error('message not rendered');
});

await browser.close();

const passed = results.filter((r) => r.pass).length;
const failed = results.filter((r) => !r.pass);
console.log(JSON.stringify({ passed, total: results.length, failed, results }, null, 2));
