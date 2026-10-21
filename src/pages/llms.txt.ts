import type { APIRoute } from 'astro';
import { SITE } from '../data/site';

export const GET: APIRoute = () =>
  new Response(
    `# ${SITE.name}\n\n> ${SITE.description}\n\n` +
      `Curadoria diária com cupons e ofertas verificados. Cada item traz data de verificação.\n` +
      `Links comerciais são de afiliado (rel=sponsored). Preços mudam: confirme na loja.\n\n` +
      `- [Curadoria do dia](${SITE.url}/curadoria/)\n- [Como funciona](${SITE.url}/como-funciona/)\n- [Divulgação de afiliados](${SITE.url}/divulgacao-de-afiliados/)\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
