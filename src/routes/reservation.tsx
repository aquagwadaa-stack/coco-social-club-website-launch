import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CalendarDays,
  CreditCard,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/layout";
import { XPLOR_RESERVATION_URL, XPLOR_SHOP_URL, XplorEmbed } from "@/components/site/xplor-embed";

const benefits = [
  {
    icon: <CalendarDays className="h-5 w-5" />,
    title: "Planning en temps réel",
    copy: "Les disponibilités, listes d’attente et créneaux affichés proviennent de l’espace membre Xplor.",
  },
  {
    icon: <SlidersHorizontal className="h-5 w-5" />,
    title: "Parcours par activité",
    copy: "Le client choisit son activité, consulte les créneaux, puis poursuit la réservation dans le même module.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Comptes adhérents conservés",
    copy: "Les adhérents continuent d’utiliser leur environnement habituel sans migration forcée.",
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Achat et abonnements",
    copy: "La boutique Xplor reste disponible pour les cartes, abonnements et offres configurées par Coco Social Club.",
  },
];

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réserver une séance — Coco Social Club" },
      {
        name: "description",
        content:
          "Réserve ta séance de sport, EMS ou bien-être au Coco Social Club via l’espace membre Xplor intégré au site.",
      },
      { property: "og:title", content: "Réserver — Coco Social Club" },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: Reservation,
});

function Reservation() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Réservation"
        title="Réserve ta séance directement dans l’espace membre Coco."
        subtitle="Choisis ton activité, consulte les disponibilités et poursuis ton parcours dans le module Xplor intégré au site."
      />

      <section className="container-editorial grid gap-4 pb-10 md:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item) => (
          <article key={item.title} className="rounded-[1.5rem] border border-border bg-cream p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-primary">
              {item.icon}
            </div>
            <h2 className="mt-5 font-serif text-2xl leading-tight">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.copy}</p>
          </article>
        ))}
      </section>

      <section className="container-editorial pb-24">
        <XplorEmbed
          src={XPLOR_RESERVATION_URL}
          title="Réservation en ligne"
          eyebrow="Module Xplor / Deciplus intégré"
          description="Sélectionne ton activité, puis accède au planning et aux créneaux disponibles directement depuis l’espace membre officiel Coco Social Club."
          ctaLabel="Ouvrir la réservation"
        />
      </section>

      <section className="bg-[color:var(--brown-deep)] py-20 text-[color:var(--cream-warm)]">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] opacity-65">Formules & abonnements</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
              Besoin d’acheter une carte, une offre ou un abonnement ?
            </h2>
            <p className="mt-5 max-w-2xl leading-7 opacity-75">
              La boutique Xplor regroupe les formules, cartes prépayées, offres découverte et
              abonnements configurés par Coco Social Club.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/boutique"
              className="btn-pill justify-center bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]"
            >
              Voir la boutique intégrée
            </Link>
            <a
              href={XPLOR_SHOP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-pill justify-center border border-current/25"
            >
              Ouvrir Xplor <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
