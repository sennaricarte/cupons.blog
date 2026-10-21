import type { APIRoute } from 'astro';
import { SITE, LOJA_SLUGS } from '../data/site';
import { todasEdicoes, itensAtivos, edicaoIndexavel } from '../lib/edicoes';
import { isoDia } from '../lib/format';

export const GET: APIRoute = async () => {
  const edicoes = await todasEdicoes();
  const ultima = edicoes[0]?.id;
  const urls: { loc: string; lastmod?: string }[] = [];

  // Só entram URLs indexáveis (mesmos gates das páginas).
  if (itensAtivos(edicoes).total > 0) urls.push({ loc: '/', lastmod: ultima });
  if (edicoes.length) urls.push({ loc: '/curadoria/', lastmod: ultima });
  for (const s of LOJA_SLUGS) {
    if (itensAtivos(edicoes, s).total >= SITE.minItensHub) urls.push({ loc: `/${s}/`, lastmod: ultima });
  }
  for (const e of edicoes.filter(edicaoIndexavel)) {
    urls.push({ loc: `/curadoria/${e.id}/`, lastmod: isoDia(e.data.atualizadoEm ?? e.data.publicadoEm) });
  }
  urls.push({ loc: '/como-funciona/' }, { loc: '/divulgacao-de-afiliados/' });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map((u) => `  <url><loc>${SITE.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
      .join('\n') +
    `\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
