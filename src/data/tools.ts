export interface ToolEntry {
  href: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const tools: ToolEntry[] = [
  {
    href: '/ferramentas/qual-meu-ip',
    label: 'Qual meu IP?',
    shortLabel: 'IP',
    description: 'Consulta pública do endereço IP usando a API do ipify.',
  },
  {
    href: '/ferramentas/base64-para-imagem',
    label: 'Base64 para imagem',
    shortLabel: 'Base64',
    description: 'Converte uma string Base64 em imagem renderizada e baixável.',
  },
  {
    href: '/ferramentas/imagem-para-base64',
    label: 'Imagem para Base64',
    shortLabel: 'Imagem',
    description: 'Transforma uma imagem local em Base64 pronto para copiar.',
  },
  {
    href: '/ferramentas/cpf',
    label: 'CPF',
    shortLabel: 'CPF',
    description: 'Gera e valida CPF na mesma página.',
  },
  {
    href: '/ferramentas/cnpj',
    label: 'CNPJ',
    shortLabel: 'CNPJ',
    description: 'Gera e valida CNPJ na mesma página, com padrão alfanumérico.',
  },
  {
    href: '/ferramentas/formatador-json',
    label: 'Formatador JSON',
    shortLabel: 'JSON',
    description: 'Formata ou compacta JSON com feedback imediato de erro.',
  },
  {
    href: '/ferramentas/decodificador-jwt',
    label: 'Decodificador JWT',
    shortLabel: 'JWT',
    description: 'Decodifica header e payload de tokens JWT sem validar assinatura.',
  },
];
