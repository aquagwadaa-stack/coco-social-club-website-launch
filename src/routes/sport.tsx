import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/layout";
import ems from "@/assets/ems-training.jpg";
import aerial from "@/assets/aerial-yoga.jpg";
import rooftop from "@/assets/rooftop-view.jpg";

const CLASSES = [
  { name: "Renfo Full Body", copy: "Un travail complet du corps pour tonifier et gainer en douceur." },
  { name: "Yoga", copy: "Postures, respiration et retour au calme. Pour toutes et tous." },
  { name: "Yoga aérien", copy: "Le yoga en apesanteur, dans un hamac de soie. Ludique et libérateur." },
  { name: "Pilates", copy: "Le contrôle, la posture, la ceinture abdominale profonde." },
  { name: "Fatburner", copy: "Un cardio brûle-graisses, sur un rythme entraînant." },
  { name: "Abdos Choco Fessiers Coco", copy: "Notre signature : abdos et fessiers en 45 minutes efficaces." },
  { name: "Pole Dance", copy: "Force, grâce et confiance. Sur réservation au 06 99 66 73 25." },
];

export const Route = createFileRoute("/sport")({
  head: () => ({
    meta: [
      { title: "Sport & EMS — Coco Social Club, Le Moule" },
      { name: "description", content: "Électrostimulation EMS, coaching personnalisé et cours collectifs sur rooftop au Moule, Guadeloupe." },
      { property: "og:title", content: "Sport & EMS — Coco Social Club" },
      { property: "og:description", content: "20 minutes pour des résultats visibles. Cours collectifs sur rooftop avec vue mer." },
      { property: "og:url", content: "/sport" },
    ],
    links: [{ rel: "canonical", href: "/sport" }],
  }),
  component: SportPage,
});

function SportPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Sport"
        title="La méthode EMS pour des résultats visibles rapidement, sans y passer des heures."
        subtitle="Une approche sportive personnalisée, encadrée par nos coachs. Adaptée aux débutants comme aux confirmés."
      />

      <section className="container-editorial pb-24 grid lg:grid-cols-2 gap-10 items-center">
        <img src={ems} alt="Séance EMS" className="rounded-[2rem] aspect-[4/5] object-cover w-full" loading="lazy" />
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-4">Électrostimulation EMS</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">
            20 minutes = jusqu'à <em className="italic">4 heures de sport traditionnel.</em>
          </h2>
          <ol className="mt-8 space-y-5">
            {[
              "Échange avec le coach et définition des objectifs.",
              "Installation de l'équipement EMS.",
              "Séance personnalisée de 20 minutes.",
              "Suivi des progrès et adaptation du programme.",
            ].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="font-serif text-3xl text-taupe shrink-0 w-10">0{i + 1}</span>
                <span className="pt-2">{s}</span>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-[1.5rem] bg-cream p-6 border border-border/60 flex items-start gap-4">
            <CheckCircle2 className="h-5 w-5 mt-1 text-taupe shrink-0" />
            <div>
              <p className="font-medium">Séance découverte gratuite</p>
              <p className="text-sm text-muted-foreground">Viens tester la méthode sans engagement.</p>
            </div>
          </div>
          <Link to="/seance-decouverte-ems" className="btn-pill mt-8 bg-primary text-primary-foreground">
            Réserver ma séance découverte <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground mb-4">Cours collectifs</p>
            <h2 className="font-serif text-5xl leading-[1.05]">Bouger, respirer, <em className="italic">partager.</em></h2>
            <p className="mt-6 text-muted-foreground text-lg">Sur le rooftop, dans une ambiance conviviale, retrouve nos cours collectifs animés par des coachs passionnés.</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLASSES.map((c, i) => (
              <article key={c.name} className="rounded-[1.5rem] bg-background p-7 border border-border/60 flex flex-col">
                <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Cours {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-3xl">{c.name}</h3>
                <p className="mt-3 text-muted-foreground flex-1">{c.copy}</p>
                <Link to="/reservation" className="btn-pill mt-6 border border-border text-foreground self-start hover:bg-cream">
                  Réserver
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        <img src={rooftop} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[color:var(--brown-deep)]/50" />
        <div className="relative container-editorial text-[color:var(--cream-warm)] text-center">
          <p className="font-serif italic text-2xl">Testez. Approuvez. Adoptez.</p>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl">Un cours découverte à 10 €.</h2>
          <Link to="/planning" className="btn-pill mt-8 bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]">
            Voir le planning <ArrowUpRight className="h-4 w-4" />
          </Link>
          <img src={aerial} alt="" className="hidden" />
        </div>
      </section>
    </SiteLayout>
  );
}