import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { formatJson, minifyJson } from '@/utils/json';

export function JsonFormatterTool() {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  function handleFormat() {
    try {
      setOutput(formatJson(input));
      setError('');
    } catch {
      setError('JSON inválido.');
    }
  }

  function handleMinify() {
    try {
      setOutput(minifyJson(input));
      setError('');
    } catch {
      setError('JSON inválido.');
    }
  }

  return (
    <>
      <Seo
        title="Formatador JSON"
        description="Formata, compacta e valida JSON diretamente no navegador."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Formatador JSON</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Cole um JSON válido, formate a saída com indentação legível ou compacte o conteúdo.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="json-input">
              Entrada
            </label>
            <textarea
              id="json-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={14}
              className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none focus:border-cyan-400"
              placeholder='{"name":"Tools"}'
            />

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleFormat}
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600"
              >
                Formatar
              </button>
              <button
                type="button"
                onClick={handleMinify}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-800"
              >
                Minificar
              </button>
            </div>

            {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="json-output">
              Saída
            </label>
            <textarea
              id="json-output"
              value={output}
              readOnly
              rows={14}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none"
              placeholder="O resultado aparece aqui."
            />
          </div>
        </div>
      </section>
    </>
  );
}
