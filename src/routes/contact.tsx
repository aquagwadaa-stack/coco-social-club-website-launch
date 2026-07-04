import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Instagram, Mail, Clock, CheckCircle2 } from "lucide-react";
import { z } from "zod";
import { SiteLayout, PageHero } from "@/components/site/layout";

const schema = z.object({
  name: z.string().trim().min(2, "Ton prénom, s'il te plaît").max(80),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Un petit mot pour nous ?").max(1200),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Coco Social Club, 6 rue de Portland, Le Moule" },
      { name: "description", content: "Contacte Coco Social Club au Moule : WhatsApp, téléphone, formulaire. 6 rue de Portland, 97160 Le Moule, Guadeloupe." },
      { property: "og:title", content: "Contact — Coco Social Club" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd);
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Contact" title="Un mot, un appel, un message." subtitle="On se fait un plaisir de te répondre rapidement — en français ou en créole." />

      <section className="container-editorial pb-24 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <InfoBlock icon={<MapPin className="h-4 w-4" />} title="Adresse">
            6 rue de Portland<br />97160 Le Moule, Guadeloupe
          </InfoBlock>
          <InfoBlock icon={<Phone className="h-4 w-4" />} title="Téléphone">
            <a href="tel:+590690979545" className="underline underline-offset-4">+590 690 97 95 45</a>
            <p className="text-xs text-muted-foreground mt-1">Cryolipolyse : <a href="tel:0690970646">06 90 970 646</a></p>
            <p className="text-xs text-muted-foreground">Pole Dance : <a href="tel:0699667325">06 99 66 73 25</a></p>
          </InfoBlock>
          <InfoBlock icon={<Clock className="h-4 w-4" />} title="Horaires">
            Lun. — Ven. selon planning<br />Cours en soirée · soins sur rendez-vous
          </InfoBlock>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href="https://wa.me/590690979545" target="_blank" rel="noreferrer" className="btn-pill bg-primary text-primary-foreground">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href="tel:+590690979545" className="btn-pill border border-border">
              <Phone className="h-4 w-4" /> Appeler
            </a>
            <a href="https://www.instagram.com/coco_socialclub/" target="_blank" rel="noreferrer" className="btn-pill border border-border">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        <div className="lg:col-span-7">
          {sent ? (
            <div className="rounded-[1.5rem] border border-border bg-cream p-10 text-center fade-up">
              <CheckCircle2 className="h-8 w-8 mx-auto text-taupe" />
              <h3 className="mt-4 font-serif text-3xl">Merci pour ton message.</h3>
              <p className="mt-2 text-muted-foreground">L'équipe Coco te répond très vite.</p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="rounded-[1.5rem] border border-border bg-background p-6 md:p-8 grid gap-4">
              <Field label="Prénom & nom" name="name" error={errors.name} />
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="Téléphone (facultatif)" name="phone" type="tel" error={errors.phone} />
              </div>
              <div>
                <label className="text-sm font-medium" htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} className="mt-2 w-full rounded-2xl border border-border bg-cream/40 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              <button disabled={loading} className="btn-pill bg-primary text-primary-foreground disabled:opacity-60">
                {loading ? "Envoi…" : "Envoyer mon message"}
                <Mail className="h-4 w-4" />
              </button>
              <p className="text-xs text-muted-foreground">En envoyant ce formulaire, tu acceptes d'être recontacté(e) par l'équipe Coco.</p>
            </form>
          )}
        </div>
      </section>

      <section className="container-editorial pb-24">
        <div className="rounded-[1.5rem] overflow-hidden border border-border h-[420px]">
          <iframe
            title="Carte Coco Social Club au Moule"
            src="https://www.google.com/maps?q=6+rue+de+Portland+97160+Le+Moule&output=embed"
            className="w-full h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[1.5rem] border border-border p-6 bg-background">
      <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-[0.24em]">{icon}{title}</div>
      <div className="mt-3 text-base">{children}</div>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className="mt-2 w-full rounded-full border border-border bg-cream/40 px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}