import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

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
  const { entete } = content.boutique;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
