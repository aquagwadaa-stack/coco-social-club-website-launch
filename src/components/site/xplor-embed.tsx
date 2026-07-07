import { ExternalLink, Smartphone } from "lucide-react";

export const XPLOR_RESERVATION_URL = "https://member-app.deciplus.pro/cocosc";
export const XPLOR_SHOP_URL = "https://member-app.deciplus.pro/cocosc/shop";

type XplorEmbedProps = {
  src: string;
  title: string;
  eyebrow?: string;
  description?: string;
  ctaLabel?: string;
  className?: string;
};

export function XplorEmbed({
  src,
  title,
  eyebrow = "Espace membre Xplor",
  description = "Le module ci-dessous permet de consulter les disponibilités et de poursuivre le parcours dans l’espace membre officiel Coco Social Club.",
  ctaLabel = "Ouvrir en plein écran",
  className = "",
}: XplorEmbedProps) {
  return (
    <div className={"rounded-[2rem] border border-border bg-background shadow-sm " + className}>
      <div className="flex flex-col gap-4 border-b border-border/60 p-5 md:flex-row md:items-center md:justify-between md:p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">{title}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="btn-pill shrink-0 border border-border bg-cream text-foreground"
        >
          {ctaLabel} <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      <div className="relative overflow-hidden rounded-b-[2rem] bg-white">
        <iframe
          title={title}
          src={src}
          className="h-[760px] w-full border-0 md:h-[820px]"
          loading="lazy"
          allow="payment *; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="flex items-start gap-3 border-t border-border/60 bg-cream/60 px-5 py-4 text-xs leading-5 text-muted-foreground md:px-6">
        <Smartphone className="mt-0.5 h-4 w-4 shrink-0" />
        <p>
          Si l’affichage intégré est limité par le navigateur, le bouton plein écran ouvre le même
          parcours Xplor dans un nouvel onglet.
        </p>
      </div>
    </div>
  );
}
