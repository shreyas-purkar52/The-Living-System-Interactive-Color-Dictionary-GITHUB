export const colorDictionary = [
  {
    id: 'hue',
    term: 'Hue',
    category: 'Basics',
    hex: '#3A86FF',
    shortDef: 'The pure spectrum color without tint or shade.',
    icon: 'circle'
  },
  {
    id: 'saturation',
    term: 'Saturation',
    category: 'Basics',
    hex: '#FF006E',
    shortDef: 'The intensity or purity of a hue.',
    icon: 'droplet'
  },
  {
    id: 'value',
    term: 'Value (Lightness)',
    category: 'Basics',
    hex: '#888888',
    shortDef: 'The relative lightness or darkness of a color.',
    icon: 'sun'
  },
  {
    id: 'tint',
    term: 'Tint',
    category: 'Basics',
    hex: '#FFB3D9',
    shortDef: 'A hue mixed with white.',
    icon: 'circle'
  },
  {
    id: 'shade',
    term: 'Shade',
    category: 'Basics',
    hex: '#800037',
    shortDef: 'A hue mixed with black.',
    icon: 'circle'
  },
  {
    id: 'tone',
    term: 'Tone',
    category: 'Basics',
    hex: '#B34D80',
    shortDef: 'A hue mixed with gray.',
    icon: 'circle'
  },
  {
    id: 'primary',
    term: 'Primary',
    category: 'Systems',
    hex: '#FF0000',
    shortDef: 'Colors that cannot be created by mixing others.',
    icon: 'circle'
  },
  {
    id: 'secondary',
    term: 'Secondary',
    category: 'Systems',
    hex: '#00FF00',
    shortDef: 'Colors formed by mixing two primary colors.',
    icon: 'layout'
  },
  {
    id: 'tertiary',
    term: 'Tertiary',
    category: 'Systems',
    hex: '#FF8000',
    shortDef: 'Colors formed by mixing a primary and secondary color.',
    icon: 'layout'
  },
  {
    id: 'rgb',
    term: 'RGB',
    category: 'Systems',
    hex: '#00FF00',
    shortDef: 'Red, Green, Blue. Used for digital screens.',
    icon: 'layout'
  },
  {
    id: 'cmyk',
    term: 'CMYK',
    category: 'Systems',
    hex: '#00FFFF',
    shortDef: 'Cyan, Magenta, Yellow, Key (Black). Used for printing.',
    icon: 'layout'
  },
  {
    id: 'additive',
    term: 'Additive',
    category: 'Perception',
    hex: '#FFFFFF',
    shortDef: 'Colors created by mixing light.',
    icon: 'sun'
  },
  {
    id: 'subtractive',
    term: 'Subtractive',
    category: 'Perception',
    hex: '#000000',
    shortDef: 'Colors created by mixing pigments.',
    icon: 'droplet'
  },
  {
    id: 'complementary',
    term: 'Complementary',
    category: 'Relationships',
    hex: '#FFBE0B',
    shortDef: 'Colors opposite each other on the color wheel.',
    icon: 'git-commit'
  },
  {
    id: 'analogous',
    term: 'Analogous',
    category: 'Relationships',
    hex: '#3A86FF',
    shortDef: 'Colors next to each other on the color wheel.',
    icon: 'layout'
  },
  {
    id: 'triadic',
    term: 'Triadic',
    category: 'Relationships',
    hex: '#FF006E',
    shortDef: 'Three colors evenly spaced on the color wheel.',
    icon: 'git-commit'
  },
  {
    id: 'contrast',
    term: 'Simultaneous Contrast',
    category: 'Perception',
    hex: '#ffffff',
    shortDef: 'How a background changes the perceived color of a foreground object.',
    icon: 'contrast-icon'
  }
];

export const categories = ['All', 'Basics', 'Relationships', 'Perception', 'Systems'];
