# Tools

Coleção de ferramentas web leves em React + TypeScript + TailwindCSS.

## Ferramentas

- Qual meu IP
- Base64 para imagem
- Imagem para Base64
- CPF
- CNPJ
- Formatador JSON
- Decodificador JWT

## Desenvolvimento

```bash
npm install
npm run dev
```

## Docker

Produção:

```bash
docker compose up -d
docker compose down
```

Desenvolvimento com hot reload:

```bash
docker compose -f docker-compose.dev.yml up
```

## Variáveis de ambiente

- `SITE_URL`: URL pública usada na geração do `sitemap.xml`

## Deploy no Dockploy

Configure a aplicação com a URL pública:

```bash
SITE_URL=https://tools.guiadeprospeccao.com.br
```

Essa variável precisa estar disponível no build, porque o `sitemap.xml` e o `robots.txt` são gerados durante a construção da imagem.

## Rotas

- `/`
- `/ferramentas/qual-meu-ip`
- `/ferramentas/base64-para-imagem`
- `/ferramentas/imagem-para-base64`
- `/ferramentas/cpf`
- `/ferramentas/cnpj`
- `/ferramentas/formatador-json`
- `/ferramentas/decodificador-jwt`
