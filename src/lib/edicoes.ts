import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, type LojaSlug } from '../data/site';
import { diasEntre, hojeSP, isoDia } from './format';

export type Edicao = CollectionEntry<'edicoes'>;
type Cupom = Edicao['data']['cupons'][number];
type Oferta = Edicao['data']['ofertas'][number];

export const dataDaEdicao = (e: Edicao) => e.id; // arquivo nomeado AAAA-MM-DD.md

export async function todasEdicoes(): Promise<Edicao[]> {
  const hoje = hojeSP();
  const todas = await getCollection('edicoes');
  // Nunca publica edição com data futura (evita vazar rascunho agendado).
  return todas
    .filter((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.id) && e.id <= hoje)
    .sort((a, b) => b.id.localeCompare(a.id));
}

export const cupomAtivo = (c: Cupom, edicaoId: string, hoje = hojeSP()) =>
  c.validadeAte
    ? isoDia(c.validadeAte) >= hoje
    : diasEntre(edicaoId, hoje) <= SITE.cupomSemValidadeDias;

export const ofertaRecente = (e: Edicao, hoje = hojeSP()) =>
  diasEntre(e.id, hoje) <= SITE.ofertaValidadeDias;

export function itensAtivos(edicoes: Edicao[], loja?: LojaSlug) {
  const hoje = hojeSP();
  const cupons: (Cupom & { edicao: string })[] = [];
  const ofertas: (Oferta & { edicao: string })[] = [];
  for (const e of edicoes) {
    for (const c of e.data.cupons) {
      if (cupomAtivo(c, e.id, hoje) && (!loja || c.loja === loja)) cupons.push({ ...c, edicao: e.id });
    }
    if (ofertaRecente(e, hoje)) {
      for (const o of e.data.ofertas) {
        if (!loja || o.loja === loja) ofertas.push({ ...o, edicao: e.id });
      }
    }
  }
  return { cupons, ofertas, total: cupons.length + ofertas.length };
}

/** Edição ainda "fresca" o bastante para ser indexada/entrar no sitemap. */
export const edicaoIndexavel = (e: Edicao) =>
  diasEntre(e.id, hojeSP()) <= SITE.arquivoIndexavelDias &&
  e.data.cupons.length + e.data.ofertas.length > 0;
