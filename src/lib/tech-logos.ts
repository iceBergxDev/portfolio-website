export const TAG_LOGOS: Record<string, string> = {
  'WordPress':        'wordpress',
  'WooCommerce':      'woocommerce',
  'Shopify':          'shopify',
  'Next.js':          'nextdotjs',
  'React':            'react',
  'TypeScript':       'typescript',
  'JavaScript':       'javascript',
  'PHP':              'php',
  'PHP 8':            'php',
  'HTML5':            'html5',
  'CSS3':             'css3',
  'Tailwind CSS':     'tailwind-css',
  'MySQL':            'mysql',
  'Git':              'git',
  'GitHub':           'github',
  'Figma':            'figma',
  'Elementor':        'elementor',
  'Elementor Pro':    'elementor',
  'Claude':           'claude',
  'Cursor':           'cursor',
}

export const SVG_BASE = 'https://thesvg.org/icons'

export function getTagLogo(tag: string): string | null {
  const slug = TAG_LOGOS[tag]
  return slug ? `${SVG_BASE}/${slug}/default.svg` : null
}
