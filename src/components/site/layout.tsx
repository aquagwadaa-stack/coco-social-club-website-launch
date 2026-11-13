import type { ReactNode } from "react";
import { content } from "@/content";
import { cn } from "@/lib/utils";
import { Emphasis } from "./emphasis";
import { SiteFooter } from "./footer";
import { SiteNav } from "./nav";

type SiteLayoutProps = {
  children: ReactNode;
  /** Sur l'accueil : l'en-tête est posé sur le grand visuel. */
  overlayHeader?: boolean;
};

/** Structure commune à toutes les pages : lien d'évitement, en-tête, contenu, pied de page. */
export function SiteLayout({ children, overlayHeader = false }: SiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-moka focus:px-5 focus:py-3 focus:font-semibold focus:text-blanc"
      >
        {content.site.allerAuContenu}
      </a>
      <SiteNav overlay={overlayHeader} />
      <main
        id="contenu"
        tabIndex={-1}
        className={cn("flex-1 outline-none", !overlayHeader && "pt-[4.6rem]")}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

type PageHeaderProps = {
  surtitre: string;
  /** Titre de la page : les passages entre astérisques s'affichent en italique. */
  titre: string;
  texte?: string;
  /** Boutons ou compléments affichés sous le texte. */
  children?: ReactNode;
};

/** En-tête des pages intérieures : fond crème, titre de page et texte d'introduction. */
export function PageHeader({ surtitre, titre, texte, children }: PageHeaderProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-ligne bg-creme">
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-24 -top-28 -z-10 size-[30rem] text-moka/15 sm:-right-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="200" cy="200" r="198" />
        <circle cx="200" cy="200" r="150" />
        <circle cx="200" cy="200" r="102" />
      </svg>
      <div className="csc-container py-12 md:py-16">
        <div className="csc-fade-up max-w-3xl">
          <p className="csc-eyebrow text-moka-soft">{surtitre}</p>
          <h1 className="mt-4 text-[2.5rem] sm:text-[3.4rem] lg:text-[4rem]">
            <Emphasis text={titre} />
          </h1>
          {texte && (
            <p className="mt-5 max-w-2xl text-[1.14rem] leading-relaxed text-moka-soft">{texte}</p>
          )}
          {children && <div className="mt-7 flex flex-wrap items-center gap-3">{children}</div>}
        </div>
      </div>
    </section>
  );
}
