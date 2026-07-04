import { createFileRoute, Link } from "@tanstack/react-router";
import { Phone } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/layout";

const SCHEDULE = [
  { day: "Lundi", classes: [{ t: "17h30", n: "Renfo Full Body" }, { t: "18h30", n: "Yoga" }] },
  { day: "Mardi", classes: [{ t: "18h00", n: "Yoga aérien" }] },
  { day: "Mercredi", classes: [{ t: "18h00", n: "Pilates" }] },
  { day: "Jeudi", classes: [{ t: "17h30", n: "Fatburner" }, { t: "18h30", n: "Pilates" }] },
  { day: "Vendredi", classes: [{ t: "18h30", n: "Abdos Choco Fessiers Coco" }] },
  { day: "Samedi", classes: [] },
  { day: "Dimanche", classes: [] },
] as const;

export const Route = createFileRoute("/planning")({
  head: () => ({
    meta: [
      { title: "Planning des cours — Coco Social Club, Le Moule" },
      { name: "description", content: "Découvre notre planning hebdomadaire de cours collectifs : yoga, pilates, renfo, fatburner, abdos-fessiers et pole dance." },
      { property: "og:title", content: "Planning — Coco Social Club" },
      { property: "og:url", content: "/planning" },
    ],
    links: [{ rel: "canonical", href: "/planning" }],
  }),
  component: Planning,
});

function Planning() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Planning"
        title="La semaine sur le rooftop."
        subtitle="Chaque cours est accessible à partir de 10 € en découverte. Réserve ta place en ligne."
      />

      <section className="container-editorial pb-12">
        <div className="rounded-[1.5rem] border border-border overflow-hidden bg-background">
          {SCHEDULE.map((d) => (
            <div key={d.day} className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[10rem_1fr] gap-4 items-center px-5 md:px-8 py-5 border-b border-border/60 last:border-none">
              <p className="font-serif text-2xl md:text-3xl">{d.day}</p>
              <div className="flex flex-col md:flex-row md:flex-wrap gap-2 md:gap-3 justify-end md:justify-start">
                {d.classes.length === 0 ? (
                  <span className="text-sm text-muted-foreground italic">Repos · sur rendez-vous</span>
                ) : (
                  d.classes.map((c) => (
                    <Link
                      key={c.t + c.n}
                      to="/reservation"
                      className="group inline-flex items-center gap-3 rounded-full border border-border bg-cream hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                    >
                      <span className="font-medium">{c.t}</span>
                      <span className="opacity-70 group-hover:opacity-100">{c.n}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-editorial grid md:grid-cols-2 gap-5 pb-24">
        <div className="rounded-[1.5rem] bg-cream p-8 border border-border/60">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Cours découverte</p>
          <p className="mt-3 font-serif text-4xl">10 €</p>
          <p className="mt-2 text-muted-foreground">Un premier cours pour tester l'ambiance et l'énergie du club.</p>
        </div>
        <div className="rounded-[1.5rem] bg-primary text-primary-foreground p-8">
          <p className="text-xs uppercase tracking-[0.24em] opacity-70">Pole Dance</p>
          <p className="mt-3 font-serif text-3xl">Sur réservation</p>
          <p className="mt-2 opacity-80">Créneaux flexibles, sur simple appel.</p>
          <a href="tel:0699667325" className="btn-pill mt-6 bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]">
            <Phone className="h-4 w-4" /> 06 99 66 73 25
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}