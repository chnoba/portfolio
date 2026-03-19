// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: 'Munro',
      cssVariable: '--font-munro',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/munro.woff2'],
            weight: '400',
            style: 'normal'
          }
        ]
      }
    },
    {
      name: 'MunroNarrow',
      cssVariable: '--font-munro-narrow',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/munronarrow.woff2'],
            weight: 'normal',
            style: 'normal'
          }
        ]
      }
    },
    {
      name: 'MunroSmall',
      cssVariable: '--font-munro-small',
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/munrosmall.woff2'],
            weight: 'normal',
            style: 'normal'
          }
        ]
      }
    }
  ],
  adapter: vercel(),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});