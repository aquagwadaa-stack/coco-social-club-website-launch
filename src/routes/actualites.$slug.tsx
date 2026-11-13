import { createFileRoute, notFound } from "@tanstack/react-router";
import { articleParSlug, content } from "@/content";
import { plainText } from "@/components/site/emphasis";
import { PageHeader, SiteLayout } from "@/components/site/layout";

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
        ]
      : [],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <SiteLayout>
      <PageHeader
        surtitre={content.actualites.entete.surtitre}
        titre={article.titre}
        texte={article.resume}
      />
    </SiteLayout>
  );
}
