# Checklist da edição diária — cupons.blog

Tempo-alvo: 15 a 30 minutos. Regra de ouro: **só publique o que você viu na página da loja hoje.**

## 1. Coletar (por produto)
| Campo | Onde pegar | Observação |
|---|---|---|
| Título completo | Página do anúncio | Nunca use título cortado com "..." |
| Preço atual | Página do anúncio | Se exigir Pix ou cupom, escreva isso na observação |
| Preço anterior ("de") | Página do anúncio | Só se a loja mostrar. O site calcula o % truncado, igual ao Mercado Livre; se ainda divergir, omita e cite o % no texto |
| Link de afiliado | Botão **Compartilhar** (ML) / SiteStripe (Amazon) / gerador da Shopee | Link curto da própria plataforma |
| Imagem | Mercado Livre: botão direito na foto → **Copiar endereço da imagem**. Amazon: prefira o SiteStripe (**Imagem**) | Sempre só o link da imagem, nunca baixar ou hospedar |
| Título para o Google | Sua escolha | `tituloSeo`, até 60 caracteres, com a data e o destaque do dia. O build recusa mais que isso |
| Destaque do dia | Seus próprios itens | `destaque`: 2 a 4 frases originais com fatos já listados (maior desconto, condições e validade do cupom). Sem adjetivo vazio, sem dado que não está nos cards |
| Categoria | Sua escolha | Curta e genérica (ex.: Casa e lavanderia) |
| Cupom (se houver) | Página da campanha | Código exato (se houver), compra mínima, limite e validade que a loja informa |
| Validade do cupom | Página do cupom | Sem `validadeAte`, o cupom some do site 1 dia depois da edição (`cupomSemValidadeDias`) |

## 2. Não publicar
- % **Ganhos** / comissão: é dado interno.
- Preço, desconto, prazo ou estoque que você não viu na loja.
- Imagem da Amazon baixada e hospedada no site. Use apenas link; o SiteStripe é o caminho mais seguro com as regras do Associates.
- Produto com título incompleto ou link de outra loja.

## 3. Montar
1. Copie `src/content/edicoes/_modelo.md` para `src/content/edicoes/AAAA-MM-DD.md` (data de São Paulo).
2. Preencha cupons e ofertas. `loja`: `mercado-livre`, `amazon` ou `shopee`.
3. `verificadoEm` = hoje. `validadeAte` só se a loja informar.
4. Rode `npm run build`. O build falha se o link não pertencer à loja ou se `precoAnterior` for menor que `precoAtual`.

## 4. Conferir antes do push
- [ ] Todos os links abrem o produto certo.
- [ ] Preços batem com a página da loja neste momento.
- [ ] Imagem correta em cada card.
- [ ] Título e resumo da edição citam só fatos conferidos.
- [ ] Nenhum `[CONFIRMAR]` restante no arquivo.

## 5. Publicar
1. Commit: `content(edicoes): publica edição AAAA-MM-DD`.
2. Push na `main`. A Vercel publica sozinha.
3. Abra a home e `/curadoria/AAAA-MM-DD/` e confira.

## 6. Rotina semanal
- Ver no Search Console quais edições e lojas recebem impressões.
- Páginas de loja só indexam com 3 ou mais itens ativos.
- Edições com mais de 14 dias saem do sitemap sozinhas.

## Prompt para pedir a edição ao Claude
> No repositório `sennaricarte/cupons.blog` (Astro), crie `src/content/edicoes/AAAA-MM-DD.md` a partir de `_modelo.md` com os itens abaixo. Use só os dados que eu colar, sem inventar preço, desconto ou título. Valide com `npm run build`, mostre o diff e avise sobre qualquer divergência (ex.: % da loja diferente do calculado).
>
> Para cada produto: loja, título completo, preço atual, preço anterior (se houver), link de afiliado, URL da imagem, categoria e observações de pagamento.
