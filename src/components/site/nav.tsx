import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Instagram } from "lucide-react";
import { BrandMark } from "./brand-mark";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/le-club", label: "Le Club" },
  { to: "/sport", label: "Sport" },
  { to: "/bien-etre", label: "Bien-être" },
  { to: "/planning", label: "Planning" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/boutique", label: "Boutique" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-[color-mix(in_oklch,var(--cream-warm)_82%,transparent)] border-b border-border/40">
        <div className="container-editorial flex items-center justify-between py-4">
          <Link
            to="/"
            className="group flex items-center gap-2.5"
            aria-label="Coco Social Club — Accueil"
          >
            <BrandMark className="h-10 w-10 text-foreground transition-transform duration-500 group-hover:rotate-6" />
            <span className="leading-none">
              <span className="block font-serif text-xl tracking-tight text-foreground">Coco</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.28em] text-muted-foreground">
                Social Club
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-5 xl:flex">
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border xl:hidden"
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
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
              <BrandMark className="h-10 w-10" />
              <span className="leading-none">
                <span className="block font-serif text-xl">Coco</span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.28em] text-muted-foreground">
                  Social Club
                </span>
              </span>
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
                className="border-b border-border/40 py-2.5 font-serif text-3xl text-foreground sm:text-4xl"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/galerie"
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-2.5 font-serif text-3xl text-foreground sm:text-4xl"
            >
              Galerie
            </Link>
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
