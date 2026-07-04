import type { ReactNode } from "react";
import { SiteNav } from "./nav";
import { SiteFooter } from "./footer";

export function SiteLayout({ children, transparentNav = false }: { children: ReactNode; transparentNav?: boolean }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteNav />
      <main className={transparentNav ? "flex-1" : "flex-1 pt-20"}>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="container-editorial pt-16 pb-14 md:pt-24 md:pb-20">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">{eyebrow}</p>
      )}
      <h1 className="font-serif text-5xl md:text-7xl leading-[1.02] max-w-4xl">{title}</h1>
      {subtitle && (
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
    </section>
  );
}