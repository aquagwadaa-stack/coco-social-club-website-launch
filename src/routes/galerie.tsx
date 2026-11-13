import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: content.galerie.meta.titre },
      { name: "description", content: content.galerie.meta.description },
      { property: "og:title", content: content.galerie.meta.titre },
      { property: "og:description", content: content.galerie.meta.description },
    ],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  const { entete } = content.galerie;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
