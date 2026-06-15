# AGENTS.md

## Projeto

Este é um projeto Open Source que reúne diversas ferramentas úteis para o dia a dia em uma única aplicação web.

O objetivo principal é manter o código simples, legível, fácil de contribuir e fácil de manter.

## Stack

* React
* TypeScript
* TailwindCSS
* Docker

## Princípios

* Priorizar simplicidade sobre abstrações complexas.
* Evitar dependências desnecessárias.
* Preferir código explícito ao invés de soluções "mágicas".
* Seguir o princípio KISS (Keep It Simple, Stupid).
* Seguir o princípio YAGNI (You Aren't Gonna Need It).
* Manter baixo acoplamento entre módulos.
* Sempre buscar clareza antes de otimização.

## Arquitetura

* Cada ferramenta deve ser independente das demais.
* Compartilhar apenas componentes, hooks e utilitários realmente reutilizáveis.
* Evitar dependências cruzadas entre ferramentas.
* Sempre que possível, cada ferramenta deve poder ser removida sem impactar as demais.

## Frontend

* Utilizar React com TypeScript.
* Utilizar Functional Components.
* Utilizar Hooks ao invés de Classes.
* Evitar uso excessivo de Context API.
* Priorizar composição de componentes.
* Manter componentes pequenos e focados em uma única responsabilidade.

## Estrutura de Pastas

src/
├── components/
├── hooks/
├── layouts/
├── pages/
├── tools/
├── services/
├── utils/
├── types/
└── assets/

Cada ferramenta deverá ficar dentro de:

src/tools/<nome-da-ferramenta>

Exemplo:

src/tools/json-formatter
src/tools/base64
src/tools/cnpj-validator

## TypeScript

* Utilizar strict mode.
* Nunca utilizar any.
* Preferir tipos explícitos.
* Utilizar interfaces para contratos públicos.
* Utilizar type para composições de tipos.

## Estilização

* Utilizar TailwindCSS.
* Mobile First.
* Responsividade obrigatória.
* Evitar CSS customizado quando possível.
* Manter consistência visual entre todas as ferramentas.

## Acessibilidade

* Utilizar HTML semântico.
* Utilizar labels adequadas em formulários.
* Respeitar contraste mínimo para leitura.

## Open Source

* Código deve ser autoexplicativo.
* Comentários apenas quando agregarem contexto.
* Nomes de variáveis e funções devem ser claros.
* Pull Requests pequenos e focados.
* Evitar alterações não relacionadas ao objetivo da contribuição.

## Docker

O projeto deve executar integralmente via Docker.

Comandos esperados:

docker compose up -d
docker compose down

O ambiente local deve reproduzir o ambiente de produção o mais próximo possível.

## Deploy

O deploy será realizado utilizando Dockploy.

Requisitos:

* Imagem Docker otimizada.
* Build reproduzível.
* Variáveis de ambiente documentadas.
* Healthcheck configurado quando aplicável.

## Dependências

Antes de adicionar uma nova dependência:

1. Verificar se a funcionalidade pode ser implementada com APIs nativas.
2. Avaliar tamanho da dependência.
3. Avaliar manutenção e popularidade.
4. Justificar dependências grandes ou complexas.

## SEO
Cada ferramenta deve possuir uma rota própria.
Cada ferramenta deve possuir título e descrição próprios.
Utilizar URLs amigáveis.
Gerar sitemap.xml.
Gerar robots.txt.
Priorizar performance e Core Web Vitals.

Exemplos:

/ferramentas/qual-meu-ip
/ferramentas/gerador-cpf
/ferramentas/validador-cpf
/ferramentas/gerador-cnpj
/ferramentas/validador-cnpj
/ferramentas/base64-para-imagem
/ferramentas/imagem-para-base64
/ferramentas/formatador-json
/ferramentas/decodificador-jwt

## Objetivo Final

Criar uma coleção de ferramentas web rápidas, leves, responsivas e fáceis de manter, seguindo boas práticas de desenvolvimento Open Source.


## Ferramentas
* Qual meu IP? Utilizando a API do https://api.ipify.org/
* BASE64 to image Converter e image to base64
* validados de CNPJ e CPF, como um gerador de CPF e CNPJ(cnpj usar ja o novo padrao com letra) como opacao
* Formatador JSON
* Decodificador JWT
