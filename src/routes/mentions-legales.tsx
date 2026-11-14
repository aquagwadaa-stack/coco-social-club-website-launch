import { createFileRoute } from "@tanstack/react-router";
import { PencilLine } from "lucide-react";
import { content } from "@/content";
import { ArrowLink, buttonStyles } from "@/components/site/cta";
import { PageHeader, SiteLayout } from "@/components/site/layout";
import { OPEN_PREFS_EVENT } from "@/components/site/prefs";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: content.mentionsLegales.meta.titre },
      { name: "description", content: content.mentionsLegales.meta.description },
      { property: "og:title", content: content.mentionsLegales.meta.titre },
      { property: "og:description", content: content.mentionsLegales.meta.description },
    ],
  }),
  component: MentionsLegalesPage,
});

/**
 * Mentions légales : la page montre la structure, sans aucun texte juridique inventé.
 * Les textes définitifs sont rédigés et validés par le club.
 */
function MentionsLegalesPage() {
  const { mentionsLegales, cookies, actions } = content;

  return (
    <SiteLayout>
      <PageHeader
        surtitre={mentionsLegales.entete.surtitre}
        titre={mentionsLegales.entete.titre}
        texte={mentionsLegales.entete.texte}
      />

      <section className="csc-section">
        <div className="csc-container grid gap-x-16 gap-y-8 lg:grid-cols-[15rem_minmax(0,46rem)]">
          <nav aria-label={mentionsLegales.sommaire} className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="csc-eyebrow font-sans text-moka-soft">{mentionsLegales.sommaire}</h2>
            <ul className="mt-3 flex flex-wrap gap-2 lg:grid lg:gap-0.5">
              {mentionsLegales.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-[44px] items-center rounded-full border border-ligne px-4 text-[0.96rem] font-medium whitespace-nowrap transition-colors hover:border-moka hover:bg-creme lg:min-h-[40px] lg:rounded-none lg:border-0 lg:px-0 lg:hover:bg-transparent lg:hover:underline lg:hover:underline-offset-4"
                  >
                    {section.titre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-12">
            {mentionsLegales.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-titre`}>
                <h2 id={`${section.id}-titre`} className="text-[1.9rem] sm:text-[2.2rem]">
                  {section.titre}
                </h2>

                {section.lignes.length > 0 && (
                  <div className="mt-4 grid gap-3 text-[1.06rem] leading-relaxed">
                    {section.lignes.map((ligne) => (
                      <p key={ligne}>{ligne}</p>
                    ))}
                  </div>
                )}

                {section.id === "cookies" && (
                  <button
                    type="button"
                    onClick={() => window.dispatchEvent(new Event(OPEN_PREFS_EVENT))}
                    className={buttonStyles({ tone: "outline", className: "mt-5" })}
                  >
                    {cookies.gerer}
                  </button>
                )}

                <p className="mt-5 flex gap-3 rounded-2xl border border-dashed border-moka/40 bg-creme/60 p-4 text-[0.98rem] text-moka-soft">
                  <PencilLine
                    aria-hidden="true"
                    className="mt-[0.15em] size-5 shrink-0 text-moka"
                    strokeWidth={1.5}
                  />
                  <span>
                    <span className="font-semibold text-espresso">{mentionsLegales.aFournir}</span>{" "}
                    {section.aCompleter}
                  </span>
                </p>
              </section>
            ))}

            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-ligne pt-7">
              <ArrowLink to="/">{mentionsLegales.retour}</ArrowLink>
              <ArrowLink to="/contact">{actions.contact}</ArrowLink>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
