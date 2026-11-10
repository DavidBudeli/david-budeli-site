# Verificação dos links e afirmações dos cases

Auditoria read-only realizada em 10 de novembro de 2026. Respostas HTTP abaixo são observações pontuais, não uma garantia de disponibilidade futura ou prova de autoria. Os nomes e a autoria dos trabalhos vêm do conteúdo já existente e do briefing do responsável. Não foram inventados clientes, resultados, métricas ou tecnologias por case.

| Case / URL                                                     | Evidência observada                                                                                                                                                          | Tratamento                                                                                                                                 |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [Hyper Galaxy](https://hypergalaxy.cloud/)                     | HTTP 200; título “Hyper Galaxy \| Software, IA, Automação e Cloud”.                                                                                                          | Domínio público correspondente ao conteúdo existente. Não atribuir CNPJ, razão social ou condição de fundador sem confirmação.             |
| [HyperAG](https://hyperag.com.br/)                             | Redirecionamento para `/pt-BR`, HTTP 200; título “HyperAg \| Global Growth & Branding Partner”.                                                                              | Manter o domínio solicitado e o link de desenvolvimento no rodapé. Não presumir identidade jurídica.                                       |
| [HyperPag](https://hyperpag.com/)                              | HTTP 200; título “HyperPag — Checkout Pix e Cartão para Negócios Digitais”. O domínio está explicitamente no conteúdo PT/EN do repositório (`src/content/projects/data.ts`). | URL oficial já documentada no projeto, não inferida de busca ou nome semelhante.                                                           |
| [EverPersonal](https://everpersonal.com.br/)                   | HTTP 200; título “Everson Martins \| Personal Trainer para Emagrecimento Feminino”.                                                                                          | Conteúdo público de personal trainer. Não declarar uma plataforma SaaS própria ou funcionalidades de software que não foram confirmadas.   |
| [Daniela Moura Studio](https://danielamourastudio.com.br/)     | HTTP 200; site de beleza, sobrancelhas e micropigmentação em São José dos Pinhais.                                                                                           | Preservar como trabalho de presença digital.                                                                                               |
| [Gabriella Tsuruda](https://gabriellatsuruda.com.br/)          | HTTP 200; “Physis Therapeia \| Fisioterapia Individualizada”.                                                                                                                | Preservar o case atual. Foi incluído no lugar da Sabrina por pedido anterior do responsável.                                               |
| [Cristiano Ronaldo Blog](https://cristianoronaldo.blog/)       | HTTP 200, mas o título é “Parked Domain name on Hostinger DNS system”. Não havia um blog ativo nessa resposta.                                                               | Preservar o trabalho histórico sem apresentar o domínio como uma demonstração ativa validada. Não inferir associação oficial com o atleta. |
| [Sabrina Pires Personal](https://sabrinapirespersonal.com.br/) | Requisição falhou na negociação TLS (“unexpected EOF”).                                                                                                                      | Não considerar link ativo validado. Não readicionar automaticamente: foi substituído pela Gabriella e não consta dos sete cases atuais.    |

## Categorias e tecnologias

Usar `CreativeWork` para descrever os trabalhos do portfólio é uma opção conservadora. Um site de marketing não deve virar `SoftwareApplication` apenas por estar no portfólio. Não publicar versão, sistema operacional, preço, avaliação ou propriedade de software sem evidência.

A stack Vue 3, Vite, TypeScript, Three.js, GSAP, Lenis, Howler e GLSL é verificável neste próprio portfólio. Isso não comprova que os mesmos recursos foram usados em cada case. Também não há base suficiente neste escopo para afirmar quais empresas foram fundadas pelo responsável; a afiliação profissional solicitada à Hyper Galaxy não é uma afirmação de fundação.

## Contato e identidade

URLs oficiais fornecidas expressamente pelo responsável:

- [Portfólio](https://davidbudeli.com/)
- [GitHub](https://github.com/DavidBudeli)
- [Instagram](https://www.instagram.com/davidbudeli/)
- [LinkedIn](https://www.linkedin.com/in/davidbudeli/)
- [WhatsApp](https://wa.me/5541999360874)
- [E-mail](mailto:consultoria@davidbudeli.com)

O fato de um endpoint social limitar robôs ou redirecionar para login não comprova defeito no link. Este trabalho não envia mensagens, não altera perfis e não declara verificação de contas por terceiros. Nome profissional, nome completo e localização são dados fornecidos no briefing do responsável, não uma identidade jurídica verificada externamente.
