import { useState } from 'react';
import { Seo } from '@/components/Seo';
import { decodeJwt } from '@/utils/jwt';

export function JwtDecoderTool() {
  const [token, setToken] = useState<string>('');
  const decoded = decodeJwt(token);
  const hasInvalidToken = token.trim().length > 0 && decoded === null;

  return (
    <>
      <Seo
        title="Decodificador JWT"
        description="Decodifica header e payload de JWT sem validar a assinatura."
      />
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Decodificador JWT</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Cole um token JWT para inspecionar header, payload e assinatura sem verificar autenticidade.
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="jwt-input">
            Token JWT
          </label>
          <textarea
            id="jwt-input"
            value={token}
            onChange={(event) => setToken(event.target.value)}
            rows={5}
            className="w-full rounded-2xl border border-slate-300 bg-white p-4 text-sm text-slate-900 outline-none focus:border-cyan-400"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Header</h2>
            <pre className="mt-3 overflow-auto text-sm text-slate-800">
              {decoded?.header.json ?? decoded?.header.raw ?? 'Aguardando token válido.'}
            </pre>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Payload</h2>
            <pre className="mt-3 overflow-auto text-sm text-slate-800">
              {decoded?.payload.json ?? decoded?.payload.raw ?? 'Aguardando token válido.'}
            </pre>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Assinatura</h2>
            <pre className="mt-3 overflow-auto text-sm text-slate-800">
              {decoded?.signature ?? 'Aguardando token válido.'}
            </pre>
          </section>
        </div>

        {hasInvalidToken ? <p className="mt-4 text-sm text-rose-700">Token JWT inválido ou malformado.</p> : null}
      </section>
    </>
  );
}
