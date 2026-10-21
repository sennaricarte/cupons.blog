import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../data/site';
import { todasEdicoes } from '../lib/edicoes';

export async function GET(context: APIContext) {
  const edicoes = (await todasEdicoes()).slice(0, 30);
  return rss({
    title: SITE.name,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: true,
    items: edicoes.map((e) => ({
      title: e.data.titulo,
      description: e.data.resumo,
      pubDate: e.data.publicadoEm,
      link: `/curadoria/${e.id}/`,
    })),
    customData: '<language>pt-br</language>',
  });
}
