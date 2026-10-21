import { SITE } from '../data/site';

export const crumbsLd = (items: { nome: string; path?: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.nome,
    ...(it.path ? { item: new URL(it.path, SITE.url).toString() } : {}),
  })),
});

export const itemListLd = (nome: string, itens: { nome: string }[], path: string) => ({
  '@type': 'ItemList',
  '@id': new URL(path, SITE.url).toString() + '#lista',
  name: nome,
  numberOfItems: itens.length,
  itemListElement: itens.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.nome })),
});
