import { createFileRoute } from "@tanstack/react-router";
import { content } from "@/content";
import { PageHeader, SiteLayout } from "@/components/site/layout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: content.contact.meta.titre },
      { name: "description", content: content.contact.meta.description },
      { property: "og:title", content: content.contact.meta.titre },
      { property: "og:description", content: content.contact.meta.description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { entete } = content.contact;

  return (
    <SiteLayout>
      <PageHeader surtitre={entete.surtitre} titre={entete.titre} texte={entete.texte} />
    </SiteLayout>
  );
}
