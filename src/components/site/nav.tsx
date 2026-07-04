import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/le-club", label: "Le Club" },
  { to: "/sport", label: "Sport" },
  { to: "/bien-etre", label: "Bien-être" },
  { to: "/planning", label: "Planning" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-[color-mix(in_oklch,var(--cream-warm)_82%,transparent)] border-b border-border/40">
        <div className="container-editorial flex items-center justify-between py-4">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="font-serif text-2xl tracking-tight text-foreground">Coco</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Social Club</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground font-medium" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/reservation"
              className="btn-pill bg-primary text-primary-foreground hover:opacity-90 hidden sm:inline-flex"
            >
              Réserver
            </Link>
            <button
              type="button"
              aria-label="Ouvrir le menu"
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-cream flex flex-col fade-up">
          <div className="container-editorial flex items-center justify-between py-4 border-b border-border/40">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2">
              <span className="font-serif text-2xl">Coco</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Social Club</span>
            </Link>
            <button
              aria-label="Fermer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex-1 container-editorial py-10 flex flex-col gap-1 overflow-auto">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-serif text-4xl py-3 border-b border-border/40 text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/coco_socialclub/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Instagram className="h-4 w-4" /> @coco_socialclub
            </a>
          </nav>
          <div className="container-editorial pb-8">
            <Link
              to="/reservation"
              onClick={() => setOpen(false)}
              className="btn-pill w-full bg-primary text-primary-foreground text-base py-4"
            >
              Réserver ma séance
            </Link>
          </div>
        </div>
      )}
    </>
  );
}