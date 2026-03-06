import { chromium } from '@playwright/test';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
await context.addCookies([{ name: '__playwright', value: 'true', domain: '127.0.0.1', path: '/' }]);
const page = await context.newPage();
page.setDefaultTimeout(20000);

try {
  console.log('goto');
  await page.goto('http://127.0.0.1:3001/notebook', { waitUntil: 'domcontentloaded', timeout: 30000 });
  console.log('url', page.url());
  const body = await page.textContent('body');
  console.log('body-has-notebook-chat', body?.includes('Notebook Chat'));
  console.log('body-snippet', (body || '').slice(0, 300).replace(/\s+/g, ' '));
  await page.screenshot({ path: '/tmp/notebook-probe.png', fullPage: true });
  console.log('screenshot:/tmp/notebook-probe.png');
} catch (e) {
  console.log('probe-error', String(e));
}

await browser.close();
