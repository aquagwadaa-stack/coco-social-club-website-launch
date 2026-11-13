import type { ReactNode } from "react";
import { content } from "@/content";
import { ButtonLink, DeciplusButton } from "./cta";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section";

type AppelFinalProps = {
  /** Par défaut, les textes de `appelFinal` dans src/content.ts. */
  surtitre?: string;
  titre?: string;
  texte?: string;
  /** Boutons. Par défaut : réserver sur Deciplus et nous contacter. */
  children?: ReactNode;
};

/** Bloc d'appel à l'action sur fond moka, placé en bas des pages. */
export function AppelFinal({ surtitre, titre, texte, children }: AppelFinalProps) {
  const { appelFinal, actions } = content;

  return (
    <section className="csc-dark relative isolate overflow-hidden">
      <svg
        viewBox="0 0 400 400"
        className="absolute -right-32 -top-36 -z-10 size-[34rem] text-creme/10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="200" cy="200" r="198" />
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="82" />
      </svg>
      <div className="csc-container csc-section">
        <Reveal>
          <SectionHeading
            light
            surtitre={surtitre ?? appelFinal.surtitre}
            titre={titre ?? appelFinal.titre}
            texte={texte ?? appelFinal.texte}
          />
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {children ?? (
              <>
                <DeciplusButton action="reservation" tone="creme" size="lg" />
                <ButtonLink to="/contact" tone="outlineLight" size="lg">
                  {actions.contact}
                </ButtonLink>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
