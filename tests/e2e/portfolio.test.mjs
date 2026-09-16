import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { after, before, test } from 'node:test';

import {
  launchBrowser,
  openIsolatedPage,
  releaseBrowser,
} from './helpers/browser.mjs';

const baseURL = (process.env.BASE_URL ?? 'http://127.0.0.1:3000').replace(/\/$/, '');
const artifactDirectory = 'tests/e2e/artifacts';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

const routes = [
  {
    path: '/',
    h1: 'Senior Web Developer in Bangkok',
    title: 'Senior Web Developer in Bangkok | Pirun Kongsaeng',
    palette: 'navigation',
  },
  {
    path: '/projects',
    h1: 'Web development projects',
    title: 'WordPress, WooCommerce, Shopify and Next.js Projects | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/resume',
    h1: 'Pirun Kongsaeng',
    title: 'Pirun Kongsaeng - Resume',
    palette: null,
  },
  {
    path: '/case-study/gatac',
    h1: 'GATAC Shopify B2B Portal',
    title: 'GATAC Shopify B2B Portal | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/foley',
    h1: 'Foley Pre-Start',
    title: 'Foley Pre-Start | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/expandasign',
    h1: 'Expandasign',
    title: 'Expandasign | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/storyfilms',
    h1: 'StoryFilms',
    title: 'StoryFilms | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/mdf',
    h1: 'MDF Beauty',
    title: 'MDF Beauty | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/flip-films',
    h1: 'Flip Films',
    title: 'Flip Films | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/altalena',
    h1: 'Altalena',
    title: 'Altalena | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/hype',
    h1: 'Hype Promotions',
    title: 'Hype Promotions | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/newstart',
    h1: 'Newstart Homes',
    title: 'Newstart Homes | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/aj-flooring',
    h1: 'AJ Flooring',
    title: 'AJ Flooring | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/view-ningaloo',
    h1: 'View Ningaloo',
    title: 'View Ningaloo | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/will-fitness',
    h1: 'Will Fitness',
    title: 'Will Fitness | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/hwd',
    h1: 'HWD Landscape & Maintenance',
    title: 'HWD Landscape & Maintenance | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/tartan',
    h1: 'Tartan',
    title: 'Tartan | Pirun Kongsaeng',
    palette: 'projects',
  },
  {
    path: '/case-study/asl',
    h1: 'Australian Synthetic Lawns',
    title: 'Australian Synthetic Lawns | Pirun Kongsaeng',
    palette: 'projects',
  },
];

const navigationCommands = ['Work', 'About', 'Experience', 'Projects', 'Contact'];
const projectCommands = [
  'GATAC Shopify B2B Portal',
  'Foley Pre-Start',
  'Expandasign',
  'StoryFilms',
  'MDF Beauty',
  'Flip Films',
  'Altalena',
  'Hype Promotions',
  'Newstart Homes',
  'AJ Flooring',
  'View Ningaloo',
  'Will Fitness',
  'HWD Landscape & Maintenance',
  'Tartan',
  'Australian Synthetic Lawns',
];

let browser;

before(async () => {
  await mkdir(artifactDirectory, { recursive: true });
  browser = await launchBrowser();
});

after(async () => {
  await releaseBrowser(browser);
});

function normalizedText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function screenshotName(viewportName, route) {
  const routeName = route === '/' ? 'home' : route.replace(/^\//, '').replaceAll('/', '-');
  return `${artifactDirectory}/${viewportName}-${routeName}-failed.webp`;
}

async function revealAndInspectImages(page) {
  await page.evaluate(async () => {
    const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    let previousHeight = 0;

    while (previousHeight !== document.documentElement.scrollHeight) {
      previousHeight = document.documentElement.scrollHeight;
      const step = Math.max(320, Math.floor(window.innerHeight * 0.75));

      for (let y = window.scrollY; y < previousHeight; y += step) {
        window.scrollTo(0, y);
        await nextFrame();
      }

      window.scrollTo(0, previousHeight);
      await nextFrame();
    }
  });

  // Infinite marquee clones can remain horizontally outside the viewport and
  // therefore never leave the browser's lazy state. Switching the discovered
  // images to eager after the full vertical scroll makes every declared source
  // verifiable without changing application code.
  await page.$$eval('img', (images) => {
    images.forEach((image) => {
      image.loading = 'eager';
    });
  });

  await page.waitForFunction(
    () => [...document.images].every((image) => image.complete),
    { timeout: 20_000 },
  );

  return page.evaluate(() =>
    [...document.images]
      .filter((image) => image.naturalWidth === 0)
      .map((image) => ({
        alt: image.alt,
        src: image.currentSrc || image.src,
      })),
  );
}

async function inspectCommandPalette(page, expectation) {
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyK');
  await page.keyboard.up('Control');

  await page.waitForSelector('[role="dialog"][aria-label="Command palette"]');
  const palette = await page.$eval('[role="dialog"][aria-label="Command palette"]', (dialog) => ({
    groups: [...dialog.querySelectorAll('p')].map((item) => item.textContent?.trim()),
    commands: [...dialog.querySelectorAll('button')].map((button) => button.textContent?.trim()),
  }));

  assert.deepEqual(palette.commands, expectation === 'navigation'
    ? navigationCommands
    : [...navigationCommands, ...projectCommands]);
  assert.equal(palette.groups.includes('Projects'), expectation === 'projects');

  await page.keyboard.press('Escape');
  await page.waitForSelector('[role="dialog"][aria-label="Command palette"]', { hidden: true });
}

test('project cards are single whole-card links to all 15 internal details', async (t) => {
  const { context, page } = await openIsolatedPage(browser, viewports[0]);
  t.after(() => context.close());

  const response = await page.goto(`${baseURL}/projects`, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });
  assert.equal(response?.status(), 200);

  const cards = await page.$$eval('article[data-project-card]', (articles) => articles.map((article) => {
    const links = article.querySelectorAll('a');
    const link = links[0];
    return {
      slug: article.getAttribute('data-project-card'),
      linkCount: links.length,
      href: link?.getAttribute('href'),
      accessibleName: link?.getAttribute('aria-label'),
      title: article.querySelector('h3')?.textContent?.trim(),
      visibleTags: article.querySelectorAll('[data-project-tags] > span').length,
    };
  }));

  assert.equal(cards.length, 15);
  for (const card of cards) {
    assert.equal(card.linkCount, 1, `${card.slug}: one link must own the whole card`);
    assert.equal(card.href, `/case-study/${card.slug}`);
    assert.equal(card.accessibleName, `View project: ${card.title}`);
    assert.ok(card.visibleTags <= 3, `${card.slug}: cards show at most three tags`);
  }

  const gatacMedia = await page.$eval('article[data-project-card="gatac"] img', (image) => ({
    src: decodeURIComponent(image.getAttribute('src') ?? ''),
    fit: getComputedStyle(image).objectFit,
  }));
  assert.ok(
    decodeURIComponent(gatacMedia.src ?? '').includes('/images/projects/gatac/logo.png'),
    'GATAC card must render the logo even when Next.js encodes the source URL',
  );
  assert.equal(gatacMedia.fit, 'contain');

  await page.click('article[data-project-card="mdf"] img');
  await page.waitForFunction(() => window.location.pathname === '/case-study/mdf');
  assert.equal(new URL(page.url()).pathname, '/case-study/mdf');

  await page.waitForSelector('img[alt="Email signup flow"]');
  const mdfFeatureMedia = await page.$$eval(
    'img[alt="Editorial homepage"], img[alt="Product and Journal content"], img[alt="Email signup flow"]',
    (images) => images.map((image) => {
      const frame = image.parentElement?.getBoundingClientRect();
      return {
        alt: image.alt,
        src: decodeURIComponent(image.getAttribute('src') ?? ''),
        ratio: frame ? frame.width / frame.height : 0,
      };
    }),
  );
  assert.deepEqual(mdfFeatureMedia.map(({ alt }) => alt), [
    'Editorial homepage',
    'Product and Journal content',
    'Email signup flow',
  ]);
  assert.deepEqual(mdfFeatureMedia.map(({ src }) => [
    'live-homepage.png',
    'live-journal.png',
    'live-signup.png',
  ].find((filename) => src.includes(`/images/projects/mdf/${filename}`))), [
    'live-homepage.png',
    'live-journal.png',
    'live-signup.png',
  ]);
  for (const media of mdfFeatureMedia) {
    assert.ok(media.ratio > 1.58 && media.ratio < 1.62, `${media.alt}: use a 16:10 media frame`);
  }

  await page.keyboard.down('Control');
  await page.keyboard.press('KeyK');
  await page.keyboard.up('Control');
  await page.waitForSelector('[role="dialog"][aria-label="Command palette"]');

  const commandButtons = await page.$$('[role="dialog"][aria-label="Command palette"] button');
  let storyFilmsButton;
  for (const button of commandButtons) {
    const label = await button.evaluate((element) => element.textContent?.trim());
    if (label === 'StoryFilms') {
      storyFilmsButton = button;
      break;
    }
  }
  assert.ok(storyFilmsButton, 'StoryFilms command must be available');
  await storyFilmsButton.hover();
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => resolve())));
  await page.keyboard.press('Enter');
  await page.waitForFunction(() => window.location.pathname !== '/case-study/mdf');
  assert.equal(new URL(page.url()).pathname, '/case-study/storyfilms');
});

test('project cards expose a pointer-follow spotlight on hover', async (t) => {
  const { context, page } = await openIsolatedPage(browser, viewports[0]);
  t.after(() => context.close());

  await page.emulateMediaFeatures([
    { name: 'prefers-reduced-motion', value: 'no-preference' },
  ]);
  const response = await page.goto(`${baseURL}/projects`, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });
  assert.equal(response?.status(), 200);

  const linkSelector = 'article[data-project-card="mdf"] > a';
  await page.$eval(linkSelector, (link) => link.scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
  const bounds = await page.$eval(linkSelector, (link) => {
    const rect = link.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  });
  await page.mouse.move(
    Math.round(bounds.x + bounds.width * 0.72),
    Math.round(bounds.y + bounds.height * 0.38),
  );
  await page.evaluate(() => new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve));
  }));
  await page.waitForFunction((selector) => {
    const layer = document.querySelector(`${selector} [data-pointer-spotlight]`);
    return layer && getComputedStyle(layer).opacity === '1';
  }, {}, linkSelector);

  const spotlight = await page.$(`${linkSelector} [data-pointer-spotlight]`);
  assert.ok(spotlight, 'Project cards must include the pointer-follow spotlight layer');

  const state = await page.$eval(linkSelector, (link) => {
    const layer = link.querySelector('[data-pointer-spotlight]');
    const layerStyle = layer ? getComputedStyle(layer) : null;
    return {
      mouseX: link.style.getPropertyValue('--pointer-x'),
      mouseY: link.style.getPropertyValue('--pointer-y'),
      opacity: layerStyle?.opacity,
      backgroundImage: layerStyle?.backgroundImage,
    };
  });
  assert.match(state.mouseX, /^\d+(?:\.\d+)?px$/);
  assert.match(state.mouseY, /^\d+(?:\.\d+)?px$/);
  assert.equal(state.opacity, '1');
  assert.match(state.backgroundImage ?? '', /radial-gradient/);
});

test('project cover uses a native shared transition from card to detail', async (t) => {
  const { context, page } = await openIsolatedPage(browser, viewports[0]);
  t.after(() => context.close());

  await page.evaluateOnNewDocument(() => {
    window.__portfolioViewTransitionCalls = 0;
    const nativeStartViewTransition = document.startViewTransition?.bind(document);
    if (!nativeStartViewTransition) return;

    document.startViewTransition = (...args) => {
      window.__portfolioViewTransitionCalls += 1;
      return nativeStartViewTransition(...args);
    };
  });

  const response = await page.goto(`${baseURL}/projects`, {
    waitUntil: ['domcontentloaded', 'networkidle0'],
  });
  assert.equal(response?.status(), 200);
  assert.equal(
    await page.evaluate(() => typeof document.startViewTransition === 'function'),
    true,
    'The E2E browser must support the View Transitions API',
  );

  await page.click('article[data-project-card="mdf"] > a');
  await page.waitForFunction(() => window.location.pathname === '/case-study/mdf');
  await page.waitForSelector('h1');

  const transitionCalls = await page.evaluate(() => window.__portfolioViewTransitionCalls);
  assert.ok(
    transitionCalls > 0,
    'Next.js navigation must invoke a native view transition for the shared project cover',
  );
});

for (const viewport of viewports) {
  for (const route of routes) {
    test(`${viewport.name}: ${route.path} renders without browser regressions`, async (t) => {
      const { context, page } = await openIsolatedPage(browser, viewport);
      t.after(() => context.close());

      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });
      page.on('pageerror', (error) => pageErrors.push(error.message));

      try {
        const response = await page.goto(`${baseURL}${route.path}`, {
          waitUntil: ['domcontentloaded', 'networkidle0'],
        });

        assert.ok(response, `No document response received for ${route.path}`);
        assert.equal(response.status(), 200);
        assert.match(response.headers()['content-type'] ?? '', /^text\/html\b/);

        await page.waitForSelector('h1', { visible: true });
        // Assert the semantic heading text, not CSS text-transform presentation.
        const heading = normalizedText(await page.$eval('h1', (element) => element.textContent ?? ''));
        assert.equal(heading, route.h1);
        assert.equal(await page.title(), route.title);

        const brokenImages = await revealAndInspectImages(page);
        assert.deepEqual(brokenImages, []);

        const layout = await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }));
        assert.ok(
          layout.scrollWidth <= layout.clientWidth + 1,
          `Horizontal overflow: scrollWidth=${layout.scrollWidth}, clientWidth=${layout.clientWidth}`,
        );

        const resumeLinks = await page.$$eval('a', (anchors) => anchors
          .map((anchor) => ({
            href: anchor.getAttribute('href'),
            text: anchor.textContent?.replace(/\s+/g, ' ').trim(),
          }))
          .filter((link) => link.href === '/resume' || link.href === '/Pirun-Kongsaeng-Resume.pdf'));
        assert.ok(resumeLinks.some((link) => link.href === '/resume'));
        assert.equal(resumeLinks.some((link) => link.href === '/Pirun-Kongsaeng-Resume.pdf'), false);

        if (route.palette) await inspectCommandPalette(page, route.palette);

        assert.deepEqual(pageErrors, []);
        assert.deepEqual(consoleErrors, []);
      } catch (error) {
        try {
          await page.screenshot({
            path: screenshotName(viewport.name, route.path),
            type: 'webp',
            quality: 70,
            fullPage: true,
          });
        } catch {
          process.stderr.write(`Could not capture failure screenshot for ${viewport.name} ${route.path}.\n`);
        }

        if (pageErrors.length || consoleErrors.length) {
          process.stderr.write(
            `${viewport.name} ${route.path}: ${pageErrors.length} page errors, ${consoleErrors.length} console errors.\n`,
          );
        }

        throw error;
      }
    });
  }
}

test('Resume PDF link returns the expected document', async () => {
  const response = await fetch(`${baseURL}/Pirun-Kongsaeng-Resume.pdf`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^application\/pdf\b/);

  const signature = Buffer.from(await response.arrayBuffer()).subarray(0, 5).toString('ascii');
  assert.equal(signature, '%PDF-');
});
