import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { checkDnsPropagation, isSupportedDnsRecordType, normalizeDomain, type DnsRecordType } from '@/utils/dns';

interface LookupState {
  domain: string;
  recordType: DnsRecordType;
}

const DEFAULT_STATE: LookupState = {
  domain: '',
  recordType: 'A',
};

function statusLabel(status: string): string {
  switch (status) {
    case 'ok':
      return 'Propagado';
    case 'nxdomain':
      return 'NXDOMAIN';
    case 'no_data':
      return 'Sem resposta';
    default:
      return 'Erro';
  }
}

function statusStyles(status: string): string {
  switch (status) {
    case 'ok':
      return 'border-emerald-200 bg-emerald-50 text-emerald-800';
    case 'nxdomain':
      return 'border-amber-200 bg-amber-50 text-amber-800';
    case 'no_data':
      return 'border-slate-200 bg-slate-100 text-slate-700';
    default:
      return 'border-rose-200 bg-rose-50 text-rose-800';
  }
}

export function DnsPropagationTool() {
  const [state, setState] = useState<LookupState>(DEFAULT_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [results, setResults] = useState<Awaited<ReturnType<typeof checkDnsPropagation>>>([]);

  const normalizedDomain = normalizeDomain(state.domain);
  const hasValidDomain = normalizedDomain.length > 0 && normalizedDomain.includes('.');

  async function handleCheck() {
    if (!hasValidDomain) {
      setError('Informe um domínio válido.');
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const nextResults = await checkDnsPropagation(normalizedDomain, state.recordType);
      setResults(nextResults);
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Falha ao consultar propagação DNS.');
    } finally {
      setLoading(false);
    }
  }

  const propagatedCount = results.filter((result) => result.status === 'ok').length;
  const nonErrorCount = results.filter((result) => result.status !== 'error').length;

  return (
    <>
      <Seo
        title="Verificador de propagação DNS"
        description="Consulta vários resolvedores públicos para verificar se um DNS foi propagado."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">DNS</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
            Verificador de propagação DNS
          </h1>
          <p className="mt-3 text-slate-600">
            Consulta resolvedores públicos para estimar se um domínio já propagou o registro informado.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.6fr_0.4fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="dns-domain">
              Domínio
            </label>
            <input
              id="dns-domain"
              value={state.domain}
              onChange={(event) => setState((current) => ({ ...current, domain: event.target.value }))}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400"
              placeholder="exemplo.com"
              inputMode="url"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="dns-type">
              Tipo
            </label>
            <select
              id="dns-type"
              value={state.recordType}
              onChange={(event) => {
                const nextValue = event.target.value;
                if (isSupportedDnsRecordType(nextValue)) {
                  setState((current) => ({ ...current, recordType: nextValue }));
                }
              }}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400"
            >
              <option value="A">A</option>
              <option value="AAAA">AAAA</option>
              <option value="CNAME">CNAME</option>
              <option value="MX">MX</option>
              <option value="NS">NS</option>
              <option value="TXT">TXT</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleCheck}
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Consultando...' : 'Verificar propagação'}
            </button>
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-rose-700">{error}</p> : null}

        {results.length > 0 ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
              <span className="font-semibold text-slate-900">{propagatedCount}</span> de{' '}
              <span className="font-semibold text-slate-900">{results.length}</span> resolvedores retornaram resposta.
              <span className="ml-2 text-slate-500">
                {nonErrorCount === results.length ? 'Resultado consistente entre os resolvedores consultados.' : 'Alguns resolvedores falharam ou ainda não retornaram dados.'}
              </span>
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
              {results.map((result) => (
                <article key={result.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight text-slate-950">{result.label}</h2>
                      <p className="mt-1 text-xs text-slate-500">{result.endpoint}</p>
                    </div>
                    <span className={['rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]', statusStyles(result.status)].join(' ')}>
                      {statusLabel(result.status)}
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-slate-600">Tempo: {result.elapsedMs} ms</p>

                  {result.answers.length > 0 ? (
                    <ul className="mt-4 space-y-2">
                      {result.answers.map((answer, index) => (
                        <li key={`${answer.data}-${index}`} className="rounded-2xl border border-white bg-white px-3 py-2 text-sm text-slate-700">
                          {answer.data}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {result.errorMessage ? <p className="mt-4 text-sm text-rose-700">{result.errorMessage}</p> : null}
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
