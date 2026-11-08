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

O script de produção serve o diretório `dist/`, respeita a variável `PORT` fornecida pela Hostinger e possui fallback para as rotas dos cases.

## Variáveis de ambiente

Nenhuma variável é obrigatória. A atribuição ao autor do conceito original permanece visível por padrão.

## Validação

Antes de publicar:

```bash
npm ci
npm run build
npm start
```

Validar:

- hero 3D e identidade DB;
- português e inglês;
- sete cases com páginas próprias;
- WhatsApp com mensagem preenchida;
- layout desktop e mobile;
- domínio com HTTPS ativo.
