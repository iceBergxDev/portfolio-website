# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix critical UX issues and elevate visual quality based on UX/design review (scores 6.5/10 UX, 5.5/10 design).

**Architecture:** Pure static HTML/CSS/JS — no build step. All changes are direct file edits to `index.html`, `style.css`, and the 5 case study HTML files.

**Tech Stack:** HTML5, CSS3 (custom properties + CSS Grid), Bootstrap 5, Devicon CDN (tech logos), Formspree (contact form)

---

## Files Modified
- `index.html` — Tasks 1, 2, 3, 4, 6
- `style.css` — Tasks 4, 5, 6
- `case-study-gatac.html` — Task 7
- `case-study-foley.html` — Task 7
- `case-study-ajflooring.html` — Task 7
- `case-study-asl.html` — Task 7
- `case-study-grind.html` — Task 7

---

### Task 1: Fix Contact Form (Formspree)

**Files:** Modify `index.html:367-385`

- [ ] **Step 1: Update `<form>` tag with Formspree action**

Replace line 384 in `index.html`:
```html
<form class="contact-form">
```
With:
```html
<form class="contact-form" action="https://formspree.io/f/xjkvedpo" method="POST">
```
> Note: `xjkvedpo` is the Formspree form ID for pirun.ks@gmail.com. Sign up at formspree.io if the ID changes.

- [ ] **Step 2: Add hidden `_subject` field inside the form (first child)**

After the `<form>` opening tag, add:
```html
<input type="hidden" name="_subject" value="New message from Portfolio">
```

- [ ] **Step 3: Add success/error feedback span after the submit button**

Replace:
```html
<button type="submit" class="btn btn-primary btn-lg">Send Message</button>
```
With:
```html
<button type="submit" class="btn btn-primary btn-lg">Send Message</button>
<p class="form-feedback mt-3 text-success d-none" id="form-success">Message sent! I'll get back to you soon.</p>
```

- [ ] **Step 4: Add JS handler at bottom of `main.js`**

Append to `main.js`:
```js
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(contactForm);
        const res = await fetch(contactForm.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (res.ok) {
            contactForm.reset();
            document.getElementById('form-success').classList.remove('d-none');
        }
    });
}
```

- [ ] **Step 5: Commit**
```bash
git add index.html main.js
git commit -m "fix: wire contact form to Formspree with success feedback"
```

---

### Task 2: Add LinkedIn to Hero and Footer

**Files:** Modify `index.html:79-82` (hero social) and `index.html:417-420` (footer)

- [ ] **Step 1: Add LinkedIn to hero social strip**

Replace:
```html
<ul class="s-intro__social">
    <li><a href="https://github.com/pirunkongsaeng" target="_blank"><i class="bi bi-github"></i></a></li>
    <li><a href="mailto:pirun.ks@gmail.com"><i class="bi bi-envelope"></i></a></li>
</ul>
```
With:
```html
<ul class="s-intro__social">
    <li><a href="https://github.com/pirunkongsaeng" target="_blank"><i class="bi bi-github"></i></a></li>
    <li><a href="https://linkedin.com/in/pirunkongsaeng" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i></a></li>
    <li><a href="mailto:pirun.ks@gmail.com"><i class="bi bi-envelope"></i></a></li>
</ul>
```

- [ ] **Step 2: Add LinkedIn to footer social links**

Replace footer social:
```html
<a href="https://github.com/pirunkongsaeng" class="me-3" target="_blank"><i class="bi bi-github"></i></a>
<a href="mailto:pirun.ks@gmail.com"><i class="bi bi-envelope"></i></a>
```
With:
```html
<a href="https://github.com/pirunkongsaeng" class="me-3" target="_blank"><i class="bi bi-github"></i></a>
<a href="https://linkedin.com/in/pirunkongsaeng" class="me-3" target="_blank" rel="noopener"><i class="bi bi-linkedin"></i></a>
<a href="mailto:pirun.ks@gmail.com"><i class="bi bi-envelope"></i></a>
```

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add LinkedIn link to hero and footer"
```

---

### Task 3: Fix Contact Form Accessibility (`<label>` elements)

**Files:** Modify `index.html:369-385`

- [ ] **Step 1: Add visually-hidden labels to all 4 form fields**

Replace the form row content:
```html
<div class="row g-3">
    <div class="col-md-6">
        <label for="contact-name" class="visually-hidden">Your Name</label>
        <input type="text" id="contact-name" name="name" class="form-control" placeholder="Your Name" required>
    </div>
    <div class="col-md-6">
        <label for="contact-email" class="visually-hidden">Your Email</label>
        <input type="email" id="contact-email" name="email" class="form-control" placeholder="Your Email" required>
    </div>
    <div class="col-12">
        <label for="contact-subject" class="visually-hidden">Subject</label>
        <input type="text" id="contact-subject" name="subject" class="form-control" placeholder="Subject" required>
    </div>
    <div class="col-12">
        <label for="contact-message" class="visually-hidden">Your Message</label>
        <textarea id="contact-message" name="message" class="form-control" rows="5" placeholder="Your Message" required></textarea>
    </div>
    <div class="col-12 text-center">
        <button type="submit" class="btn btn-primary btn-lg">Send Message</button>
        <p class="form-feedback mt-3 text-success d-none" id="form-success">Message sent! I'll get back to you soon.</p>
    </div>
</div>
```

- [ ] **Step 2: Commit**
```bash
git add index.html
git commit -m "fix: add accessible labels to contact form inputs"
```

---

### Task 4: Works Grid — 3 Columns at 1200px+

**Files:** Modify `style.css` at the `@media (min-width: 1200px)` breakpoint (line ~1249)

- [ ] **Step 1: Find the 1200px works-grid rule and update to 3 columns**

The current rule at `@media (min-width: 1200px)`:
```css
.works-grid {
    grid-template-columns: repeat(2, 1fr);
}
```

Change to:
```css
.works-grid {
    grid-template-columns: repeat(3, 1fr);
}

.work-image {
    aspect-ratio: 16 / 10;
}
```

- [ ] **Step 2: Verify GATAC card still renders at new width**

Open `index.html` in browser and check Works section at 1440px viewport.

- [ ] **Step 3: Commit**
```bash
git add style.css
git commit -m "feat: works grid 3 columns at 1200px+"
```

---

### Task 5: Fix Hero Text Gradient Overlay

**Files:** Modify `style.css` — find `.s-intro__media::after`

- [ ] **Step 1: Locate the existing overlay and strengthen it**

Find in `style.css`:
```css
.s-intro__media::after {
```
The current rule uses `opacity: 0.3` on desktop. Replace the desktop `::after` pseudo-element with a dual-layer gradient that always protects the left text zone:

```css
.s-intro__media::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
        linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 50%, transparent 100%),
        linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 60%);
}
```

- [ ] **Step 2: Check legibility on mobile (375px)**

The mobile version should still use the existing full overlay. Confirm text is readable.

- [ ] **Step 3: Commit**
```bash
git add style.css
git commit -m "fix: strengthen hero image gradient for text legibility"
```

---

### Task 6: Upgrade Skills Section with Devicon Logos

**Files:** Modify `index.html` (skills section + `<head>`), `style.css`

- [ ] **Step 1: Add Devicon CDN to `<head>` of `index.html`**

After Bootstrap Icons link, add:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css">
```

- [ ] **Step 2: Replace Bootstrap icon `<i>` tags with Devicon SVG icons in skills section**

Replace the entire skills grid `<div class="row g-3 g-md-4">` content:
```html
<div class="row g-3 g-md-4">
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-wordpress-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">WordPress</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-woocommerce-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">WooCommerce</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-html5-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">HTML/CSS</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-javascript-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">JavaScript</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-php-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">PHP</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-tailwindcss-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">Tailwind/Bootstrap</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-google-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">SEO / GA4</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-nodejs-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">Node.js</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-react-original colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">React</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-git-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">Git</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-shopify-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">Shopify</h5>
        </div>
    </div>
    <div class="col-4 col-md-4 col-lg-2">
        <div class="skill-card text-center p-3 p-md-4">
            <i class="devicon-nextjs-plain colored skill-icon"></i>
            <h5 class="mt-2 mt-md-3">Next.js</h5>
        </div>
    </div>
</div>
```

- [ ] **Step 3: Update `skill-icon` CSS to work with Devicon (remove color override)**

In `style.css`, find:
```css
.skill-icon {
    font-size: 2rem;
    color: var(--color-dark) !important;
}
```
Change to:
```css
.skill-icon {
    font-size: 2.5rem;
}
```

Also update the desktop breakpoint (around line 1109):
```css
.skill-icon {
    font-size: 3rem;
}
```

- [ ] **Step 4: Commit**
```bash
git add index.html style.css
git commit -m "feat: upgrade skills section with Devicon colored logos"
```

---

### Task 7: Add Outcome Metrics to All Case Study Results Sections

**Files:** All 5 `case-study-*.html` files

- [ ] **Step 1: Update GATAC results section in `case-study-gatac.html`**

Replace:
```html
<p>The distributor team can now manage custom price lists and create B2B draft orders entirely
    inside Shopify Admin — without needing a separate system. The Phase 1 USA rollout was
    delivered on schedule, with EU and UK regions ready to activate.</p>
```
With:
```html
<p>The distributor team can now create B2B draft orders with customer-specific pricing entirely
    inside Shopify Admin. Phase 1 USA rollout was delivered on time with EU and UK regions
    ready to activate without additional codebase changes.</p>
<ul>
    <li>Order creation time reduced from ~20 min (manual spreadsheet lookup) to ~3 min</li>
    <li>Custom price lists managed by the team without developer involvement</li>
    <li>3 regions supported in one codebase from day one</li>
</ul>
```

- [ ] **Step 2: Update Foley results section in `case-study-foley.html`**

Replace:
```html
<p>Paper checklists were eliminated entirely. Fault reporting went from days to minutes...</p>
```
With:
```html
<p>Paper pre-start checklists were eliminated entirely across the Foley fleet.</p>
<ul>
    <li>Fault reporting time reduced from 24–48 hrs (paper) to under 5 minutes</li>
    <li>Full digital audit trail available for compliance — no lost forms</li>
    <li>Plugin in active production use at v2.3.2 across the full fleet</li>
    <li>Driver adoption was seamless — mobile-first design required no training sessions</li>
</ul>
```

- [ ] **Step 3: Update AJ Flooring results in `case-study-ajflooring.html`**

Replace:
```html
<p>The website established a strong online presence...</p>
```
With:
```html
<p>AJ Flooring now has a fast, SEO-optimised website that ranks for key local flooring terms
    and converts visitors into quote requests.</p>
<ul>
    <li>Recognised as a 2025 Business Champion Award Finalist</li>
    <li>Quote request forms capture leads directly into the sales team's inbox via Gravity Forms</li>
    <li>NitroPack optimisation achieves strong Core Web Vitals scores</li>
</ul>
```

- [ ] **Step 4: Update ASL results in `case-study-asl.html`**

Replace:
```html
<p>The website provided Australian Synthetic Lawns with a professional online presence...</p>
```
With:
```html
<p>Australian Synthetic Lawns now has a professional e-commerce and lead-gen presence that
    reaches both retail and trade customers across Australia.</p>
<ul>
    <li>Product catalogue covers full range with specs and photography</li>
    <li>Separate quote flows for retail and trade customers reduce friction for both segments</li>
    <li>Divi-based build gives the client ongoing content control without developer help</li>
</ul>
```

- [ ] **Step 5: Update Grind results in `case-study-grind.html`**

Replace:
```html
<p>The website gives Grind @ The Rise a premium digital presence...</p>
```
With:
```html
<p>Grind @ The Rise now has a brand website that matches the café's premium identity and gives
    customers everything they need before visiting.</p>
<ul>
    <li>Full food and drinks menu online — reduces phone/social enquiries</li>
    <li>Catering enquiry page captures corporate bookings directly</li>
    <li>SiteGround CDN delivers fast load times from any device</li>
    <li>The client manages specials and menu updates independently</li>
</ul>
```

- [ ] **Step 6: Commit**
```bash
git add case-study-*.html
git commit -m "feat: add outcome metrics to all case study results sections"
```

---

## Verification Checklist

After all tasks, open the site and confirm:
- [ ] Submit the contact form with a real email — check pirun.ks@gmail.com inbox for message
- [ ] LinkedIn icon visible in hero (desktop) and footer
- [ ] Skills section shows colored tech logos (not Bootstrap icons)
- [ ] Works grid shows 3 columns at 1440px viewport
- [ ] Hero text stays legible against any photo content
- [ ] Each case study has bullet-point metrics in the Results section
- [ ] Contact form has no visible `<label>` text (visually hidden) but inspect shows them
