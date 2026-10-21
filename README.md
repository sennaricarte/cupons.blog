# Cupons.blog

Curadoria diária de cupons e ofertas (Mercado Livre, Amazon, Shopee) com links de afiliado. Astro estático.

## Publicar a edição do dia
1. Copie `src/content/edicoes/_modelo.md` para `src/content/edicoes/AAAA-MM-DD.md`.
2. Preencha só com cupons/preços **vistos na loja hoje**. Use seu link de afiliado em `url`.
3. `npm run build` valida o schema (domínio do link × loja, preço anterior > atual).
4. Commit + push → deploy na Vercel.

## Regras de SEO embutidas (em código)
- Home sem itens ativos → `noindex`. Página de loja com < 3 itens ativos → `noindex`.
- Edições com mais de 14 dias → `noindex` e fora do sitemap.
- Cupom com `validadeAte` vencido some das listagens no próximo build (rebuild diário via GitHub Actions).
- Todo link comercial: `rel="sponsored nofollow noopener"`. Amazon recebe a tag automaticamente.
- Páginas com `[CONFIRMAR]` (privacidade, contato) ficam `noindex` até serem resolvidas.
