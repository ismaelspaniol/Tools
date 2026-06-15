export interface ToolEntry {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const tools: ToolEntry[] = [
  {
    href: "/ferramentas/qual-meu-ip",
    label: "Qual meu IP?",
    shortLabel: "IP Externooo",
    description: "Consulta pública do endereço IP usando a API do ipify.",
  },
  {
    href: "/ferramentas/image-base64",
    label: "image/base64",
    shortLabel: "image/base64",
    description:
      "Converte imagem em Base64 e Base64 em imagem na mesma página.",
  },
  {
    href: "/ferramentas/cpf",
    label: "CPF",
    shortLabel: "CPF",
    description: "Gera e valida CPF na mesma página.",
  },
  {
    href: "/ferramentas/cnpj",
    label: "CNPJ",
    shortLabel: "CNPJ",
    description: "Gera e valida CNPJ na mesma página, com padrão alfanumérico.",
  },
  {
    href: "/ferramentas/dns-propagacao",
    label: "DNS",
    shortLabel: "DNS",
    description: "Verifica se um DNS foi propagado em resolvedores públicos.",
  },
  {
    href: "/ferramentas/formatador-json",
    label: "Formatador JSON",
    shortLabel: "JSON",
    description: "Formata ou compacta JSON com feedback imediato de erro.",
  },
  {
    href: "/ferramentas/decodificador-jwt",
    label: "Decodificador JWT",
    shortLabel: "JWT",
    description:
      "Decodifica header e payload de tokens JWT sem validar assinatura.",
  },
];
