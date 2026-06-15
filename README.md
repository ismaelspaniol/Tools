# Tools

Coleção de ferramentas web leves em React + TypeScript + TailwindCSS.

## Ferramentas

- Qual meu IP
- image/base64
- CPF
- CNPJ
- Verificador de propagação DNS
- Cripto wallet scanner
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
- `VITE_ETHEREUM_RPC_URL`: endpoint RPC opcional para Ethereum
- `VITE_BASE_RPC_URL`: endpoint RPC opcional para Base
- `VITE_ARBITRUM_RPC_URL`: endpoint RPC opcional para Arbitrum

## Deploy no Dockploy

Configure a aplicação com a URL pública:

```bash
SITE_URL=https://tools.guiadeprospeccao.com.br
```

Essa variável precisa estar disponível no build, porque o `sitemap.xml` e o `robots.txt` são gerados durante a construção da imagem.

## Rotas

- `/`
- `/ferramentas/qual-meu-ip`
- `/ferramentas/image-base64`
- `/ferramentas/cpf`
- `/ferramentas/cnpj`
- `/ferramentas/dns-propagacao`
- `/ferramentas/cripto-wallet-scanner`
- `/ferramentas/formatador-json`
- `/ferramentas/decodificador-jwt`
