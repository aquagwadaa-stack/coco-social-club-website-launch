import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { content } from "@/content";
import { buttonStyles } from "./cta";

type Choice = "accepte" | "refuse";

const STORAGE_KEY = "csc-preferences-v1";

/** Événement envoyé par le lien « Gérer mes cookies » du pied de page pour rouvrir le bandeau. */
export const OPEN_PREFS_EVENT = "csc:ouvrir-preferences";

function readChoice(): Choice | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepte" || stored === "refuse" ? stored : null;
  } catch {
    return null;
  }
}

function writeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    // Stockage indisponible (navigation privée stricte) : le choix vaut pour la page en cours.
  }
}

/**
 * Bandeau de consentement aux cookies de mesure d'audience.
 * Dans cette démonstration, aucun cookie de mesure n'est déposé : seul le choix du visiteur
 * est gardé dans son navigateur. « Refuser » est aussi simple que « Accepter ».
 */
export function PrefsBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice() === null) setVisible(true);
    const reopen = () => setVisible(true);
    window.addEventListener(OPEN_PREFS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, reopen);
  }, []);

  if (!visible) return null;

  const { cookies } = content;

  const choose = (choice: Choice) => {
    writeChoice(choice);
    setVisible(false);
  };

  return (
    <section
      aria-label={cookies.etiquette}
      className="csc-fade-up fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-xl rounded-3xl border border-ligne bg-blanc p-5 text-espresso shadow-[0_18px_50px_-18px_rgba(46,34,28,0.45)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:mx-0 sm:p-6"
    >
      <h2 className="csc-serif text-[1.35rem]">{cookies.titre}</h2>
      <p className="mt-2 text-[0.98rem] text-moka-soft">{cookies.texte}</p>
      <p className="mt-2 text-[0.86rem] text-moka-soft">
        {cookies.demo}{" "}
        <Link
          to="/mentions-legales"
          hash="cookies"
          className="csc-link font-semibold text-espresso"
        >
          {cookies.enSavoirPlus}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => choose("refuse")}
          className={buttonStyles({ tone: "outline", size: "sm" })}
        >
          {cookies.refuser}
        </button>
        <button
          type="button"
          onClick={() => choose("accepte")}
          className={buttonStyles({ tone: "moka", size: "sm" })}
        >
          {cookies.accepter}
        </button>
      </div>
    </section>
  );
}
