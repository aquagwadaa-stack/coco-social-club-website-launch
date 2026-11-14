import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import { content, nomCategorieActu, type CategorieActu } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { Pill } from "@/components/site/section";
import { Visual } from "@/components/site/visual";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/actualites/")({
  head: () => ({
    meta: [
      { title: content.actualites.meta.titre },
      { name: "description", content: content.actualites.meta.description },
      { property: "og:title", content: content.actualites.meta.titre },
      { property: "og:description", content: content.actualites.meta.description },
    ],
  }),
  component: ActualitesPage,
});

type Filtre = CategorieActu | "toutes";

function ActualitesPage() {
  const { actualites } = content;
  const [filtre, setFiltre] = useState<Filtre>("toutes");

  const articles =
    filtre === "toutes"
      ? actualites.articles
      : actualites.articles.filter((article) => article.categorie === filtre);

  const filtres: { id: Filtre; nom: string }[] = [
    { id: "toutes", nom: actualites.toutes },
    ...actualites.categories.map((categorie) => ({
      id: categorie.id as Filtre,
      nom: categorie.nom,
    })),
  ];

  return (
    <SiteLayout>
      <PageHeader
        surtitre={actualites.entete.surtitre}
        titre={actualites.entete.titre}
        texte={actualites.entete.texte}
      />

      <section className="csc-section">
        <div className="csc-container">
          {/* Les articles sont des exemples : la page le dit avant de les montrer. */}
          <p className="flex max-w-3xl flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-moka/30 bg-creme p-4 text-[1rem]">
            <Pill tone="moka">{actualites.badgeExemple}</Pill>
            <span className="flex min-w-0 flex-1 basis-64 gap-2">
              <Info
                aria-hidden="true"
                className="mt-[0.2em] size-5 shrink-0 text-moka"
                strokeWidth={1.5}
              />
              <span>{actualites.note}</span>
            </span>
          </p>

          <div
            role="group"
            aria-label={actualites.filtrer}
            className="-mx-5 mt-7 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filtres.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filtre === item.id}
                onClick={() => setFiltre(item.id)}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 cursor-pointer items-center rounded-full border px-4 text-[0.96rem] font-medium whitespace-nowrap transition-colors",
                  filtre === item.id
                    ? "border-moka bg-moka text-blanc"
                    : "border-ligne bg-card hover:border-moka hover:bg-creme",
                )}
              >
                {item.nom}
              </button>
            ))}
          </div>

          <p role="status" aria-live="polite" className="mt-4 text-[0.92rem] text-moka-soft">
            {articles.length} {actualites.resultat}
          </p>

          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {articles.map((article, index) => (
              <li key={article.slug}>
                <Reveal delay={(index % 2) * 80} className="h-full">
                  <Link
                    to="/actualites/$slug"
                    params={{ slug: article.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-ligne bg-card transition-shadow duration-300 hover:shadow-[0_18px_40px_-24px_rgba(46,34,28,0.5)]"
                  >
                    <div className="overflow-hidden">
                      <Visual
                        photo={article.photo}
                        className="aspect-[16/8] w-full transition-transform duration-700 group-hover:scale-[1.03]"
                        variant={(index % 4) as 0 | 1 | 2 | 3}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <span className="csc-eyebrow text-moka-soft">
                          {nomCategorieActu(article.categorie)}
                        </span>
                        <Pill tone="outline">{actualites.badgeExemple}</Pill>
                      </p>
                      <h2 className="mt-3 text-[1.7rem]">{article.titre}</h2>
                      <p className="mt-2 text-[1rem] text-moka-soft">{article.resume}</p>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 font-semibold">
                        {actualites.lire}
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

      <AppelFinal />
    </SiteLayout>
  );
}
