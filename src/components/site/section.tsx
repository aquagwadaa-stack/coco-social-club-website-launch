import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Emphasis } from "./emphasis";

type SectionHeadingProps = {
  surtitre?: string;
  /** Titre : les passages entre astérisques s'affichent en italique. */
  titre: string;
  texte?: string;
  /** Niveau du titre. */
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  /** Sur fond moka. */
  light?: boolean;
  className?: string;
  children?: ReactNode;
};

/** Bloc titre d'une section : surtitre, titre, texte d'introduction. */
export function SectionHeading({
  surtitre,
  titre,
  texte,
  as: Tag = "h2",
  align = "left",
  light = false,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {surtitre && (
        <p className={cn("csc-eyebrow", light ? "text-sable-clair" : "text-moka-soft")}>
          {surtitre}
        </p>
      )}
      <Tag
        className={cn(
          surtitre && "mt-4",
          Tag === "h1"
            ? "text-[2.6rem] sm:text-6xl lg:text-[4.25rem]"
            : "text-[2.15rem] sm:text-[2.75rem] lg:text-5xl",
        )}
      >
        <Emphasis text={titre} />
      </Tag>
      {texte && (
        <p
          className={cn(
            "mt-5 text-[1.12rem] leading-relaxed",
            align === "center" && "mx-auto",
            "max-w-2xl",
            light ? "text-creme/85" : "text-moka-soft",
          )}
        >
          {texte}
        </p>
      )}
      {children}
    </div>
  );
}

/** Petite étiquette arrondie : « Exemple », « Offerte », durée… */
export function Pill({
  children,
  tone = "beige",
  className,
}: {
  children: ReactNode;
  tone?: "beige" | "moka" | "outline" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.8rem] font-semibold leading-tight",
        tone === "beige" && "bg-beige text-espresso",
        tone === "moka" && "bg-moka text-blanc",
        tone === "outline" && "border border-moka/35 text-moka",
        tone === "light" && "border border-creme/40 text-creme",
        className,
      )}
    >
      {children}
    </span>
  );
}
