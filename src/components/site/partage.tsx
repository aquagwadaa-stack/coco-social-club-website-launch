import { useEffect, useState } from "react";
import { Check, Facebook, Link2, MessageCircle, Share2 } from "lucide-react";
import { content } from "@/content";
import { cn } from "@/lib/utils";

type PartageProps = {
  /** Titre de la page partagée. */
  titre: string;
  className?: string;
};

const itemClass =
  "inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-moka/30 px-4 text-[0.92rem] font-semibold text-espresso transition-colors hover:border-moka hover:bg-creme";

/**
 * Boutons de partage : partage du téléphone quand il existe, WhatsApp, Facebook et copie du lien.
 * Aucun script de réseau social n'est chargé : ce sont de simples liens.
 */
export function Partage({ titre, className }: PartageProps) {
  const { partage, site } = content;
  const [url, setUrl] = useState("");
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
    setCanShare(typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(`${titre} ${url}`);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const shareNative = async () => {
    try {
      await navigator.share({ title: titre, url });
    } catch {
      // Partage annulé par le visiteur : rien à faire.
    }
  };

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="csc-eyebrow mr-1 text-moka-soft">{partage.titre}</span>
      {canShare && (
        <button type="button" onClick={shareNative} className={itemClass}>
          <Share2 aria-hidden="true" className="size-4" />
          {partage.natif}
        </button>
      )}
      <a
        href={`https://wa.me/?text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label={`${partage.whatsapp} (${site.nouvelOnglet})`}
      >
        <MessageCircle aria-hidden="true" className="size-4" />
        WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        aria-label={`${partage.facebook} (${site.nouvelOnglet})`}
      >
        <Facebook aria-hidden="true" className="size-4" />
        Facebook
      </a>
      <button type="button" onClick={copy} className={itemClass}>
        {copied ? (
          <Check aria-hidden="true" className="size-4" />
        ) : (
          <Link2 aria-hidden="true" className="size-4" />
        )}
        <span aria-live="polite">{copied ? partage.copie : partage.copier}</span>
      </button>
    </div>
  );
}
