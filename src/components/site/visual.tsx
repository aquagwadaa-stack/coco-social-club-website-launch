import {
  AudioLines,
  BicepsFlexed,
  CalendarDays,
  Camera,
  DoorOpen,
  Drum,
  Dumbbell,
  Feather,
  Flame,
  Flower2,
  Gift,
  HeartPulse,
  Info,
  Instagram,
  Layers,
  Leaf,
  Lightbulb,
  Megaphone,
  Music,
  PersonStanding,
  Snowflake,
  Sparkles,
  Sprout,
  Sun,
  Target,
  Ticket,
  TreePalm,
  Users,
  UsersRound,
  Waves,
  Wind,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Motif, Photo, Tone } from "@/content";
import { cn } from "@/lib/utils";

/** Pictogramme au trait affiché tant que la photo n'est pas fournie. */
const ICONS: Record<Motif, LucideIcon> = {
  club: TreePalm,
  accueil: DoorOpen,
  equipe: UsersRound,
  ems: Zap,
  decouverte: Sparkles,
  salle: Dumbbell,
  daypass: Ticket,
  coaching: Target,
  groupe: Users,
  abdos: Flame,
  sculpt: BicepsFlexed,
  cardio: HeartPulse,
  pilates: Flower2,
  stretching: PersonStanding,
  aerien: Feather,
  yoga: Sprout,
  kuduro: Music,
  gwoka: Drum,
  soca: AudioLines,
  spa: Waves,
  presso: Wind,
  cryo: Snowflake,
  bronzage: Sun,
  nutrition: Leaf,
  serviette: Layers,
  cadeau: Gift,
  photo: Camera,
  nouveaute: Megaphone,
  evenement: CalendarDays,
  conseil: Lightbulb,
  info: Info,
  instagram: Instagram,
};

const TONES: Record<Tone, { surface: string; line: string; icon: string }> = {
  moka: {
    surface: "bg-gradient-to-br from-moka to-moka-deep",
    line: "text-creme/25",
    icon: "text-creme border-creme/40",
  },
  taupe: {
    surface: "bg-gradient-to-br from-taupe to-moka-soft",
    line: "text-creme/30",
    icon: "text-creme border-creme/45",
  },
  sable: {
    surface: "bg-gradient-to-br from-sable-clair to-sable",
    line: "text-moka/25",
    icon: "text-moka border-moka/35",
  },
  beige: {
    surface: "bg-gradient-to-br from-creme to-beige",
    line: "text-moka/20",
    icon: "text-moka border-moka/30",
  },
  creme: {
    surface: "bg-creme",
    line: "text-moka/15",
    icon: "text-moka border-moka/25",
  },
};

const ICON_SIZES = {
  sm: "size-11 [&_svg]:size-5",
  md: "size-16 [&_svg]:size-7",
  lg: "size-24 [&_svg]:size-10",
} as const;

type VisualProps = {
  photo: Photo;
  /** Forme et proportions : par exemple "aspect-[4/5] rounded-3xl" ou "csc-arch aspect-[4/5]". */
  className?: string;
  /** Composition du décor quand il n'y a pas de photo (0 à 3). */
  variant?: 0 | 1 | 2 | 3;
  iconSize?: keyof typeof ICON_SIZES;
  /** Charge l'image tout de suite (premier écran). */
  priority?: boolean;
  /** Petite légende posée sur le visuel, par exemple « Photo à venir ». */
  label?: string;
};

/**
 * Emplacement photo.
 * Si la photo est renseignée dans src/content.ts, elle est affichée.
 * Sinon, un aplat sobre aux couleurs du club, avec un pictogramme au trait, prend sa place.
 */
export function Visual({
  photo,
  className,
  variant = 0,
  iconSize = "md",
  priority = false,
  label,
}: VisualProps) {
  if (photo.src) {
    return (
      <div className={cn("relative isolate overflow-hidden bg-beige", className)}>
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    );
  }

  const tone = TONES[photo.tone];
  const Icon = ICONS[photo.motif];

  return (
    <div
      className={cn("relative isolate overflow-hidden", tone.surface, className)}
      aria-hidden="true"
    >
      <Decor variant={variant} className={tone.line} />
      <div className="absolute inset-0 grid place-items-center">
        <span
          className={cn(
            "grid place-items-center rounded-full border [&_svg]:stroke-[1.25]",
            ICON_SIZES[iconSize],
            tone.icon,
          )}
        >
          <Icon />
        </span>
      </div>
      {label && (
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-3 py-1 text-[0.74rem] font-semibold tracking-wide",
            photo.tone === "moka" || photo.tone === "taupe"
              ? "bg-espresso/35 text-creme"
              : "bg-blanc/70 text-moka",
          )}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/** Décor au trait : cercles et arcs, en écho au logo rond du club. */
function Decor({ variant, className }: { variant: 0 | 1 | 2 | 3; className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={cn("absolute inset-0 h-full w-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      focusable="false"
    >
      {variant === 0 && (
        <>
          <circle cx="330" cy="350" r="250" />
          <circle cx="330" cy="350" r="180" />
          <circle cx="330" cy="350" r="110" />
        </>
      )}
      {variant === 1 && (
        <>
          <circle cx="60" cy="50" r="230" />
          <circle cx="60" cy="50" r="160" />
          <circle cx="60" cy="50" r="90" />
          <path d="M0 330 H400" />
        </>
      )}
      {variant === 2 && (
        <>
          <circle cx="200" cy="420" r="260" />
          <circle cx="200" cy="420" r="200" />
          <circle cx="200" cy="420" r="140" />
          <circle cx="200" cy="420" r="80" />
        </>
      )}
      {variant === 3 && (
        <>
          <path d="M-20 300 C 60 260, 120 340, 200 300 S 340 260, 420 300" />
          <path d="M-20 335 C 60 295, 120 375, 200 335 S 340 295, 420 335" />
          <path d="M-20 370 C 60 330, 120 410, 200 370 S 340 330, 420 370" />
          <circle cx="320" cy="90" r="120" />
          <circle cx="320" cy="90" r="70" />
        </>
      )}
    </svg>
  );
}
