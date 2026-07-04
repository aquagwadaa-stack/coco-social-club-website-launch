import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

type Consent = "accepted" | "refused";

const STORAGE_KEY = "coco-cookie-consent";

export function CookieBanner() {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Consent | null;
    setConsent(stored);
    setReady(true);
  }, []);

  function choose(value: Consent) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
  }

  if (!ready || consent) return null;

  return (
    <aside
      aria-label="Préférences de confidentialité"
      className="fixed inset-x-4 bottom-4 z-[80] mx-auto max-w-4xl rounded-[1.5rem] border border-border bg-background/95 p-5 shadow-2xl backdrop-blur md:flex md:items-center md:gap-6"
    >
      <div className="flex-1">
        <p className="font-serif text-xl">Ton expérience, tes préférences.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Nous utilisons des cookies nécessaires au fonctionnement du site. Les outils de mesure
          d’audience ne seront activés qu’avec ton accord. Consulte notre{" "}
          <Link to="/confidentialite" className="underline underline-offset-4">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 md:mt-0 md:shrink-0">
        <button onClick={() => choose("refused")} className="btn-pill border border-border py-2.5">
          Continuer sans mesure
        </button>
        <button
          onClick={() => choose("accepted")}
          className="btn-pill bg-primary py-2.5 text-primary-foreground"
        >
          Accepter
        </button>
      </div>
    </aside>
  );
}
