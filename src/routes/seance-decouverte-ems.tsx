import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ArrowRight, Star, Clock, Target, Users } from "lucide-react";
import { z } from "zod";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import ems from "@/assets/ems-training.jpg";

const schema = z.object({
  prenom: z.string().trim().min(2).max(60),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255),
});

export const Route = createFileRoute("/seance-decouverte-ems")({
  head: () => ({
    meta: [
      { title: "Séance EMS découverte gratuite — Coco Social Club Le Moule" },
      { name: "description", content: "Découvre l'électrostimulation au Coco Social Club au Moule. 20 minutes coachées, gratuit. Réservation en 1 minute." },
      { property: "og:title", content: "Séance EMS gratuite — Coco Social Club" },
      { property: "og:description", content: "20 minutes avec un coach dédié. Séance découverte offerte." },
      { property: "og:url", content: "/seance-decouverte-ems" },
    ],
    links: [{ rel: "canonical", href: "/seance-decouverte-ems" }],
  }),
  component: Landing,
});

function Landing() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const i of r.error.issues) errs[i.path[0] as string] = "Champ requis";
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 700);
  }

  return (
    <div className="bg-background min-h-screen">
      <SiteNav />
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container-editorial grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">EMS · Le Moule, Guadeloupe</p>
            <h1 className="mt-5 font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.98]">
              Découvre <em className="italic">l'électrostimulation</em> au Coco Social Club.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Une séance personnalisée de 20 minutes avec un coach dédié. <strong className="text-foreground">Offerte.</strong>
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {[
                { icon: <Star className="h-4 w-4" />, t: "Séance découverte gratuite" },
                { icon: <Clock className="h-4 w-4" />, t: "Format court, 20 minutes" },
                { icon: <Target className="h-4 w-4" />, t: "Renforcement musculaire ciblé" },
                { icon: <Users className="h-4 w-4" />, t: "Accompagnement personnalisé" },
              ].map((b) => (
                <li key={b.t} className="flex items-center gap-2 text-sm rounded-full bg-cream border border-border/60 px-4 py-2">
                  <span className="text-taupe">{b.icon}</span>{b.t}
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden lg:block">
              <a href="#form" className="btn-pill bg-primary text-primary-foreground text-base py-4 px-6">
                Réserver ma séance gratuite <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="relative">
            <img src={ems} alt="Séance d'EMS coachée" className="rounded-[2rem] w-full aspect-[4/5] object-cover" />
            <div className="absolute -bottom-6 -left-6 rounded-[1.5rem] bg-primary text-primary-foreground p-5 shadow-xl max-w-xs hidden md:block">
              <p className="font-serif text-3xl leading-tight">20 min = 4 h de sport traditionnel.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="bg-cream py-20">
        <div className="container-editorial grid md:grid-cols-2 gap-10 items-center max-w-4xl">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">Réserve en 1 minute.</h2>
            <p className="mt-4 text-muted-foreground">Un coach te rappelle pour fixer le créneau qui te convient.</p>
          </div>
          <div>
            {sent ? (
              <div className="rounded-[1.5rem] border border-border bg-background p-8 text-center fade-up">
                <CheckCircle2 className="h-8 w-8 mx-auto text-taupe" />
                <h3 className="mt-4 font-serif text-2xl">Merci !</h3>
                <p className="mt-2 text-muted-foreground text-sm">On te rappelle très vite pour confirmer ton créneau.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-[1.5rem] border border-border bg-background p-6 grid gap-3">
                <F name="prenom" label="Prénom" error={errors.prenom} />
                <F name="phone" type="tel" label="Téléphone" error={errors.phone} />
                <F name="email" type="email" label="Email" error={errors.email} />
                <button disabled={loading} className="btn-pill bg-primary text-primary-foreground mt-2 disabled:opacity-60">
                  {loading ? "Envoi…" : "Réserver ma séance gratuite"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="container-editorial py-20 text-center">
        <p className="font-serif italic text-2xl max-w-xl mx-auto">« Testez. Approuvez. Adoptez. »</p>
        <Link to="/reservation" className="btn-pill mt-8 border border-border">Voir toutes les prestations</Link>
      </section>
      <SiteFooter />
    </div>
  );
}

function F({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs uppercase tracking-widest text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} className="mt-1 w-full rounded-full border border-border bg-cream/40 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}