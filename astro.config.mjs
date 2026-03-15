// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';
import tailwindcss from "@tailwindcss/vite";

import db from '@astrojs/db';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  integrations: [react(), db()] ,
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@nsmr/pixelart-react'],
    }
  },
});