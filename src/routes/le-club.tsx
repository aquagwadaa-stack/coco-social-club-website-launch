import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Building2, HeartHandshake, Users } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/layout";
import rooftop from "@/assets/rooftop-view.jpg";
import community from "@/assets/community.jpg";
import aerial from "@/assets/aerial-yoga.jpg";
import wellness from "@/assets/wellness-room.jpg";

export const Route = createFileRoute("/le-club")({
  head: () => ({
    meta: [
      { title: "Le Club — Coco Social Club, Le Moule" },
      {
        name: "description",
        content:
          "Un lieu où sport, bien-être et rencontres se rejoignent. Découvre l'univers Coco Social Club au Moule en Guadeloupe.",
      },
      { property: "og:title", content: "Le Club — Coco Social Club" },
      {
        property: "og:description",
        content: "Un espace chaleureux, un rooftop avec vue mer, une communauté motivante.",
      },
      { property: "og:url", content: "/le-club" },
    ],
    links: [{ rel: "canonical", href: "/le-club" }],
  }),
  component: LeClub,
});

function LeClub() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Le Club"
        title="Un lieu où le sport, le bien-être et les rencontres se rejoignent."
        subtitle="Au cœur du Moule, Coco Social Club est bien plus qu'une salle. C'est une adresse chaleureuse où l'on vient bouger, souffler et se retrouver."
      />

      <section className="container-editorial pb-24">
        <img
          src={rooftop}
          alt="Rooftop du club"
          className="rounded-[2rem] aspect-[21/9] w-full object-cover"
          loading="lazy"
        />
      </section>

      <section className="container-editorial pb-24 md:pb-32 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <p className="font-serif italic text-taupe text-lg">Notre philosophie</p>
          <h2 className="mt-4 font-serif text-5xl leading-[1.05]">
            Une approche simple, humaine <em className="italic">et accessible.</em>
          </h2>
        </div>
        <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground">
          <p>
            Chez Coco, on croit qu'on prend mieux soin de soi quand on se sent bien accueilli. Nos
            coachs prennent le temps de comprendre tes objectifs et adaptent chaque séance à ton
            rythme.
          </p>
          <p>
            Ici, pas de compétition ni d'ambiance intimidante. Juste un cadre chaleureux, une
            communauté motivante et des installations pensées pour ton confort.
          </p>
          <p>
            Que tu viennes pour te renforcer, te détendre, retrouver de l'énergie ou simplement
            passer un bon moment : tu es au bon endroit.
          </p>
        </div>
      </section>

      <section className="container-editorial pb-24 md:pb-32">
        <div className="rounded-[2rem] bg-[color:var(--brown-deep)] p-8 text-[color:var(--cream-warm)] md:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] opacity-65">Notre histoire</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                Un club pensé comme un <em className="italic">lieu de vie.</em>
              </h2>
            </div>
            <div className="space-y-5 text-base leading-7 opacity-85">
              <p>
                Coco Social Club est né d’une envie simple : réunir dans une même adresse le
                mouvement, le soin et le plaisir d’être ensemble.
              </p>
              <p>
                Chaque espace a été imaginé pour offrir un accompagnement attentif, des pratiques
                accessibles et une expérience qui donne envie de revenir — que l’on découvre le
                sport ou que l’on cherche à aller plus loin.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <HeartHandshake className="h-5 w-5" />,
                title: "Un accueil humain",
                copy: "Une équipe disponible, attentive et proche de chaque membre.",
              },
              {
                icon: <Users className="h-5 w-5" />,
                title: "Une communauté",
                copy: "Des cours, des rencontres et une énergie collective qui rassemble.",
              },
              {
                icon: <Building2 className="h-5 w-5" />,
                title: "Un lieu à partager",
                copy: "Le rooftop et certains espaces peuvent accueillir des événements privés.",
              },
            ].map((value) => (
              <article key={value.title} className="rounded-[1.5rem] border border-white/15 p-6">
                <div className="opacity-70">{value.icon}</div>
                <h3 className="mt-5 font-serif text-2xl">{value.title}</h3>
                <p className="mt-2 text-sm leading-6 opacity-70">{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial grid md:grid-cols-2 gap-4 md:gap-8">
          <Feature
            title="Un rooftop avec vue mer"
            copy="Cours collectifs au soleil couchant, dans un décor tropical."
            image={rooftop}
          />
          <Feature
            title="Un accompagnement personnalisé"
            copy="Des coachs à l'écoute qui suivent tes progrès séance après séance."
            image={community}
          />
          <Feature
            title="Une communauté chaleureuse"
            copy="Des rencontres, de l'énergie, et beaucoup de bonne humeur."
            image={aerial}
          />
          <Feature
            title="Des espaces dédiés aux soins"
            copy="Cabines cocon pour la cryolipolyse, la pressothérapie et les massages."
            image={wellness}
          />
        </div>
      </section>

      <section className="container-editorial py-24 md:py-32 text-center">
        <p className="font-serif italic text-2xl md:text-3xl max-w-3xl mx-auto leading-snug">
          « Un espace chaleureux, confortable et inspirant. Un endroit où l'on aime venir. »
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/reservation" className="btn-pill bg-primary text-primary-foreground">
            Réserver ma visite <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to="/galerie" className="btn-pill border border-border">
            Voir la galerie
          </Link>
          <Link to="/contact" className="btn-pill border border-border">
            Parler d’une privatisation
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Feature({ title, copy, image }: { title: string; copy: string; image: string }) {
  return (
    <div className="rounded-[2rem] overflow-hidden bg-background border border-border/50">
      <img src={image} alt="" className="aspect-[16/10] w-full object-cover" loading="lazy" />
      <div className="p-8">
        <h3 className="font-serif text-2xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{copy}</p>
      </div>
    </div>
  );
}
