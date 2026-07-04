import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles, Waves, Flame, Snowflake } from "lucide-react";
import { SiteLayout } from "@/components/site/layout";
import heroImg from "@/assets/hero-rooftop.jpg";
import emsImg from "@/assets/ems-training.jpg";
import wellnessImg from "@/assets/wellness-room.jpg";
import aerialImg from "@/assets/aerial-yoga.jpg";
import rooftopImg from "@/assets/rooftop-view.jpg";
import communityImg from "@/assets/community.jpg";
import tanImg from "@/assets/tan.jpg";
import massageImg from "@/assets/massage.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout transparentNav>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Rooftop de Coco Social Club au Moule avec vue mer"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--brown-deep)]/30 via-transparent to-[color:var(--brown-deep)]/70" />
        <div className="relative container-editorial pb-20 pt-32 md:pb-28 text-[color:var(--cream-warm)]">
          <p className="text-xs uppercase tracking-[0.4em] opacity-90 fade-up">Le Moule — Guadeloupe</p>
          <h1 className="mt-6 font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.95] fade-up">
            Coco<br />
            <span className="italic opacity-90">Social Club</span>
          </h1>
          <p className="mt-8 font-serif italic text-2xl md:text-3xl max-w-2xl fade-up">
            Là où le sport rencontre le bien-être.
          </p>
          <p className="mt-4 max-w-xl text-base md:text-lg opacity-90 fade-up">
            Un lieu unique au Moule pour bouger, se renforcer, se détendre et prendre soin de soi dans une ambiance chaleureuse.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 fade-up">
            <Link to="/reservation" className="btn-pill bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)] hover:scale-[1.02]">
              Réserver une séance <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link to="/le-club" className="btn-pill border border-[color:var(--cream-warm)]/60 text-[color:var(--cream-warm)] hover:bg-[color:var(--cream-warm)]/10">
              Découvrir le Club
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="border-y border-border bg-cream overflow-hidden py-5">
        <div className="flex whitespace-nowrap marquee gap-14 font-serif italic text-2xl text-foreground/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-14 shrink-0">
              <span>Bouger</span><span>·</span>
              <span>Respirer</span><span>·</span>
              <span>Partager</span><span>·</span>
              <span>Se renforcer</span><span>·</span>
              <span>Se détendre</span><span>·</span>
              <span>Prendre soin de soi</span><span>·</span>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="container-editorial py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">01 — L'expérience Coco</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.02]">
              Ici, nous avons imaginé <em className="italic text-taupe">une aventure.</em>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Un lieu pour celles et ceux qui veulent se sentir bien. Un espace chaleureux,
              confortable et inspirant. Un endroit où l'on aime venir.
            </p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            <img src={rooftopImg} alt="Rooftop tropical" className="rounded-[2rem] aspect-[4/5] object-cover w-full mt-10" loading="lazy" />
            <img src={communityImg} alt="Communauté" className="rounded-[2rem] aspect-[4/5] object-cover w-full" loading="lazy" />
            <img src={aerialImg} alt="Yoga aérien" className="rounded-[2rem] aspect-[4/5] object-cover w-full col-span-2" loading="lazy" />
          </div>
        </div>
      </section>

      {/* TWO UNIVERSES */}
      <section className="container-editorial pb-24 md:pb-32">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">02 — Deux univers complémentaires</p>
        <div className="grid md:grid-cols-2 gap-6">
          <UniverseCard
            to="/sport"
            image={emsImg}
            eyebrow="Sport"
            title="Bouger, se renforcer."
            copy="Électrostimulation, coaching personnalisé et cours collectifs sur le rooftop."
          />
          <UniverseCard
            to="/bien-etre"
            image={wellnessImg}
            eyebrow="Bien-être"
            title="Respirer, se détendre."
            copy="Cryolipolyse, pressothérapie, tan bronzage et massages."
          />
        </div>
      </section>

      {/* EMS FEATURED */}
      <section className="bg-[color:var(--brown-deep)] text-[color:var(--cream-warm)] py-24 md:py-32">
        <div className="container-editorial grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <img src={emsImg} alt="Séance EMS coachée" className="rounded-[2rem] object-cover w-full aspect-[4/5]" loading="lazy" />
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.28em] opacity-70 mb-6">Électrostimulation EMS</p>
            <h2 className="font-serif text-5xl md:text-6xl leading-[1.02]">
              20 minutes pour des <em className="italic">résultats visibles.</em>
            </h2>
            <ul className="mt-8 space-y-4 text-base opacity-90">
              {[
                "Séance rapide de 20 minutes",
                "Renforcement musculaire ciblé",
                "Accompagnement par un coach dédié",
                "Séance personnalisée selon tes objectifs",
                "Méthode adaptée aux emplois du temps chargés",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-6 bg-[color:var(--beige)]" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-[1.5rem] border border-[color:var(--cream-warm)]/20 p-6 bg-[color:var(--cream-warm)]/5">
              <p className="font-serif italic text-2xl">
                « 20 minutes = jusqu'à 4 heures de sport traditionnel. »
              </p>
            </div>
            <Link to="/seance-decouverte-ems" className="btn-pill mt-8 bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]">
              Réserver ma séance découverte gratuite <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ROOFTOP CLASSES */}
      <section className="container-editorial py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">Cours collectifs · Rooftop</p>
          <h2 className="font-serif text-5xl md:text-6xl leading-[1.02]">
            Bouger, respirer, <em className="italic">partager.</em>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Une expérience sportive conviviale sur un rooftop avec vue mer. Retrouve la communauté
            Coco autour de cours accessibles à tous les niveaux.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            "Renfo Full Body",
            "Yoga",
            "Yoga aérien",
            "Pilates",
            "Fatburner",
            "Abdos Choco Fessiers Coco",
            "Pole Dance",
          ].map((c) => (
            <div key={c} className="rounded-full border border-border bg-cream px-5 py-4 text-center text-sm">
              {c}
            </div>
          ))}
        </div>
        <Link to="/planning" className="btn-pill mt-10 bg-primary text-primary-foreground">
          Voir le planning <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      {/* WELLNESS CARDS */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-6">Soins bien-être</p>
              <h2 className="font-serif text-5xl md:text-6xl leading-[1.02]">
                Prendre soin de soi <em className="italic">peut être simple.</em>
              </h2>
            </div>
            <Link to="/bien-etre" className="btn-pill border border-border text-foreground hover:bg-background">
              Voir tous les soins <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            <WellnessCard image={tanImg} icon={<Sparkles className="h-4 w-4" />} title="Tan Bronzage" copy="Un bronzage uniforme, naturel et sans UV." />
            <WellnessCard image={wellnessImg} icon={<Snowflake className="h-4 w-4" />} title="Cryolipolyse" copy="Une technologie non invasive qui cible les zones localisées par le froid." />
            <WellnessCard image={rooftopImg} icon={<Waves className="h-4 w-4" />} title="Pressothérapie" copy="Une méthode favorisant le drainage et la sensation de jambes légères." />
            <WellnessCard image={massageImg} icon={<Flame className="h-4 w-4" />} title="Massages & Soins" copy="Détente, récupération et lâcher-prise dans un cocon chaleureux." />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-editorial py-24 md:py-36 text-center">
        <p className="font-serif italic text-taupe text-lg">Vivez l'expérience Coco Social Club.</p>
        <h2 className="mt-4 font-serif text-5xl md:text-7xl leading-[1.02] max-w-4xl mx-auto">
          Prendre soin de soi <em className="italic">peut être simple.</em>
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-lg text-muted-foreground">
          Choisis ton expérience, réserve ton créneau et rejoins la communauté Coco Social Club.
        </p>
        <Link to="/reservation" className="btn-pill mt-10 bg-primary text-primary-foreground text-base px-8 py-4">
          Je réserve ma séance <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}

function UniverseCard({
  to,
  image,
  eyebrow,
  title,
  copy,
}: {
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <Link to={to} className="group relative block overflow-hidden rounded-[2rem] aspect-[4/5]">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="relative h-full flex flex-col justify-end p-8 text-[color:var(--cream-warm)]">
        <p className="text-xs uppercase tracking-[0.3em] opacity-90">{eyebrow}</p>
        <h3 className="mt-3 font-serif text-4xl md:text-5xl leading-tight">{title}</h3>
        <p className="mt-3 opacity-90 max-w-sm">{copy}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm">
          Explorer <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 transition" />
        </span>
      </div>
    </Link>
  );
}

function WellnessCard({ image, icon, title, copy }: { image: string; icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="bg-background rounded-[1.5rem] overflow-hidden border border-border/60">
      <img src={image} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      <div className="p-6">
        <div className="flex items-center gap-2 text-muted-foreground">
          {icon}
          <span className="text-xs uppercase tracking-[0.24em]">Soin</span>
        </div>
        <h3 className="mt-3 font-serif text-2xl">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
      </div>
    </article>
  );
}
