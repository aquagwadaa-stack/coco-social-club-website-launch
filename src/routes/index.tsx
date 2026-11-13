import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Gem,
  HandHeart,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Smile,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { content } from "@/content";
import { ArrowLink, ButtonLink, DeciplusButton, ExternalButton } from "@/components/site/cta";
import { Emphasis } from "@/components/site/emphasis";
import { Adresse, Horaires, NoteGoogle } from "@/components/site/infos";
import { SiteLayout } from "@/components/site/layout";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section";
import { Visual } from "@/components/site/visual";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: content.accueil.meta.titre },
      { name: "description", content: content.accueil.meta.description },
      { property: "og:title", content: content.accueil.meta.titre },
      { property: "og:description", content: content.accueil.meta.description },
    ],
  }),
  component: AccueilPage,
});

/** Pictogrammes des cinq avantages, dans l'ordre de src/content.ts. */
const AVANTAGE_ICONS: LucideIcon[] = [Smile, HandHeart, Users, TrendingUp, Gem];

function AccueilPage() {
  return (
    <SiteLayout overlayHeader>
      <Hero />
      <BandeBio />
      <Presentation />
      <Avantages />
      <ActivitesPhares />
      <Decouverte />
      <Formules />
      <ReseauxEtAvis />
      <Pratique />
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Grand visuel d'ouverture                                                   */
/* -------------------------------------------------------------------------- */

function Hero() {
  const { hero } = content.accueil;
  const { actions } = content;
  const hasPhoto = Boolean(hero.photo.src);

  return (
    <section className="csc-dark relative isolate overflow-hidden">
      {hasPhoto ? (
        <>
          <img
            src={hero.photo.src ?? undefined}
            alt={hero.photo.alt}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/85 via-espresso/55 to-espresso/20" />
        </>
      ) : (
        <svg
          viewBox="0 0 800 800"
          className="absolute -right-[22rem] top-1/2 -z-10 size-[64rem] -translate-y-1/2 text-creme/12 max-lg:-right-[34rem] max-lg:opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          aria-hidden="true"
          focusable="false"
        >
          <g className="csc-ring-drift">
            <circle cx="400" cy="400" r="398" strokeDasharray="2 10" />
          </g>
          <circle cx="400" cy="400" r="330" />
          <circle cx="400" cy="400" r="262" />
        </svg>
      )}

      <div
        className={
          hasPhoto
            ? "csc-container flex min-h-[min(44rem,84svh)] items-end pb-14 pt-28 lg:pb-16 lg:pt-32"
            : "csc-container grid min-h-[min(44rem,84svh)] items-center gap-x-12 gap-y-10 pb-14 pt-28 lg:grid-cols-[1.12fr_0.88fr] lg:pb-16 lg:pt-32"
        }
      >
        <div className="csc-fade-up max-w-[43rem]">
          <p className="csc-eyebrow text-sable-clair">{hero.surtitre}</p>
          <h1 className="mt-5 text-[2.75rem] sm:text-6xl lg:text-[4.5rem]">
            <Emphasis text={hero.titre} />
          </h1>
          <p className="mt-6 max-w-xl text-[1.16rem] leading-relaxed text-creme/90">{hero.texte}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DeciplusButton action="reservation" tone="creme" size="lg" />
            <ButtonLink to="/le-club" tone="outlineLight">
              {actions.decouvrirClub}
            </ButtonLink>
            <ButtonLink to="/contact" tone="outlineLight">
              {actions.contact}
            </ButtonLink>
          </div>
          <NoteGoogle light className="mt-8" />
        </div>

        {!hasPhoto && (
          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-[19rem] lg:max-w-[23rem]">
            <Visual
              photo={{ ...hero.photo, tone: "sable" }}
              className="csc-arch aspect-[4/5] w-full"
              variant={2}
              iconSize="lg"
              priority
            />
            <Logo className="absolute -bottom-5 -left-6 size-28 drop-shadow-[0_10px_24px_rgba(46,34,28,0.35)] sm:-left-10 sm:size-32" />
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Les mots du club (bio Instagram)                                           */
/* -------------------------------------------------------------------------- */

function BandeBio() {
  const { bioInstagram, coordonnees, site } = content;
  const [premiere, ...autres] = bioInstagram.phrases;

  return (
    <section aria-label={bioInstagram.source} className="border-b border-ligne bg-creme">
      <div className="csc-container grid gap-x-10 gap-y-6 py-9 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:py-10">
        <div>
          <a
            href={coordonnees.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="csc-eyebrow inline-flex min-h-[32px] items-center gap-2 text-moka-soft hover:text-moka"
          >
            <Instagram aria-hidden="true" className="size-4" />
            {bioInstagram.source}
            <span className="sr-only"> ({site.nouvelOnglet})</span>
          </a>
          <p className="csc-serif mt-3 text-[1.75rem] leading-[1.15] sm:text-[2.1rem]">
            « {premiere} »
          </p>
        </div>
        <ul className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
          {autres.map((phrase) => (
            <li
              key={phrase}
              className="flex items-center gap-3 border-ligne py-2 text-[1.08rem] font-medium lg:border-b lg:py-3 lg:last:border-b-0"
            >
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-moka" />
              {phrase}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Présentation courte                                                        */
/* -------------------------------------------------------------------------- */

function Presentation() {
  const { presentation } = content.accueil;
  const { actions } = content;

  return (
    <section className="csc-section">
      <div className="csc-container grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal className="mx-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:max-w-[25rem]">
          <Visual
            photo={presentation.photo}
            className="csc-arch aspect-[4/5] w-full"
            variant={1}
            iconSize="lg"
          />
        </Reveal>
        <Reveal>
          <SectionHeading surtitre={presentation.surtitre} titre={presentation.titre} />
          <div className="mt-6 grid max-w-2xl gap-4 text-[1.1rem] leading-relaxed text-moka-soft">
            {presentation.texte.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink to="/le-club" arrow>
              {actions.decouvrirClub}
            </ButtonLink>
            <ArrowLink to="/planning">{actions.voirPlanning}</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Avantages                                                                  */
/* -------------------------------------------------------------------------- */

function Avantages() {
  const { avantages } = content.accueil;

  return (
    <section className="csc-section border-y border-ligne bg-creme">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={avantages.surtitre} titre={avantages.titre} />
        </Reveal>
        <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {avantages.liste.map((avantage, index) => {
            const Icon = AVANTAGE_ICONS[index % AVANTAGE_ICONS.length];
            return (
              <li key={avantage.titre}>
                <Reveal delay={index * 70} className="border-t border-moka/25 pt-5">
                  <Icon aria-hidden="true" className="size-7 text-moka" strokeWidth={1.3} />
                  <h3 className="mt-4 text-[1.4rem]">{avantage.titre}</h3>
                  <p className="mt-2 text-[1rem] text-moka-soft">{avantage.texte}</p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Activités phares                                                           */
/* -------------------------------------------------------------------------- */

function ActivitesPhares() {
  const { activites } = content.accueil;
  const { familles } = content.activites;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal>
            <SectionHeading
              surtitre={activites.surtitre}
              titre={activites.titre}
              texte={activites.texte}
            />
          </Reveal>
          <ArrowLink to="/activites">{activites.lien}</ArrowLink>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {familles.map((famille, index) => (
            <li
              key={famille.id}
              className={index === 0 ? "sm:col-span-2 lg:col-span-1" : undefined}
            >
              <Reveal delay={index * 60} className="h-full">
                <Link
                  to="/activites"
                  hash={famille.id}
                  className="group flex h-full overflow-hidden rounded-[1.6rem] border border-ligne bg-card transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(46,34,28,0.5)] sm:flex-col"
                >
                  <div className="w-[34%] shrink-0 overflow-hidden sm:w-full">
                    <Visual
                      photo={famille.photo}
                      className="h-full min-h-[9.5rem] w-full transition-transform duration-700 group-hover:scale-[1.04] sm:aspect-[5/4] sm:h-auto sm:min-h-0 lg:aspect-[4/5]"
                      variant={(index % 4) as 0 | 1 | 2 | 3}
                      iconSize="sm"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-[1.6rem]">{famille.nom}</h3>
                    <p className="mt-1 text-[0.95rem] font-semibold text-moka">
                      {famille.accroche}
                    </p>
                    <p className="mt-3 text-[0.95rem] leading-relaxed text-moka-soft">
                      {famille.activites.map((activite) => activite.nom).join(" · ")}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-semibold">
                      {activites.decouvrir}
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Séance découverte offerte                                                  */
/* -------------------------------------------------------------------------- */

function Decouverte() {
  const { decouverte } = content.accueil;
  const { actions } = content;

  return (
    <section className="csc-dark relative isolate overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute -left-40 -top-40 -z-10 size-[34rem] text-creme/10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="200" cy="200" r="198" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="82" />
      </svg>
      <div className="csc-container csc-section grid items-center gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <SectionHeading
            light
            surtitre={decouverte.surtitre}
            titre={decouverte.titre}
            texte={decouverte.texte}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DeciplusButton action="decouverte" tone="creme" size="lg" />
            <ButtonLink to="/activites" hash="ems" tone="outlineLight" size="lg">
              {decouverte.lienEms}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <figure className="rounded-[1.8rem] border border-creme/20 bg-creme/[0.06] p-7 sm:p-9">
            <blockquote className="csc-serif text-[1.85rem] leading-[1.15] sm:text-[2.3rem]">
              « {decouverte.citation} »
            </blockquote>
            <figcaption className="mt-5 text-[0.95rem] text-sable-clair">
              {decouverte.citationSource}
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Formules                                                                   */
/* -------------------------------------------------------------------------- */

function Formules() {
  const { formules } = content.accueil;
  const { tarifs, actions } = content;

  return (
    <section className="csc-section">
      <div className="csc-container grid gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading
            surtitre={formules.surtitre}
            titre={formules.titre}
            texte={formules.texte}
          />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink to="/tarifs" arrow>
              {actions.voirTarifs}
            </ButtonLink>
            <DeciplusButton action="boutique" tone="outline" />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ul className="overflow-hidden rounded-[1.6rem] border border-ligne bg-card">
            {tarifs.abonnements.liste.map((abonnement) => (
              <li key={abonnement.id} className="border-b border-ligne last:border-b-0">
                <Link
                  to="/tarifs"
                  hash={tarifs.abonnements.ancre}
                  className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-creme sm:px-7"
                >
                  <span>
                    <span className="block text-[1.05rem] font-semibold tracking-wide">
                      {abonnement.nom}
                    </span>
                    <span className="block text-[0.95rem] text-moka-soft">{abonnement.resume}</span>
                  </span>
                  <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="csc-serif text-[1.9rem] leading-none">{abonnement.prix}</span>
                    <span className="text-[0.9rem] text-moka-soft">
                      {tarifs.abonnements.parMois}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.9rem] text-moka-soft">
            {tarifs.abonnements.conditions.join(" · ")}. {tarifs.mention}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Instagram et note Google                                                   */
/* -------------------------------------------------------------------------- */

function ReseauxEtAvis() {
  const { instagram } = content.accueil;
  const { coordonnees } = content;
  const tones = ["sable", "moka", "beige", "taupe", "beige", "sable"] as const;

  return (
    <section className="csc-section border-y border-ligne bg-creme">
      <div className="csc-container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal>
            <SectionHeading
              surtitre={instagram.surtitre}
              titre={instagram.titre}
              texte={instagram.texte}
            />
          </Reveal>
          <ExternalButton href={coordonnees.instagram.href} tone="outline">
            <Instagram aria-hidden="true" />
            {instagram.bouton}
          </ExternalButton>
        </div>

        <Reveal className="mt-10">
          <ul
            className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-6"
            aria-label={instagram.emplacement}
          >
            {Array.from({ length: instagram.nombreVignettes }).map((_, index) => (
              <li key={index}>
                <Visual
                  photo={{
                    src: null,
                    alt: "",
                    motif: "instagram",
                    tone: tones[index % tones.length],
                  }}
                  className="aspect-square w-full rounded-2xl"
                  variant={(index % 4) as 0 | 1 | 2 | 3}
                  iconSize="sm"
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.9rem] text-moka-soft">{instagram.emplacement}.</p>
        </Reveal>

        <Reveal className="mt-10 rounded-[1.6rem] border border-ligne bg-blanc px-5 py-5 sm:px-7">
          <NoteGoogle />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Infos pratiques                                                            */
/* -------------------------------------------------------------------------- */

function Pratique() {
  const { pratique } = content.accueil;
  const { coordonnees, horaires, actions, site } = content;

  return (
    <section className="csc-section">
      <div className="csc-container grid gap-x-16 gap-y-10 lg:grid-cols-[1fr_1fr]">
        <Reveal>
          <SectionHeading
            surtitre={pratique.surtitre}
            titre={pratique.titre}
            texte={pratique.texte}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DeciplusButton action="reservation" />
            <ButtonLink to="/contact" tone="outline">
              {actions.contact}
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          delay={100}
          className="grid gap-8 rounded-[1.6rem] border border-ligne bg-card p-6 sm:grid-cols-2 sm:p-8"
        >
          <div>
            <h3 className="csc-eyebrow font-sans text-moka-soft">{horaires.titre}</h3>
            <Horaires className="mt-4 text-[1rem]" />
          </div>
          <div>
            <h3 className="csc-eyebrow font-sans text-moka-soft">{pratique.adresseTitre}</h3>
            <ul className="mt-4 grid gap-3 text-[1rem]">
              <li className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-moka" />
                <Adresse />
              </li>
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="size-4 shrink-0 text-moka" />
                <a
                  href={coordonnees.mobile.href}
                  className="csc-link inline-flex min-h-[32px] items-center whitespace-nowrap"
                >
                  {coordonnees.mobile.affichage}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-moka" />
                <a
                  href={coordonnees.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="csc-link inline-flex min-h-[32px] items-center"
                >
                  {coordonnees.whatsapp.libelle}
                  <span className="sr-only"> ({site.nouvelOnglet})</span>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="size-4 shrink-0 text-moka" />
                <a
                  href={coordonnees.email.href}
                  className="csc-link inline-flex min-h-[32px] items-center break-all"
                >
                  {coordonnees.email.affichage}
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
