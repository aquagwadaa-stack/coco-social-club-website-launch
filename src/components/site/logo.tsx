import { useId } from "react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** « complet » : rond avec le nom en arc. « symbole » : rond et dessin seuls, pour les petites tailles. */
  variant?: "complet" | "symbole";
  /** Texte lu par les lecteurs d'écran. Sans titre, le logo est décoratif. */
  title?: string;
};

/**
 * Logo du Coco Social Club, redessiné en vectoriel pour la démonstration :
 * rond moka, dessin au trait crème, « COCO-SOCIAL » en arc et « CLUB » en bas.
 * À remplacer par le fichier d'origine du club dès qu'il est fourni (voir README).
 */
export function Logo({ className, variant = "complet", title }: LogoProps) {
  const id = useId();
  const topArc = `${id}-haut`;
  const bottomArc = `${id}-bas`;
  const complet = variant === "complet";

  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("block shrink-0", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="60" cy="60" r="60" fill="var(--color-moka)" />
      <circle cx="60" cy="60" r="55.5" fill="none" stroke="var(--color-creme)" strokeWidth="0.9" />

      {complet && (
        <>
          <defs>
            {/* Arc du haut : 150° centrés sur le sommet. Arc du bas : 40° centrés sur le bas. */}
            <path id={topArc} d="M 18.95 49 A 42.5 42.5 0 0 1 101.05 49" />
            <path id={bottomArc} d="M 43.07 106.51 A 49.5 49.5 0 0 0 76.93 106.51" />
          </defs>
          <circle
            cx="60"
            cy="60"
            r="36.5"
            fill="none"
            stroke="var(--color-creme)"
            strokeWidth="0.6"
          />
          <g
            fill="var(--color-creme)"
            fontFamily="var(--font-sans)"
            fontWeight={600}
            fontSize="9.4"
          >
            <text>
              <textPath href={`#${topArc}`} textLength="111" lengthAdjust="spacing">
                COCO-SOCIAL
              </textPath>
            </text>
            <text>
              <textPath href={`#${bottomArc}`} textLength="34" lengthAdjust="spacing">
                CLUB
              </textPath>
            </text>
          </g>
          <circle cx="14.5" cy="66.4" r="1.1" fill="var(--color-creme)" />
          <circle cx="105.5" cy="66.4" r="1.1" fill="var(--color-creme)" />
        </>
      )}

      <g
        fill="none"
        stroke="var(--color-creme)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={complet ? 1.25 : 2}
        transform={complet ? undefined : "translate(60 60) scale(1.5) translate(-60.5 -59)"}
      >
        <path d="M56 80.5 C 56.8 70.5, 58.6 60.5, 62 52" />
        <path d="M62 52 C 55 48.5, 48 50.5, 43.5 57" />
        <path d="M62 52 C 56.5 43.5, 49.5 41, 43.5 43.5" />
        <path d="M62 52 C 61 45.5, 58 40.5, 53.5 37.5" />
        <path d="M62 52 C 65.5 44, 72 40.5, 78.5 42.5" />
        <path d="M62 52 C 69 48.5, 76 51, 80 57.5" />
        <path d="M47 80.8 C 53 78.6, 63 78.6, 71 80.8" />
        <circle cx="59.4" cy="56.3" r="1.4" />
        <circle cx="64.2" cy="56.6" r="1.4" />
      </g>
    </svg>
  );
}
