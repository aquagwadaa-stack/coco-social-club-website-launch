import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { content } from "../content";
import { buttonStyles } from "../components/site/cta";
import { Logo } from "../components/site/logo";
import { PrefsBanner } from "../components/site/prefs";

function NotFoundComponent() {
  const { introuvable } = content;
  return (
    <div className="flex min-h-screen items-center justify-center bg-creme px-5 py-16">
      <div className="max-w-md text-center">
        <Logo className="mx-auto size-24" />
        <h1 className="mt-8 text-[2.4rem]">{introuvable.titre}</h1>
        <p className="mt-3 text-moka-soft">{introuvable.texte}</p>
        <Link to="/" className={buttonStyles({ className: "mt-7" })}>
          {introuvable.bouton}
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { erreur } = content;
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-creme px-5 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-[2.1rem]">{erreur.titre}</h1>
        <p className="mt-3 text-moka-soft">{erreur.texte}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonStyles()}
          >
            {erreur.reessayer}
          </button>
          <a href="/" className={buttonStyles({ tone: "outline" })}>
            {erreur.accueil}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: content.site.titreParDefaut },
      { name: "description", content: content.site.descriptionParDefaut },
      // Démonstration : le site ne doit pas être référencé par les moteurs de recherche.
      { name: "robots", content: "noindex, nofollow" },
      { name: "googlebot", content: "noindex, nofollow" },
      { name: "theme-color", content: "#5E483D" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:site_name", content: content.site.nom },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:title", content: content.site.titreParDefaut },
      { property: "og:description", content: content.site.descriptionParDefaut },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Polices servies localement (public/fonts), préchargées pour éviter un saut de texte.
      {
        rel: "preload",
        href: "/fonts/fraunces-latin-opsz-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: "/fonts/dm-sans-latin-wght-normal.woff2",
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Les pages s'affichent ici. Ne pas retirer <Outlet />. */}
      <Outlet />
      <PrefsBanner />
    </QueryClientProvider>
  );
}
