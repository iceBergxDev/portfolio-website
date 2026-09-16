import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';

import {
  launchBrowser,
  openIsolatedPage,
  releaseBrowser,
} from './helpers/browser.mjs';

const baseURL = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const routes = ['/', '/projects'];
let browser;

before(async () => {
  browser = await launchBrowser();
});

after(async () => {
  await releaseBrowser(browser);
});

for (const route of routes) {
  test(`reduced-motion user can hydrate ${route} without React errors`, async (t) => {
    const { context, page } = await openIsolatedPage(browser, {
      width: 1440,
      height: 900,
    });
    t.after(() => context.close());

    await page.emulateMediaFeatures([
      { name: 'prefers-reduced-motion', value: 'reduce' },
    ]);

    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    const response = await page.goto(`${baseURL}${route}`, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });

    assert.ok(response, `No document response received for ${route}`);
    assert.equal(response.status(), 200);
    await page.waitForSelector('h1', { visible: true });
    await page.evaluate(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(resolve));
    }));

    assert.deepEqual(pageErrors, []);
    assert.deepEqual(consoleErrors, []);

    if (route === '/projects') {
      assert.equal(
        await page.$('[data-pointer-spotlight]'),
        null,
        'Reduced-motion users should not receive pointer-follow spotlight layers',
      );
    }
  });
}
