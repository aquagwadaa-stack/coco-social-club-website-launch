import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Snowflake, Waves, Sparkles, Flame } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/site/layout";
import wellness from "@/assets/wellness-room.jpg";
import tan from "@/assets/tan.jpg";
import massage from "@/assets/massage.jpg";
import rooftop from "@/assets/rooftop-view.jpg";

export const Route = createFileRoute("/bien-etre")({
  head: () => ({
    meta: [
      { title: "Bien-être — Cryolipolyse, pressothérapie, massages · Coco Social Club" },
      { name: "description", content: "Cryolipolyse, pressothérapie, tan bronzage sans UV et massages au Moule en Guadeloupe. Prends soin de toi dans un cocon chaleureux." },
      { property: "og:title", content: "Bien-être — Coco Social Club" },
      { property: "og:description", content: "Cryolipolyse, pressothérapie, tan bronzage, massages." },
      { property: "og:url", content: "/bien-etre" },
    ],
    links: [{ rel: "canonical", href: "/bien-etre" }],
  }),
  component: BienEtre,
});

function BienEtre() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Bien-être"
        title="Prendre soin de soi peut être simple."
        subtitle="Des soins ciblés, non invasifs, dans un cadre pensé pour le confort et le lâcher-prise."
      />

      {/* CRYO */}
      <section id="cryolipolyse" className="container-editorial pb-24 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <img src={wellness} alt="Cabine cryolipolyse" className="rounded-[2rem] aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground flex items-center gap-2">
            <Snowflake className="h-4 w-4" /> Cryolipolyse
          </p>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-[1.05]">Le froid, une méthode ciblée <em className="italic">non invasive.</em></h2>
          <ul className="mt-6 space-y-2 text-muted-foreground">
            {[
              "Traitement par le froid ciblé",
              "Méthode non invasive, sans chirurgie, ni anesthésie, ni aiguilles",
              "Jusqu'à 3 zones en une séance",
              "Zones possibles : ventre, hanches, cuisses et autres zones localisées",
              "Séance destinée aux femmes comme aux hommes",
              "Reprise immédiate des activités",
              "Bilan personnalisé avant la séance",
            ].map((i) => (
              <li key={i} className="flex gap-3"><span className="mt-2.5 h-1 w-4 bg-taupe shrink-0" /> {i}</li>
            ))}
          </ul>
          <div className="mt-8 rounded-[1.5rem] p-6 border border-border/60 bg-cream">
            <p className="font-serif text-4xl">295 €</p>
            <p className="text-sm text-muted-foreground mt-1">Séance cryolipolyse — jusqu'à 3 zones + pressothérapie en illimité</p>
          </div>
          <p className="mt-4 text-xs text-muted-foreground italic">Les résultats peuvent varier selon les personnes. Un bilan préalable permet de vérifier l'adéquation du soin.</p>
          <div className="flex gap-3 mt-6">
            <Link to="/reservation" className="btn-pill bg-primary text-primary-foreground">Réserver <ArrowUpRight className="h-4 w-4" /></Link>
            <a href="tel:0690970646" className="btn-pill border border-border">06 90 970 646</a>
          </div>
        </div>
      </section>

      {/* PRESSO / TAN / MASSAGE */}
      <section className="bg-cream py-24">
        <div className="container-editorial grid md:grid-cols-3 gap-5">
          <SoinCard image={rooftop} icon={<Waves className="h-4 w-4" />} title="Pressothérapie" copy="Drainage, récupération et sensation de jambes légères. En complément d'une séance sport ou en soin autonome." />
          <SoinCard image={tan} icon={<Sparkles className="h-4 w-4" />} title="Tan Bronzage" copy="Un bronzage naturel, uniforme et sans exposition aux UV. Effet immédiat, teint solaire." />
          <SoinCard image={massage} icon={<Flame className="h-4 w-4" />} title="Massages & Soins" copy="Un moment de détente et de récupération, pour un vrai lâcher-prise." />
        </div>
      </section>

      <section className="container-editorial py-24 text-center">
        <h2 className="font-serif text-5xl md:text-6xl leading-[1.05]">Un cocon pour <em className="italic">souffler.</em></h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">Réserve ton créneau en ligne ou contacte-nous pour un bilan personnalisé.</p>
        <Link to="/reservation" className="btn-pill mt-8 bg-primary text-primary-foreground">Je réserve mon soin <ArrowUpRight className="h-4 w-4" /></Link>
      </section>
    </SiteLayout>
  );
}

function SoinCard({ image, icon, title, copy }: { image: string; icon: React.ReactNode; title: string; copy: string }) {
  return (
    <article className="rounded-[1.5rem] overflow-hidden bg-background border border-border/60">
      <img src={image} alt="" className="aspect-[4/5] w-full object-cover" loading="lazy" />
      <div className="p-7">
        <div className="flex items-center gap-2 text-muted-foreground">{icon}<span className="text-xs uppercase tracking-[0.24em]">Soin</span></div>
        <h3 className="mt-3 font-serif text-2xl">{title}</h3>
        <p className="mt-3 text-sm text-muted-foreground">{copy}</p>
        <Link to="/reservation" className="btn-pill mt-5 border border-border text-foreground text-sm">Réserver</Link>
      </div>
    </article>
  );
}