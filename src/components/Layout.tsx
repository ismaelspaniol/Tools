import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { tools } from "@/data/tools";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.12),transparent_36%),linear-gradient(180deg,#07111f_0%,#0b1220_50%,#f8fafc_50%,#f8fafc_100%)] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-ink-950/90 backdrop-blur">
        <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Tools
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            >
              <span className="sr-only">
                {menuOpen ? "Fechar menu" : "Abrir menu"}
              </span>
              <span className="flex h-5 w-5 flex-col justify-center gap-1">
                <span
                  className={[
                    "block h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
                    menuOpen ? "translate-y-1.5 rotate-45" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-5 rounded-full bg-current transition-opacity duration-200",
                    menuOpen ? "opacity-0" : "",
                  ].join(" ")}
                />
                <span
                  className={[
                    "block h-0.5 w-5 rounded-full bg-current transition-transform duration-200",
                    menuOpen ? "-translate-y-1.5 -rotate-45" : "",
                  ].join(" ")}
                />
              </span>
            </button>
            <nav className="hidden md:flex md:max-w-full md:flex-wrap md:gap-3 md:overflow-visible">
              {tools.map((tool) => (
                <NavLink
                  key={tool.href}
                  to={tool.href}
                  className={({ isActive }) =>
                    [
                      "rounded-full px-3 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-cyan-400 text-ink-950"
                        : "text-slate-200 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  {tool.shortLabel}
                </NavLink>
              ))}
            </nav>
          </div>
          {menuOpen ? (
            <nav
              id="mobile-menu"
              className="mt-4 grid gap-2 rounded-2xl border border-white/10 bg-ink-900/95 p-3 md:hidden"
            >
              {tools.map((tool) => (
                <NavLink
                  key={tool.href}
                  to={tool.href}
                  className={({ isActive }) =>
                    [
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cyan-400 text-ink-950"
                        : "text-slate-100 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  {tool.label}
                </NavLink>
              ))}
            </nav>
          ) : null}
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
