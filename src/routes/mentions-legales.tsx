import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/layout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Coco Social Club" },
      { name: "description", content: "Mentions légales de Coco Social Club, Le Moule, Guadeloupe." },
      { property: "og:url", content: "/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "/mentions-legales" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Informations" title="Mentions légales." />
      <section className="container-editorial pb-24 max-w-2xl space-y-6 text-muted-foreground">
        <p><strong className="text-foreground">Éditeur du site :</strong> Coco Social Club, 6 rue de Portland, 97160 Le Moule, Guadeloupe.</p>
        <p><strong className="text-foreground">Contact :</strong> +590 690 97 95 45 — Instagram @coco_socialclub.</p>
        <p><strong className="text-foreground">Hébergement :</strong> Lovable Cloud.</p>
        <p><strong className="text-foreground">Crédits :</strong> Photographies éditoriales, direction artistique originale.</p>
        <p>Les informations médicales et bien-être présentes sur ce site sont données à titre indicatif. Un bilan préalable permet de valider l'adéquation des soins avec ta situation personnelle.</p>
      </section>
    </SiteLayout>
  ),
});