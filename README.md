# Coco Social Club — démonstration de site

Démonstration du futur site du **Coco Social Club**, club de sport et de bien-être au Moule (Guadeloupe), réalisée par Gwada Web Studio.

Ce n'est pas le site définitif : tout se modifie (textes, couleurs, photos, structure). Le site est en `noindex, nofollow` et porte en pied de page la mention « Démonstration réalisée par Gwada Web Studio ».

## Périmètre

Les pages demandées par le cahier des charges du club (juillet 2026) :

| Page                    | Adresse             | Contenu                                                                                                                                                  |
| ----------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Accueil                 | `/`                 | Grand visuel, présentation courte, avantages, activités phares, séance découverte, formules, note Google, emplacement du flux Instagram, infos pratiques |
| Le club                 | `/le-club`          | Origine, philosophie, valeurs, équipe, « Pourquoi choisir le Coco Social Club ? », entreprises et partenaires                                            |
| Activités               | `/activites`        | Cinq familles, vingt activités : description, bénéfices, public concerné, emplacement photo                                                              |
| Planning et réservation | `/planning`         | Comment réserver, semaine d'exemple, accès salle                                                                                                         |
| Tarifs                  | `/tarifs`           | Abonnements, séances et cartes, soins, cartes cadeaux                                                                                                    |
| Boutique                | `/boutique`         | Vitrine des produits vendus au club, cartes cadeaux                                                                                                      |
| Galerie                 | `/galerie`          | Locaux, ambiance, séances, événements, coachs, avec filtres et visionneuse                                                                               |
| Actualités              | `/actualites`       | Nouveautés, événements, conseils, infos importantes, boutons de partage                                                                                  |
| Contact                 | `/contact`          | Message préparé pour WhatsApp ou e-mail, téléphone, e-mail, adresse, carte, horaires                                                                     |
| Mentions légales        | `/mentions-legales` | Structure des mentions, données personnelles et cookies                                                                                                  |

Sur tout le site : liens vers les réseaux sociaux, bandeau de préférences pour les cookies, boutons de partage.

Ce que la démonstration ne fait pas :

- **Ni réservation ni paiement.** Les boutons « Réserver », « Séance découverte » et « Offrir » ouvrent l'espace Deciplus du club dans un nouvel onglet.
- **Aucun envoi, aucun stockage.** Le formulaire de contact prépare un message que le visiteur envoie lui-même par WhatsApp ou par e-mail. Aucun backend, aucun compte, aucune base de données.
- **Aucun cookie de mesure.** Le bandeau montre le fonctionnement prévu ; seul le choix du visiteur est gardé dans son navigateur.
- **Pas d'espace d'administration.**

## Liens

- Dépôt : `aquagwadaa-stack/coco-social-club-website-launch`, branche de travail `claude/coco-social-club-demo-9a1jfu`.
- Projet Lovable, aperçu et démo publique : à renseigner. Au 14 novembre 2026, aucun projet Lovable n'est relié à ce dépôt.
- Réservation du club : <https://member-app.deciplus.pro/cocosc>
- Boutique du club : <https://member-app.deciplus.pro/cocosc/shop>

## Où modifier quoi

| Pour changer                            | Fichier                                                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Un texte, un tarif, un horaire, un lien | `src/content.ts` (tout y est, avec le mode d'emploi en tête de fichier)                                                       |
| Une photo                               | Déposer le fichier dans `public/images`, puis renseigner son chemin dans `src/content.ts` (voir `public/images/LISEZ-MOI.md`) |
| Une couleur                             | `src/styles.css`, bloc `:root`                                                                                                |
| La densité générale                     | `src/styles.css`, règle `html { font-size: 92%; }`                                                                            |
| Le logo                                 | `src/components/site/logo.tsx` et `public/favicon.svg`                                                                        |
| Une page                                | `src/routes/` (une page par fichier)                                                                                          |

La typographie française (espaces insécables, apostrophes courbes) est posée automatiquement sur les textes de `src/content.ts` par `src/lib/typo.ts`.

## Lancer le projet

```bash
bun install
bun run dev      # développement
bun run build    # build de production
bun run lint     # ESLint
```

Base Lovable : TanStack Start, React 19, TypeScript, Tailwind CSS 4. Aucune dépendance ajoutée au modèle.

Polices servies localement depuis `public/fonts`, sous licence SIL Open Font License 1.1 (textes de licence dans le même dossier) : Fraunces pour les titres, DM Sans pour le texte.

## Ce qui est réel

| Information                                                                                                       | Source                     | Date du relevé   |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------- |
| Nom et adresse : 6 rue de Portland, 97160 Le Moule                                                                | Fiche Google du club       | 12 novembre 2026 |
| Téléphone 0690 97 95 45, aussi utilisé pour WhatsApp                                                              | Fiche Google du club       | 12 novembre 2026 |
| Téléphone 0590 68 84 64, e-mail hello@cocosocialclub.fr, Instagram @coco_socialclub                               | Relevé du studio           | 12 novembre 2026 |
| Horaires : lundi au vendredi 8 h 30 – 20 h, samedi 8 h 30 – 13 h, fermé le dimanche                               | Fiche Google du club       | 12 novembre 2026 |
| Note Google : 4,9 sur 5, 22 avis (aucun avis n'est reproduit)                                                     | Fiche Google du club       | 12 novembre 2026 |
| Les quatre phrases reprises telles quelles, dont « On transforme 20 minutes en résultats VISIBLES grâce à l'EMS » | Bio Instagram du club      | 12 novembre 2026 |
| Liste des vingt activités et de leurs cinq familles                                                               | Deciplus du club           | 12 novembre 2026 |
| Tous les tarifs : abonnements, cartes, soins, cartes cadeaux                                                      | Boutique Deciplus du club  | 12 novembre 2026 |
| Liens de réservation et de boutique                                                                               | Deciplus du club           | 12 novembre 2026 |
| Liste des pages et des rubriques, produits vendus au club (Nutripure, serviettes brodées)                         | Cahier des charges du club | Juillet 2026     |

L'offre de rentrée, saisonnière, n'est pas affichée. La page Tarifs porte la mention « Tarifs indicatifs, à jour sur la boutique ».

## Ce qui est proposé

Rédigé ou dessiné par le studio, à valider ou à remplacer par le club :

- **Tous les textes de présentation** : accueil, origine, philosophie, valeurs, « Pourquoi choisir le Coco Social Club ? », entreprises et partenaires, étapes de réservation, boutique, contact.
- **Les fiches d'activité** : description, bénéfices et public concerné de chaque activité. Elles décrivent ce qu'on y fait, sans promesse de santé ni de minceur.
- **Le logo**, redessiné en vectoriel d'après sa description écrite (rond moka, dessin au trait crème, « COCO-SOCIAL » en arc, « CLUB » en bas). Le dessin central, un palmier, est une supposition : la capture du logo d'origine n'était pas disponible. À remplacer par le fichier du club.
- **La palette** (moka, taupe, sable, beige chaud, crème, blanc cassé), posée d'après la même description. À recaler sur le logo et les visuels du club.
- **Les polices** Fraunces et DM Sans.
- **Le tutoiement**, repris du ton de l'Instagram du club.

## Ce qui est fictif

- **La semaine du planning** : cours et horaires d'exemple, marqués « Exemple » sur la page.
- **Les quatre articles d'actualité** : des exemples de présentation, marqués « Exemple ».
- **Toutes les images** : aucune photo n'est utilisée. Chaque emplacement affiche un aplat sobre aux couleurs du club avec un pictogramme, en attendant les vraies photos du lieu et de l'équipe.
- **Les vignettes Instagram** de l'accueil : un emplacement prévu pour le flux, sans publication.
- **Les cartes d'équipe** : des rôles, sans nom ni portrait.

## À confirmer avec le club

- Le planning réel des cours.
- Les horaires d'ouverture.
- Le logo d'origine et les couleurs exactes.
- Les photos du lieu et de l'équipe.
- La restauration et la vue mer, citées dans des avis Google : elles ne sont pas mentionnées sur le site. Le jacuzzi apparaît seulement sous la forme « spa / jacuzzi privé », telle qu'elle figure sur Deciplus.
- Le numéro de téléphone à afficher en premier, et l'adresse e-mail à afficher.
- Le tutoiement.
- Les précisions que les sources ne donnent pas : durée de la séance découverte, tarif des cours de danse, nature des séances de bronzage, ce que couvre le prix de la cryolipolyse.
- Les mentions légales, la politique de confidentialité et les crédits, à rédiger et à valider par le club.

## Règles de contenu

- Aucun faux avis, témoignage, palmarès ni nombre de membres.
- Aucune promesse de santé ou de minceur au-delà de la phrase du club.
- Seules les vraies photos du lieu et de l'équipe prendront place sur le site : ni visuel marketing avec du texte, ni photo de banque d'images.

## Vérifications

Recette du 14 novembre 2026, sur le build de production :

- `bun run build`, `tsc --noEmit` et `bun run lint` : aucune erreur.
- Les 11 gabarits de page contrôlés avec Playwright à 320, 390, 768, 1024 et 1440 px : aucun débordement horizontal, aucune erreur JavaScript, un seul titre principal par page, `noindex, nofollow` partout.
- 81 contrôles de parcours : menu sur ordinateur et sur téléphone (Échap, retour du focus), lien d'évitement, onglets du planning au clavier, formulaire de contact (validation, aperçu, liens WhatsApp et e-mail, copie), carte chargée au clic, filtres et visionneuse de la galerie, filtres et partage des actualités, bandeau de préférences.
- Audit des 14 pages : 521 liens contrôlés, tous les liens externes dans un nouvel onglet, aucune image externe, mention de démonstration sur chaque page.
- Tarifs, activités, horaires et coordonnées comparés un à un au relevé du 12 novembre 2026.

Reste à faire à la main : un passage sur un vrai téléphone et sur un ordinateur, une fois la démonstration publiée.
