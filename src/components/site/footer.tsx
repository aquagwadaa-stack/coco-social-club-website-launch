import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { content } from "@/content";
import { DeciplusButton } from "./cta";
import { Adresse, Horaires } from "./infos";
import { Logo } from "./logo";
import { OPEN_PREFS_EVENT } from "./prefs";

export function SiteFooter() {
  const { site, coordonnees, navigation, piedDePage, cookies, horaires } = content;
  const year = new Date().getFullYear();

  return (
    <footer className="csc-dark bg-moka-deep">
      <div className="csc-container grid gap-12 py-14 md:py-16 lg:grid-cols-[1.25fr_0.8fr_1fr_1fr]">
        <div>
          <Logo title={site.nom} className="size-28" />
          <p className="csc-serif mt-6 max-w-xs text-[1.7rem] leading-tight">
            « {piedDePage.accroche} »
          </p>
          <DeciplusButton action="reservation" tone="creme" className="mt-7" />
        </div>

        <nav aria-label={site.navigationPiedDePage}>
          <h2 className="csc-eyebrow font-sans text-sable-clair">
            {piedDePage.colonnes.navigation}
          </h2>
          <ul className="mt-4 grid gap-0.5">
            {navigation.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-[36px] items-center text-creme/90 hover:text-creme hover:underline hover:underline-offset-4"
                >
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="csc-eyebrow font-sans text-sable-clair">{piedDePage.colonnes.contact}</h2>
          <ul className="mt-4 grid gap-1.5 text-creme/90">
            <li className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <Adresse />
            </li>
            <li className="flex items-center gap-3">
              <Phone aria-hidden="true" className="size-4 shrink-0" />
              <span>
                <a
                  href={coordonnees.mobile.href}
                  className="inline-flex min-h-[32px] items-center whitespace-nowrap hover:underline"
                >
                  {coordonnees.mobile.affichage}
                </a>
                <span aria-hidden="true"> · </span>
                <a
                  href={coordonnees.fixe.href}
                  className="inline-flex min-h-[32px] items-center whitespace-nowrap hover:underline"
                >
                  {coordonnees.fixe.affichage}
                </a>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="size-4 shrink-0" />
              <a
                href={coordonnees.email.href}
                className="inline-flex min-h-[32px] items-center break-all hover:underline"
              >
                {coordonnees.email.affichage}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle aria-hidden="true" className="size-4 shrink-0" />
              <a
                href={coordonnees.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center hover:underline"
              >
                {coordonnees.whatsapp.libelle}
                <span className="sr-only"> ({site.nouvelOnglet})</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram aria-hidden="true" className="size-4 shrink-0" />
              <a
                href={coordonnees.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[32px] items-center hover:underline"
              >
                {coordonnees.instagram.affichage}
                <span className="sr-only"> ({site.nouvelOnglet})</span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="csc-eyebrow font-sans text-sable-clair">{horaires.titre}</h2>
          <Horaires light className="mt-4 text-[0.98rem]" />
        </div>
      </div>

      <div className="border-t border-creme/15">
        <div className="csc-container flex flex-col gap-3 py-6 text-[0.9rem] text-creme/75 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {piedDePage.droits}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <Link
              to="/mentions-legales"
              className="inline-flex min-h-[36px] items-center hover:text-creme hover:underline"
            >
              {piedDePage.mentions}
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[36px] cursor-pointer items-center hover:text-creme hover:underline"
              onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
            >
              {cookies.gerer}
            </button>
          </div>
          <p>{site.mentionDemo}</p>
        </div>
      </div>
    </footer>
  );
}
