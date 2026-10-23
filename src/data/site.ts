export const SITE = {
  name: 'Cupons.blog',
  url: 'https://cupons.blog',
  locale: 'pt-BR',
  timezone: 'America/Sao_Paulo',
  tagline: 'Cupons e promoções verificados todos os dias',
  description:
    'Curadoria diária de cupons de desconto e produtos em promoção no Mercado Livre, Amazon e Shopee.',
  // Tag de afiliado Amazon Associates (já usada nos outros sites).
  amazonTag: 'cleudivanrica-20',
  // E-mail público de contato. [CONFIRMAR] — enquanto null, a página /contato/ fica noindex.
  contactEmail: 'contato@cupons.blog' as string | null,
  // Quantos dias uma edição continua alimentando as páginas de loja (preço muda rápido).
  ofertaValidadeDias: 3,
  // Cupom sem validade informada pela loja: some depois de N dias da edição (0 = só no dia).
  cupomSemValidadeDias: 1,
  // Edições mais antigas que isso saem do sitemap e ganham noindex (conteúdo vencido).
  arquivoIndexavelDias: 14,
  // Mínimo de itens ativos para uma página de loja ser indexável (gate anti-thin content).
  minItensHub: 3,
  // /cupons/ é página evergreen: indexa com 1+ cupom ativo (evita liga/desliga do noindex quando cupons vencem).
  minCuponsPagina: 1,
  whatsappGrupo: 'https://chat.whatsapp.com/J7GTPjzdldFAeCkd8cZQSE?s=cl&p=i&mlu=4&ilr=4',
  instagram: 'https://www.instagram.com/achadinhos.cupons.blog?srtk=cXA3aHdndGhkNmUz',
} as const;

export type LojaSlug = 'mercado-livre' | 'amazon' | 'shopee';

export const LOJAS: Record<
  LojaSlug,
  { nome: string; hosts: string[]; cor: string; descricao: string }
> = {
  'mercado-livre': {
    nome: 'Mercado Livre',
    hosts: ['mercadolivre.com.br', 'mercadolivre.com', 'meli.la'],
    cor: '#b38600',
    descricao: 'Cupons e ofertas do Mercado Livre selecionados hoje.',
  },
  amazon: {
    nome: 'Amazon',
    hosts: ['amazon.com.br', 'amzn.to', 'link.amazon'],
    cor: '#c45500',
    descricao: 'Cupons e ofertas da Amazon Brasil selecionados hoje.',
  },
  shopee: {
    nome: 'Shopee',
    hosts: ['shopee.com.br', 'shp.ee'],
    cor: '#d0371e',
    descricao: 'Cupons e ofertas da Shopee selecionados hoje.',
  },
};

export const LOJA_SLUGS = Object.keys(LOJAS) as LojaSlug[];
