import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: content.tarifs.meta.titre },
      { name: "description", content: content.tarifs.meta.description },
      { property: "og:title", content: content.tarifs.meta.titre },
      { property: "og:description", content: content.tarifs.meta.description },
    ],
  }),
  component: TarifsPage,
});

function TarifsPage() {
  const { entete } = content.tarifs;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
