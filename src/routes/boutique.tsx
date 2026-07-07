import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Dumbbell, Leaf, ShoppingBag } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/layout";
import { XPLOR_SHOP_URL, XplorEmbed } from "@/components/site/xplor-embed";

const products = [
  {
    icon: <Leaf className="h-6 w-6" />,
    eyebrow: "Nutrition",
    title: "Sélection Nutripure",
    copy: "Une sélection de produits dédiés à l’énergie, à la récupération et à la routine sportive.",
    message:
      "Bonjour, je souhaite connaître les produits Nutripure disponibles au Coco Social Club.",
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    eyebrow: "Collection Coco",
    title: "Serviettes brodées",
    copy: "Les essentiels du club, brodés aux couleurs de Coco Social Club et disponibles sur place.",
    message: "Bonjour, je souhaite connaître les serviettes brodées Coco disponibles.",
  },
  {
    icon: <Dumbbell className="h-6 w-6" />,
    eyebrow: "Accessoires",
    title: "Essentiels d’entraînement",
    copy: "Une sélection pratique pour accompagner tes séances et prolonger l’expérience Coco.",
    message: "Bonjour, je souhaite connaître les accessoires disponibles à la boutique Coco.",
  },
];

export const Route = createFileRoute("/boutique")({
  head: () => ({
    meta: [
      { title: "Boutique — Coco Social Club, Le Moule" },
      {
        name: "description",
        content:
          "Découvre la sélection Nutripure, les serviettes brodées et les essentiels Coco Social Club au Moule.",
      },
      { property: "og:title", content: "La boutique Coco Social Club" },
      { property: "og:url", content: "/boutique" },
    ],
    links: [{ rel: "canonical", href: "/boutique" }],
  }),
  component: Boutique,
});

function Boutique() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="La boutique"
        title="Les essentiels qui prolongent l’expérience Coco."
        subtitle="Nutrition, accessoires et pièces brodées : retrouve notre sélection directement au club."
      />

      <section className="container-editorial pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.title}
              className={
                "flex min-h-[28rem] flex-col rounded-[2rem] border border-border p-7 md:p-9 " +
                (index === 1
                  ? "bg-[color:var(--brown-deep)] text-[color:var(--cream-warm)]"
                  : "bg-cream")
              }
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-current/20">
                {product.icon}
              </div>
              <p className="mt-10 text-xs uppercase tracking-[0.25em] opacity-65">
                {product.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-4xl leading-tight">{product.title}</h2>
              <p className="mt-4 text-sm leading-6 opacity-75">{product.copy}</p>
              <a
                href={`https://wa.me/590690979545?text=${encodeURIComponent(product.message)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-medium"
              >
                Demander la disponibilité <ArrowUpRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[118rem] px-4 pb-24 sm:px-6 lg:px-8">
        <XplorEmbed
          src={XPLOR_SHOP_URL}
          title="Boutique en ligne Coco"
          eyebrow="Offres officielles Xplor"
          description="Retrouve les abonnements, cartes prépayées, séances découverte, offres EMS, coaching, cours collectifs et soins configurés dans l’espace membre Coco Social Club."
          ctaLabel="Ouvrir la boutique"
        />
      </section>

      <section className="bg-cream py-20 text-center">
        <div className="container-editorial">
          <ShoppingBag className="mx-auto h-7 w-7 text-taupe" />
          <h2 className="mx-auto mt-5 max-w-3xl font-serif text-4xl md:text-6xl">
            Passe au club pour découvrir les disponibilités du moment.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Notre équipe te conseille selon tes objectifs et tes habitudes d’entraînement.
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
