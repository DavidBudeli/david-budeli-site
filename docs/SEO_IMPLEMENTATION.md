# Relatório de implementação — SEO, GEO, AEO e LLMO

Data: 10/11/2026. Branch: `feature/seo-geo-aeo`. Base auditada: `adcf37d`.

**Estado de entrega: PR para revisão. Sem merge, deploy, alteração de DNS, domínio ou painel da Hostinger.**

## 1. Problemas encontrados

A [auditoria inicial](SEO_AUDIT.md) foi registrada antes da implementação. O site entregava `#app` vazio, metadados fixos da home em todas as rotas, idioma dependente do navegador/localStorage e status 200 mesmo para páginas e assets inexistentes. O preloader dependia de todos os recursos 3D e podia travar em caso de falha. Não havia fallback sem WebGL, suporte completo a reduced-motion, JSON-LD ou LinkedIn no contato.

## 2. Estratégia de renderização

Foi escolhida **pré-renderização semântica no build com progressive enhancement**, sem migrar o projeto e sem tentar executar o App atual em SSR (seus módulos dependem de window e WebGL).

- `src/seo/pages.ts` reúne identidade, conteúdo, URLs e dados estruturados, consumindo os mesmos dados dos cases usados pelo Vue.
- `src/seo/render.ts` gera o head e HTML inicial legível, visível para qualquer visitante. Não há diferenciação por User-Agent ou conteúdo escondido para bots.
- `scripts/prerender.mjs` usa o carregador de módulos SSR do Vite apenas no build, gerando arquivos HTML por rota e os arquivos técnicos. O App 3D não é renderizado no servidor.
- O bootstrap inicial tem aproximadamente **4,29 kB de JS (2,03 kB gzip)** neste build. Ele checa WebGL2 e preferências antes de importar a experiência interativa. Isso não representa o total de JavaScript da experiência completa: os chunks de Three.js/GSAP/Vue continuam necessários quando o 3D é utilizado.
- O texto inicial fica disponível enquanto os recursos carregam. Após preparação, `createApp` substitui a versão inicial. Não se usa `hydrate`, portanto não se tenta hidratar uma árvore incompatível.
- Sem JS/WebGL, com `prefers-reduced-motion: reduce`, falha de recurso ou timeout, permanece a versão legível com projetos, FAQ e contatos. Há ativação explícita do 3D quando suportado. `?view=readable` seleciona essa versão; a canonical permanece limpa, sem esse parâmetro.
- Falhas do App/contexto WebGL retornam à versão legível da URL atual. O fallback não depende de localStorage/sessionStorage.

O início de carregamento mudou: o conteúdo legível aparece antes do 3D, em vez de um overlay vazio bloquear toda a página. O layout cinematográfico, avatar, óculos/bigode, shaders, GSAP, Lenis e transições foram preservados na experiência interativa normal.

## 3. Páginas preparadas

São **16 páginas indexáveis**, com titles e descriptions exclusivos, canonical própria, hreflang PT-BR/en/x-default recíproco, idioma correto, OG e Twitter Cards:

| Página                 | Português                         | Inglês                               |
| ---------------------- | --------------------------------- | ------------------------------------ |
| Home                   | `/`                               | `/en/`                               |
| Hyper Galaxy           | `/project/hyper-galaxy`           | `/en/project/hyper-galaxy`           |
| HyperAG                | `/project/hyperag`                | `/en/project/hyperag`                |
| HyperPag               | `/project/hyperpag`               | `/en/project/hyperpag`               |
| EverPersonal           | `/project/everpersonal`           | `/en/project/everpersonal`           |
| Daniela Moura Studio   | `/project/daniela-moura-studio`   | `/en/project/daniela-moura-studio`   |
| Gabriella Tsuruda      | `/project/gabriella-tsuruda`      | `/en/project/gabriella-tsuruda`      |
| Cristiano Ronaldo Blog | `/project/cristiano-ronaldo-blog` | `/en/project/cristiano-ronaldo-blog` |

A página de licenças recebe canonical e `noindex, follow`; não entra no sitemap. Rotas inexistentes recebem 404 real e página `noindex`. Redirecionamentos 308 normalizam `/en`, índices explícitos e barras finais dos cases.

O servidor continua Node/PORT/dist, compatível com o contrato de deploy existente. Não faz fallback universal para assets/rotas desconhecidos. Rejeita métodos não suportados e caminhos inválidos; um open redirect por barras codificadas encontrado na revisão recebeu correção e regressão.

## 4. Conteúdo, semântica e contato

- Identidade profissional e nome completo fornecidos no briefing; atuação, soluções, stack deste portfólio e base em Curitiba.
- FAQ nativa e discreta em acordeão, também presente no HTML inicial. Sem schema `FAQPage` e sem promessa de resultado enriquecido.
- `main`, seções identificadas, hierarquia de headings, skip link, controles de teclado, canvas decorativo e conteúdo fora de cena com `aria-hidden`/`inert`.
- Imagens com dimensões, lazy loading/decoding; imagem principal de case priorizada. Fontes pré-carregadas reduzidas de cinco para duas. Não houve recompressão de texturas/modelos, nem alteração do DPR existente.
- Contatos WhatsApp com mensagem, GitHub, Instagram, LinkedIn e e-mail. Acrescentado “Desenvolvido por HyperAG” com o link solicitado.
- EverPersonal foi descrito de forma conservadora como site do personal trainer Everson Martins; não se atribuem funcionalidades SaaS não comprovadas.
- HyperPag confirmado em `https://hyperpag.com/`.
- O case Cristiano Ronaldo permanece, mas seu CTA externo foi suspenso porque o domínio observado está estacionado. Confirmar URL antes de restabelecer o link.
- Gabriella continua no lugar de Sabrina, conforme solicitação anterior. Não foram inventados clientes, avaliações, métricas, prêmios, tecnologias por case ou fundações de empresas.

Detalhes: [verificação de links](SEO_LINKS.md).

## 5. Dados estruturados

Um documento JSON-LD `@graph` por página:

- **Person**: David Budeli, alternateName Alisson David da Silva, Software Engineer, atuação e cidade fornecidas, perfis oficiais.
- **Organization**: Hyper Galaxy como organização/marca e URL pública; sem CNPJ, razão social ou fundador inventados.
- **WebSite**: portfólio pessoal, responsável e idiomas.
- **WebPage**: URL, título, descrição e idioma específicos.
- **CreativeWork** em cada case: nome, descrição, imagem, criador e página canônica. URL oficial externa como `sameAs` somente quando mantida/verificada.

Não foi usado SoftwareApplication indiscriminadamente para sites institucionais. Não há reviews, aggregateRating, preços ou versões de software inventados. A validação executada é sintática e estrutural local; não se declara aprovação por um validador externo ou elegibilidade a recursos especiais do Google.

## 6. Sitemap, robots e descoberta por IA

`npm run build` gera em `dist/`:

- `/sitemap.xml`: as 16 URLs e alternates; sem rotas inexistentes ou URLs de desenvolvimento.
- `/robots.txt`: acesso público preservado, com distinção documentada entre Google/Bing/OAI-SearchBot/PerplexityBot (busca) e GPTBot (possível treinamento).
- `/llms.txt`: resumo estruturado e links PT/EN, experimental e complementar.

Os antigos robots/sitemap estáticos foram retirados de `public/` para evitar fontes desatualizadas concorrentes; o gerador é a fonte de produção. Não editar arquivos gerados em dist.

Políticas e fontes oficiais: [SEO_POLICY.md](SEO_POLICY.md). Nenhum arquivo garante indexação, ranqueamento ou citação em respostas de IA.

## 7. Resultados dos testes executados

Ambiente local: Windows, Node 24.22.2; contrato declarado Node >=22.12.0.

| Verificação                  | Resultado / escopo                                                                                                                                                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm ci`                     | Executado, 120 pacotes instalados. Nenhuma dependência funcional foi acrescentada.                                                                                                                                         |
| `npm run typecheck`          | Aprovado.                                                                                                                                                                                                                  |
| `npm run build`              | Aprovado: assets + 16 páginas + 404 + arquivos técnicos.                                                                                                                                                                   |
| `npm run test:seo`           | Aprovado: 16 documentos, 16 pares HTTP GET/HEAD, metadados, HTML inicial, JSON-LD, hreflang, sitemap, robots, llms, redirects, 404 e rejeição de paths/métodos inválidos.                                                  |
| Igualdade de HTML por agente | Aprovado para visitante comum, Googlebot, Bingbot, OAI-SearchBot, GPTBot e PerplexityBot.                                                                                                                                  |
| Guarda WebGL                 | Função real testada com mocks: contexto ausente, exceção, suporte presente e extensão de descarte opcional. Não equivale a teste em GPU física sem WebGL.                                                                  |
| `git diff --check`           | Aprovado; avisos LF/CRLF são da configuração local do Git.                                                                                                                                                                 |
| Formatação                   | Executada com Prettier. Corrigidas duas opções antigas/inválidas da configuração.                                                                                                                                          |
| Lint                         | Não executado: o projeto não possui script/configuração de lint. Não foi alegado resultado aprovado.                                                                                                                       |
| `npm audit --omit=dev`       | 0 vulnerabilidades após executar com CAs confiáveis do sistema. A tentativa inicial falhou por cadeia de certificado; não foi desativada a validação TLS.                                                                  |
| Navegador desktop            | Hero/3D preservado, navegação GSAP, abertura SPA do HyperPag e atualização de title/canonical confirmadas; sem erros/warnings críticos observados.                                                                         |
| Idiomas                      | Troca PT → URL inglesa do mesmo case, HTML inicial EN, canonical EN e links localizados confirmados.                                                                                                                       |
| Mobile 390×844               | Hero 3D EN e FAQ/contato acessíveis; sem overflow horizontal observado.                                                                                                                                                    |
| JavaScript desativado        | Case HyperPag EN legível, imagem, headings e links utilizáveis em 390×844; navegação de home para case funcionou sem scripts.                                                                                              |
| Reduced motion               | Preferência do navegador detectada; versão legível permaneceu disponível e ativação explícita do 3D funcionou. Emulação no-preference confirmou ativação automática mobile. Preferências/viewport temporários restaurados. |
| Lighthouse / LCP / INP / CLS | Lighthouse não disponível. Não há nota de laboratório nem medição de Core Web Vitals de campo neste relatório.                                                                                                             |

Evidências: [desktop 3D](qa/desktop-3d.png), [desktop legível](qa/desktop-readable.png), [mobile sem JavaScript](qa/mobile-no-js.png).

## 8. Arquivos modificados e responsabilidades

- Entrada/renderização: `index.html`, `src/main.ts`, `src/interactive.ts`, `src/seo/pages.ts`, `src/seo/render.ts`, `scripts/prerender.mjs`.
- Servidor/testes/build: `scripts/serve.mjs`, `scripts/test-seo.mjs`, `package.json`, `package-lock.json`, `.prettierrc`; remoção dos arquivos antigos `public/robots.txt` e `public/sitemap.xml`.
- SEO/rotas/idioma: `src/composables/useSeo.ts`, `useRouteObserver.ts`, `useRouter.ts`, `src/components/Link.vue`, `src/i18n/store.ts`, `composables/useTranslations.ts`, `utils/locale.ts`, mensagens `common/{pt,en}.json`.
- Bootstrap/3D: `src/utils/resources.ts`, `src/three/index.ts`, `src/composables/usePreloader.ts`, `src/features/home/components/Home.vue`, `src/features/sounds/composables/useMusic.ts`.
- Semântica/conteúdo/UI existente: `src/App.vue`, `src/components/{Header,Footer,Social}.vue`, ícone LinkedIn, `src/content/social.ts`, dados/previews dos cases, Home `{Hero,Contact,Projects,Discovery}.vue`, Project `{PreviewCard,Media,List}.vue`, `public/licencas.html`.
- Documentação/evidências: `README.md`, `HOSTINGER_DEPLOY.md`, `docs/SEO_{AUDIT,IMPLEMENTATION,POLICY,LINKS}.md`, `docs/qa/*.png`.

## 9. Pendências, riscos e limitações

1. **Revisão e autorização para merge/deploy**. A branch de produção e a Hostinger não foram alteradas nesta entrega.
2. Após publicação, verificar as propriedades Google Search Console/Bing Webmaster Tools, enviar sitemap e inspecionar HTML/URLs reais na CDN. Nenhum token de verificação foi criado ou solicitado.
3. Confirmar domínio ativo do case Cristiano Ronaldo; confirmar fundações/tecnologias específicas se desejar essas afirmações publicamente.
4. Medir Lighthouse e Core Web Vitals em produção, especialmente troca do HTML inicial para o 3D em conexões lentas. Não há promessa de LCP/INP/CLS aprovado sem medição.
5. O prerender é semântico, não uma captura SSR pixel-a-pixel da cena 3D. Alterações futuras devem manter paridade entre dados compartilhados e conteúdo do Vue.
6. O 3D continua tendo custo de JS/GPU quando ativado. Não foram reduzidas a fidelidade visual ou a quantidade de animações normais para produzir uma nota artificial de desempenho.
7. A licença original e a atribuição de música permanecem na página pública de licenças e no código/documentação; permissões comerciais não foram verificadas nem ampliadas por este PR.
