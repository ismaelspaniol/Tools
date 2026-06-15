import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';
import { formatCpf, generateCpf, validateCpf } from '@/utils/cpf';

function CpfGeneratorCard() {
  const [generatedFormatted, setGeneratedFormatted] = useState<string>('');
  const [generatedRaw, setGeneratedRaw] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedRaw, setCopiedRaw] = useState<boolean>(false);

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
    const nextValue = generateCpf();
    setGeneratedRaw(nextValue);
    setGeneratedFormatted(formatCpf(nextValue));
    setCopied(false);
    setCopiedRaw(false);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Gerador de CPF</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Gera CPF válido no formato padrão, pronto para copiar.</p>
      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={handleGenerate}
          className="inline-flex items-center justify-center rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          Gerar CPF
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

function CpfValidatorCard() {
  const [value, setValue] = useState<string>('');
  const formattedValue = useMemo(() => formatCpf(value), [value]);
  const isValid = useMemo(() => validateCpf(value), [value]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Validador de CPF</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Informe um CPF para verificar os dígitos verificadores.</p>

      <div className="mt-5">
        <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="cpf-input">
          CPF
        </label>
        <input
          id="cpf-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          inputMode="numeric"
          className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-cyan-400"
          placeholder="000.000.000-00"
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
          {value.trim() ? (isValid ? 'CPF válido.' : 'CPF inválido.') : 'Digite um CPF para validar.'}
        </div>
      </div>
    </section>
  );
}

export function CpfTool() {
  return (
    <>
      <Seo title="CPF" description="Gera e valida CPF na mesma página." />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">CPF</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Geração e validação na mesma página, sem separar o fluxo em telas diferentes.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <CpfGeneratorCard />
          <CpfValidatorCard />
        </div>
      </section>
    </>
  );
}
