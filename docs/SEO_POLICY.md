# Política de rastreamento e descoberta

Pesquisa em fontes oficiais em 10 de novembro de 2026. Este documento registra decisões técnicas; não promete indexação, inclusão em respostas de IA ou posições em busca.

## Busca e treinamento são usos diferentes

| Agente        | Finalidade                                                                                       | Decisão neste projeto                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Googlebot     | Busca Google, com variantes smartphone e desktop                                                 | Permitir conteúdo e recursos públicos.                                                       |
| Bingbot       | Descoberta e processamento para indexação no Bing                                                | Permitir. Não impor `crawl-delay` sem evidência de sobrecarga.                               |
| OAI-SearchBot | Resultados de busca nas funcionalidades de busca do ChatGPT                                      | Permitir.                                                                                    |
| GPTBot        | Rastreamento de conteúdo que pode ser utilizado no treinamento de modelos de fundação            | Preservar a permissão já existente no wildcard; isso não é requisito para aparecer na busca. |
| PerplexityBot | Busca e referências a sites nos resultados do Perplexity; não treinamento de modelos de fundação | Permitir.                                                                                    |

O `User-agent: *` com `Allow: /` preserva a política pública permissiva anterior. Nenhuma nova preferência de treinamento foi presumida. Para futuramente bloquear treinamento da OpenAI sem bloquear a busca, o responsável pode decidir adicionar um grupo independente de `GPTBot` com `Disallow: /` e manter `OAI-SearchBot` permitido. Essa decisão editorial deve ser tomada explicitamente pelo responsável.

`ChatGPT-User` e `Perplexity-User` representam acessos iniciados por usuários, não crawlers automáticos equivalentes aos acima. As respectivas documentações avisam que robots.txt pode não controlar esses acessos da mesma forma.

Robots.txt não protege dados privados nem autentica agentes. User-Agent pode ser falsificado. Caso uma WAF bloqueie acessos legítimos, a revisão deve considerar IPs publicados e documentação dos provedores, sem enfraquecer indiscriminadamente a segurança. Não houve alteração de WAF, DNS, domínio ou painel de hospedagem nesta implementação.

Fontes primárias:

- [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot)
- [Bingbot e robots.txt](https://www.bing.com/webmasters/help/how-to-report-an-issue-with-bingbot-25c19802)
- [Controle de rastreamento do Bing](https://www.bing.com/webmasters/help/crawl-control-55a30303)
- [Agentes da OpenAI](https://developers.openai.com/api/docs/bots)
- [Agentes do Perplexity](https://docs.perplexity.ai/docs/resources/perplexity-crawlers)

## SEO, GEO e AEO

As melhorias se concentram em conteúdo útil e verificável, HTML acessível, URLs rastreáveis, metadados próprios, desempenho e dados estruturados coerentes com o que o visitante pode ler. Não foram criadas páginas repetitivas para variações de palavras-chave, depoimentos, avaliações, números de resultados, premiações ou afirmações de fundação de empresas não confirmadas.

O Google explica que as bases de SEO continuam relevantes para suas funcionalidades generativas e não exige um tipo especial de Schema.org para IA. O arquivo técnico e os metadados não oferecem garantia de inclusão. Ver [guia oficial de otimização para funcionalidades generativas](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

### Perguntas frequentes

Uma FAQ só deve existir quando responde dúvidas reais do visitante. Ela não é criada apenas para obter marcação estruturada. A documentação atual do Google registra que o resultado enriquecido de FAQ deixou de ser mostrado a partir de **7 de maio de 2026**, com remoção da documentação em 15 de junho. Portanto, não se promete elegibilidade nem resultado enriquecido para este portfólio. Fonte: [atualizações oficiais de documentação](https://developers.google.com/search/updates), entradas de 8 de maio e 15 de junho de 2026.

### llms.txt

`/llms.txt` é um índice complementar e experimental de informações e links do site. A especificação continua sendo uma **proposta**, atualmente v2. Ele não substitui HTML, sitemap, robots.txt ou dados estruturados. O Google afirma que esse arquivo não melhora nem prejudica visibilidade ou rankings na Busca; não é um fator de ranqueamento comprovado. Fontes: [proposta llms.txt](https://llmstxt.org/) e [guia oficial do Google](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Validação e próximos passos

`scripts/test-seo.mjs` usa Node e assertions para verificar contratos estruturais do build e do servidor. Isso não equivale à aprovação por uma ferramenta externa de Schema.org ou do Google. O teste não mede Core Web Vitals de usuários reais e não confirma indexação.

Após revisão, autorização e publicação, o responsável deverá verificar as propriedades no Google Search Console e Bing Webmaster Tools, enviar o sitemap e inspecionar URLs reais. É recomendável conferir HTML renderizado, cobertura/indexação, erros de rastreamento e relatórios de desempenho. Não inserir tokens de verificação inventados. O acompanhamento deve distinguir testes de laboratório de métricas de campo.

Fontes adicionais:

- [Requisitos técnicos da Busca Google](https://developers.google.com/search/docs/essentials/technical)
- [Fundamentos de SEO para JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Por que um site pode não estar no índice Bing](https://www.bing.com/webmasters/help/?topicid=2141dfab)
