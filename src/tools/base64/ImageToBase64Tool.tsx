import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';
import { fileToDataUrl } from '@/utils/base64';

export function ImageToBase64Tool() {
  const [result, setResult] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setError('');
      setCopied(false);
      setFileName(file.name);
      setResult(await fileToDataUrl(file));
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Falha ao converter a imagem.');
      setResult('');
    }
  }

  async function handleCopy() {
    const success = await copyText(result);
    setCopied(success);
  }

  return (
    <>
      <Seo
        title="Imagem para Base64"
        description="Converte uma imagem local em Base64 com cópia rápida para a área de transferência."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Imagem para Base64</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Envie um arquivo de imagem para gerar o data URL em Base64 e copiar o resultado.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="image-file">
              Selecionar arquivo
            </label>
            <input
              id="image-file"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-xl file:border-0 file:bg-ink-950 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            />

            {fileName ? <p className="mt-3 text-sm text-slate-500">{fileName}</p> : null}
            {error ? <p className="mt-3 text-sm text-rose-700">{error}</p> : null}

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!result}
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                {copied ? 'Copiado' : 'Copiar Base64'}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="base64-result">
              Base64 gerado
            </label>
            <textarea
              id="base64-result"
              value={result}
              readOnly
              rows={12}
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none"
              placeholder="O resultado aparece aqui."
            />
          </div>
        </div>
      </section>
    </>
  );
}
