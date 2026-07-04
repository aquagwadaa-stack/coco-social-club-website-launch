import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { z } from "zod";
import { SiteLayout } from "@/components/site/layout";

type Univers = "sport" | "bien-etre";

const PRESTATIONS: Record<Univers, { id: string; name: string; duration: string; note?: string }[]> = {
  sport: [
    { id: "ems", name: "Séance EMS (20 min)", duration: "20 min", note: "1re séance découverte gratuite" },
    { id: "renfo", name: "Renfo Full Body", duration: "45 min" },
    { id: "yoga", name: "Yoga", duration: "60 min" },
    { id: "aerien", name: "Yoga aérien", duration: "60 min" },
    { id: "pilates", name: "Pilates", duration: "60 min" },
    { id: "fatburner", name: "Fatburner", duration: "45 min" },
    { id: "abdos", name: "Abdos Choco Fessiers Coco", duration: "45 min" },
    { id: "pole", name: "Pole Dance (sur RDV)", duration: "60 min" },
  ],
  "bien-etre": [
    { id: "cryo", name: "Cryolipolyse — jusqu'à 3 zones", duration: "60 min", note: "Bilan préalable inclus" },
    { id: "presso", name: "Pressothérapie", duration: "30 min" },
    { id: "tan", name: "Tan Bronzage sans UV", duration: "20 min" },
    { id: "massage", name: "Massage & soin détente", duration: "60 min" },
  ],
};

const SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:30", "18:30"];

const coordsSchema = z.object({
  prenom: z.string().trim().min(2, "Prénom requis").max(60),
  nom: z.string().trim().min(2, "Nom requis").max(60),
  phone: z.string().trim().min(6, "Téléphone requis").max(30),
  email: z.string().trim().email("Email invalide").max(255),
});

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réserver une séance — Coco Social Club" },
      { name: "description", content: "Réserve ta séance sport ou bien-être au Coco Social Club en quelques étapes." },
      { property: "og:title", content: "Réserver — Coco Social Club" },
      { property: "og:url", content: "/reservation" },
    ],
    links: [{ rel: "canonical", href: "/reservation" }],
  }),
  component: Reservation,
});

function Reservation() {
  const [step, setStep] = useState(1);
  const [univers, setUnivers] = useState<Univers | null>(null);
  const [prestation, setPrestation] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [coords, setCoords] = useState({ prenom: "", nom: "", phone: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState(false);

  const dates = useMemo(() => {
    const arr: string[] = [];
    const now = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      arr.push(d.toISOString().slice(0, 10));
    }
    return arr;
  }, []);

  const prestationName = univers && PRESTATIONS[univers].find((p) => p.id === prestation)?.name;

  function next() {
    setStep((s) => Math.min(6, s + 1));
  }
  function prev() {
    setStep((s) => Math.max(1, s - 1));
  }
  function submitCoords() {
    const parsed = coordsSchema.safeParse(coords);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const i of parsed.error.issues) errs[i.path[0] as string] = i.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    next();
  }

  if (confirmed) {
    return (
      <SiteLayout>
        <section className="container-editorial py-32 text-center max-w-2xl">
          <CheckCircle2 className="h-10 w-10 mx-auto text-taupe" />
          <h1 className="mt-6 font-serif text-5xl md:text-6xl leading-tight">Ta séance est <em className="italic">réservée.</em></h1>
          <p className="mt-6 text-lg text-muted-foreground">L'équipe Coco Social Club te contactera si nécessaire.</p>
          <div className="mt-4 rounded-[1.5rem] border border-border bg-cream p-6 text-left inline-block">
            <p><span className="text-muted-foreground text-sm">Prestation :</span> {prestationName}</p>
            <p><span className="text-muted-foreground text-sm">Date :</span> {date} · {slot}</p>
            <p><span className="text-muted-foreground text-sm">Réservé au nom de :</span> {coords.prenom} {coords.nom}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href="https://member-app.deciplus.pro/cocosc/shop" target="_blank" rel="noreferrer" className="btn-pill bg-primary text-primary-foreground">
              Accéder à l'espace membre <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="container-editorial pt-14 pb-24 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Réservation · étape {step} / 6</p>
        <div className="mt-4 h-1 bg-cream rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${(step / 6) * 100}%` }} />
        </div>

        <div className="mt-12 fade-up" key={step}>
          {step === 1 && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Choisis ton univers.</h1>
              <div className="mt-8 grid md:grid-cols-2 gap-4">
                {(["sport", "bien-etre"] as Univers[]).map((u) => (
                  <button
                    key={u}
                    onClick={() => { setUnivers(u); setPrestation(null); next(); }}
                    className={
                      "rounded-[1.5rem] p-8 text-left border transition " +
                      (univers === u ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-cream")
                    }
                  >
                    <p className="text-xs uppercase tracking-[0.24em] opacity-70">Univers</p>
                    <p className="mt-3 font-serif text-3xl">{u === "sport" ? "Sport" : "Bien-être"}</p>
                    <p className={"mt-3 text-sm " + (univers === u ? "opacity-90" : "text-muted-foreground")}>
                      {u === "sport" ? "EMS, coaching, cours collectifs." : "Cryolipolyse, pressothérapie, tan, massages."}
                    </p>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && univers && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Choisis ta prestation.</h1>
              <div className="mt-8 grid gap-3">
                {PRESTATIONS[univers].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setPrestation(p.id); next(); }}
                    className={
                      "text-left rounded-2xl border px-6 py-4 flex items-center justify-between gap-4 transition " +
                      (prestation === p.id ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-cream")
                    }
                  >
                    <div>
                      <p className="font-medium">{p.name}</p>
                      {p.note && <p className={"text-xs mt-1 " + (prestation === p.id ? "opacity-80" : "text-muted-foreground")}>{p.note}</p>}
                    </div>
                    <span className="text-xs opacity-70">{p.duration}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Choisis ta date.</h1>
              <div className="mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                {dates.map((d) => {
                  const dt = new Date(d);
                  const active = date === d;
                  return (
                    <button
                      key={d}
                      onClick={() => { setDate(d); next(); }}
                      className={
                        "rounded-2xl border p-3 text-center transition " +
                        (active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-cream")
                      }
                    >
                      <p className="text-[10px] uppercase tracking-widest opacity-70">
                        {dt.toLocaleDateString("fr-FR", { weekday: "short" })}
                      </p>
                      <p className="font-serif text-2xl mt-1">{dt.getDate()}</p>
                      <p className="text-[10px] opacity-70">{dt.toLocaleDateString("fr-FR", { month: "short" })}</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Choisis ton créneau.</h1>
              <div className="mt-8 grid grid-cols-3 md:grid-cols-4 gap-2">
                {SLOTS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSlot(s); next(); }}
                    className={
                      "rounded-full border py-3 transition " +
                      (slot === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-cream")
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">Tes coordonnées.</h1>
              <div className="mt-8 grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input label="Prénom" value={coords.prenom} onChange={(v) => setCoords({ ...coords, prenom: v })} error={errors.prenom} />
                  <Input label="Nom" value={coords.nom} onChange={(v) => setCoords({ ...coords, nom: v })} error={errors.nom} />
                </div>
                <Input label="Téléphone" type="tel" value={coords.phone} onChange={(v) => setCoords({ ...coords, phone: v })} error={errors.phone} />
                <Input label="Email" type="email" value={coords.email} onChange={(v) => setCoords({ ...coords, email: v })} error={errors.email} />
                <button onClick={submitCoords} className="btn-pill bg-primary text-primary-foreground mt-2 self-start">
                  Voir le récapitulatif <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}

          {step === 6 && (
            <>
              <h1 className="font-serif text-4xl md:text-5xl leading-tight">On récapitule.</h1>
              <div className="mt-8 rounded-[1.5rem] border border-border bg-cream p-6 space-y-3">
                <Line label="Univers" value={univers === "sport" ? "Sport" : "Bien-être"} />
                <Line label="Prestation" value={prestationName || ""} />
                <Line label="Date" value={date || ""} />
                <Line label="Créneau" value={slot || ""} />
                <Line label="Nom" value={`${coords.prenom} ${coords.nom}`} />
                <Line label="Téléphone" value={coords.phone} />
                <Line label="Email" value={coords.email} />
              </div>
              <button onClick={() => setConfirmed(true)} className="btn-pill bg-primary text-primary-foreground mt-8">
                Confirmer ma réservation <CheckCircle2 className="h-4 w-4" />
              </button>
            </>
          )}

          {step > 1 && (
            <button onClick={prev} className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Revenir en arrière
            </button>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({ label, type = "text", value, onChange, error }: { label: string; type?: string; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-full border border-border bg-background px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}