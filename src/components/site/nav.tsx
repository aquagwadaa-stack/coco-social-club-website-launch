import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Instagram, Menu, MessageCircle, Phone, X } from "lucide-react";
import { content } from "@/content";
import { cn } from "@/lib/utils";
import { ButtonLink, DeciplusButton } from "./cta";
import { Logo } from "./logo";

type SiteNavProps = {
  /** Sur l'accueil, l'en-tête est posé sur le grand visuel tant qu'on n'a pas défilé. */
  overlay?: boolean;
};

export function SiteNav({ overlay = false }: SiteNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** En-tête clair sur fond moka (haut de l'accueil), sinon sombre sur fond clair. */
  const light = overlay && !scrolled;
  const { navigation, site, actions, coordonnees } = content;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        light
          ? "bg-transparent text-creme"
          : "bg-blanc/92 text-espresso shadow-[0_1px_0_0_var(--color-ligne)] backdrop-blur-md",
      )}
    >
      <div className="csc-container flex h-[4.6rem] items-center justify-between gap-3 sm:gap-4">
        <Link
          to="/"
          className="flex min-h-[44px] min-w-0 items-center gap-2.5 sm:gap-3"
          aria-label={`${site.nom}, ${site.retourAccueil}`}
        >
          <Logo variant="symbole" className="size-[2.55rem] sm:size-[2.9rem]" />
          <span className="csc-serif text-[1.16rem] leading-none whitespace-nowrap sm:text-[1.32rem]">
            {site.nom}
          </span>
        </Link>

        <nav aria-label={site.navigationPrincipale} className="hidden min-[1100px]:block">
          <ul className="flex items-center gap-[1.6rem]">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "relative inline-flex min-h-[44px] items-center text-[0.98rem] font-medium whitespace-nowrap transition-opacity",
                    "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                  )}
                  activeProps={{ className: "after:scale-x-100", "aria-current": "page" }}
                >
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <DeciplusButton
            action="reservation"
            tone={light ? "creme" : "moka"}
            size="sm"
            className="max-[369px]:hidden max-[419px]:px-3.5 max-[419px]:[&_svg]:hidden"
          >
            {actions.reserver}
          </DeciplusButton>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className={cn(
                  "inline-flex size-[44px] items-center justify-center rounded-full border transition-colors min-[1100px]:hidden",
                  light ? "border-creme/45 hover:bg-creme/10" : "border-moka/30 hover:bg-creme",
                )}
                aria-label={site.ouvrirMenu}
              >
                <Menu aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-[60] bg-espresso/40 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
              <Dialog.Content
                aria-describedby={undefined}
                className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col overflow-y-auto bg-blanc text-espresso shadow-2xl data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:animate-in data-[state=open]:slide-in-from-right data-[state=closed]:duration-200 data-[state=open]:duration-300"
              >
                <div className="flex h-[4.6rem] shrink-0 items-center justify-between gap-4 border-b border-ligne px-5">
                  <Dialog.Title className="flex items-center gap-3 font-sans text-base font-normal tracking-normal">
                    <Logo variant="symbole" className="size-[2.6rem]" />
                    <span className="csc-serif text-[1.25rem] leading-none">{site.menu}</span>
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="inline-flex size-[44px] items-center justify-center rounded-full border border-moka/30 hover:bg-creme"
                      aria-label={site.fermerMenu}
                    >
                      <X aria-hidden="true" className="size-5" />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label={site.navigationPrincipale} className="px-5 py-4">
                  <ul>
                    <li>
                      <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="csc-serif flex min-h-[52px] items-center border-b border-ligne text-[1.6rem]"
                        activeProps={{ "aria-current": "page" }}
                        activeOptions={{ exact: true }}
                      >
                        {site.accueil}
                      </Link>
                    </li>
                    {navigation.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setOpen(false)}
                          className="csc-serif flex min-h-[52px] items-center border-b border-ligne text-[1.6rem]"
                          activeProps={{ "aria-current": "page", className: "italic" }}
                        >
                          {item.libelle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-auto grid gap-3 px-5 pb-8 pt-2">
                  <DeciplusButton action="reservation" size="lg" className="w-full" />
                  <DeciplusButton action="decouverte" tone="outline" className="w-full">
                    {actions.decouverte}
                  </DeciplusButton>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.98rem]">
                    <a
                      href={coordonnees.mobile.href}
                      className="inline-flex min-h-[44px] items-center gap-2 font-medium whitespace-nowrap"
                    >
                      <Phone aria-hidden="true" className="size-4" />
                      {coordonnees.mobile.affichage}
                    </a>
                    <a
                      href={coordonnees.whatsapp.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 font-medium"
                    >
                      <MessageCircle aria-hidden="true" className="size-4" />
                      {coordonnees.whatsapp.libelle}
                      <span className="sr-only"> ({site.nouvelOnglet})</span>
                    </a>
                    <a
                      href={coordonnees.instagram.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 font-medium"
                    >
                      <Instagram aria-hidden="true" className="size-4" />
                      {coordonnees.instagram.affichage}
                      <span className="sr-only"> ({site.nouvelOnglet})</span>
                    </a>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
