import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articleParSlug, content, nomCategorieActu } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { DeciplusButton } from "@/components/site/cta";
import { plainText } from "@/components/site/emphasis";
import { SiteLayout } from "@/components/site/layout";
import { Partage } from "@/components/site/partage";
import { Pill } from "@/components/site/section";
import { Visual } from "@/components/site/visual";

export const Route = createFileRoute("/actualites/$slug")({
  loader: ({ params }) => {
    const article = articleParSlug(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${plainText(loaderData.article.titre)} — ${content.site.nom}` },
          { name: "description", content: loaderData.article.resume },
          { property: "og:title", content: plainText(loaderData.article.titre) },
          { property: "og:description", content: loaderData.article.resume },
          { property: "og:type", content: "article" },
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const { actualites } = content;
  const autres = actualites.articles.filter((autre) => autre.slug !== article.slug);

  return (
    <SiteLayout>
      <article>
        <header className="border-b border-ligne bg-creme">
          <div className="csc-container py-10 md:py-14">
            <div className="csc-fade-up mx-auto max-w-[46rem]">
              <Link
                to="/actualites"
                className="inline-flex min-h-[44px] items-center gap-2 font-semibold underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                {actualites.retour}
              </Link>
              <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="csc-eyebrow text-moka-soft">
                  {nomCategorieActu(article.categorie)}
                </span>
                <Pill tone="moka">{actualites.badgeExemple}</Pill>
              </p>
              <h1 className="mt-4 text-[2.3rem] sm:text-[3rem] lg:text-[3.5rem]">
                {article.titre}
              </h1>
              <p className="mt-5 text-[1.16rem] leading-relaxed text-moka-soft">{article.resume}</p>
            </div>
          </div>
        </header>

        <div className="csc-container csc-section">
          <div className="mx-auto max-w-[46rem]">
            <Visual
              photo={article.photo}
              className="aspect-[16/9] w-full rounded-[1.6rem]"
              variant={1}
              iconSize="lg"
              priority
            />

            <div className="mt-9 grid gap-5 text-[1.12rem] leading-relaxed">
              {article.corps.map((paragraphe) => (
                <p key={paragraphe}>{paragraphe}</p>
              ))}
            </div>

            <div className="mt-9">
              <DeciplusButton action="reservation" />
            </div>

            <div className="mt-10 border-t border-ligne pt-7">
              <h2 className="sr-only">{actualites.partager}</h2>
              <Partage titre={plainText(article.titre)} />
            </div>
          </div>
        </div>
      </article>

      <section className="csc-section border-t border-ligne bg-creme">
        <div className="csc-container">
          <div className="mx-auto max-w-[46rem]">
            <h2 className="text-[2rem]">{actualites.autres}</h2>
            <ul className="mt-6 overflow-hidden rounded-[1.6rem] border border-ligne bg-card">
              {autres.map((autre) => (
                <li key={autre.slug} className="border-b border-ligne last:border-b-0">
                  <Link
                    to="/actualites/$slug"
                    params={{ slug: autre.slug }}
                    className="group flex min-h-[44px] items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-creme sm:px-6"
                  >
                    <span>
                      <span className="csc-eyebrow block text-moka-soft">
                        {nomCategorieActu(autre.categorie)}
                      </span>
                      <span className="mt-1 block text-[1.1rem] font-semibold">{autre.titre}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AppelFinal />
    </SiteLayout>
  );
}
