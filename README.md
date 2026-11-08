# David Budeli — Portfolio 3D

Portfólio bilíngue (português e inglês) de David Budeli. A experiência combina uma apresentação 3D interativa com cases reais de produto, inteligência artificial, automação, performance e conversão.

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente local na porta 3000 |
| `npm run build` | Valida TypeScript e gera a versão de produção em `dist/` |
| `npm run preview` | Pré-visualiza a versão de produção |
| `npm start` | Serve a versão de produção na porta 3000 |
| `npm run typecheck` | Executa somente a validação TypeScript |

## Conteúdo

- Projetos: `src/content/projects/{pt,en}/<slug>.ts`
- Dados dos cases: `src/content/projects/data.ts`
- Cards da listagem: `src/content/projects/previews/`
- Traduções: `src/i18n/messages/namespaces/common/`

## Stack

Vue 3, TypeScript, Vite, GSAP, Lenis, Three.js, Howler e GLSL.

## Credits & Attribution

This adaptation was produced for David Budeli. The original visual concept, design, and substantial source code were created by David Heckhoff.

Attribution to the original author must remain visible in derivative works, including:

- credit comments in the source code;
- this attribution section in the README;
- the visible reference in the website footer.

Original portfolio: https://david-hckh.com

Commercial reuse or redistribution of substantial portions of the original project without permission is prohibited. See `license.md`.
