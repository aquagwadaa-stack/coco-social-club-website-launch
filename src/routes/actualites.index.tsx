import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

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

function ActualitesPage() {
  const { entete } = content.actualites;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
