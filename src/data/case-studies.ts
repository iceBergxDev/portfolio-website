import { CaseStudy, Project } from '@/types/project'
import { allProjects } from './all-projects'

// Shared card fields, including status, come from the catalogue.
const caseStudyDetails: Partial<Record<string, Omit<CaseStudy, keyof Project>>> = {
  gatac: {
    client: 'GATAC',
    role: 'Full-Stack Developer',
    challenge: 'The wholesale team needed one place to sign in, see customer-specific price lists, choose products and prepare Shopify draft orders.',
    responsibility: 'I built the Next.js 14 portal and connected the ordering flow to Shopify.',
    solution: 'I connected account access, price lists, customers, products and draft orders through Shopify Admin and App Bridge APIs. PostgreSQL and Kysely handle the portal data.',
    verification: 'The checks cover installation, types, linting, production builds, leaked tokens, unit and integration tests, and the ordering flow in the browser.',
    result: 'The US portal is live and supports the wholesale draft-order flow.',
    boundary: 'The US version is live. EU and UK work is not live.',
    features: [
      { title: 'Wholesale ordering', description: 'The team can choose a customer and products, use the right price list and prepare a Shopify draft order.' },
      { title: 'Draft order review', description: 'The portal keeps the customer, product and order details together for a final check before creation.' },
    ],
    stats: [{ label: 'Production market', value: 'US' }],
  },
  foley: {
    client: 'Foley Logistics',
    role: 'WordPress Plugin Developer',
    challenge: 'Drivers needed the right inspection checklist for each vehicle, a clear way to report faults and a saved record of every inspection.',
    responsibility: 'I built the custom PHP 8 inspection tool inside WordPress.',
    solution: 'I created separate checklist rules for eight vehicle types, routed reported faults and stored each inspection in MySQL. The system covers a fleet with 41 drivers.',
    verification: 'I checked that each vehicle type receives the right checklist, faults follow the expected route and completed inspection records are saved in MySQL.',
    result: 'The tool is in production and supports 41 drivers across eight vehicle types.',
    boundary: 'Time saved, incident reduction, and other business outcomes were not measured.',
    features: [
      { title: 'Vehicle-specific checklists', description: 'Drivers see a checklist that matches the type of vehicle they are inspecting.' },
      { title: 'Faults and inspection records', description: 'Reported faults follow the configured route, and each inspection is saved in MySQL.' },
    ],
    stats: [{ label: 'Drivers covered', value: '41' }, { label: 'Vehicle types', value: '8' }],
  },
  expandasign: {
    client: 'Expandasign',
    role: 'WooCommerce Developer',
    challenge: 'Some prices in the WooCommerce catalogue were not resolving correctly, and the team needed a way to find and prepare fixes for them.',
    responsibility: 'I checked the catalogue pricing, prepared the repair import and tightened the production plugin-update process.',
    solution: 'I built a pricing checker and prepared 107 repair rows for review. I also added safeguards around production plugin updates.',
    verification: 'The checker ran through 1,771 price resolutions and found 61 failures. I prepared the 107-row repair import but did not apply it.',
    result: 'The failed price resolutions were identified, and the repair file was ready for review. The safer plugin-update process was put into production.',
    boundary: 'The 107-row import was not applied. The projected reduction from 61 failures to 3 is not a production result. Security details are kept at a high level.',
    features: [
      { title: 'Catalogue price check', description: 'The checker went through the catalogue prices and listed the failures that needed attention.' },
      { title: 'Repair file for review', description: 'I prepared 107 repair rows without applying them to production.' },
    ],
    stats: [{ label: 'Price checks run', value: '1,771' }, { label: 'Price failures found', value: '61' }, { label: 'Repair rows prepared', value: '107' }],
  },
  storyfilms: {
    client: 'StoryFilms',
    role: 'WordPress Developer',
    challenge: 'The Elementor site needed a deployment process that could be repeated safely, and one large source video needed to be made smaller.',
    responsibility: 'I set up the Elementor build and deployment scripts, reduced the video file and handled the production release.',
    solution: 'I scripted the build and deployment steps, kept backups and rollback checks in the process, and reduced the source video from 170 MB to 17.4 MiB.',
    verification: 'The production release passed 29 checks. A later verification run passed 39 checks.',
    result: 'The Elementor changes reached production through the new process, and the source video was reduced to 17.4 MiB.',
    boundary: 'The smaller video file is not a site-wide speed score. The available records do not show that every later plugin change was deployed.',
    features: [
      { title: 'Repeatable Elementor releases', description: 'The scripts take the build through backups, checks and the production deployment in a consistent order.' },
      { title: 'Smaller video file', description: 'I reduced the source video from 170 MB to 17.4 MiB without treating that file-size change as a site-wide speed result.' },
    ],
    stats: [{ label: 'Original video', value: '170 MB' }, { label: 'Reduced video', value: '17.4 MiB' }, { label: 'Latest checks passed', value: '39' }],
  },
  mdf: {
    client: 'MDF Beauty',
    role: 'Shopify Theme Developer',
    challenge: 'MDF Beauty needed its editorial design built in Shopify, along with a signup flow that could be tested from start to finish.',
    responsibility: 'I built the Liquid theme sections and native popup, then worked on the signup flow and its replacement automation.',
    solution: 'I built the homepage, product content and Journal in the theme. I also added the popup and signup flow, then replaced the earlier automation with a tag-based workflow.',
    verification: 'The earlier workflow recorded no successful sends. In testing, the replacement tag-based automation completed successfully.',
    result: 'The theme includes the editorial and product content, and the replacement signup automation completed in a test run.',
    boundary: 'Final sender recovery and broad performance improvement were not verified. I do not claim a specific number of product templates.',
    features: [
      { title: 'Editorial homepage', description: 'I built the homepage structure and the skincare-focused visual sections in Liquid.', image: '/images/projects/mdf/live-homepage.png' },
      { title: 'Product and Journal content', description: 'The custom sections support product information and Journal pages inside the Shopify theme.', image: '/images/projects/mdf/live-journal.png' },
      { title: 'Email signup flow', description: 'The signup form feeds into the replacement tag-based automation used in testing.', image: '/images/projects/mdf/live-signup.png' },
    ],
  },
  'flip-films': {
    client: 'Flip Films',
    role: 'Web Developer',
    challenge: 'The Squarespace site relies on Vimeo, so I needed to find what was slowing the page down and measure any change I made.',
    responsibility: 'I traced the loading behaviour, adjusted the Squarespace and Vimeo setup, and compared the results before and after.',
    solution: 'I changed how the video loads, then measured the desktop and mobile experience again.',
    verification: 'Lighthouse showed a desktop score of 62 before the work and 67 after. On mobile, First Contentful Paint (FCP) was about 34% faster, Largest Contentful Paint (LCP) was about 21% faster, and Cumulative Layout Shift (CLS) was 0.',
    result: 'The live changes improved the measured desktop score and mobile loading times.',
    boundary: 'The mobile score was within test variance. No score target is claimed as reached.',
    features: [
      { title: 'Vimeo loading changes', description: 'I traced and adjusted how the video loads inside the Squarespace site.' },
      { title: 'Before-and-after checks', description: 'I kept the desktop score and mobile loading timings separate so the normal test variation stays visible.' },
    ],
    stats: [{ label: 'Desktop score before', value: '62' }, { label: 'Desktop score after', value: '67' }, { label: 'Mobile FCP faster', value: 'About 34%' }, { label: 'Mobile LCP faster', value: 'About 21%' }],
  },
  altalena: {
    client: 'Altalena',
    role: 'WordPress Developer',
    challenge: 'A set of WordPress SEO and CMS issues needed fixing without making the live site the first place the changes were tried.',
    responsibility: 'I handled the fixes from the staging checks through to the production release and final review.',
    solution: 'I prepared and checked the changes on staging, wrote the rollback steps, moved the fixes to production, then checked the cache and CSS.',
    verification: 'The final production run completed 160 checks with 160 passes and 0 failures.',
    result: 'The SEO and CMS fixes described here reached production, and all 160 final checks passed.',
    boundary: 'The 160 checks cover only the fixes described here. They do not prove work or results outside those changes.',
    features: [
      { title: 'Staging and rollback steps', description: 'I checked the fixes on staging and prepared the rollback steps before changing production.' },
      { title: 'Production checks', description: 'The final run included cache and CSS checks and finished with 160 passes and no failures.' },
    ],
    stats: [{ label: 'Final checks passed', value: '160' }, { label: 'Final checks failed', value: '0' }],
  },
  hype: {
    client: 'Hype Promotions',
    role: 'WooCommerce Developer',
    challenge: 'Customers were having trouble with the Request a Quote and Add to Quote journey on the live WooCommerce catalogue.',
    responsibility: 'I repaired the quote flow on the live WooCommerce site.',
    solution: 'I corrected the Request a Quote and Add to Quote paths across a catalogue of about 1,724 products.',
    verification: 'I checked the repaired quote journey on the live site. The separate full redesign was tested only as a local build.',
    result: 'The repaired quote flow is live across the catalogue of about 1,724 products.',
    boundary: 'The full redesign remained local and was not deployed. I have no conversion-rate data, so I do not claim an improvement.',
    features: [
      { title: 'Live quote journey', description: 'The production fix covers both Request a Quote and Add to Quote.' },
      { title: 'Redesign kept separate', description: 'The broader redesign stayed local and is not presented as part of the live repair.' },
    ],
    stats: [{ label: 'Catalogue products', value: 'About 1,724' }],
  },
  newstart: {
    client: 'Newstart Homes',
    role: 'WordPress Developer',
    challenge: 'A visitor choosing a house-and-land package needed that exact choice to follow them into the enquiry form.',
    responsibility: 'I built the local WordPress listing flow and must-use (MU) plugin, including the form prefilling.',
    solution: 'I added listings for nine house-and-land packages and passed the chosen package into the enquiry form.',
    verification: 'Repeatable tests cover the listing and enquiry flow. The version described here remains a local build.',
    result: 'The local build supports nine packages and carries the selected package into its enquiry form.',
    boundary: 'The current build is local. I have not verified a live launch, changes in buyer behaviour, the builder’s tenure or NitroPack performance results as part of this work.',
    features: [
      { title: 'House-and-land listings', description: 'The WordPress listing and MU-plugin work covers nine house-and-land packages.' },
      { title: 'Prefilled enquiries', description: 'The chosen package is passed into the enquiry form, and repeatable tests cover the flow.' },
    ],
    stats: [{ label: 'Packages in local build', value: '9' }],
  },
  'aj-flooring': {
    client: 'AJ Flooring',
    role: 'WordPress / Elementor Developer',
    challenge: 'The flooring site needed responsive pages that made its services and completed projects easy to browse.',
    responsibility: 'I worked on the WordPress and Elementor pages and their responsive layouts.',
    solution: 'I organised service information, project photography and enquiry links into clear page sections.',
    verification: 'The saved desktop captures cover the homepage, service content and feature sections included here.',
    result: 'The work shown here covers the main service pages built with WordPress and Elementor.',
    boundary: 'I do not present the production release, conversion changes, or the client’s certifications and awards as results of my development work.',
    features: [
      { title: 'Services and project work', description: 'The Elementor sections bring together flooring services, completed projects and clear enquiry links.', image: '/images/projects/aj-flooring/services.jpg' },
      { title: 'Responsive layouts', description: 'The page hierarchy and service content adapt to different screen sizes.', image: '/images/projects/aj-flooring/features.jpg' },
    ],
  },
  'view-ningaloo': {
    client: 'View Ningaloo',
    role: 'WooCommerce Developer',
    challenge: 'The site needed a gift-card purchase journey that passed the order from WooCommerce to Rezdy.',
    responsibility: 'I built and tested the gift-card flow on staging, including the handoff between WooCommerce and Rezdy.',
    solution: 'I set up nine approved purchase amounts and worked through the customer journey on the staging site.',
    verification: 'I checked all nine configured amounts and the WooCommerce-to-Rezdy handoff on staging.',
    result: 'The staging build supports the planned gift-card journey for all nine amounts.',
    boundary: 'This version was still on staging, so I do not present it as a production release.',
    features: [
      { title: 'Nine gift-card amounts', description: 'The WooCommerce product flow includes all nine approved purchase amounts.' },
      { title: 'Rezdy handoff', description: 'The staging journey passes the gift-card purchase from WooCommerce into Rezdy.' },
    ],
    stats: [{ label: 'Amounts in staging', value: '9' }],
  },
  'will-fitness': {
    client: 'Will Fitness',
    role: 'WordPress / Elementor Developer',
    challenge: 'The coaching site needed a responsive landing page and a WordPress setup that could be rebuilt consistently.',
    responsibility: 'I built the responsive site and the local WordPress and Elementor setup.',
    solution: 'I created the coaching, results, pricing and contact sections, then wrote repeatable scripts for the WordPress setup and page build.',
    verification: 'The local WordPress build passed all 20 checks in the test set.',
    result: 'The local build includes the responsive coaching site and a WordPress setup that can be repeated.',
    boundary: 'I have not verified a live WordPress release or any customer fitness outcome. Client claims, testimonials and guarantees are not my development results.',
    features: [
      { title: 'Responsive coaching pages', description: 'The layout covers coaching, results, pricing and contact content across screen sizes.' },
      { title: 'Repeatable WordPress setup', description: 'The WordPress and Elementor scripts can recreate the local page structure.' },
    ],
    stats: [{ label: 'Local checks passed', value: '20 of 20' }],
  },
  hwd: {
    client: 'HWD Landscape & Maintenance',
    role: 'WordPress Developer',
    challenge: 'The top of the WordPress site needed a clearer header and hero, along with fixes for smaller screens.',
    responsibility: 'I made the presentation changes and checked each layout I touched.',
    solution: 'I updated the header and hero, fixed the responsive behaviour and reviewed the changed service sections.',
    verification: 'Before-and-after captures and responsive checks cover the sections I changed.',
    result: 'The staging build includes the revised header, hero and responsive layouts.',
    boundary: 'I do not have a verified production release for these changes, so the project remains labelled Staging.',
    features: [
      { title: 'Header and hero', description: 'The updated top section makes the navigation and service introduction easier to follow.' },
      { title: 'Responsive checks', description: 'I checked the changed sections at different screen sizes after the fixes.' },
    ],
  },
  tartan: {
    client: 'Tartan',
    role: 'WordPress Developer',
    challenge: 'WordPress page-builder content is stored as serialized data, so a small edit could also change sections that were meant to stay untouched.',
    responsibility: 'I wrote the targeted content changes and the checks around the affected WordPress pages.',
    solution: 'I changed only the requested builder sections, kept the other data intact and added semantic and hash checks around the process.',
    verification: 'The checks compare frozen content hashes, required content and the exact bytes of every section outside the change.',
    result: 'The process changes the requested builder content and makes any unintended difference visible.',
    boundary: 'I do not have a complete production deployment record for this work, so I label it Selected work rather than Production.',
    features: [
      { title: 'Targeted builder changes', description: 'The transformation edits the requested content while leaving unrelated serialized sections unchanged.' },
      { title: 'Checks for unintended edits', description: 'Meaning, hash and byte-level comparisons expose differences outside the requested change.' },
    ],
  },
  asl: {
    client: 'Australian Synthetic Lawns',
    role: 'WordPress / WooCommerce Developer',
    challenge: 'The site serves both retail and trade visitors, so product browsing, trade information and quote enquiries needed to work together.',
    responsibility: 'I worked on the customer-facing WordPress, Divi and WooCommerce pages.',
    solution: 'I connected product discovery, trade information and quote enquiries across the relevant WordPress pages.',
    verification: 'The saved captures show the homepage, products, gallery and feature pages included in this work.',
    result: 'The selected pages show the WordPress, Divi and WooCommerce work across the main retail and trade journeys.',
    boundary: 'I do not claim a conversion-rate change, speed improvement or other business result for this work.',
    features: [
      { title: 'Retail and trade paths', description: 'The pages separate product discovery from trade information while keeping quote enquiries easy to find.' },
      { title: 'WooCommerce products', description: 'Product browsing sits inside the wider Divi-based WordPress site.' },
    ],
  },
}

export const projectDetails: CaseStudy[] = allProjects.flatMap((project) => {
  const details = caseStudyDetails[project.slug]
  return details ? [{ ...project, ...details }] : []
})

export const caseStudies = projectDetails.filter((project) => project.hasCaseStudy)

export function getProjectDetailBySlug(slug: string): CaseStudy | undefined {
  return projectDetails.find((project) => project.slug === slug)
}
