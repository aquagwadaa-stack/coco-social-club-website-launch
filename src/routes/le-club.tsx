import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/le-club")({
  head: () => ({
    meta: [
      { title: content.club.meta.titre },
      { name: "description", content: content.club.meta.description },
      { property: "og:title", content: content.club.meta.titre },
      { property: "og:description", content: content.club.meta.description },
    ],
  }),
  component: LeClubPage,
});

function LeClubPage() {
  const { entete } = content.club;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
