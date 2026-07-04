import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/layout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Coco Social Club" },
      { name: "description", content: "Politique de confidentialité et de gestion des données de Coco Social Club." },
      { property: "og:url", content: "/confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Informations" title="Politique de confidentialité." />
      <section className="container-editorial pb-24 max-w-2xl space-y-6 text-muted-foreground">
        <p>Coco Social Club respecte ta vie privée. Les données que tu partages via nos formulaires (contact, réservation) sont utilisées uniquement pour te répondre et gérer ta séance.</p>
        <p>Elles ne sont ni vendues, ni cédées à des tiers. Tu peux à tout moment demander leur modification ou leur suppression en nous contactant à l'adresse du club.</p>
        <p>Le site utilise des cookies techniques nécessaires à son bon fonctionnement ainsi que, le cas échéant, des cookies de mesure d'audience anonymisée.</p>
      </section>
    </SiteLayout>
  ),
});