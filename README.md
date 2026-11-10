# David Budeli — Portfolio 3D

Portfólio bilíngue (português e inglês) de David Budeli. A experiência combina uma apresentação 3D interativa com cases reais de produto, inteligência artificial, automação, performance e conversão.

## Scripts

| Comando             | Descrição                                                                               |
| ------------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`       | Inicia o ambiente local na porta 3000                                                   |
| `npm run build`     | Valida TypeScript, gera assets e pré-renderiza 16 páginas PT/EN em `dist/`              |
| `npm run preview`   | Pré-visualiza a versão de produção                                                      |
| `npm start`         | Serve a versão de produção na porta 3000                                                |
| `npm run typecheck` | Executa somente a validação TypeScript                                                  |
| `npm run test:seo`  | Valida HTML inicial, metadados, JSON-LD, sitemap, robots, rotas e servidor após o build |

## Conteúdo

- Projetos: `src/content/projects/{pt,en}/<slug>.ts`
- Dados dos cases: `src/content/projects/data.ts`
- Cards da listagem: `src/content/projects/previews/`
- Traduções: `src/i18n/messages/namespaces/common/`

## Stack

Vue 3, TypeScript, Vite, GSAP, Lenis, Three.js, Howler e GLSL.

Requer Node >=22.12. Use `npm ci`, `npm run build`, `npm run test:seo` e `npm start` para validar a versão de produção. O servidor respeita `PORT` (padrão 3000).

## Renderização e SEO

O build gera HTML semântico visível para a home e os sete cases, em português (`/`) e inglês (`/en/`). `src/seo/pages.ts` compartilha identidade, conteúdo e metadados com o cliente. `src/seo/render.ts` gera a versão legível; `scripts/prerender.mjs` grava HTML, sitemap, robots e llms.txt em `dist/`.

O bootstrap carrega a experiência Vue/Three.js depois de checar WebGL e preferências de movimento. Sem JavaScript, sem WebGL, com falha de carregamento ou com preferência por menos movimento, o conteúdo e os contatos continuam acessíveis. `?view=readable` permite escolher a versão legível; essa preferência não é uma nova URL canônica. Não há detecção de bots nem conteúdo SEO oculto. `createApp` substitui a versão inicial; não há hidratação de uma árvore incompatível.

`npm run dev` destina-se à experiência interativa. Para inspecionar o HTML inicial de cada URL, execute o build e use `npm start`; não avalie pré-renderização pelo HTML de desenvolvimento do Vite.

Relatórios: [auditoria](docs/SEO_AUDIT.md), [implementação e testes](docs/SEO_IMPLEMENTATION.md), [política de rastreadores](docs/SEO_POLICY.md), [links e pendências dos cases](docs/SEO_LINKS.md).

Publicação desta alteração exige autorização do responsável. Abrir um PR não autoriza merge, alteração de DNS ou mudanças na Hostinger.

## Credits & Attribution

This adaptation was produced for David Budeli. The original visual concept, design, and substantial source code were created by David Heckhoff.

Attribution to the original author must remain visible in derivative works, including:

- credit comments in the source code;
- this attribution section in the README;
- the public notices page at `/licencas.html`, accessible through the Licenças / Licenses link in the footer.

Original portfolio: https://david-hckh.com

Commercial reuse or redistribution of substantial portions of the original project without permission is prohibited. See `license.md`.
