import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

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

function ActivitesPage() {
  const { entete } = content.activites;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
