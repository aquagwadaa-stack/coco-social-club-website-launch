import type { ReactNode } from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { content, type ActionKey } from "@/content";
import { cn } from "@/lib/utils";

/** Styles des boutons du site. La base « csc-btn » est définie dans src/styles.css. */
export const buttonStyles = cva("csc-btn", {
  variants: {
    tone: {
      /** Bouton principal sur fond clair. */
      moka: "bg-moka text-blanc hover:bg-moka-deep",
      /** Bouton principal sur fond moka. */
      creme: "bg-creme text-espresso hover:bg-blanc",
      /** Bouton secondaire sur fond clair. */
      outline: "border-moka/40 text-espresso hover:border-moka hover:bg-creme",
      /** Bouton secondaire sur fond moka. */
      outlineLight: "border-creme/50 text-creme hover:border-creme hover:bg-creme/10",
      /** Bouton discret sur fond clair. */
      soft: "bg-creme text-espresso hover:bg-beige",
    },
    size: {
      sm: "px-4 py-2 text-[0.92rem]",
      md: "",
      lg: "px-7 py-3.5 text-[1.03rem]",
    },
  },
  defaultVariants: { tone: "moka", size: "md" },
});

type ButtonStyleProps = VariantProps<typeof buttonStyles>;

type ExternalButtonProps = ButtonStyleProps & {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Lien externe en forme de bouton : s'ouvre dans un nouvel onglet, et le dit aux lecteurs d'écran. */
export function ExternalButton({ href, children, tone, size, className }: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonStyles({ tone, size }), className)}
    >
      {children}
      <ArrowUpRight aria-hidden="true" />
      <span className="sr-only"> ({content.site.nouvelOnglet})</span>
    </a>
  );
}

const ACTION_TARGET: Record<ActionKey, { href: string; label: string }> = {
  reservation: { href: content.deciplus.reservation, label: content.actions.reservation },
  decouverte: { href: content.deciplus.reservation, label: content.actions.reserverDecouverte },
  boutique: { href: content.deciplus.boutique, label: content.actions.boutique },
  offrir: { href: content.deciplus.boutique, label: content.actions.offrir },
};

type DeciplusButtonProps = ButtonStyleProps & {
  /** reservation et decouverte mènent à la réservation Deciplus ; boutique et offrir à la boutique Deciplus. */
  action?: ActionKey;
  /** Libellé affiché. Par défaut, celui de src/content.ts. */
  children?: ReactNode;
  className?: string;
};

/**
 * Bouton vers l'espace Deciplus du club, toujours dans un nouvel onglet.
 * Le site ne prend ni réservation ni paiement.
 */
export function DeciplusButton({
  action = "reservation",
  children,
  tone,
  size,
  className,
}: DeciplusButtonProps) {
  const target = ACTION_TARGET[action];
  return (
    <ExternalButton href={target.href} tone={tone} size={size} className={className}>
      {children ?? target.label}
    </ExternalButton>
  );
}

type ButtonLinkProps = ButtonStyleProps & {
  to: LinkProps["to"];
  hash?: string;
  children: ReactNode;
  className?: string;
  /** Affiche une flèche après le libellé. */
  arrow?: boolean;
};

/** Lien interne en forme de bouton. */
export function ButtonLink({ to, hash, children, tone, size, className, arrow }: ButtonLinkProps) {
  return (
    <Link to={to} hash={hash} className={cn(buttonStyles({ tone, size }), className)}>
      {children}
      {arrow && <ArrowRight aria-hidden="true" />}
    </Link>
  );
}

type TextLinkProps = {
  to: LinkProps["to"];
  hash?: string;
  children: ReactNode;
  className?: string;
};

/** Lien interne en texte, avec une flèche. */
export function ArrowLink({ to, hash, children, className }: TextLinkProps) {
  return (
    <Link
      to={to}
      hash={hash}
      className={cn(
        "group inline-flex min-h-[44px] items-center gap-2 font-semibold underline decoration-1 underline-offset-[0.3em] hover:decoration-2",
        className,
      )}
    >
      {children}
      <ArrowRight
        aria-hidden="true"
        className="size-[1.05em] transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
}
