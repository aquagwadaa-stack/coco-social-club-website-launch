import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHero, SiteLayout } from "@/components/site/layout";
import aerial from "@/assets/aerial-yoga.jpg";
import community from "@/assets/community.jpg";
import ems from "@/assets/ems-training.jpg";
import hero from "@/assets/hero-rooftop.jpg";
import massage from "@/assets/massage.jpg";
import rooftop from "@/assets/rooftop-view.jpg";
import tan from "@/assets/tan.jpg";
import wellness from "@/assets/wellness-room.jpg";

const photos = [
  { src: hero, alt: "Rooftop avec vue mer du Coco Social Club", label: "Le rooftop" },
  { src: ems, alt: "Séance d’électrostimulation accompagnée", label: "EMS & coaching" },
  { src: community, alt: "Espace sportif tropical et chaleureux", label: "L’esprit Coco" },
  { src: aerial, alt: "Espace dédié au yoga aérien", label: "Yoga aérien" },
  { src: rooftop, alt: "Terrasse bien-être face à la mer", label: "Vue mer" },
  { src: wellness, alt: "Cabine de soin du Coco Social Club", label: "Les soins" },
  { src: massage, alt: "Massage dans une ambiance chaleureuse", label: "Détente" },
  { src: tan, alt: "Univers lumineux du tan bronzage", label: "Tan bronzage" },
];

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Coco Social Club, Le Moule" },
      {
        name: "description",
        content:
          "Découvre les espaces, les séances, le rooftop et l’ambiance du Coco Social Club au Moule.",
      },
      { property: "og:title", content: "L’univers Coco Social Club en images" },
      { property: "og:url", content: "/galerie" },
    ],
    links: [{ rel: "canonical", href: "/galerie" }],
  }),
  component: Galerie,
});

function Galerie() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Galerie"
        title="Une énergie, une lumière, une communauté."
        subtitle="Entre séances coachées, soins et moments partagés, découvre l’univers Coco Social Club."
      />

      <section className="container-editorial grid grid-cols-2 gap-3 pb-24 md:gap-6 lg:grid-cols-4">
        {photos.map((photo, index) => (
          <figure
            key={photo.label}
            className={`group relative overflow-hidden rounded-[1.5rem] ${
              index === 0 || index === 5 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="h-full min-h-64 w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              loading={index < 4 ? "eager" : "lazy"}
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-14 text-sm text-white">
              {photo.label}
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="container-editorial pb-28 text-center">
        <p className="font-serif italic text-xl text-taupe">Vivez l’expérience Coco.</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-5xl md:text-6xl">
          Le mieux reste encore de venir.
        </h2>
        <Link to="/reservation" className="btn-pill mt-8 bg-primary text-primary-foreground">
          Réserver une séance <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>
    </SiteLayout>
  );
}
