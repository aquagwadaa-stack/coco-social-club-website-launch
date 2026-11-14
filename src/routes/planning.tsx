import { createFileRoute } from "@tanstack/react-router";
import * as Tabs from "@radix-ui/react-tabs";
import { Info } from "lucide-react";
import { content, familleParId } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { ArrowLink, DeciplusButton } from "@/components/site/cta";
import { Horaires } from "@/components/site/infos";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { Pill, SectionHeading } from "@/components/site/section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/planning")({
  head: () => ({
    meta: [
      { title: content.planning.meta.titre },
      { name: "description", content: content.planning.meta.description },
      { property: "og:title", content: content.planning.meta.titre },
      { property: "og:description", content: content.planning.meta.description },
    ],
  }),
  component: PlanningPage,
});

type Cours = (typeof content.planning.semaine.jours)[number]["cours"][number];

function PlanningPage() {
  const { planning } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={planning.entete.surtitre}
        titre={planning.entete.titre}
        texte={planning.entete.texte}
      >
        <DeciplusButton action="reservation" />
      </PageHeader>

      <Etapes />
      <Semaine />
      <Acces />
      <AppelFinal />
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Comment réserver                                                           */
/* -------------------------------------------------------------------------- */

function Etapes() {
  const { etapes } = content.planning;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={etapes.surtitre} titre={etapes.titre} />
        </Reveal>

        <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {etapes.liste.map((etape, index) => (
            <li key={etape.titre}>
              <Reveal delay={index * 70} className="border-t border-moka/25 pt-5">
                <span
                  aria-hidden="true"
                  className="csc-serif block text-[2.6rem] leading-none text-moka"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.4rem]">{etape.titre}</h3>
                <p className="mt-2 text-[1rem] text-moka-soft">{etape.texte}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[1.6rem] border border-ligne bg-creme px-6 py-5 sm:px-8">
          <div>
            <h3 className="text-[1.5rem]">{etapes.premiereFois.titre}</h3>
            <p className="mt-1 text-[1.02rem] text-moka-soft">{etapes.premiereFois.texte}</p>
          </div>
          <DeciplusButton action="decouverte" />
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Semaine d'exemple                                                          */
/* -------------------------------------------------------------------------- */

function Semaine() {
  const { semaine } = content.planning;
  const { rappel } = content.deciplus;
  const nomCours = familleParId("cours").nom;
  const nomDanses = familleParId("danses").nom;

  return (
    <section className="csc-section border-y border-ligne bg-creme">
      <div className="csc-container">
        <Reveal>
          <p className="csc-eyebrow text-moka-soft">{semaine.surtitre}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <h2 className="text-[2.15rem] sm:text-[2.75rem] lg:text-5xl">{semaine.titre}</h2>
            <Pill tone="moka" className="px-4 py-1.5 text-[0.92rem]">
              {semaine.badge}
            </Pill>
          </div>
          {/* L'avertissement précède la grille : on ne doit pas prendre cette semaine pour le vrai planning. */}
          <p className="mt-6 flex max-w-3xl gap-3 rounded-2xl border border-moka/30 bg-blanc p-4 text-[1rem]">
            <Info
              aria-hidden="true"
              className="mt-[0.2em] size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <span>{semaine.avertissement}</span>
          </p>
        </Reveal>

        <Reveal className="mt-8 rounded-[1.6rem] border border-ligne bg-blanc p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-ligne pb-4">
            <ul
              className="flex flex-wrap gap-x-5 gap-y-2 text-[0.92rem]"
              aria-label={semaine.legende}
            >
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-3.5 rounded-full border border-moka/40 bg-card"
                />
                {nomCours}
              </li>
              <li className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-3.5 rounded-full border border-moka/40 bg-sable"
                />
                {nomDanses}
              </li>
            </ul>
            <Pill tone="outline">{semaine.badge}</Pill>
          </div>

          {/* Ordinateur : une colonne par jour. */}
          <div className="mt-5 hidden gap-3 lg:grid lg:grid-cols-6">
            {semaine.jours.map((jour) => (
              <div key={jour.jour}>
                <h3 className="border-b border-moka/25 pb-2 font-sans text-[1rem] font-semibold tracking-normal">
                  {jour.jour}
                </h3>
                <ul className="mt-3 grid gap-2">
                  {jour.cours.map((cours) => (
                    <CaseCours key={`${cours.heure}-${cours.nom}`} cours={cours} />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Téléphone et tablette : un onglet par jour. */}
          <Tabs.Root defaultValue={semaine.jours[0].jour} className="mt-5 lg:hidden">
            <Tabs.List
              aria-label={semaine.choisirJour}
              className="grid grid-cols-3 gap-2 sm:grid-cols-6"
            >
              {semaine.jours.map((jour) => (
                <Tabs.Trigger
                  key={jour.jour}
                  value={jour.jour}
                  className="min-h-[44px] cursor-pointer rounded-full border border-ligne bg-card px-2 text-[0.95rem] font-medium transition-colors hover:border-moka data-[state=active]:border-moka data-[state=active]:bg-moka data-[state=active]:text-blanc"
                >
                  {jour.jour}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            {semaine.jours.map((jour) => (
              <Tabs.Content key={jour.jour} value={jour.jour} className="mt-4 rounded-xl">
                <ul className="grid gap-2 sm:grid-cols-2">
                  {jour.cours.map((cours) => (
                    <CaseCours key={`${cours.heure}-${cours.nom}`} cours={cours} enLigne />
                  ))}
                </ul>
              </Tabs.Content>
            ))}
          </Tabs.Root>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <DeciplusButton action="reservation" size="lg">
            {semaine.bouton}
          </DeciplusButton>
          <p className="max-w-xl text-[0.96rem] text-moka-soft">{rappel}</p>
        </div>
      </div>
    </section>
  );
}

/** Un cours de la semaine d'exemple. Les danses ont une teinte différente des cours collectifs. */
function CaseCours({ cours, enLigne = false }: { cours: Cours; enLigne?: boolean }) {
  const danse = cours.famille === "danses";

  return (
    <li
      className={cn(
        "rounded-xl border p-3",
        danse ? "border-moka/25 bg-sable-clair" : "border-ligne bg-card",
        enLigne && "flex items-baseline gap-4",
      )}
    >
      <span
        className={cn(
          "block text-[0.88rem] font-semibold whitespace-nowrap",
          danse ? "text-espresso" : "text-moka-soft",
          enLigne && "w-[4.4rem] shrink-0",
        )}
      >
        {cours.heure}
      </span>
      <span className="block text-[0.98rem] leading-snug font-medium">{cours.nom}</span>
    </li>
  );
}

/* -------------------------------------------------------------------------- */
/* Accès salle                                                                */
/* -------------------------------------------------------------------------- */

function Acces() {
  const { acces } = content.planning;
  const { horaires, actions } = content;

  return (
    <section className="csc-section">
      <div className="csc-container grid gap-x-16 gap-y-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading surtitre={acces.surtitre} titre={acces.titre} texte={acces.texte} />
          <div className="mt-6">
            <ArrowLink to="/tarifs">{actions.voirTarifs}</ArrowLink>
          </div>
        </Reveal>

        <Reveal delay={100} className="grid gap-5">
          <div className="rounded-[1.6rem] border border-ligne bg-card p-6 sm:p-7">
            <h3 className="csc-eyebrow font-sans text-moka-soft">{horaires.titre}</h3>
            <Horaires className="mt-4 text-[1.02rem]" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[1.6rem] border border-ligne bg-creme p-6 sm:p-7">
            <div>
              <h3 className="text-[1.4rem]">{acces.surRendezVous.titre}</h3>
              <p className="mt-1 text-[1rem] text-moka-soft">{acces.surRendezVous.texte}</p>
            </div>
            <DeciplusButton action="reservation" tone="outline" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
