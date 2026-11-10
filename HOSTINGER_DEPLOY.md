# Deploy na Hostinger Node.js Hosting

Guia para publicar o portfólio de David Budeli em `davidbudeli.com` usando a integração GitHub da Hostinger.

## Repositório

- GitHub: `https://github.com/DavidBudeli/david-budeli-site`
- Branch de produção: `main`
- Framework: Vue 3 + Vite
- Runtime: Node.js

## Comandos de deploy

```text
Install command: npm ci
Build command: npm run build
Start command: npm start
```

O script de produção serve o diretório `dist/` e respeita a variável `PORT` fornecida pela Hostinger. O build agora gera HTML para cada rota PT/EN; o servidor entrega a página correspondente e retorna 404 real para caminhos inexistentes, sem fallback universal com status 200.

Node requerido: >=22.12 (compatível com a linha 22.x configurada). Framework e saída continuam Vue/Vite e `dist/`. Não é necessário mudar DNS, domínio, variáveis ou painel para preparar este PR. A compatibilidade foi testada com `npm start` localmente; a resposta real da camada CDN/Hostinger deverá ser inspecionada após autorização e deploy.

## Gate de publicação

A branch `feature/seo-geo-aeo` deve ser revisada em Pull Request. Não integrar à `main` nem executar deploy manual antes de autorização explícita. Não alterar a configuração de hospedagem como parte da revisão.

## Variáveis de ambiente

Nenhuma variável é obrigatória. Os avisos de autoria e música ficam na página pública `/licencas.html`, acessível pelo link Licenças no rodapé.

## Validação

Antes de publicar:

```bash
npm ci
npm run build
npm run typecheck
npm run test:seo
npm start
```

Validar:

- hero 3D e identidade DB;
- português e inglês;
- sete cases com páginas próprias;
- WhatsApp com mensagem preenchida;
- layout desktop e mobile;
- domínio com HTTPS ativo.
- `/en/` e cases `/en/project/<slug>`;
- HTML inicial legível sem JavaScript;
- canonical/hreflang no HTML e após navegação;
- `/robots.txt`, `/sitemap.xml` e `/llms.txt` gerados no build;
- 404 real e redirecionamentos de URL canônica.

Depois de autorizado e publicado: verificar propriedade no Google Search Console e Bing Webmaster Tools, enviar o sitemap e inspecionar páginas representativas. As credenciais/tokens dessas ferramentas não fazem parte do repositório e não foram inventados.
