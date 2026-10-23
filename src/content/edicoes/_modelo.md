---
# MODELO — arquivos que começam com "_" são ignorados no build.
# Copie para AAAA-MM-DD.md (o nome do arquivo é a data da edição, fuso de São Paulo).
# REGRA DE OURO: só publique cupom/preço que você viu na página da loja HOJE. Nada de estimativa.
titulo: "Cupons e ofertas de hoje: [destaque real do dia]"
tituloSeo: "Cupons e ofertas de hoje (DD/MM)"   # opcional, até 60 caracteres (aparece no Google)
resumo: "Resumo de 1–2 frases (40–200 caracteres) citando o que há de melhor hoje, só com fatos conferidos."
publicadoEm: 2026-01-01
cupons:
  - id: ml-exemplo-cupom          # único, kebab-case
    loja: mercado-livre           # mercado-livre | amazon | shopee
    titulo: "Texto exato da campanha na loja"
    desconto: "Texto exato do benefício (ex.: valor e pedido mínimo)"
    codigo: "CODIGO"              # opcional
    condicoes: "Regras que a loja informa (categorias, limite, primeira compra...)"
    url: "https://meli.la/SEU-LINK-DE-AFILIADO"
    validadeAte: 2026-01-02       # opcional, só se a loja informar
    verificadoEm: 2026-01-01
ofertas:
  - id: amz-exemplo-produto
    loja: amazon
    titulo: "Nome do produto como na loja"
    categoria: "Eletrônicos"
    precoAtual: 0.01              # preço visto na loja
    precoAnterior: 0.02           # opcional: só se a loja mostrar o preço "de"
    url: "https://amzn.to/SEU-LINK"
    verificadoEm: 2026-01-01
faq: []
---
Texto editorial curto (opcional): por que essas ofertas valem a pena hoje, em primeira pessoa do plural, sem inventar dados.
