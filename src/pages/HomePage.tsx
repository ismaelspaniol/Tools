import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import { tools } from "@/data/tools";

export function HomePage() {
  return (
    <>
      <Seo
        title="Ferramentas web"
        description="Coleção de ferramentas web leves para IP, Base64, CPF, CNPJ, JSON e JWT."
      />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            to={tool.href}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:border-cyan-200"
          >
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700">
              {tool.shortLabel}
            </span>
            <h2 className="mt-4 text-xl font-semibold text-slate-950">
              {tool.label}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {tool.description}
            </p>
            <span className="mt-4 inline-flex text-sm font-medium text-cyan-700 group-hover:text-cyan-900">
              Abrir ferramenta
            </span>
          </Link>
        ))}
      </section>
    </>
  );
}
