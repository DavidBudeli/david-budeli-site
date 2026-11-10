# Auditoria inicial — SEO, GEO, AEO e LLMO

Data: 2026-11-10. Base: `adcf37d`, antes de qualquer alteração de implementação.

## Arquitetura constatada

- Vue 3, Vite, TypeScript, GSAP, Lenis, Three.js, Howler e shaders GLSL. Sem Vue Router: `useRouter.ts` usa History API e `useRouteObserver.ts` reconhece `/project/:slug`.
- `index.html` entrega `#app` vazio. Nome, textos, links dos cases e headings dependem de JavaScript.
- Título, descrição, canonical, Open Graph e Twitter são fixos da home, inclusive em páginas de projetos.
- Idiomas PT/EN dependem de localStorage/navigator; não há URLs de idioma nem atualização de `html[lang]`.
- `scripts/serve.mjs` entrega o mesmo HTML com status 200 para qualquer caminho, inclusive recursos e projetos inexistentes.
- `npm run build` executa vue-tsc + Vite, com saída em `dist`. `npm start` usa Node e respeita PORT. Não há lint configurado.
- Three.js acessa window no carregamento dos módulos: SSR direto do App atual não é seguro.

## Acessibilidade e performance

- Preloader ocupa a tela e bloqueia rolagem. Só encerra com progresso 100%; loaders não possuem tratamento de erro.
- Não há fallback sem WebGL. Recursos 3D começam a baixar ao importar o módulo.
- Reduced-motion só é parcialmente tratado em AppearingText; a experiência completa e Lenis continuam animados.
- Falta landmark main; seções principais são divs; canvas não é marcado decorativo; logo clicável não é acessível pelo teclado.
- Cards têm links reais e reserva de proporção, mas imagens sem lazy loading/decoding/dimensões intrínsecas.
- Modelos GLB somam cerca de 0,93 MB; texturas cerca de 0,33 MB; cinco fontes são pré-carregadas (~59 KB); DPR já limitado a 2.
- LinkedIn está ausente dos contatos. Rodapé não contém a atribuição HyperAG solicitada.

## Conteúdo e URLs

Existem sete cases: Hyper Galaxy, HyperAG, HyperPag, EverPersonal, Daniela Moura Studio, Gabriella Tsuruda e Cristiano Ronaldo Blog. Sabrina foi substituída por Gabriella em alteração anterior do proprietário; não será reintroduzida automaticamente.

- HyperPag: `https://hyperpag.com/` está no repositório e responde com o produto de checkout Pix/cartão.
- Hyper Galaxy, HyperAG, EverPersonal, Daniela Moura e Gabriella respondem. EverPersonal apresenta o site de Everson Martins, não evidência de uma plataforma SaaS; não atribuir funcionalidades não confirmadas.
- Cristiano Ronaldo Blog responde com página de domínio estacionado da Hostinger. Manter o case histórico; a URL ativa exige confirmação antes da publicação.
- Não foram fornecidas provas de fundação de empresas, clientes, avaliações, métricas ou prêmios. Não serão inventados.

## Estratégia escolhida antes da implementação

1. Gerar HTML semântico e head específico para cada home/case no build, a partir dos mesmos dados usados no cliente.
2. Manter conteúdo inicial realmente visível/usável para todas as pessoas, sem detecção de bots ou conteúdo SEO oculto.
3. Fazer progressive enhancement com createApp, não hidratação: substituir o conteúdo inicial só após recursos prontos/capacidade WebGL. Sem migração para Nuxt.
4. Usar `/` e `/en/`, com variantes de cases reais, canonical próprio e hreflang recíproco.
5. Entregar fallback acessível sem JS/WebGL e para reduced-motion; manter a experiência normal 3D/GSAP/Lenis.
6. Gerar sitemap, robots e llms.txt complementar; JSON-LD Person, Organization (marca, sem identidade jurídica inventada), WebSite, WebPage e CreativeWork.
7. Implementar 404 real e tratamento de assets inexistentes.

## Publicação

Branch solicitada: `feature/seo-geo-aeo`. Apenas Pull Request; não integrar main nem alterar Hostinger/DNS sem nova autorização.
