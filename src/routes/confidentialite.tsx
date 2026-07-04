import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/layout";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Coco Social Club" },
      {
        name: "description",
        content: "Politique de confidentialité et de gestion des données de Coco Social Club.",
      },
      { property: "og:url", content: "/confidentialite" },
    ],
    links: [{ rel: "canonical", href: "/confidentialite" }],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Informations" title="Politique de confidentialité." />
      <section className="container-editorial pb-24 max-w-2xl space-y-6 text-muted-foreground">
        <p>
          Coco Social Club respecte ta vie privée. Les informations saisies dans les parcours de
          contact et de réservation servent uniquement à préparer ta demande.
        </p>
        <p>
          Lorsque tu choisis de continuer, la demande est transmise via WhatsApp ou l'espace membre
          Deciplus. Ces services appliquent leurs propres politiques de confidentialité.
        </p>
        <p>
          Le site ne vend ni ne cède tes informations. Tu peux demander leur modification ou leur
          suppression en écrivant à cocosocialclub1@gmail.com.
        </p>
        <p>
          Un choix de confidentialité est conservé localement dans ton navigateur afin de ne pas
          afficher le bandeau à chaque visite. Les outils facultatifs de mesure d'audience ne
          doivent être activés qu'après ton accord.
        </p>
      </section>
    </SiteLayout>
  ),
});
