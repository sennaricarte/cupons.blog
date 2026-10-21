import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { LOJAS, LOJA_SLUGS } from './data/site';

const loja = z.enum(LOJA_SLUGS as [string, ...string[]]);

// Barra link de afiliado que não pertence à loja declarada (erro de digitação clássico).
function hostCombina(url: string, slug: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const hosts = LOJAS[slug as keyof typeof LOJAS].hosts;
    return hosts.some((h) => host === h || host.endsWith('.' + h));
  } catch {
    return false;
  }
}

const cupom = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, 'use kebab-case'),
    loja,
    titulo: z.string().min(8),
    // Texto real exibido pela loja (ex.: "R$ 20 off acima de R$ 99"). Nunca inventar.
    desconto: z.string().min(2),
    codigo: z.string().optional(), // opcional: há cupons que são só um clique
    condicoes: z.string().optional(),
    url: z.string().url(),
    validadeAte: z.coerce.date().optional(),
    verificadoEm: z.coerce.date(),
  })
  .refine((c) => hostCombina(c.url, c.loja), {
    message: 'url não pertence ao domínio da loja informada',
    path: ['url'],
  });

const oferta = z
  .object({
    id: z.string().regex(/^[a-z0-9-]+$/, 'use kebab-case'),
    loja,
    titulo: z.string().min(8),
    categoria: z.string().min(3),
    precoAtual: z.number().positive(),
    precoAnterior: z.number().positive().optional(),
    url: z.string().url(),
    imagem: z.string().url().optional(),
    observacao: z.string().optional(),
    verificadoEm: z.coerce.date(),
  })
  .refine((o) => hostCombina(o.url, o.loja), {
    message: 'url não pertence ao domínio da loja informada',
    path: ['url'],
  })
  .refine((o) => !o.precoAnterior || o.precoAnterior > o.precoAtual, {
    message: 'precoAnterior deve ser maior que precoAtual',
    path: ['precoAnterior'],
  });

// Uma edição = um dia de curadoria. Arquivos começando com "_" são ignorados (modelos).
const edicoes = defineCollection({
  loader: glob({ base: './src/content/edicoes', pattern: '**/[!_]*.md' }),
  schema: z.object({
    titulo: z.string().min(10),
    resumo: z.string().min(40).max(200),
    publicadoEm: z.coerce.date(),
    atualizadoEm: z.coerce.date().optional(),
    cupons: z.array(cupom).default([]),
    ofertas: z.array(oferta).default([]),
    faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })).default([]),
  }),
});

export const collections = { edicoes };
