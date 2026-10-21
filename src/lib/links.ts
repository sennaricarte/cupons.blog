import { SITE } from '../data/site';

/** Amazon: garante a tag de afiliado em links amazon.com.br completos. amzn.to já embute a tag. */
export function linkAfiliado(url: string, loja: string): string {
  if (loja !== 'amazon') return url;
  const u = new URL(url);
  if (u.hostname.endsWith('amazon.com.br') && !u.searchParams.has('tag')) {
    u.searchParams.set('tag', SITE.amazonTag);
  }
  return u.toString();
}

/** Atributos obrigatórios para links de afiliado (Google + política dos programas). */
export const REL_AFILIADO = 'sponsored nofollow noopener';
