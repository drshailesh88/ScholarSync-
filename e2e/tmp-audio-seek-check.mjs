import { chromium } from '@playwright/test';
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addCookies([{ name: '__playwright', value: 'true', domain: '127.0.0.1', path: '/' }]);
const page = await context.newPage();
page.setDefaultTimeout(30000);

await page.goto('http://127.0.0.1:3001/notebook', { waitUntil: 'domcontentloaded' });
await page.getByRole('button', { name: 'Past conversations' }).click();
await page.getByRole('button', { name: 'Audio QA Conversation' }).click();
await page.getByRole('button', { name: 'Audio Overview' }).click();
await page.waitForSelector('button[title="Play"], button[title="Pause"]');

const range = page.locator('input[type="range"]').first();
const maxVal = await range.evaluate((el) => Number(el.getAttribute('max') || '0'));
const target = Math.max(1, Math.floor(maxVal / 2));

await range.evaluate((el, value) => {
  el.value = String(value);
  el.dispatchEvent(new Event('input', { bubbles: true }));
}, target);

await page.waitForTimeout(700);
const currentTime = await page.locator('audio').evaluate((el) => el.currentTime);
console.log(JSON.stringify({ target, currentTime, diff: Math.abs(currentTime - target) }, null, 2));

await browser.close();
