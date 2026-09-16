import puppeteer from 'puppeteer';

const defaultViewport = { width: 1440, height: 900 };

export async function launchBrowser() {
  const browserURL = process.env.CDP_URL;

  if (browserURL) {
    const browser = await puppeteer.connect({ browserURL, defaultViewport });
    browser.__portfolioConnected = true;
    return browser;
  }

  return puppeteer.launch({
    headless: process.env.HEADED !== '1',
    defaultViewport,
  });
}

export async function releaseBrowser(browser) {
  if (!browser) return;

  if (browser.__portfolioConnected) {
    await browser.disconnect();
    return;
  }

  await browser.close();
}

export async function openIsolatedPage(browser, viewport) {
  const context = await browser.createBrowserContext();
  const page = await context.newPage();
  await page.setViewport(viewport);
  page.setDefaultTimeout(10_000);
  page.setDefaultNavigationTimeout(30_000);

  return { context, page };
}
