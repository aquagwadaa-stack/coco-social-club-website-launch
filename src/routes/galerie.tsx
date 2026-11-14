import { useRef, useState, type KeyboardEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { Camera, ChevronLeft, ChevronRight, Instagram, Maximize2, X } from "lucide-react";
import { content, type CategorieGalerie } from "@/content";
import { AppelFinal } from "@/components/site/appel";
import { DeciplusButton, ExternalButton } from "@/components/site/cta";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { Visual } from "@/components/site/visual";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: content.galerie.meta.titre },
      { name: "description", content: content.galerie.meta.description },
      { property: "og:title", content: content.galerie.meta.titre },
      { property: "og:description", content: content.galerie.meta.description },
    ],
  }),
  component: GaleriePage,
});

type Filtre = CategorieGalerie | "toutes";
type Image = (typeof content.galerie.images)[number];

/**
 * Proportions d'une vignette selon son format.
 * La mosaïque est en colonnes : quel que soit le filtre, elle ne laisse jamais de trou.
 */
const FORMATS: Record<Image["format"], string> = {
  carre: "aspect-square",
  large: "aspect-[4/3]",
  haut: "aspect-[3/4]",
};

const boutonRond =
  "inline-flex size-[44px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-moka/30 bg-blanc text-espresso transition-colors hover:bg-creme";

function nomCategorie(id: CategorieGalerie): string {
  return content.galerie.categories.find((categorie) => categorie.id === id)?.nom ?? id;
}

function GaleriePage() {
  const { galerie, coordonnees } = content;
  const [filtre, setFiltre] = useState<Filtre>("toutes");
  /** Position, dans la liste filtrée, de la photo ouverte dans la visionneuse. */
  const [ouverte, setOuverte] = useState<number | null>(null);
  /** Boutons des vignettes, pour rendre le focus à la bonne vignette quand la visionneuse se ferme. */
  const vignettes = useRef<(HTMLButtonElement | null)[]>([]);
  const dernierePosition = useRef(0);

  const changerPosition = (position: number | null) => {
    if (position !== null) dernierePosition.current = position;
    setOuverte(position);
  };

  const images =
    filtre === "toutes"
      ? galerie.images
      : galerie.images.filter((image) => image.categorie === filtre);

  const filtres: { id: Filtre; nom: string; nombre: number }[] = [
    { id: "toutes", nom: galerie.toutes, nombre: galerie.images.length },
    ...galerie.categories.map((categorie) => ({
      id: categorie.id as Filtre,
      nom: categorie.nom,
      nombre: galerie.images.filter((image) => image.categorie === categorie.id).length,
    })),
  ];

  return (
    <SiteLayout>
      <PageHeader
        surtitre={galerie.entete.surtitre}
        titre={galerie.entete.titre}
        texte={galerie.entete.texte}
      />

      <section className="csc-section">
        <div className="csc-container">
          <p className="flex items-center gap-3 text-[1.02rem] text-moka-soft">
            <Camera aria-hidden="true" className="size-5 shrink-0 text-moka" strokeWidth={1.5} />
            {galerie.note}
          </p>

          <div
            role="group"
            aria-label={galerie.filtrer}
            className="-mx-5 mt-6 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {filtres.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={filtre === item.id}
                onClick={() => setFiltre(item.id)}
                className={cn(
                  "inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 text-[0.96rem] font-medium whitespace-nowrap transition-colors",
                  filtre === item.id
                    ? "border-moka bg-moka text-blanc"
                    : "border-ligne bg-card hover:border-moka hover:bg-creme",
                )}
              >
                {item.nom}
                <span
                  aria-hidden="true"
                  className={cn(
                    "text-[0.84rem]",
                    filtre === item.id ? "text-sable-clair" : "text-moka-soft",
                  )}
                >
                  {item.nombre}
                </span>
              </button>
            ))}
          </div>

          <p role="status" aria-live="polite" className="mt-4 text-[0.92rem] text-moka-soft">
            {images.length} {galerie.resultat}
          </p>

          <ul className="mt-5 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
            {images.map((image, index) => (
              <li
                key={`${image.categorie}-${image.legende}`}
                className="mb-3 break-inside-avoid sm:mb-4"
              >
                <button
                  ref={(element) => {
                    vignettes.current[index] = element;
                  }}
                  type="button"
                  onClick={() => changerPosition(index)}
                  className={cn(
                    "group relative block w-full cursor-pointer overflow-hidden rounded-[1.3rem] text-left",
                    FORMATS[image.format],
                  )}
                >
                  <Visual
                    photo={image}
                    className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]"
                    variant={(index % 4) as 0 | 1 | 2 | 3}
                    iconSize="sm"
                  />
                  {!image.src && (
                    <span className="absolute top-3 left-3 rounded-full bg-blanc/80 px-2.5 py-1 text-[0.72rem] font-semibold text-moka">
                      {galerie.photoAVenir}
                    </span>
                  )}
                  <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-blanc/80 text-moka opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 aria-hidden="true" className="size-4" strokeWidth={1.6} />
                  </span>
                  <span className="absolute inset-x-2 bottom-2 rounded-[0.9rem] bg-blanc/90 px-3 py-2 text-espresso">
                    <span className="block text-[0.95rem] leading-tight font-semibold">
                      {image.legende}
                    </span>
                    <span className="block text-[0.8rem] text-moka-soft">
                      {nomCategorie(image.categorie)}
                    </span>
                  </span>
                  <span className="sr-only">. {galerie.agrandir}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Visionneuse
        images={images}
        position={ouverte}
        onChange={changerPosition}
        onFermeture={() => vignettes.current[dernierePosition.current]?.focus()}
      />

      <AppelFinal>
        <DeciplusButton action="reservation" tone="creme" size="lg" />
        <ExternalButton href={coordonnees.instagram.href} tone="outlineLight" size="lg">
          <Instagram aria-hidden="true" />
          {coordonnees.instagram.affichage}
        </ExternalButton>
      </AppelFinal>
    </SiteLayout>
  );
}

/* -------------------------------------------------------------------------- */
/* Visionneuse : flèches du clavier, Échap pour fermer, retour du focus       */
/* -------------------------------------------------------------------------- */

type VisionneuseProps = {
  images: Image[];
  position: number | null;
  onChange: (position: number | null) => void;
  /** Appelé à la fermeture, pour rendre le focus à la vignette de la photo affichée. */
  onFermeture: () => void;
};

function Visionneuse({ images, position, onChange, onFermeture }: VisionneuseProps) {
  const { galerie } = content;
  const { visionneuse } = galerie;
  const image = position === null ? null : images[position];

  const aller = (pas: number) => {
    if (position === null || images.length === 0) return;
    onChange((position + pas + images.length) % images.length);
  };

  const auClavier = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      aller(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      aller(-1);
    }
  };

  return (
    <Dialog.Root
      open={image !== null && image !== undefined}
      onOpenChange={(open) => !open && onChange(null)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-espresso/80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          onKeyDown={auClavier}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onFermeture();
          }}
          className="fixed top-1/2 left-1/2 z-[81] flex max-h-[92svh] w-[min(94vw,52rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[1.6rem] bg-blanc text-espresso shadow-2xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0"
        >
          {image && position !== null && (
            <>
              <div className="flex items-center justify-between gap-4 border-b border-ligne px-5 py-3">
                <p className="csc-eyebrow text-moka-soft">
                  {visionneuse.titre} · {position + 1} / {images.length}
                </p>
                <Dialog.Close asChild>
                  <button type="button" className={boutonRond} aria-label={visionneuse.fermer}>
                    <X aria-hidden="true" className="size-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="relative min-h-0 flex-1 bg-creme">
                <Visual
                  photo={image}
                  className="aspect-[4/3] max-h-[62svh] w-full"
                  variant={(position % 4) as 0 | 1 | 2 | 3}
                  iconSize="lg"
                  priority
                />
                {!image.src && (
                  <span className="absolute top-4 left-4 rounded-full bg-blanc/85 px-3 py-1 text-[0.8rem] font-semibold text-moka">
                    {galerie.photoAVenir}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <button
                  type="button"
                  onClick={() => aller(-1)}
                  className={boutonRond}
                  aria-label={visionneuse.precedente}
                >
                  <ChevronLeft aria-hidden="true" className="size-5" />
                </button>
                <div className="min-w-0 text-center">
                  <Dialog.Title className="csc-serif text-[1.45rem] leading-tight">
                    {image.legende}
                  </Dialog.Title>
                  <Dialog.Description className="mt-0.5 text-[0.92rem] text-moka-soft">
                    {nomCategorie(image.categorie)}
                  </Dialog.Description>
                </div>
                <button
                  type="button"
                  onClick={() => aller(1)}
                  className={boutonRond}
                  aria-label={visionneuse.suivante}
                >
                  <ChevronRight aria-hidden="true" className="size-5" />
                </button>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
