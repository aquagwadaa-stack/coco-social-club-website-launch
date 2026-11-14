import { createFileRoute } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { content } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { ArrowLink, ButtonLink, DeciplusButton } from "@/components/site/cta";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Logo } from "@/components/site/logo";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section";
import { Visual } from "@/components/site/visual";

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: content.boutique.meta.titre },
      { name: "description", content: content.boutique.meta.description },
      { property: "og:title", content: content.boutique.meta.titre },
      { property: "og:description", content: content.boutique.meta.description },
    ],
  }),
  component: BoutiquePage,
});

function BoutiquePage() {
  const { boutique, actions } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={boutique.entete.surtitre}
        titre={boutique.entete.titre}
        texte={boutique.entete.texte}
      >
        <DeciplusButton action="offrir">{boutique.cadeaux.bouton}</DeciplusButton>
        <ArrowLink to="/tarifs">{actions.voirTarifs}</ArrowLink>
      </PageHeader>

      <Produits />
      <CartesCadeaux />
      <EnLigne />
      <AppelFinal />
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Produits en vente au club : une vitrine, sans prix ni panier               */
/* -------------------------------------------------------------------------- */

function Produits() {
  const { produits } = content.boutique;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <Reveal>
          <SectionHeading surtitre={produits.surtitre} titre={produits.titre} />
        </Reveal>

        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {produits.liste.map((produit, index) => (
            <li key={produit.id}>
              <Reveal
                delay={index * 80}
                className="h-full overflow-hidden rounded-[1.6rem] border border-ligne bg-card"
              >
                <Visual
                  photo={produit.photo}
                  className="aspect-[16/10] w-full sm:aspect-[4/3] md:aspect-[16/10]"
                  variant={(index === 0 ? 0 : 3) as 0 | 3}
                  iconSize="lg"
                />
                <div className="p-6 sm:p-7">
                  <p className="csc-eyebrow text-moka-soft">{produit.categorie}</p>
                  <h3 className="mt-3 text-[1.8rem]">{produit.nom}</h3>
                  <p className="mt-2 text-[1.05rem] text-moka-soft">{produit.texte}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 rounded-[1.6rem] border border-ligne bg-creme px-6 py-5 sm:px-7">
          <p className="flex max-w-2xl gap-3 text-[1rem]">
            <Info
              aria-hidden="true"
              className="mt-[0.2em] size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <span>{produits.note}</span>
          </p>
          <ButtonLink to="/contact" tone="outline">
            {produits.question}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Cartes cadeaux : l'achat se fait sur la boutique Deciplus du club          */
/* -------------------------------------------------------------------------- */

function CartesCadeaux() {
  const { cadeaux } = content.boutique;
  const { mention } = content.tarifs;

  return (
    <section className="csc-dark relative isolate overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-40 -bottom-44 -z-10 size-[38rem] text-creme/10"
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
      <div className="csc-container csc-section grid items-center gap-x-16 gap-y-10 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <SectionHeading
            light
            surtitre={cadeaux.surtitre}
            titre={cadeaux.titre}
            texte={cadeaux.texte}
          />
          <div className="mt-8">
            <DeciplusButton action="offrir" tone="creme" size="lg">
              {cadeaux.bouton}
            </DeciplusButton>
          </div>
          <p className="mt-5 max-w-xl text-[0.94rem] text-sable-clair">
            {cadeaux.precision} {mention}.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <ul className="grid grid-cols-2 gap-4">
            {cadeaux.montants.map((montant) => (
              <li
                key={montant}
                className="flex aspect-[8/5] flex-col justify-between rounded-[1.3rem] border border-creme/25 bg-creme p-4 text-espresso sm:p-5"
              >
                <span className="flex items-center justify-between gap-3">
                  <Logo variant="symbole" className="size-9" />
                  <span className="csc-eyebrow text-moka-soft max-[359px]:hidden">
                    {cadeaux.surtitre}
                  </span>
                </span>
                <span className="csc-serif text-[2rem] leading-none whitespace-nowrap sm:text-[2.6rem]">
                  {montant}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Boutique en ligne                                                          */
/* -------------------------------------------------------------------------- */

function EnLigne() {
  const { enLigne } = content.boutique;
  const { actions } = content;

  return (
    <section className="csc-section">
      <div className="csc-container">
        <Reveal className="grid items-center gap-x-12 gap-y-8 rounded-[1.8rem] border border-ligne bg-creme p-7 sm:p-10 lg:grid-cols-[1fr_auto]">
          <SectionHeading surtitre={enLigne.surtitre} titre={enLigne.titre} texte={enLigne.texte} />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <DeciplusButton action="boutique" size="lg" />
            <ArrowLink to="/tarifs">{actions.voirTarifs}</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
