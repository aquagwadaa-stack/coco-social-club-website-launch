import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="bg-[color:var(--brown-deep)] text-[color:var(--cream-warm)] mt-24">
      <div className="container-editorial py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <BrandMark className="h-14 w-14" />
            <span className="leading-none">
              <span className="block font-serif text-3xl">Coco</span>
              <span className="mt-1.5 block text-[9px] uppercase tracking-[0.3em] opacity-70">
                Social Club
              </span>
            </span>
          </div>
          <p className="font-serif italic text-2xl mt-6 max-w-md leading-snug">
            Là où le sport rencontre le bien-être.
          </p>
          <p className="mt-6 text-sm opacity-80 max-w-md">
            Un espace chaleureux, confortable et inspirant. Un endroit où l'on aime venir.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/590690979545"
              target="_blank"
              rel="noreferrer"
              className="btn-pill bg-[color:var(--cream-warm)] text-[color:var(--brown-deep)]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a
              href="https://www.instagram.com/coco_socialclub/"
              target="_blank"
              rel="noreferrer"
              className="btn-pill border border-[color:var(--cream-warm)]/40"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.24em] opacity-70 mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["/", "Accueil"],
              ["/le-club", "Le Club"],
              ["/sport", "Sport"],
              ["/bien-etre", "Bien-être"],
              ["/planning", "Planning"],
              ["/tarifs", "Tarifs"],
              ["/boutique", "Boutique"],
              ["/galerie", "Galerie"],
              ["/reservation", "Réserver"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="opacity-80 hover:opacity-100">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.24em] opacity-70 mb-4">Nous trouver</h4>
          <address className="not-italic text-sm space-y-3 opacity-90">
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                6 rue de Portland
                <br />
                97160 Le Moule
                <br />
                Guadeloupe
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+590690979545">+590 690 97 95 45</a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:cocosocialclub1@gmail.com" className="break-all">
                cocosocialclub1@gmail.com
              </a>
            </p>
            <p className="text-xs opacity-70 pl-6">Cryolipolyse&nbsp;: 06 90 970 646</p>
            <p className="text-xs opacity-70 pl-6">Pole Dance&nbsp;: 06 99 66 73 25</p>
          </address>
        </div>
      </div>

      <div className="border-t border-[color:var(--cream-warm)]/15">
        <div className="container-editorial py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs opacity-70">
          <p>© {new Date().getFullYear()} Coco Social Club. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link to="/mentions-legales">Mentions légales</Link>
            <Link to="/confidentialite">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
