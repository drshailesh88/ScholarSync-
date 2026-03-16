import { test, expect } from '@playwright/test';

test.beforeEach(async ({ context }) => {
  await context.addCookies([{
    name: '__playwright',
    value: 'true',
    domain: 'localhost',
    path: '/',
  }]);
});

const MODULE_ROUTES = [
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/onboarding', name: 'Onboarding' },
  { path: '/settings', name: 'Settings' },
  { path: '/projects', name: 'Projects' },
  { path: '/library', name: 'Library' },
  { path: '/studio', name: 'Studio' },
  { path: '/research', name: 'Research' },
  { path: '/deep-research', name: 'Deep Research' },
  { path: '/notebook', name: 'Notebook' },
  { path: '/latex/new', name: 'LaTeX New' },
  { path: '/compliance', name: 'Compliance' },
  { path: '/analysis', name: 'Analysis' },
  { path: '/feeds', name: 'Journal Feed' },
  { path: '/slides', name: 'Slides' },
  { path: '/slides/new', name: 'Slides New' },
  { path: '/presentation/new', name: 'Presentation New' },
  { path: '/illustrate', name: 'Illustrate' },
  { path: '/poster/new', name: 'Poster New' },
  { path: '/systematic-review', name: 'Systematic Review' },
];

test.describe('Journey 9: Module Entry Points — All 19 module routes', () => {
  for (const route of MODULE_ROUTES) {
    test(`${route.name} (${route.path}) loads without crashing`, async ({ page }) => {
      await page.goto(`http://localhost:3001${route.path}`);
      await page.waitForLoadState('domcontentloaded');

      // Verify no application error
      await expect(page.locator('body')).not.toContainText('Application error');

      // Verify no unhandled runtime error
      await expect(page.locator('body')).not.toContainText('Unhandled Runtime Error');

      // Verify page is not blank — has visible content
      const visibleContent = page.locator('main, [role="main"], [class*="page"], [class*="container"], h1, h2, [class*="content"]').first();
      await expect(visibleContent).toBeVisible({ timeout: 15000 });

      // Verify sidebar navigation is present (except onboarding which may not have sidebar)
      if (route.path !== '/onboarding') {
        const sidebar = page.locator('nav, [class*="sidebar"], [role="navigation"]').first();
        await expect(sidebar).toBeVisible({ timeout: 10000 });
      }
    });
  }
});
