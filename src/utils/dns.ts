export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'TXT';

export type DnsResolverStatus = 'ok' | 'nxdomain' | 'no_data' | 'error';

export interface DnsAnswer {
  data: string;
  ttl: number;
  type: number;
}

export interface DnsResolverResult {
  id: string;
  label: string;
  endpoint: string;
  status: DnsResolverStatus;
  answers: DnsAnswer[];
  elapsedMs: number;
  errorMessage: string;
}

interface DnsJsonResponse {
  Status?: number;
  Answer?: DnsAnswer[];
}

interface DnsResolverConfig {
  id: string;
  label: string;
  endpoint: string;
  acceptsDnsJson: boolean;
}

const RESOLVERS: DnsResolverConfig[] = [
  {
    id: 'google',
    label: 'Google Public DNS',
    endpoint: 'https://dns.google/resolve',
    acceptsDnsJson: false,
  },
  {
    id: 'google-dns64',
    label: 'Google DNS64',
    endpoint: 'https://dns64.dns.google/resolve',
    acceptsDnsJson: false,
  },
  {
    id: 'cloudflare',
    label: 'Cloudflare',
    endpoint: 'https://cloudflare-dns.com/dns-query',
    acceptsDnsJson: true,
  },
  {
    id: 'cloudflare-one',
    label: 'Cloudflare One One One One',
    endpoint: 'https://one.one.one.one/dns-query',
    acceptsDnsJson: true,
  },
  {
    id: 'cloudflare-security',
    label: 'Cloudflare Security',
    endpoint: 'https://security.cloudflare-dns.com/dns-query',
    acceptsDnsJson: true,
  },
  {
    id: 'cloudflare-family',
    label: 'Cloudflare Family',
    endpoint: 'https://family.cloudflare-dns.com/dns-query',
    acceptsDnsJson: true,
  },
];

export function normalizeDomain(value: string): string {
  const trimmed = value.trim().toLowerCase();

  if (!trimmed) {
    return '';
  }

  const withoutProtocol = trimmed.replace(/^https?:\/\//, '');
  const withoutPath = withoutProtocol.split('/')[0];
  const withoutPort = withoutPath.split(':')[0].replace(/\.$/, '');

  try {
    return new URL(`https://${withoutPort}`).hostname.replace(/\.$/, '');
  } catch {
    return withoutPort;
  }
}

export function isSupportedDnsRecordType(value: string): value is DnsRecordType {
  return ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT'].includes(value);
}

function formatResponse(statusCode: number | undefined, answers: DnsAnswer[] | undefined): DnsResolverStatus {
  if (statusCode === 3) {
    return 'nxdomain';
  }

  if (statusCode !== 0) {
    return 'error';
  }

  if (!answers || answers.length === 0) {
    return 'no_data';
  }

  return 'ok';
}

async function queryResolver(
  resolver: DnsResolverConfig,
  domain: string,
  type: DnsRecordType,
): Promise<DnsResolverResult> {
  const startedAt = performance.now();
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 6000);

  try {
    const url = new URL(resolver.endpoint);
    url.searchParams.set('name', domain);
    url.searchParams.set('type', type);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: resolver.acceptsDnsJson ? { accept: 'application/dns-json' } : undefined,
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = (await response.json()) as DnsJsonResponse;
    const answers = data.Answer ?? [];

    return {
      id: resolver.id,
      label: resolver.label,
      endpoint: resolver.endpoint,
      status: formatResponse(data.Status, answers),
      answers,
      elapsedMs: Math.round(performance.now() - startedAt),
      errorMessage: '',
    };
  } catch (caught: unknown) {
    return {
      id: resolver.id,
      label: resolver.label,
      endpoint: resolver.endpoint,
      status: 'error',
      answers: [],
      elapsedMs: Math.round(performance.now() - startedAt),
      errorMessage: caught instanceof Error ? caught.message : 'Falha ao consultar o resolvedor.',
    };
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export async function checkDnsPropagation(domain: string, type: DnsRecordType): Promise<DnsResolverResult[]> {
  return await Promise.all(RESOLVERS.map((resolver) => queryResolver(resolver, domain, type)));
}
