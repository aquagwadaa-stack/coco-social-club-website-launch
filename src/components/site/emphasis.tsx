import { Fragment, type ReactNode } from "react";

/** Empêche la coupure d'un mot composé en fin de ligne : « bien-être » reste entier. */
function keepCompoundWords(text: string, keyPrefix: string): ReactNode[] {
  return text.split(/(\s+)/).map((token, index) =>
    /\p{L}-\p{L}/u.test(token) ? (
      <span key={`${keyPrefix}-${index}`} className="whitespace-nowrap">
        {token}
      </span>
    ) : (
      <Fragment key={`${keyPrefix}-${index}`}>{token}</Fragment>
    ),
  );
}

/**
 * Affiche un texte de src/content.ts en mettant en italique les passages entre astérisques :
 * "Ton club de *bien-être*" devient « Ton club de <em>bien-être</em> ».
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split("*");
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <em key={index}>{keepCompoundWords(part, `em-${index}`)}</em>
        ) : (
          <Fragment key={index}>{keepCompoundWords(part, `txt-${index}`)}</Fragment>
        ),
      )}
    </>
  );
}

/** Le même texte sans les astérisques, pour les attributs et les balises meta. */
export function plainText(text: string): string {
  return text.replaceAll("*", "");
}
