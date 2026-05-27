# Mayane Ferreira Advocacia

Site institucional estático da advogada Mayane Ferreira, com layout fiel ao template visual, camadas semânticas para SEO/acessibilidade e deploy preparado para GitHub + Vercel.

## Estrutura

- `index.html`: conteúdo, SEO, schema LegalService, links e hotspots clicáveis.
- `styles.css`: responsividade, hotspots, camada semântica invisível e animações premium.
- `script.js`: FAQ acessível e animações de entrada.
- `assets/`: imagens WebP usadas no site, favicon e imagem Open Graph.
- `docs/`: instruções de atualização e PNGs originais do template.
- `scripts/validate-site.mjs`: validações rápidas de SEO, WhatsApp, FAQ, schema e estrutura.

## Comandos

```bash
npm run lint
npm run build
```

## Contatos padronizados

- WhatsApp exibido: `(67) 99204-4544`
- WhatsApp nos links: `https://wa.me/5567992044544`
- Instagram: `https://www.instagram.com/mayaneferreira.adv`
- OAB: `OAB/PR 124.249`
- Atendimento: `Caarapó/MS e região, online em todo o Brasil`

## Regra de manutenção

O visual principal vem das imagens WebP em `assets/`. Para manter o design fiel, substitua imagens usando os mesmos nomes e proporção `1672x941`, ajuste textos semânticos em `index.html` quando necessário e rode `npm run build` antes de publicar.
