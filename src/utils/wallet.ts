export interface WalletHolding {
  chain: string;
  symbol: string;
  name: string;
  quoteUsd: number;
  balance: string;
}

export interface WalletScanResult {
  chain: string;
  holdings: WalletHolding[];
  totalUsd: number;
  errorMessage: string;
}

interface CovalentItem {
  contract_ticker_symbol?: string;
  contract_name?: string;
  quote?: number;
  balance?: string;
  native_token?: boolean;
}

interface CovalentResponse {
  data?: {
    items?: CovalentItem[];
  };
}

interface ChainConfig {
  chain: string;
  chainId: number;
}

const CHAINS: ChainConfig[] = [
  { chain: 'Ethereum', chainId: 1 },
  { chain: 'Base', chainId: 8453 },
  { chain: 'Arbitrum', chainId: 42161 },
];

function normalizeQuote(value: number | undefined): number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }

  return value;
}

function normalizeSymbol(item: CovalentItem): string {
  if (item.native_token) {
    return 'ETH';
  }

  return item.contract_ticker_symbol?.trim() || item.contract_name?.trim() || 'UNKNOWN';
}

function normalizeName(item: CovalentItem): string {
  return item.contract_name?.trim() || normalizeSymbol(item);
}

async function scanChain(address: string, chain: ChainConfig): Promise<WalletScanResult> {
  const apiKey = import.meta.env.VITE_COVALENT_API_KEY ?? 'ckey_demo';
  const url = `https://api.covalenthq.com/v1/${chain.chainId}/address/${address}/balances_v2/?key=${apiKey}`;
  try {
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const payload = (await response.json()) as CovalentResponse;
    const holdings = (payload.data?.items ?? [])
      .map((item): WalletHolding => ({
        chain: chain.chain,
        symbol: normalizeSymbol(item),
        name: normalizeName(item),
        quoteUsd: normalizeQuote(item.quote),
        balance: item.balance?.trim() || '0',
      }))
      .filter((item) => item.quoteUsd > 0)
      .sort((left, right) => right.quoteUsd - left.quoteUsd);

    const totalUsd = holdings.reduce((accumulator, item) => accumulator + item.quoteUsd, 0);

    return {
      chain: chain.chain,
      holdings,
      totalUsd,
      errorMessage: '',
    };
  } catch (caught: unknown) {
    return {
      chain: chain.chain,
      holdings: [],
      totalUsd: 0,
      errorMessage: caught instanceof Error ? caught.message : 'Falha ao consultar a rede.',
    };
  }
}

export async function scanWallet(address: string): Promise<WalletScanResult[]> {
  return await Promise.all(CHAINS.map((chain) => scanChain(address, chain)));
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value);
}
