import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';
import { formatCnpj, generateCnpj, validateCnpj } from '@/utils/cnpj';

function CnpjGeneratorCard() {
  const [generatedFormatted, setGeneratedFormatted] = useState<string>('');
  const [generatedRaw, setGeneratedRaw] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);
  const [alphanumeric, setAlphanumeric] = useState<boolean>(false);

  async function handleCopy() {
    const success = await copyText(generatedFormatted);
    setCopied(success);
    if (success) {
      setCopiedRaw(false);
    }
  }

  async function handleCopyRaw() {
    const success = await copyText(generatedRaw);
    setCopiedRaw(success);
    if (success) {
      setCopied(false);
    }
  }

  function handleGenerate() {
    const nextValue = generateCnpj(alphanumeric);
    setGeneratedRaw(nextValue);
    setGeneratedFormatted(formatCnpj(nextValue));
    setCopied(false);
    setCopiedRaw(false);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Gerador de CNPJ</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Gera CNPJ numérico ou alfanumérico com dígitos verificadores corretos.
      </p>

      <label className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={alphanumeric}
          onChange={(event) => setAlphanumeric(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
        />
        Padrão alfanumérico
      </label>

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          Gerar CNPJ
        </button>
        {generatedFormatted ? (
          <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 font-medium text-cyan-900">
            {generatedFormatted}
          </div>
        ) : null}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!generatedFormatted}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copied ? 'Copiado' : 'Copiar com máscara'}
          </button>
          <button
            type="button"
            onClick={handleCopyRaw}
            disabled={!generatedRaw}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {copiedRaw ? 'Copiado' : 'Copiar sem máscara'}
          </button>
        </div>
      </div>
    </section>
  );
}

function CnpjValidatorCard() {
  const [value, setValue] = useState<string>('');
  const [alphanumeric, setAlphanumeric] = useState<boolean>(false);
  const formattedValue = useMemo(() => formatCnpj(value), [value]);
  const isValid = useMemo(() => validateCnpj(value, alphanumeric), [alphanumeric, value]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Validador de CNPJ</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Valida CNPJ numérico ou alfanumérico conforme o padrão selecionado.
      </p>

      <label className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={alphanumeric}
          onChange={(event) => setAlphanumeric(event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-cyan-500 focus:ring-cyan-400"
        />
        Padrão alfanumérico
      </label>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="cnpj-input">
          CNPJ
        </label>
        <input
          id="cnpj-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400"
          placeholder="00.000.000/0000-00"
        />

        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
          <span className="font-medium text-slate-700">Formato:</span>{' '}
          <span className="text-slate-600">{formattedValue || '---'}</span>
        </div>
        <div
          className={[
            'mt-4 rounded-2xl px-4 py-3 text-sm font-medium',
            isValid ? 'border border-emerald-200 bg-emerald-50 text-emerald-800' : 'border border-rose-200 bg-rose-50 text-rose-800',
          ].join(' ')}
        >
          {value.trim() ? (isValid ? 'CNPJ válido.' : 'CNPJ inválido.') : 'Digite um CNPJ para validar.'}
        </div>
      </div>
    </section>
  );
}

export function CnpjTool() {
  return (
    <>
      <Seo title="CNPJ" description="Gera e valida CNPJ na mesma página." />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">CNPJ</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Geração e validação na mesma página, com suporte ao padrão numérico e alfanumérico.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CnpjGeneratorCard />
          <CnpjValidatorCard />
        </div>
      </section>
    </>
  );
}
