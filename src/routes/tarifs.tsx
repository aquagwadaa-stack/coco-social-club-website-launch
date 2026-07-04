import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/layout";

type Offer = {
  title: string;
  price?: string;
  copy: string;
  cta: { label: string; to: string };
  featured?: boolean;
};

const OFFERS: Offer[] = [
  {
    title: "Séance découverte EMS",
    price: "Gratuite",
    copy: "Un premier essai de 20 minutes avec un coach dédié. Sans engagement.",
    cta: { label: "Réserver", to: "/seance-decouverte-ems" },
    featured: true,
  },
  {
    title: "Cours collectif découverte",
    price: "10 €",
    copy: "Un cours au choix parmi le planning. Pour tester l'ambiance rooftop.",
    cta: { label: "Voir le planning", to: "/planning" },
  },
  {
    title: "Cryolipolyse · 3 zones",
    price: "295 €",
    copy: "Jusqu'à 3 zones traitées + pressothérapie en illimité pendant la séance.",
    cta: { label: "Réserver", to: "/reservation" },
  },
  {
    title: "Coaching personnalisé",
    copy: "Un programme sur-mesure, un coach dédié, un suivi continu.",
    cta: { label: "Découvrir les formules", to: "/contact" },
  },
  {
    title: "Packs EMS",
    copy: "Des formules régulières pour ancrer la méthode dans ton quotidien.",
    cta: { label: "Découvrir les formules", to: "/contact" },
  },
  {
    title: "Cours collectifs",
    copy: "Formules à la carte ou abonnements pour venir aussi souvent que tu veux.",
    cta: { label: "Découvrir les formules", to: "/contact" },
  },
  {
    title: "Soins bien-être",
    copy: "Pressothérapie, tan bronzage, massages : offerts à l'unité ou en cure.",
    cta: { label: "Nous contacter", to: "/contact" },
  },
];

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs — Coco Social Club, Le Moule" },
      { name: "description", content: "Séance découverte EMS gratuite, cours à 10 €, cryolipolyse 295 €. Toutes nos formules sport et bien-être au Moule." },
      { property: "og:title", content: "Tarifs — Coco Social Club" },
      { property: "og:url", content: "/tarifs" },
    ],
    links: [{ rel: "canonical", href: "/tarifs" }],
  }),
  component: Tarifs,
});

function Tarifs() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Tarifs"
        title="Des formules simples pour chaque envie."
        subtitle="Que tu viennes tester, prendre soin de toi ponctuellement ou t'installer dans une routine, il y a une formule pour toi."
      />

      <section className="container-editorial pb-24 md:pb-32 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {OFFERS.map((o) => (
          <article
            key={o.title}
            className={
              "rounded-[1.5rem] p-8 flex flex-col border " +
              (o.featured ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border/60")
            }
          >
            <h3 className="font-serif text-2xl">{o.title}</h3>
            {o.price && <p className="mt-4 font-serif text-5xl">{o.price}</p>}
            <p className={"mt-4 text-sm flex-1 " + (o.featured ? "opacity-90" : "text-muted-foreground")}>{o.copy}</p>
            <Link
              to={o.cta.to}
              className={
                "btn-pill mt-6 self-start " +
                (o.featured
                  ? "bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]"
                  : "border border-border text-foreground hover:bg-cream")
              }
            >
              {o.cta.label} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}