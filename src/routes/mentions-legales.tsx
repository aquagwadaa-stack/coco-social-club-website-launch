import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: content.mentionsLegales.meta.titre },
      { name: "description", content: content.mentionsLegales.meta.description },
      { property: "og:title", content: content.mentionsLegales.meta.titre },
      { property: "og:description", content: content.mentionsLegales.meta.description },
    ],
  }),
  component: MentionsLegalesPage,
});

function MentionsLegalesPage() {
  const { entete } = content.mentionsLegales;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
