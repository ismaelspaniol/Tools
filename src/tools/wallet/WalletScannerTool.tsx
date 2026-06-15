import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { formatUsd, scanWallet } from '@/utils/wallet';

function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export function WalletScannerTool() {
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Awaited<ReturnType<typeof scanWallet>>>([]);

  const normalizedAddress = address.trim();
  const totalUsd = results.reduce((accumulator, chain) => accumulator + chain.totalUsd, 0);
  const hasAnyHolding = results.some((chain) => chain.holdings.length > 0);
  const hasApiKey = Boolean(import.meta.env.VITE_COVALENT_API_KEY);

  async function handleScan() {
    if (!isValidAddress(normalizedAddress)) {
      setError('Informe um endereço Ethereum válido.');
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nextResults = await scanWallet(normalizedAddress);
      setResults(nextResults);
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Falha ao consultar a carteira.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Seo
        title="Cripto wallet scanner"
        description="Rastreia holdings de uma carteira Ethereum, Base e Arbitrum e soma o valor em USD."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">Crypto</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Cripto wallet scanner
          </h1>
          <p className="mt-3 text-slate-600">
            Informe uma carteira Ethereum para rastrear ativos em Ethereum, Base e Arbitrum.
          </p>
        </div>

        {!hasApiKey ? (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Configure <span className="font-semibold">VITE_COVALENT_API_KEY</span> para a consulta funcionar de forma confiável.
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="wallet-address">
              Carteira
            </label>
            <input
              id="wallet-address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400"
              placeholder="0x..."
              spellCheck={false}
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleScan}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto"
            >
              {loading ? 'Rastreando...' : 'Rastrear carteira'}
            </button>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

        {results.length > 0 ? (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-slate-950">Resultado</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {hasAnyHolding ? 'Holdings encontrados nas redes consultadas.' : 'Nenhum ativo com valor retornado.'}
                </p>
              </div>
              <div className="rounded-2xl bg-white px-4 py-3 text-right">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Total</p>
                <p className="text-lg font-semibold text-slate-950">{formatUsd(totalUsd)}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {results.map((chainResult) => (
                <section key={chainResult.chain} className="rounded-3xl border border-white bg-white p-5">
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-950">{chainResult.chain}</h3>
                    <p className="text-sm font-medium text-slate-700">{formatUsd(chainResult.totalUsd)}</p>
                  </div>

                  {chainResult.errorMessage ? (
                    <p className="mt-3 text-sm text-rose-700">{chainResult.errorMessage}</p>
                  ) : null}

                  {chainResult.holdings.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {chainResult.holdings.map((holding) => (
                        <li
                          key={`${chainResult.chain}-${holding.symbol}-${holding.balance}`}
                          className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="text-sm font-semibold text-slate-950">{holding.symbol}</p>
                            <p className="text-xs text-slate-500">{holding.name}</p>
                          </div>
                          <p className="text-sm font-medium text-slate-800">{formatUsd(holding.quoteUsd)}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm text-slate-500">Sem ativos com valor retornado nesta rede.</p>
                  )}
                </section>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
