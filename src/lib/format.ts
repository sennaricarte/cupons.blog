import { SITE } from '../data/site';

export const brl = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** YYYY-MM-DD de hoje no fuso de São Paulo (o build roda em UTC). */
export function hojeSP(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: SITE.timezone });
}

export const isoDia = (d: Date) => d.toISOString().slice(0, 10);

export function dataLonga(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function dataCurta(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

export function diasEntre(aIso: string, bIso: string): number {
  return Math.round(
    (new Date(bIso + 'T00:00:00Z').getTime() - new Date(aIso + 'T00:00:00Z').getTime()) / 86400000,
  );
}

export const pctOff = (atual: number, anterior: number) =>
  Math.floor((1 - atual / anterior) * 100);
