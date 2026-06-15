import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';

export function IpTool() {
  const [publicIp, setPublicIp] = useState<string>('');
  const [loadingPublic, setLoadingPublic] = useState<boolean>(false);
  const [errorPublic, setErrorPublic] = useState<string>('');
  const [copiedPublic, setCopiedPublic] = useState<boolean>(false);

  async function handleLookup() {
    setLoadingPublic(true);
    setErrorPublic('');

    try {
      const response = await fetch('https://api.ipify.org?format=json');

      if (!response.ok) {
        throw new Error('Falha ao consultar o IP.');
      }

      const data: unknown = await response.json();
      if (typeof data === 'object' && data !== null && 'ip' in data && typeof (data as { ip: unknown }).ip === 'string') {
        setPublicIp((data as { ip: string }).ip);
        setCopiedPublic(false);
      } else {
        throw new Error('Resposta inválida da API.');
      }
    } catch (caught: unknown) {
      setErrorPublic(caught instanceof Error ? caught.message : 'Erro inesperado.');
    } finally {
      setLoadingPublic(false);
    }
  }

  async function handleCopyPublic() {
    const success = await copyText(publicIp);
    setCopiedPublic(success);
  }

  return (
    <>
      <Seo
        title="Qual meu IP"
        description="Consulta o endereço IP público usando a API do ipify."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">Rede</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Qual meu IP?</h1>
          <p className="mt-3 text-slate-600">
            Consulta o IP público da conexão atual usando a API do ipify.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end">
          <button
            type="button"
            onClick={handleLookup}
            className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loadingPublic}
          >
            {loadingPublic ? 'Consultando...' : 'Consultar IP'}
          </button>
          {publicIp ? (
            <>
              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-900">
                {publicIp}
              </div>
              <button
                type="button"
                onClick={handleCopyPublic}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-800"
              >
                {copiedPublic ? 'Copiado' : 'Copiar IP'}
              </button>
            </>
          ) : null}
        </div>

        {errorPublic ? <p className="mt-4 text-sm text-rose-700">{errorPublic}</p> : null}
      </section>
    </>
  );
}
