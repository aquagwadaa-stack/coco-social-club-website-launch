import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

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

function PlanningPage() {
  const { entete } = content.planning;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
