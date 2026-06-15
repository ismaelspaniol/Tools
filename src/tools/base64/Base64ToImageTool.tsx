import { useMemo, useState } from 'react';
import { Seo } from '@/components/Seo';
import { copyText } from '@/utils/clipboard';
import { parseBase64Input } from '@/utils/base64';

function buildDownloadName(mimeType: string): string {
  const extension = mimeType.split('/')[1]?.replace('jpeg', 'jpg').replace('svg+xml', 'svg') ?? 'png';
  return `image.${extension}`;
}

export function Base64ToImageTool() {
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
    <>
      <Seo
        title="Base64 para imagem"
        description="Converte texto Base64 em imagem com preview e opção de download."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Base64 para imagem</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Cole a string Base64 completa ou apenas o conteúdo codificado. O preview é gerado diretamente no navegador.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="base64-input">
              Base64
            </label>
            <textarea
              id="base64-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={12}
              className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none ring-0 placeholder:text-slate-400 focus:border-cyan-400"
              placeholder="data:image/png;base64,iVBORw0KGgoAAA..."
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="block text-sm font-medium text-slate-700" htmlFor="mime-type">
                Tipo MIME
              </label>
              <select
                id="mime-type"
                value={mimeType}
                onChange={(event) => setMimeType(event.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-400"
              >
                <option value="image/png">image/png</option>
                <option value="image/jpeg">image/jpeg</option>
                <option value="image/webp">image/webp</option>
                <option value="image/svg+xml">image/svg+xml</option>
              </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
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

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
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
    </>
  );
}
