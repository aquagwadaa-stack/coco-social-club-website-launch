import { createFileRoute } from "@tanstack/react-router";
import { Gem, HandHeart, Handshake, Zap, type LucideIcon } from "lucide-react";
import { content, type Tone } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { ButtonLink } from "@/components/site/cta";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { Pill, SectionHeading } from "@/components/site/section";
import { Visual } from "@/components/site/visual";

export const Route = createFileRoute("/le-club")({
  head: () => ({
    meta: [
      { title: content.club.meta.titre },
      { name: "description", content: content.club.meta.description },
      { property: "og:title", content: content.club.meta.titre },
      { property: "og:description", content: content.club.meta.description },
    ],
  }),
  component: LeClubPage,
});

/** Pictogrammes des trois valeurs, dans l'ordre de src/content.ts : premium, humain, dynamique. */
const VALEUR_ICONS: LucideIcon[] = [Gem, HandHeart, Zap];

/** Teintes des emplacements de portrait, pour varier la rangée. */
const PORTRAIT_TONES: Tone[] = ["sable", "moka", "beige", "taupe"];

function LeClubPage() {
  const { club, actions } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={club.entete.surtitre}
        titre={club.entete.titre}
        texte={club.entete.texte}
      >
        <ButtonLink to="/activites" arrow>
          {actions.voirActivites}
        </ButtonLink>
        <ButtonLink to="/contact" tone="outline">
          {actions.contact}
        </ButtonLink>
      </PageHeader>

      <Origine />
      <Philosophie />
      <Valeurs />
      <Equipe />
      <Pourquoi />
      <Entreprises />
      <AppelFinal />
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* L'origine                                                                  */
/* -------------------------------------------------------------------------- */

function Origine() {
  const { origine } = content.club;

  return (
    <section className="csc-section">
      <div className="csc-container grid items-center gap-x-16 gap-y-10 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <SectionHeading surtitre={origine.surtitre} titre={origine.titre} />
          <div className="mt-6 grid max-w-2xl gap-4 text-[1.1rem] leading-relaxed text-moka-soft">
            {origine.texte.map((paragraphe) => (
              <p key={paragraphe}>{paragraphe}</p>
            ))}
          </div>
        </Reveal>
        <Reveal
          delay={100}
          className="mx-auto w-full max-w-[16rem] sm:max-w-[20rem] lg:max-w-[23rem]"
        >
          <Visual
            photo={origine.photo}
            className="csc-arch aspect-[4/5] w-full"
            variant={2}
            iconSize="lg"
          />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* La philosophie                                                             */
/* -------------------------------------------------------------------------- */

function Philosophie() {
  const { philosophie } = content.club;

  return (
    <section className="csc-dark relative isolate overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute -left-36 top-1/2 -z-10 size-[36rem] -translate-y-1/2 text-creme/10"
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
      <div className="csc-container csc-section">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="csc-eyebrow text-sable-clair">{philosophie.surtitre}</p>
          <figure className="mt-6">
            <blockquote className="csc-serif text-[2.4rem] leading-[1.08] sm:text-[3.4rem] lg:text-[4.2rem]">
              « {philosophie.citation} »
            </blockquote>
            <figcaption className="mt-5 text-[0.98rem] text-sable-clair">
              {philosophie.citationSource}
            </figcaption>
          </figure>
          <p className="mx-auto mt-8 max-w-2xl text-[1.14rem] leading-relaxed text-creme/90">
            {philosophie.texte}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Les valeurs                                                                */
/* -------------------------------------------------------------------------- */

function Valeurs() {
  const { valeurs } = content.club;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={valeurs.surtitre} titre={valeurs.titre} />
        </Reveal>
        <ul className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
          {valeurs.liste.map((valeur, index) => {
            const Icon = VALEUR_ICONS[index % VALEUR_ICONS.length];
            return (
              <li key={valeur.titre}>
                <Reveal delay={index * 80} className="border-t border-moka/25 pt-6">
                  <Icon aria-hidden="true" className="size-8 text-moka" strokeWidth={1.3} />
                  <h3 className="mt-4 text-[1.9rem]">{valeur.titre}</h3>
                  <p className="mt-2 text-[1.05rem] text-moka-soft">{valeur.texte}</p>
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
/* L'équipe — des rôles, aucun nom tant que le club ne les a pas fournis      */
/* -------------------------------------------------------------------------- */

function Equipe() {
  const { equipe } = content.club;

  return (
    <section className="csc-section border-y border-ligne bg-creme">
      <div className="csc-container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <Reveal>
            <SectionHeading surtitre={equipe.surtitre} titre={equipe.titre} texte={equipe.texte} />
          </Reveal>
          <Pill tone="outline" className="min-h-[36px] px-4">
            {equipe.note}
          </Pill>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {equipe.membres.map((membre, index) => (
            <li key={membre.role}>
              <Reveal
                delay={index * 60}
                className="h-full overflow-hidden rounded-[1.6rem] border border-ligne bg-card"
              >
                <Visual
                  photo={{ ...equipe.photo, tone: PORTRAIT_TONES[index % PORTRAIT_TONES.length] }}
                  className="aspect-[4/5] w-full"
                  variant={(index % 4) as 0 | 1 | 2 | 3}
                />
                <div className="p-4 sm:p-5">
                  <h3 className="text-[1.25rem] sm:text-[1.4rem]">{membre.role}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-moka-soft">{membre.texte}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Pourquoi choisir le Coco Social Club ?                                     */
/* -------------------------------------------------------------------------- */

function Pourquoi() {
  const { pourquoi } = content.club;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={pourquoi.surtitre} titre={pourquoi.titre} />
        </Reveal>
        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {pourquoi.liste.map((raison, index) => (
            <li key={raison.titre}>
              <Reveal delay={(index % 4) * 60} className="border-t border-moka/25 pt-5">
                <span
                  aria-hidden="true"
                  className="csc-serif block text-[2.4rem] leading-none text-moka"
                >
                  {index + 1}
                </span>
                <h3 className="mt-3 text-[1.4rem]">{raison.titre}</h3>
                <p className="mt-2 text-[1rem] text-moka-soft">{raison.texte}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Entreprises et partenaires                                                 */
/* -------------------------------------------------------------------------- */

function Entreprises() {
  const { entreprises } = content.club;

  return (
    <section className="csc-section border-t border-ligne bg-creme">
      <div className="csc-container">
        <Reveal className="grid items-center gap-x-12 gap-y-8 rounded-[1.8rem] border border-ligne bg-card p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
          <div className="flex gap-5">
            <Handshake
              aria-hidden="true"
              className="mt-1 hidden size-9 shrink-0 text-moka sm:block"
              strokeWidth={1.3}
            />
            <SectionHeading
              surtitre={entreprises.surtitre}
              titre={entreprises.titre}
              texte={entreprises.texte}
            />
          </div>
          <ButtonLink to="/contact" size="lg" arrow>
            {entreprises.bouton}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
