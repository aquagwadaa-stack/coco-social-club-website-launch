import { createFileRoute } from "@tanstack/react-router";
import { Check, Info } from "lucide-react";
import { content } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { ButtonLink, DeciplusButton } from "@/components/site/cta";
import { plainText } from "@/components/site/emphasis";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { Pill, SectionHeading } from "@/components/site/section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: content.tarifs.meta.titre },
      { name: "description", content: content.tarifs.meta.description },
      { property: "og:title", content: content.tarifs.meta.titre },
      { property: "og:description", content: content.tarifs.meta.description },
    ],
  }),
  component: TarifsPage,
});

function TarifsPage() {
  const { tarifs, actions } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={tarifs.entete.surtitre}
        titre={tarifs.entete.titre}
        texte={tarifs.entete.texte}
      >
        <DeciplusButton action="boutique" />
        <Pill tone="outline" className="min-h-[36px] px-4">
          <Info aria-hidden="true" className="size-4" strokeWidth={1.5} />
          {tarifs.mention}
        </Pill>
      </PageHeader>

      <Sommaire />
      <Abonnements />
      <Cartes />
      <Soins />
      <Cadeaux />

      <AppelFinal titre={tarifs.appel.titre} texte={tarifs.appel.texte}>
        <DeciplusButton action="boutique" tone="creme" size="lg" />
        <ButtonLink to="/contact" tone="outlineLight" size="lg">
          {actions.contact}
        </ButtonLink>
      </AppelFinal>
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Sommaire de la page                                                        */
/* -------------------------------------------------------------------------- */

function Sommaire() {
  const { tarifs, site } = content;
  const liens = [
    { ancre: tarifs.abonnements.ancre, libelle: tarifs.abonnements.surtitre },
    { ancre: tarifs.cartes.ancre, libelle: tarifs.cartes.surtitre },
    { ancre: tarifs.soins.ancre, libelle: tarifs.soins.surtitre },
    { ancre: tarifs.cadeaux.ancre, libelle: tarifs.cadeaux.surtitre },
  ];

  return (
    <nav aria-label={site.dansCettePage} className="border-b border-ligne bg-blanc">
      <ul className="csc-container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {liens.map((lien) => (
          <li key={lien.ancre} className="shrink-0">
            <a
              href={`#${lien.ancre}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-ligne px-4 text-[0.96rem] font-medium whitespace-nowrap transition-colors hover:border-moka hover:bg-creme"
            >
              {lien.libelle}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* -------------------------------------------------------------------------- */
/* Abonnements                                                                */
/* -------------------------------------------------------------------------- */

function Abonnements() {
  const { abonnements } = content.tarifs;
  const { pressotherapie } = abonnements;

  return (
    <section id={abonnements.ancre} className="csc-section">
      <div className="csc-container">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <Reveal>
            <SectionHeading surtitre={abonnements.surtitre} titre={abonnements.titre} />
          </Reveal>
          <div>
            <p className="csc-eyebrow text-moka-soft">{abonnements.conditionsTitre}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {abonnements.conditions.map((condition) => (
                <li key={condition}>
                  <Pill className="px-4 py-1.5 text-[0.9rem]">{condition}</Pill>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {abonnements.liste.map((abonnement, index) => (
            <li key={abonnement.id}>
              <Reveal delay={index * 60} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col rounded-[1.6rem] border p-6",
                    abonnement.misEnAvant ? "csc-dark border-moka" : "border-ligne bg-card",
                  )}
                >
                  <h3 className="font-sans text-[1.05rem] font-semibold tracking-[0.08em]">
                    {abonnement.nom}
                  </h3>
                  <p
                    className={cn(
                      "mt-1 text-[0.95rem] xl:min-h-[3.1em]",
                      abonnement.misEnAvant ? "text-sable-clair" : "text-moka-soft",
                    )}
                  >
                    {abonnement.resume}
                  </p>
                  <p className="mt-5 flex items-baseline gap-2 whitespace-nowrap">
                    <span className="csc-serif text-[2.9rem] leading-none">{abonnement.prix}</span>
                    <span
                      className={cn(
                        "text-[0.92rem]",
                        abonnement.misEnAvant ? "text-sable-clair" : "text-moka-soft",
                      )}
                    >
                      {abonnements.parMois}
                    </span>
                  </p>
                  <ul
                    className={cn(
                      "mt-5 grid gap-2.5 border-t pt-5 text-[0.98rem]",
                      abonnement.misEnAvant ? "border-creme/20" : "border-ligne",
                    )}
                  >
                    {abonnement.inclus.map((ligne) => (
                      <li key={ligne} className="flex gap-2.5">
                        <Check
                          aria-hidden="true"
                          className={cn(
                            "mt-[0.2em] size-4 shrink-0",
                            abonnement.misEnAvant ? "text-sable-clair" : "text-moka",
                          )}
                          strokeWidth={1.8}
                        />
                        <span>{ligne}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <DeciplusButton
                      action="boutique"
                      size="sm"
                      tone={abonnement.misEnAvant ? "creme" : "outline"}
                      className="w-full"
                    >
                      {abonnements.bouton}
                      <span className="sr-only"> : {abonnement.nom}</span>
                    </DeciplusButton>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[1.6rem] border border-ligne bg-creme px-6 py-5">
          <div>
            <h3 className="font-sans text-[1.05rem] font-semibold tracking-[0.04em]">
              {pressotherapie.nom}
            </h3>
            <p className="mt-1 text-[0.98rem] text-moka-soft">{pressotherapie.texte}</p>
          </div>
          <p className="flex items-baseline gap-2 whitespace-nowrap">
            <span className="csc-serif text-[2.2rem] leading-none">{pressotherapie.prix}</span>
            <span className="text-[0.92rem] text-moka-soft">{pressotherapie.unite}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Séances et cartes                                                          */
/* -------------------------------------------------------------------------- */

function Cartes() {
  const { cartes } = content.tarifs;

  return (
    <section id={cartes.ancre} className="csc-section border-y border-ligne bg-creme">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={cartes.surtitre} titre={cartes.titre} texte={cartes.texte} />
        </Reveal>

        {/* Ordinateur et tablette : un vrai tableau. */}
        <Reveal className="mt-10 hidden overflow-hidden rounded-[1.6rem] border border-ligne bg-card md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{plainText(cartes.titre)}</caption>
            <thead>
              <tr className="border-b border-ligne">
                <th scope="col" className="csc-eyebrow px-6 py-4 text-moka-soft">
                  {cartes.colonneSeance}
                </th>
                {cartes.colonnes.map((colonne) => (
                  <th
                    key={colonne}
                    scope="col"
                    className="csc-eyebrow px-6 py-4 text-right text-moka-soft"
                  >
                    {colonne}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartes.lignes.map((ligne) => (
                <tr key={ligne.nom} className="border-b border-ligne last:border-b-0">
                  <th scope="row" className="px-6 py-4 text-[1.08rem] font-semibold">
                    {ligne.nom}
                  </th>
                  {ligne.prix.map((prix, index) => (
                    <td key={cartes.colonnes[index]} className="px-6 py-4 text-right">
                      <Prix valeur={prix} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Téléphone : une carte par type de séance. */}
        <ul className="mt-8 grid gap-4 md:hidden">
          {cartes.lignes.map((ligne) => (
            <li key={ligne.nom} className="rounded-[1.4rem] border border-ligne bg-card p-5">
              <h3 className="font-sans text-[1.08rem] font-semibold">{ligne.nom}</h3>
              <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                {ligne.prix.map((prix, index) => (
                  <div key={cartes.colonnes[index]} className="border-t border-ligne pt-2">
                    <dt className="text-[0.86rem] text-moka-soft">{cartes.colonnes[index]}</dt>
                    <dd className="mt-0.5">
                      <Prix valeur={prix} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[1rem]">
          <span className="font-semibold">{cartes.complement.nom}</span>
          <span className="csc-serif text-[1.5rem] leading-none whitespace-nowrap">
            {cartes.complement.prix}
          </span>
        </p>
      </div>
    </section>
  );
}

/** Un prix du tableau, ou un tiret quand la formule n'existe pas. */
function Prix({ valeur }: { valeur: string | null }) {
  if (valeur === null) {
    return (
      <span className="text-moka-soft">
        <span aria-hidden="true">—</span>
        <span className="sr-only">{content.tarifs.cartes.nonPropose}</span>
      </span>
    );
  }
  return <span className="csc-serif text-[1.5rem] leading-none whitespace-nowrap">{valeur}</span>;
}

/* -------------------------------------------------------------------------- */
/* Soins et spa                                                               */
/* -------------------------------------------------------------------------- */

function Soins() {
  const { soins } = content.tarifs;

  return (
    <section id={soins.ancre} className="csc-section">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={soins.surtitre} titre={soins.titre} />
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {soins.groupes.map((groupe, index) => (
            <li key={groupe.nom}>
              <Reveal
                delay={index * 60}
                className="h-full rounded-[1.6rem] border border-ligne bg-card p-6"
              >
                <h3 className="text-[1.45rem]">{groupe.nom}</h3>
                <dl className="mt-4 grid gap-2.5">
                  {groupe.lignes.map((ligne) => (
                    <div
                      key={ligne.libelle}
                      className="flex items-baseline justify-between gap-4 border-t border-ligne pt-2.5"
                    >
                      <dt className="text-[0.98rem] text-moka-soft">{ligne.libelle}</dt>
                      <dd className="csc-serif text-[1.45rem] leading-none whitespace-nowrap">
                        {ligne.prix}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cartes cadeaux                                                             */
/* -------------------------------------------------------------------------- */

function Cadeaux() {
  const { cadeaux, mention, mentionDetail } = content.tarifs;

  return (
    <section id={cadeaux.ancre} className="csc-section border-t border-ligne bg-creme">
      <div className="csc-container grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading surtitre={cadeaux.surtitre} titre={cadeaux.titre} texte={cadeaux.texte} />
          <div className="mt-8">
            <DeciplusButton action="offrir" size="lg">
              {content.boutique.cadeaux.bouton}
            </DeciplusButton>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <ul className="grid grid-cols-2 gap-4">
            {cadeaux.montants.map((montant) => (
              <li
                key={montant}
                className="flex aspect-[8/5] flex-col justify-between rounded-[1.3rem] border border-ligne bg-card p-4 sm:p-5"
              >
                <Logo variant="symbole" className="size-9" />
                <span className="csc-serif text-[2rem] leading-none whitespace-nowrap sm:text-[2.4rem]">
                  {montant}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <p className="csc-container mt-10 text-[0.92rem] text-moka-soft">
        {mention}. {mentionDetail}
      </p>
    </section>
  );
}
