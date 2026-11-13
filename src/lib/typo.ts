/**
 * Typographie française appliquée automatiquement aux textes de src/content.ts.
 *
 * On écrit les textes avec des espaces et des apostrophes ordinaires ; cette fonction pose
 * les espaces insécables (avant : ; ? ! », après «, entre un nombre et son unité)
 * et les apostrophes typographiques. Les liens, adresses e-mail et identifiants ne sont pas touchés.
 */

/** Espace insécable (U+00A0). */
export const NBSP = String.fromCharCode(0xa0);

/** Clés dont la valeur est technique (lien, identifiant, chemin) et ne doit pas être modifiée. */
const TECHNICAL_KEYS = new Set([
  "id",
  "slug",
  "href",
  "url",
  "src",
  "to",
  "ancre",
  "ancreTarifs",
  "motif",
  "tone",
  "action",
  "categorie",
  "famille",
  "format",
  "numero",
  "lien",
  "integration",
]);

const LOOKS_TECHNICAL = /^(https?:\/\/|mailto:|tel:|\/|#)/;

const UNIT_AFTER_NUMBER = /(\d) (€|%|h\b|min\b|minutes?\b|heures?\b)/g;
const MINUTES_AFTER_HOUR = new RegExp(`(\\d${NBSP}h) (\\d)`, "g");

export function typo(text: string): string {
  if (LOOKS_TECHNICAL.test(text)) return text;

  return (
    text
      // Apostrophe typographique entre deux lettres : l'EMS devient l’EMS
      .replace(/(\p{L})'(\p{L})/gu, "$1’$2")
      // Guillemets français
      .replace(/« /g, `«${NBSP}`)
      .replace(/ »/g, `${NBSP}»`)
      // Ponctuation haute
      .replace(/ ([:;?!])/g, `${NBSP}$1`)
      // Nombre et unité : 199 €, 20 minutes, 10 %, 8 h, 60 min
      .replace(UNIT_AFTER_NUMBER, `$1${NBSP}$2`)
      // Heures et minutes : 8 h 30
      .replace(MINUTES_AFTER_HOUR, `$1${NBSP}$2`)
  );
}

export function typoDeep<T>(value: T, key?: string): T {
  if (typeof value === "string") {
    if (key && TECHNICAL_KEYS.has(key)) return value;
    return typo(value) as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => typoDeep(item, key)) as unknown as T;
  }

  if (value !== null && typeof value === "object") {
    const output: Record<string, unknown> = {};
    for (const [childKey, childValue] of Object.entries(value as Record<string, unknown>)) {
      output[childKey] = typoDeep(childValue, childKey);
    }
    return output as T;
  }

  return value;
}
