# Guia rápido de atualização

## Antes de editar

1. Não alterar a paleta, tipografia, layout, espaçamentos principais ou estética premium clara/cinza/dourado.
2. Preservar os nomes dos arquivos em `assets/` sempre que possível.
3. Manter apenas um `h1` no HTML.
4. Não usar promessas jurídicas como resultado garantido, ganhar processo, garantir liberdade ou reduzir pena.

## Atualizar textos

Edite os textos semânticos no `index.html`, dentro de cada `.semantic-layer`.

A `.semantic-layer` existe para SEO, acessibilidade e leitores de tela. Ela deve continuar invisível visualmente, sem duplicar textos sobre as imagens.

Depois de editar:

```bash
npm run build
```

## Atualizar links

Todos os CTAs de WhatsApp devem usar o número:

```text
https://wa.me/5567992044544
```

Quando mudar telefone, trocar em:

- Links `wa.me` no `index.html`
- Texto visível/semântico do telefone
- Schema JSON-LD em `telephone`
- `scripts/validate-site.mjs`

## Atualizar imagens

As imagens em produção ficam em `assets/`. Os PNGs originais do template ficam em `docs/template-original/` como referência.

Para trocar uma seção:

1. Exportar nova imagem em WebP.
2. Manter proporção `1672x941`.
3. Salvar com o mesmo nome do arquivo atual em `assets/`.
4. Revisar o `alt` da imagem no `index.html`.
5. Rodar `npm run build`.

## Publicar

```bash
git status --short
git add .
git commit -m "Atualiza site Mayane Ferreira"
git push origin main
vercel deploy --prod --yes
```
