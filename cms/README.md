# Strapi CMS — Blog

O Strapi deste projeto é usado **apenas para posts do blog**. O conteúdo do site (hero, sobre, serviços, FAQ, etc.) fica hardcoded em `src/content/site.ts`.

## Requisito: Node.js 22–24

Strapi **não suporta Node 25**. Use a versão do `.nvmrc`:

```bash
cd cms
nvm use
node -v   # deve ser v22.x ou v24.x
```

## Rodar o CMS

```bash
cd cms
npm install
npm run develop
```

Admin: http://localhost:1337/admin

## Content type: Post

| Campo | Tipo | Descrição |
|-------|------|-----------|
| title | Text | Título do artigo |
| slug | UID | URL (`/blog/[slug]`) |
| excerpt | Text | Resumo na listagem |
| content | Text | Corpo (parágrafos separados por linha em branco) |
| cover | Media | Imagem de capa |
| publishedAt | DateTime | Data de publicação |

Após criar um post, clique em **Publish**.

## Permissões da API

**Settings → Users & Permissions → Roles → Public**

- `Post`: marque `find` e `findOne`

Opcional: crie um **API Token** (read-only) e defina `STRAPI_API_TOKEN` no `.env.local` do Next.js.

## Conectar ao Next.js

Na raiz do projeto (`sandy-carvalho-v2`):

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=opcional
```

```bash
pnpm dev
```

Blog: http://localhost:3000/blog

## Strapi Cloud (monorepo)

No painel do Strapi Cloud, configure:

| Campo | Valor |
|--------|--------|
| **Base directory** | `cms` |
| **Node** | 22 ou 24 (evite 25) |

O repositório é monorepo: o Next fica na raiz e o Strapi em `cms/`. O arquivo `cms/postcss.config.mjs` existe para o build **não** herdar o Tailwind do `postcss.config.mjs` da raiz (erro `Cannot find module 'tailwindcss'`).
