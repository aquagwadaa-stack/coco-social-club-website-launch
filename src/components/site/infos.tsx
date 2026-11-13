import { Star } from "lucide-react";
import { content } from "@/content";
import { cn } from "@/lib/utils";

/** Horaires d'ouverture, sous forme de liste. */
export function Horaires({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <dl className={cn("grid gap-2", className)}>
      {content.horaires.lignes.map((ligne) => (
        <div
          key={ligne.jours}
          className={cn(
            "flex items-baseline justify-between gap-4 border-b pb-2 last:border-b-0 last:pb-0",
            light ? "border-creme/15" : "border-ligne",
          )}
        >
          <dt className={light ? "text-creme/80" : "text-moka-soft"}>{ligne.jours}</dt>
          <dd className="whitespace-nowrap font-semibold">{ligne.heures}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Adresse postale du club. */
export function Adresse({ className }: { className?: string }) {
  const { adresse } = content.coordonnees;
  return (
    <address className={cn("not-italic", className)}>
      {adresse.rue}
      <br />
      {adresse.codePostal} {adresse.ville}
      <br />
      {adresse.pays}
    </address>
  );
}

/**
 * Note Google du club, toujours affichée avec sa date de relevé.
 * Aucun avis n'est reproduit sur le site.
 */
export function NoteGoogle({ light = false, className }: { light?: boolean; className?: string }) {
  const { noteGoogle, coordonnees, site } = content;
  const ratio = Number(noteGoogle.note.replace(",", ".")) / Number(noteGoogle.sur);

  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <div className="flex items-center gap-3">
        <span
          className="relative inline-flex"
          role="img"
          aria-label={`${noteGoogle.libelle} : ${noteGoogle.note} sur ${noteGoogle.sur}`}
        >
          <span className={cn("flex gap-0.5", light ? "text-creme/30" : "text-moka/25")}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-[1.05rem] fill-current" strokeWidth={0} />
            ))}
          </span>
          <span
            className={cn(
              "absolute inset-y-0 left-0 flex gap-0.5 overflow-hidden",
              light ? "text-creme" : "text-moka",
            )}
            style={{ width: `${Math.min(100, ratio * 100)}%` }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-[1.05rem] shrink-0 fill-current" strokeWidth={0} />
            ))}
          </span>
        </span>
        <span className="text-[1.05rem] font-semibold">
          {noteGoogle.note} / {noteGoogle.sur}
        </span>
      </div>
      <p className={cn("text-[0.92rem]", light ? "text-creme/80" : "text-moka-soft")}>
        {noteGoogle.nombreAvis} {noteGoogle.avis} {noteGoogle.date}.{" "}
        <a
          href={coordonnees.carte.lien}
          target="_blank"
          rel="noopener noreferrer"
          className={cn("csc-link font-semibold", light ? "text-creme" : "text-espresso")}
        >
          {noteGoogle.lienLibelle}
          <span className="sr-only"> ({site.nouvelOnglet})</span>
        </a>
      </p>
    </div>
  );
}
