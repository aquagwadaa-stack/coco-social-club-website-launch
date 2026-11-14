import { createFileRoute } from "@tanstack/react-router";
import { Check, Info } from "lucide-react";
import { content, type ActionKey, type Activite, type Famille } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { ArrowLink, ButtonLink, DeciplusButton } from "@/components/site/cta";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { Pill, SectionHeading } from "@/components/site/section";
import { Visual } from "@/components/site/visual";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activites")({
  head: () => ({
    meta: [
      { title: content.activites.meta.titre },
      { name: "description", content: content.activites.meta.description },
      { property: "og:title", content: content.activites.meta.titre },
      { property: "og:description", content: content.activites.meta.description },
    ],
  }),
  component: ActivitesPage,
});

/** Nombre de colonnes de la grille selon la famille (et donc le nombre d'activités). */
const GRILLES: Record<Famille["id"], string> = {
  ems: "md:grid-cols-2 lg:grid-cols-3",
  salle: "sm:grid-cols-2 xl:grid-cols-4",
  cours: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  danses: "sm:grid-cols-2 lg:grid-cols-3",
  "bien-etre": "sm:grid-cols-2 xl:grid-cols-4",
};

/** Libellé du bouton d'action d'une activité. */
function libelleAction(action: ActionKey): string {
  const { actions } = content;
  if (action === "decouverte") return actions.reserverDecouverte;
  if (action === "boutique") return actions.boutique;
  if (action === "offrir") return actions.offrir;
  return actions.reservation;
}

function ActivitesPage() {
  const { activites, actions } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={activites.entete.surtitre}
        titre={activites.entete.titre}
        texte={activites.entete.texte}
      >
        <DeciplusButton action="decouverte" />
        <ButtonLink to="/planning" tone="outline">
          {actions.voirPlanning}
        </ButtonLink>
      </PageHeader>

      <Sommaire />

      {activites.familles.map((famille, index) => (
        <SectionFamille key={famille.id} famille={famille} alterne={index % 2 === 1} />
      ))}

      <AppelFinal />
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Sommaire collant des cinq familles                                         */
/* -------------------------------------------------------------------------- */

function Sommaire() {
  const { familles, libelles } = content.activites;

  return (
    <nav
      aria-label={libelles.sommaire}
      className="sticky top-[4.6rem] z-30 border-b border-ligne bg-blanc/95 backdrop-blur-md"
    >
      <ul className="csc-container flex gap-2 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {familles.map((famille) => (
          <li key={famille.id} className="shrink-0">
            <a
              href={`#${famille.id}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-ligne px-4 text-[0.96rem] font-medium whitespace-nowrap transition-colors hover:border-moka hover:bg-creme"
            >
              {famille.nom}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Une famille d'activités                                                    */
/* -------------------------------------------------------------------------- */

function SectionFamille({ famille, alterne }: { famille: Famille; alterne: boolean }) {
  const { libelles, conseilSante } = content.activites;
  const { decouverte } = content.accueil;
  const estEms = famille.id === "ems";

  return (
    <section
      id={famille.id}
      className={cn("csc-section scroll-mt-14", alterne && "border-y border-ligne bg-creme")}
    >
      <div className="csc-container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <Reveal>
            <SectionHeading surtitre={famille.accroche} titre={famille.nom} texte={famille.intro} />
          </Reveal>
          <ArrowLink to="/tarifs" hash={famille.ancreTarifs}>
            {libelles.tarifs}
            <span className="sr-only"> : {famille.nom}</span>
          </ArrowLink>
        </div>

        {/*
          Téléphone : les activités d'une famille défilent à l'horizontale, pour garder une page courte.
          À partir de 640 px : grille classique.
        */}
        <ul
          className={cn(
            // « relative » : les textes réservés aux lecteurs d'écran restent dans la zone de défilement.
            "relative -mx-5 mt-9 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "sm:mx-0 sm:grid sm:snap-none sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0",
            GRILLES[famille.id],
          )}
        >
          {famille.activites.map((activite, index) => (
            <li key={activite.id} className="w-[84%] shrink-0 snap-start sm:w-auto">
              <Reveal delay={(index % 4) * 60} className="h-full">
                <CarteActivite activite={activite} variant={(index % 4) as 0 | 1 | 2 | 3} />
              </Reveal>
            </li>
          ))}

          {/* La phrase du club, reprise telle quelle, accompagne les séances d'EMS. */}
          {estEms && (
            <li className="w-[84%] shrink-0 snap-start sm:w-auto md:col-span-2 lg:col-span-1">
              <Reveal delay={120} className="h-full">
                <figure className="csc-dark flex h-full flex-col justify-center rounded-[1.6rem] p-7 sm:p-8">
                  <blockquote className="csc-serif text-[1.75rem] leading-[1.15] sm:text-[2rem]">
                    « {decouverte.citation} »
                  </blockquote>
                  <figcaption className="mt-5 text-[0.95rem] text-sable-clair">
                    {decouverte.citationSource}
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          )}
        </ul>

        {estEms && (
          <p className="mt-6 flex max-w-3xl gap-3 text-[0.96rem] text-moka-soft">
            <Info aria-hidden="true" className="mt-[0.2em] size-4 shrink-0" strokeWidth={1.5} />
            {conseilSante}
          </p>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Une activité : photo, description, bénéfices, public concerné              */
/* -------------------------------------------------------------------------- */

function CarteActivite({ activite, variant }: { activite: Activite; variant: 0 | 1 | 2 | 3 }) {
  const { libelles } = content.activites;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-ligne bg-card">
      <Visual
        photo={activite.photo}
        className="h-[7.5rem] w-full sm:aspect-[16/9] sm:h-auto"
        variant={variant}
        iconSize="sm"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="text-[1.45rem]">{activite.nom}</h3>
          {activite.etiquette && <Pill>{activite.etiquette}</Pill>}
        </div>
        <p className="mt-2.5 text-[0.98rem] text-moka-soft">{activite.description}</p>

        <h4 className="csc-eyebrow mt-5 text-moka-soft">{libelles.benefices}</h4>
        <ul className="mt-2 grid gap-1.5 text-[0.97rem]">
          {activite.benefices.map((benefice) => (
            <li key={benefice} className="flex gap-2.5">
              <Check
                aria-hidden="true"
                className="mt-[0.22em] size-4 shrink-0 text-moka"
                strokeWidth={1.8}
              />
              <span>{benefice}</span>
            </li>
          ))}
        </ul>

        <h4 className="csc-eyebrow mt-5 text-moka-soft">{libelles.publicConcerne}</h4>
        <p className="mt-2 text-[0.97rem]">{activite.publicConcerne}</p>

        <div className="mt-auto pt-6">
          <DeciplusButton action={activite.action} size="sm" tone="outline" className="w-full">
            {libelleAction(activite.action)}
            <span className="sr-only"> : {activite.nom}</span>
          </DeciplusButton>
        </div>
      </div>
    </article>
  );
}
