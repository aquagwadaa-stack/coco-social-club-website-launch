import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ChevronDown,
  Copy,
  Instagram,
  Mail,
  Map as MapIcon,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { content } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { buttonStyles, DeciplusButton, ExternalButton } from "@/components/site/cta";
import { Adresse, Horaires } from "@/components/site/infos";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: content.contact.meta.titre },
      { name: "description", content: content.contact.meta.description },
      { property: "og:title", content: content.contact.meta.titre },
      { property: "og:description", content: content.contact.meta.description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { contact } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={contact.entete.surtitre}
        titre={contact.entete.titre}
        texte={contact.entete.texte}
      />

      <section className="csc-section">
        <div className="csc-container grid gap-x-14 gap-y-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Formulaire />
          <Coordonnees />
        </div>
      </section>

      <Carte />

      <AppelFinal>
        <DeciplusButton action="reservation" tone="creme" size="lg" />
        <DeciplusButton action="decouverte" tone="outlineLight" size="lg" />
      </AppelFinal>
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Formulaire : il prépare un message, il n'envoie et n'enregistre rien       */
/* -------------------------------------------------------------------------- */

type Champs = { prenom: string; telephone: string; sujet: string; message: string };
type Erreurs = { prenom?: string; message?: string };

/** Met une minuscule au début du sujet pour l'insérer dans une phrase. */
function enMinuscule(texte: string): string {
  return texte.charAt(0).toLowerCase() + texte.slice(1);
}

/** Texte du message préparé, tel qu'il s'ouvrira dans WhatsApp ou dans la messagerie. */
function construireMessage(champs: Champs): string {
  const { gabarit } = content.contact.formulaire;
  const prenom = champs.prenom.trim();
  const message = champs.message.trim();
  const telephone = champs.telephone.trim();

  const lignes = [
    gabarit.salutation,
    prenom ? `${gabarit.presentation} ${prenom}.` : `${gabarit.presentation} …`,
    `${gabarit.sujet} ${enMinuscule(champs.sujet)}.`,
    "",
    message || "…",
  ];
  if (telephone) lignes.push("", `${gabarit.telephone} ${telephone}`);
  lignes.push("", gabarit.signature);
  return lignes.join("\n");
}

const champClass =
  "w-full rounded-xl border border-moka/35 bg-blanc px-4 text-[16px] leading-normal text-espresso transition-colors placeholder:text-moka-soft/70 hover:border-moka focus-visible:border-moka aria-[invalid=true]:border-destructive";

function Formulaire() {
  const { formulaire } = content.contact;
  const { coordonnees, site } = content;
  const { champs: libelles, boutons, retours } = formulaire;
  const id = useId();

  const [champs, setChamps] = useState<Champs>({
    prenom: "",
    telephone: "",
    sujet: formulaire.sujets[0],
    message: "",
  });
  const [erreurs, setErreurs] = useState<Erreurs>({});
  const [retour, setRetour] = useState("");

  const prenomRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const apercuRef = useRef<HTMLPreElement>(null);

  const message = construireMessage(champs);
  const lienWhatsapp = `https://wa.me/${coordonnees.whatsapp.numero}?text=${encodeURIComponent(message)}`;
  const lienEmail = `${coordonnees.email.href}?subject=${encodeURIComponent(
    formulaire.gabarit.objetEmail,
  )}&body=${encodeURIComponent(message)}`;

  const modifier = (nom: keyof Champs, valeur: string) => {
    setChamps((precedent) => ({ ...precedent, [nom]: valeur }));
    if (nom === "prenom" || nom === "message") {
      setErreurs((precedent) => ({ ...precedent, [nom]: undefined }));
    }
  };

  /** Vérifie les champs obligatoires. En cas d'erreur, place le curseur sur le premier champ fautif. */
  const valider = (): boolean => {
    const nouvelles: Erreurs = {};
    if (!champs.prenom.trim()) nouvelles.prenom = retours.prenomManquant;
    if (!champs.message.trim()) nouvelles.message = retours.messageManquant;
    setErreurs(nouvelles);

    if (nouvelles.prenom) {
      setRetour("");
      prenomRef.current?.focus();
      return false;
    }
    if (nouvelles.message) {
      setRetour("");
      messageRef.current?.focus();
      return false;
    }
    return true;
  };

  const copier = async () => {
    if (!valider()) return;
    try {
      await navigator.clipboard.writeText(message);
      setRetour(retours.copie);
    } catch {
      // Presse-papiers indisponible : on sélectionne l'aperçu pour une copie manuelle.
      const apercu = apercuRef.current;
      if (apercu) window.getSelection()?.selectAllChildren(apercu);
      setRetour(retours.echecCopie);
    }
  };

  const empecherEnvoi = (event: FormEvent) => event.preventDefault();

  return (
    <Reveal>
      <h2 className="text-[2rem] sm:text-[2.4rem]">{formulaire.titre}</h2>
      <p className="mt-3 max-w-2xl text-[1.05rem] text-moka-soft">{formulaire.explication}</p>

      <form noValidate onSubmit={empecherEnvoi} className="mt-7 grid gap-5">
        <p className="text-[0.9rem] text-moka-soft">{formulaire.obligatoire}</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-prenom`} className="block text-[0.98rem] font-semibold">
              {libelles.prenom.libelle} <span aria-hidden="true">*</span>
            </label>
            <input
              ref={prenomRef}
              id={`${id}-prenom`}
              name="prenom"
              type="text"
              autoComplete="given-name"
              required
              value={champs.prenom}
              onChange={(event) => modifier("prenom", event.target.value)}
              placeholder={libelles.prenom.exemple}
              aria-invalid={erreurs.prenom ? true : undefined}
              aria-describedby={erreurs.prenom ? `${id}-prenom-erreur` : undefined}
              className={cn(champClass, "mt-2 min-h-[48px]")}
            />
            {erreurs.prenom && (
              <p
                id={`${id}-prenom-erreur`}
                className="mt-2 text-[0.92rem] font-medium text-destructive"
              >
                {erreurs.prenom}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${id}-telephone`} className="block text-[0.98rem] font-semibold">
              {libelles.telephone.libelle}{" "}
              <span className="font-normal text-moka-soft">({libelles.telephone.facultatif})</span>
            </label>
            <input
              id={`${id}-telephone`}
              name="telephone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={champs.telephone}
              onChange={(event) => modifier("telephone", event.target.value)}
              placeholder={libelles.telephone.exemple}
              className={cn(champClass, "mt-2 min-h-[48px]")}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-sujet`} className="block text-[0.98rem] font-semibold">
            {libelles.sujet.libelle}
          </label>
          <div className="relative mt-2">
            <select
              id={`${id}-sujet`}
              name="sujet"
              value={champs.sujet}
              onChange={(event) => modifier("sujet", event.target.value)}
              className={cn(champClass, "min-h-[48px] cursor-pointer appearance-none pr-11")}
            >
              {formulaire.sujets.map((sujet) => (
                <option key={sujet} value={sujet}>
                  {sujet}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-moka"
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-message`} className="block text-[0.98rem] font-semibold">
            {libelles.message.libelle} <span aria-hidden="true">*</span>
          </label>
          <textarea
            ref={messageRef}
            id={`${id}-message`}
            name="message"
            rows={5}
            required
            value={champs.message}
            onChange={(event) => modifier("message", event.target.value)}
            placeholder={libelles.message.exemple}
            aria-invalid={erreurs.message ? true : undefined}
            aria-describedby={erreurs.message ? `${id}-message-erreur` : undefined}
            className={cn(champClass, "mt-2 py-3")}
          />
          {erreurs.message && (
            <p
              id={`${id}-message-erreur`}
              className="mt-2 text-[0.92rem] font-medium text-destructive"
            >
              {erreurs.message}
            </p>
          )}
        </div>

        <div className="rounded-[1.4rem] border border-ligne bg-creme p-5">
          <h3 className="csc-eyebrow font-sans text-moka-soft">{formulaire.apercu}</h3>
          <pre
            ref={apercuRef}
            className="mt-3 font-sans text-[0.98rem] leading-relaxed break-words whitespace-pre-wrap"
          >
            {message}
          </pre>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={lienWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              if (!valider()) event.preventDefault();
              else setRetour(retours.ouvertWhatsapp);
            }}
            className={buttonStyles({ className: "w-full" })}
          >
            <MessageCircle aria-hidden="true" />
            {boutons.whatsapp}
            <span className="sr-only"> ({site.nouvelOnglet})</span>
          </a>
          <a
            href={lienEmail}
            onClick={(event) => {
              if (!valider()) event.preventDefault();
              else setRetour(retours.ouvertEmail);
            }}
            className={buttonStyles({ tone: "outline", className: "w-full" })}
          >
            <Mail aria-hidden="true" />
            {boutons.email}
          </a>
          <button
            type="button"
            onClick={copier}
            className={buttonStyles({
              tone: "soft",
              className: "w-full sm:col-span-2",
            })}
          >
            <Copy aria-hidden="true" />
            {boutons.copier}
          </button>
        </div>

        {/* Retour d'action, annoncé aux lecteurs d'écran. Jamais de fausse confirmation d'envoi. */}
        <p
          role="status"
          aria-live="polite"
          className="min-h-[1.6em] text-[0.98rem] font-semibold text-moka"
        >
          {retour}
        </p>

        <p className="flex gap-3 text-[0.94rem] text-moka-soft">
          <ShieldCheck
            aria-hidden="true"
            className="mt-[0.15em] size-5 shrink-0 text-moka"
            strokeWidth={1.5}
          />
          {formulaire.confidentialite}
        </p>
      </form>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Coordonnées et horaires                                                    */
/* -------------------------------------------------------------------------- */

function Coordonnees() {
  const { direct } = content.contact;
  const { coordonnees, horaires, site } = content;
  const lienClass = "csc-link inline-flex min-h-[32px] items-center font-semibold";

  return (
    <Reveal delay={100} className="grid content-start gap-5">
      <div className="rounded-[1.6rem] border border-ligne bg-card p-6 sm:p-7">
        <h2 className="text-[1.7rem]">{direct.titre}</h2>

        <dl className="mt-5 grid gap-5">
          <div className="flex gap-4">
            <Phone
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <div>
              <dt className="csc-eyebrow text-moka-soft">{direct.telephone}</dt>
              <dd className="mt-1 grid gap-0.5">
                <span>
                  <a href={coordonnees.mobile.href} className={cn(lienClass, "whitespace-nowrap")}>
                    {coordonnees.mobile.affichage}
                  </a>
                  <span className="ml-2 text-[0.92rem] text-moka-soft">
                    {coordonnees.mobile.precision}
                  </span>
                </span>
                <span>
                  <a href={coordonnees.fixe.href} className={cn(lienClass, "whitespace-nowrap")}>
                    {coordonnees.fixe.affichage}
                  </a>
                  <span className="ml-2 text-[0.92rem] text-moka-soft">
                    {coordonnees.fixe.precision}
                  </span>
                </span>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <MessageCircle
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <div>
              <dt className="csc-eyebrow text-moka-soft">{coordonnees.whatsapp.libelle}</dt>
              <dd className="mt-1">
                <a
                  href={coordonnees.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(lienClass, "whitespace-nowrap")}
                >
                  {coordonnees.mobile.affichage}
                  <span className="sr-only"> ({site.nouvelOnglet})</span>
                </a>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <Mail aria-hidden="true" className="mt-1 size-5 shrink-0 text-moka" strokeWidth={1.5} />
            <div>
              <dt className="csc-eyebrow text-moka-soft">{direct.email}</dt>
              <dd className="mt-1">
                <a href={coordonnees.email.href} className={cn(lienClass, "break-all")}>
                  {coordonnees.email.affichage}
                </a>
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <MapPin
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <div>
              <dt className="csc-eyebrow text-moka-soft">{direct.adresse}</dt>
              <dd className="mt-1">
                <Adresse />
              </dd>
            </div>
          </div>

          <div className="flex gap-4">
            <Instagram
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-moka"
              strokeWidth={1.5}
            />
            <div>
              <dt className="csc-eyebrow text-moka-soft">{direct.reseaux}</dt>
              <dd className="mt-1">
                <a
                  href={coordonnees.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={lienClass}
                >
                  {coordonnees.instagram.affichage}
                  <span className="sr-only"> ({site.nouvelOnglet})</span>
                </a>
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="rounded-[1.6rem] border border-ligne bg-creme p-6 sm:p-7">
        <h2 className="csc-eyebrow font-sans text-moka-soft">{horaires.titre}</h2>
        <Horaires className="mt-4 text-[1.02rem]" />
      </div>
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/* Carte : elle ne se charge que si le visiteur le demande                    */
/* -------------------------------------------------------------------------- */

function Carte() {
  const { carte } = content.contact;
  const { coordonnees } = content;
  const [visible, setVisible] = useState(false);
  const cadreRef = useRef<HTMLIFrameElement>(null);

  // Une fois la carte affichée, le focus passe au cadre : il ne se perd pas avec le bouton disparu.
  useEffect(() => {
    if (visible) cadreRef.current?.focus();
  }, [visible]);

  return (
    <section className="csc-section border-t border-ligne bg-creme">
      <div className="csc-container">
        <Reveal>
          <SectionHeading
            surtitre={content.contact.direct.adresse}
            titre={carte.titre}
            texte={carte.texte}
          />
        </Reveal>

        <Reveal className="mt-8 overflow-hidden rounded-[1.6rem] border border-ligne bg-card">
          {visible ? (
            <iframe
              ref={cadreRef}
              src={coordonnees.carte.integration}
              title={carte.titreCadre}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[24rem] w-full border-0 sm:h-[28rem]"
            />
          ) : (
            <div className="relative isolate grid min-h-[20rem] place-items-center overflow-hidden bg-gradient-to-br from-creme to-beige p-6 text-center sm:min-h-[24rem]">
              <svg
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 -z-10 h-full w-full text-moka/15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="200" cy="200" r="60" />
                <circle cx="200" cy="200" r="120" />
                <circle cx="200" cy="200" r="180" />
                <circle cx="200" cy="200" r="240" />
              </svg>
              <div className="max-w-md">
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-moka text-blanc">
                  <MapPin aria-hidden="true" className="size-6" strokeWidth={1.5} />
                </span>
                <Adresse className="mt-4 text-[1.1rem] font-semibold" />
                <p className="mt-3 text-[0.95rem] text-moka-soft">{carte.information}</p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button type="button" onClick={() => setVisible(true)} className={buttonStyles()}>
                    <MapIcon aria-hidden="true" />
                    {carte.afficher}
                  </button>
                  <ExternalButton href={coordonnees.carte.lien} tone="outline">
                    {carte.ouvrir}
                  </ExternalButton>
                </div>
              </div>
            </div>
          )}
        </Reveal>

        {visible && (
          <div className="mt-4">
            <ExternalButton href={coordonnees.carte.lien} tone="outline">
              {carte.ouvrir}
            </ExternalButton>
          </div>
        )}
      </div>
    </section>
  );
}
