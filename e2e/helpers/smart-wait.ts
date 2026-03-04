import { Page } from '@playwright/test';

/**
 * Smart wait for page content instead of blind timeouts.
 *
 * Waits for:
 * 1. DOM content loaded
 * 2. Network idle (with graceful fallback)
 * 3. Specific content indicator (optional)
 * 4. One animation frame for React paint
 */
export async function waitForPageContent(
  page: Page,
  options?: {
    /** Text or selector to wait for */
    indicator?: string;
    /** Maximum wait time in ms */
    timeout?: number;
  }
) {
  const { indicator, timeout = 15000 } = options ?? {};

  // 1. Wait for DOM to be ready
  await page.waitForLoadState('domcontentloaded');

  // 2. Wait for network to settle (fonts, API calls)
  // Gracefully handle timeout if there's a persistent websocket
  await page.waitForLoadState('networkidle').catch(() => {
    // networkidle can timeout if there's a websocket — that's ok
  });

  // 3. Wait for specific content if provided
  if (indicator) {
    const locator = indicator.startsWith('//') || indicator.startsWith('text=')
      ? page.locator(indicator).first()
      : page.locator(`text=${indicator}`).first();

    await locator.waitFor({ state: 'visible', timeout });
  }

  // 4. Wait one animation frame for React to finish painting
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
}

/**
 * Wait for a React component to hydrate.
 * Useful for pages with client-side interactivity.
 */
export async function waitForHydration(page: Page, timeout = 10000) {
  // Wait for React to mark hydration complete
  await page.waitForFunction(
    () => {
      // Check if React has hydrated by looking for react-root or __NEXT_DATA__
      const root = document.getElementById('__next') ?? document.getElementById('root');
      return root && root.children.length > 0;
    },
    { timeout }
  );
}

/**
 * Wait for page to be interactive (buttons clickable, inputs focusable).
 */
export async function waitForInteractive(page: Page, timeout = 10000) {
  await page.waitForFunction(
    () => {
      // Check if document is ready
      if (document.readyState !== 'complete') return false;

      // Check if there are interactive elements
      const buttons = document.querySelectorAll('button');
      const inputs = document.querySelectorAll('input, textarea, select');

      return buttons.length > 0 || inputs.length > 0;
    },
    { timeout }
  );
}
