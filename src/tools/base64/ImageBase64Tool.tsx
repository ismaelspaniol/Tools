import { useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';
import { fileToDataUrl, parseBase64Input } from '@/utils/base64';

function buildDownloadName(mimeType: string): string {
  const extension = mimeType.split('/')[1]?.replace('jpeg', 'jpg').replace('svg+xml', 'svg') ?? 'png';
  return `image.${extension}`;
}

function Base64ToImageCard() {
  const [input, setInput] = useState<string>('');
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [copied, setCopied] = useState<boolean>(false);

  const parsed = useMemo(() => parseBase64Input(input, mimeType), [input, mimeType]);
  const dataUrl = useMemo(() => `data:${parsed.mimeType};base64,${parsed.base64}`, [parsed]);
  const isValid = parsed.base64.length > 0;

  async function handleCopy() {
    const success = await copyText(dataUrl);
    setCopied(success);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Base64 para imagem</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Cole a string Base64 completa ou apenas o conteúdo codificado.
      </p>

      <div className="mt-5 grid gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="base64-input">
            Base64
          </label>
          <textarea
            id="base64-input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={10}
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-cyan-400"
            placeholder="data:image/png;base64,iVBORw0KGgoAAA..."
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="mime-type">
              Tipo MIME
            </label>
            <select
              id="mime-type"
              value={mimeType}
              onChange={(event) => setMimeType(event.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-400"
            >
              <option value="image/png">image/png</option>
              <option value="image/jpeg">image/jpeg</option>
              <option value="image/webp">image/webp</option>
              <option value="image/svg+xml">image/svg+xml</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={isValid ? dataUrl : undefined}
              download={buildDownloadName(parsed.mimeType)}
              className={[
                'inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors',
                isValid ? 'bg-cyan-500 text-white hover:bg-cyan-600' : 'pointer-events-none bg-slate-200 text-slate-500',
              ].join(' ')}
            >
              Baixar imagem
            </a>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-cyan-300 hover:text-cyan-800"
            >
              {copied ? 'Copiado' : 'Copiar data URL'}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-4">
          <p className="text-sm font-medium text-slate-700">Preview</p>
          <div className="mt-4 flex min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-slate-300 bg-white p-4">
            {isValid ? (
              <img
                src={dataUrl}
                alt="Preview da imagem convertida"
                className="max-h-80 max-w-full object-contain"
              />
            ) : (
              <p className="text-sm text-slate-500">Nenhuma imagem para pré-visualizar.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImageToBase64Card() {
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
    <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-xl font-semibold tracking-tight text-slate-950">Imagem para Base64</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Envie uma imagem local para gerar o data URL em Base64.
      </p>

      <div className="mt-5 grid gap-4">
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
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!result}
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {copied ? 'Copiado' : 'Copiar Base64'}
          </button>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="base64-result">
            Base64 gerado
          </label>
          <textarea
            id="base64-result"
            value={result}
            readOnly
            rows={10}
            className="w-full rounded-2xl border border-slate-300 bg-slate-50 p-4 text-sm text-slate-900 outline-none"
            placeholder="O resultado aparece aqui."
          />
        </div>
      </div>
    </section>
  );
}

export function ImageBase64Tool() {
  return (
    <>
      <Seo
        title="image/base64"
        description="Converte Base64 em imagem e imagem em Base64 na mesma página."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-700">Mídia</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">image/base64</h1>
          <p className="mt-3 text-slate-600">
            Conversão nos dois sentidos em uma única tela.
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Base64ToImageCard />
          <ImageToBase64Card />
        </div>
      </section>
    </>
  );
}
