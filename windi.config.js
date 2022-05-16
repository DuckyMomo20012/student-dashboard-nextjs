import colors from 'windicss/colors';
import range from 'lodash/range';

const dynamicColor = (prop) => {
  const listColors = [
    'pink',
    'rose',
    'red',
    'orange',
    'yellow',
    'amber',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'purple',
    'violet',
    'fuchsia',
    'gray',
    'slate',
    'stone',
    'neutral',
    'zinc',
    'light',
    'darker',
    'dark',
    'primary',
  ];
  const result = listColors.map((color) => `${prop}-${color}-50`);
  result.push(
    ...listColors.flatMap((color) => {
      return range(100, 1000, 100).map((num) => {
        return `${prop}-${color}-${num}`;
      });
    }),
  );
  return result;
};

export default {
  alias: {
    // ...
  },
  attributify: true,
  darkMode: 'class',
  extract: {
    exclude: ['node_modules', '.git', '.next/**/*'],
    include: ['**/*.{jsx,css}'],
  },
  plugins: [
    // Other plugins
    require('@windicss/plugin-animations')({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
        animationDelaySpeed: 1000,
      },
    }),
  ],
  shortcuts: {
    // ...
  },
  safelist: [
    dynamicColor('bg'),
    dynamicColor('text'),
    dynamicColor('hover:bg'),
  ],
  theme: {
    extend: {
      colors: {
        white: '#FAFAFA',
        black: '#333',
        primary: colors.rose,
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Roboto Slab', 'ui-serif', 'Georgia'],
        mono: ['Space Mono', 'ui-monospace', 'SFMono-Regular'],
        heading: ['Barlow'],
      },
    },
  },
};
