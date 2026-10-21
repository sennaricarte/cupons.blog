import { defineConfig } from 'astro/config';

// Site 100% estático: HTML puro, zero JS por padrão (melhor LCP/INP).
export default defineConfig({
  site: 'https://cupons.blog',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: false },
  markdown: { gfm: true, smartypants: true },
});
