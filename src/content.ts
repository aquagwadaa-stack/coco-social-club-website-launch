/**
 * CONTENUS DU SITE — Coco Social Club
 *
 * Tous les textes, tarifs, horaires et liens du site sont dans ce fichier.
 * Pour modifier une phrase ou un prix, il suffit de changer la valeur ici.
 *
 * - Écrire avec des espaces et des apostrophes ordinaires : la typographie française
 *   (espaces insécables, apostrophes courbes) est posée automatiquement (src/lib/typo.ts).
 * - Un mot entre astérisques, *comme ceci*, s'affiche en italique dans les titres.
 * - Pour afficher une vraie photo : déposer le fichier dans public/images, puis indiquer son chemin
 *   dans `src` (par exemple "/images/accueil.jpg"). Tant que `src` vaut null, le site affiche
 *   un aplat sobre avec un pictogramme.
 *
 * Le README indique, pour chaque information, si elle est réelle, proposée ou à confirmer,
 * avec sa source et sa date.
 */

import { typoDeep } from "@/lib/typo";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type Tone = "moka" | "taupe" | "sable" | "beige" | "creme";

export type Motif =
  | "club"
  | "accueil"
  | "equipe"
  | "ems"
  | "decouverte"
  | "salle"
  | "daypass"
  | "coaching"
  | "groupe"
  | "abdos"
  | "sculpt"
  | "cardio"
  | "pilates"
  | "stretching"
  | "aerien"
  | "yoga"
  | "kuduro"
  | "gwoka"
  | "soca"
  | "spa"
  | "presso"
  | "cryo"
  | "bronzage"
  | "nutrition"
  | "serviette"
  | "cadeau"
  | "photo"
  | "nouveaute"
  | "evenement"
  | "conseil"
  | "info"
  | "instagram";

export type Photo = {
  /** Chemin de la photo dans public/images, ou null tant que la photo n'est pas fournie. */
  src: string | null;
  /** Description de la photo pour les lecteurs d'écran. */
  alt: string;
  /** Pictogramme affiché tant qu'il n'y a pas de photo. */
  motif: Motif;
  /** Teinte de l'aplat affiché tant qu'il n'y a pas de photo. */
  tone: Tone;
};

export type ActionKey = "reservation" | "decouverte" | "boutique" | "offrir";

export type FamilleId = "ems" | "salle" | "cours" | "danses" | "bien-etre";

export type Activite = {
  id: string;
  nom: string;
  /** Repère court affiché en étiquette : durée connue, ou « Offerte ». */
  etiquette?: string;
  description: string;
  benefices: string[];
  publicConcerne: string;
  action: ActionKey;
  photo: Photo;
};

export type Famille = {
  id: FamilleId;
  nom: string;
  accroche: string;
  intro: string;
  /** Ancre de la section correspondante sur la page Tarifs. */
  ancreTarifs: string;
  photo: Photo;
  activites: Activite[];
};

export type CategorieActu = "nouveautes" | "evenements" | "conseils" | "infos";

export type Actualite = {
  slug: string;
  categorie: CategorieActu;
  titre: string;
  resume: string;
  corps: string[];
  photo: Photo;
};

export type CategorieGalerie = "locaux" | "ambiance" | "seances" | "evenements" | "coachs";

/* -------------------------------------------------------------------------- */
/* Contenus                                                                   */
/* -------------------------------------------------------------------------- */

const contenus = {
  /* ------------------------------------------------------------------------ */
  /* Le site                                                                  */
  /* ------------------------------------------------------------------------ */
  site: {
    nom: "Coco Social Club",
    signature: "Club de sport et de bien-être",
    lieu: "Le Moule, Guadeloupe",
    titreParDefaut: "Coco Social Club — Club de sport et de bien-être au Moule",
    descriptionParDefaut:
      "Coaching EMS, salle, cours collectifs, danses et soins bien-être au Moule, en Guadeloupe. Séance découverte offerte.",
    mentionDemo: "Démonstration réalisée par Gwada Web Studio",
    nouvelOnglet: "s'ouvre dans un nouvel onglet",
    allerAuContenu: "Aller au contenu",
    accueil: "Accueil",
    retourAccueil: "retour à l'accueil",
    menu: "Menu",
    ouvrirMenu: "Ouvrir le menu",
    fermerMenu: "Fermer le menu",
    navigationPrincipale: "Navigation principale",
    navigationPiedDePage: "Pied de page",
    dansCettePage: "Dans cette page",
  },

  /* ------------------------------------------------------------------------ */
  /* Coordonnées — relevées le 12 novembre 2026                               */
  /* ------------------------------------------------------------------------ */
  coordonnees: {
    adresse: {
      rue: "6 rue de Portland",
      codePostal: "97160",
      ville: "Le Moule",
      pays: "Guadeloupe",
    },
    /** Numéro de la fiche Google, aussi utilisé pour WhatsApp. */
    mobile: {
      affichage: "0690 97 95 45",
      href: "tel:+590690979545",
      precision: "Appel et WhatsApp",
    },
    fixe: {
      affichage: "0590 68 84 64",
      href: "tel:+590590688464",
      precision: "Ligne fixe",
    },
    whatsapp: {
      numero: "590690979545",
      href: "https://wa.me/590690979545",
      libelle: "WhatsApp",
    },
    email: {
      affichage: "hello@cocosocialclub.fr",
      href: "mailto:hello@cocosocialclub.fr",
    },
    instagram: {
      affichage: "@coco_socialclub",
      href: "https://www.instagram.com/coco_socialclub/",
      libelle: "Instagram",
    },
    carte: {
      /** Ouvre la fiche du club dans Google Maps. */
      lien: "https://www.google.com/maps/search/?api=1&query=Coco%20Social%20Club%2C%206%20rue%20de%20Portland%2C%2097160%20Le%20Moule",
      /** Carte intégrée, chargée seulement quand le visiteur le demande. */
      integration:
        "https://www.google.com/maps?q=6%20rue%20de%20Portland%2C%2097160%20Le%20Moule%2C%20Guadeloupe&output=embed",
    },
  },

  /* Horaires de la fiche Google, relevés le 12 novembre 2026 — à confirmer avec le club. */
  horaires: {
    titre: "Horaires d'ouverture",
    lignes: [
      { jours: "Lundi au vendredi", heures: "8 h 30 – 20 h" },
      { jours: "Samedi", heures: "8 h 30 – 13 h" },
      { jours: "Dimanche", heures: "Fermé" },
    ],
  },

  /* Réservation et boutique : l'espace Deciplus du club (liens réels). */
  deciplus: {
    nom: "Deciplus",
    reservation: "https://member-app.deciplus.pro/cocosc",
    boutique: "https://member-app.deciplus.pro/cocosc/shop",
    rappel:
      "La réservation et le paiement se font sur Deciplus, l'application du club. Ce site ne prend ni réservation ni paiement.",
  },

  /* Libellés des boutons d'action, identiques sur tout le site. */
  actions: {
    reservation: "Réserver une séance",
    reserver: "Réserver",
    decouverte: "Séance découverte offerte",
    reserverDecouverte: "Réserver ma séance découverte",
    boutique: "Voir la boutique en ligne",
    offrir: "Offrir",
    contact: "Nous contacter",
    decouvrirClub: "Découvrir le club",
    voirTarifs: "Voir les tarifs",
    voirPlanning: "Voir le planning",
    voirActivites: "Voir les activités",
  },

  /* Note Google relevée le 12 novembre 2026. Aucun avis n'est reproduit. */
  noteGoogle: {
    note: "4,9",
    sur: "5",
    nombreAvis: 22,
    date: "12 novembre 2026",
    libelle: "Note Google",
    avis: "avis Google, relevé le",
    lienLibelle: "Lire les avis sur Google",
  },

  /* Bio Instagram du club, reprise telle quelle (relevée le 12 novembre 2026). */
  bioInstagram: {
    source: "Sur Instagram, @coco_socialclub",
    phrases: [
      "On transforme 20 minutes en résultats VISIBLES grâce à l'EMS",
      "Coaching personnalisé",
      "Physique & santé, sans compromis",
      "Séance découverte offerte",
    ],
  },

  /* ------------------------------------------------------------------------ */
  /* Navigation                                                               */
  /* ------------------------------------------------------------------------ */
  navigation: [
    { to: "/le-club", libelle: "Le club" },
    { to: "/activites", libelle: "Activités" },
    { to: "/planning", libelle: "Planning" },
    { to: "/tarifs", libelle: "Tarifs" },
    { to: "/boutique", libelle: "Boutique" },
    { to: "/galerie", libelle: "Galerie" },
    { to: "/actualites", libelle: "Actualités" },
    { to: "/contact", libelle: "Contact" },
  ],

  /* ------------------------------------------------------------------------ */
  /* Accueil                                                                  */
  /* ------------------------------------------------------------------------ */
  accueil: {
    meta: {
      titre: "Coco Social Club — Club de sport et de bien-être au Moule",
      description:
        "Coaching EMS, salle, cours collectifs, danses et soins bien-être au Moule, en Guadeloupe. Séance découverte offerte, réservation en ligne.",
    },
    hero: {
      surtitre: "Club de sport & bien-être · Le Moule, Guadeloupe",
      titre: "Ton club de sport et de *bien-être* au Moule",
      texte:
        "Coaching EMS, salle, cours collectifs, danses et soins : un lieu chaleureux pour bouger, progresser et souffler, quel que soit ton niveau.",
      photo: {
        src: null,
        alt: "Le Coco Social Club, au Moule",
        motif: "club",
        tone: "moka",
      } as Photo,
    },
    presentation: {
      surtitre: "Bienvenue au club",
      titre: "Un lieu pour bouger, et pour *se sentir bien*",
      texte: [
        "Au Coco Social Club, le sport et le bien-être se vivent au même endroit. Tu viens pour une séance d'EMS de 20 minutes, un cours collectif, une danse, un moment au spa, ou un peu de tout ça.",
        "L'équipe t'accueille, t'accompagne et adapte chaque séance à ton rythme. Débutant ou confirmé, tu trouves ta place.",
      ],
      photo: {
        src: null,
        alt: "L'accueil du Coco Social Club",
        motif: "accueil",
        tone: "sable",
      } as Photo,
    },
    avantages: {
      surtitre: "Ce qui fait la différence",
      titre: "Premium, humain, *dynamique*",
      liste: [
        {
          titre: "Ambiance chaleureuse",
          texte: "Un accueil souriant et un lieu où tu te sens bien dès que tu passes la porte.",
        },
        {
          titre: "Accompagnement de qualité",
          texte: "Des coachs à l'écoute, qui adaptent chaque séance à ton objectif.",
        },
        {
          titre: "Une vraie communauté",
          texte: "Un club où l'on se retrouve, où l'on s'encourage et où l'on progresse ensemble.",
        },
        {
          titre: "Tous les niveaux",
          texte: "Débutant ou confirmé, chaque activité s'adapte à ton rythme.",
        },
        {
          titre: "Cadre haut de gamme",
          texte: "Des espaces soignés et des équipements de qualité, pensés pour ton confort.",
        },
      ],
    },
    activites: {
      surtitre: "Les activités phares",
      titre: "Cinq façons de *prendre soin de toi*",
      texte: "Choisis ce qui te fait envie aujourd'hui. Tu peux tout combiner.",
      lien: "Toutes les activités",
      decouvrir: "Découvrir",
    },
    decouverte: {
      surtitre: "Pour commencer",
      titre: "Ta séance découverte EMS est *offerte*",
      texte:
        "Une première séance avec un coach pour essayer l'électrostimulation et poser toutes tes questions. Tu réserves ton créneau en ligne.",
      citation: "On transforme 20 minutes en résultats VISIBLES grâce à l'EMS",
      citationSource: "Coco Social Club, sur Instagram",
      lienEms: "En savoir plus sur l'EMS",
    },
    formules: {
      surtitre: "Les formules",
      titre: "Un abonnement, une carte ou *juste une séance*",
      texte:
        "Abonnements à partir de 99 € par mois, cartes de séances, Day Pass et soins à l'unité : tu choisis la formule qui te convient.",
    },
    instagram: {
      surtitre: "Sur Instagram",
      titre: "La vie du club, *au quotidien*",
      texte: "Coulisses, nouveautés et bonne humeur : suis le club sur Instagram.",
      bouton: "Suivre @coco_socialclub",
      emplacement: "Emplacement prévu pour le flux Instagram du club",
      nombreVignettes: 6,
    },
    pratique: {
      surtitre: "Infos pratiques",
      titre: "On t'attend *au Moule*",
      texte: "Une question avant de venir ? Écris-nous, on te répond avec plaisir.",
      adresseTitre: "Adresse et contact",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Le club                                                                  */
  /* ------------------------------------------------------------------------ */
  club: {
    meta: {
      titre: "Le club — Coco Social Club, Le Moule",
      description:
        "L'origine, la philosophie, les valeurs et l'équipe du Coco Social Club, club de sport et de bien-être au Moule.",
    },
    entete: {
      surtitre: "Le club",
      titre: "Un club où l'on vient pour le sport, et où l'on reste pour *l'ambiance*",
      texte:
        "Le Coco Social Club réunit sport et bien-être au 6 rue de Portland, au Moule. Voici ce qui nous anime.",
    },
    origine: {
      surtitre: "L'origine",
      titre: "Une idée simple : *tout réunir* au même endroit",
      texte: [
        "Le Coco Social Club est né d'une envie : proposer au Moule un lieu où l'on peut s'entraîner sérieusement, souffler vraiment, et se sentir attendu.",
        "EMS, salle, cours collectifs, danses et soins bien-être : tout est pensé pour que tu puisses composer ta semaine comme tu l'entends.",
      ],
      photo: {
        src: null,
        alt: "Les locaux du Coco Social Club",
        motif: "club",
        tone: "sable",
      } as Photo,
    },
    philosophie: {
      surtitre: "La philosophie",
      citation: "Physique & santé, sans compromis",
      citationSource: "Coco Social Club",
      texte:
        "Chez nous, se dépasser et se faire du bien vont ensemble. On avance à ton rythme, avec un coach à tes côtés, et on prend aussi le temps de récupérer.",
    },
    valeurs: {
      surtitre: "Les valeurs",
      titre: "Trois mots qui nous *ressemblent*",
      liste: [
        {
          titre: "Premium",
          texte: "Un cadre soigné, des équipements de qualité et le souci du détail.",
        },
        {
          titre: "Humain",
          texte: "L'accueil, l'écoute et l'accompagnement passent avant tout.",
        },
        {
          titre: "Dynamique",
          texte: "De l'énergie, des activités variées et l'envie de progresser.",
        },
      ],
    },
    equipe: {
      surtitre: "L'équipe",
      titre: "Des coachs *à tes côtés*",
      texte: "Chaque membre de l'équipe aura ici son portrait et quelques mots de présentation.",
      note: "Portraits et présentations à venir",
      membres: [
        { role: "Coaching EMS", texte: "Ton coach pour les séances d'électrostimulation." },
        { role: "Coaching salle", texte: "Bilan, programme et suivi en salle." },
        {
          role: "Cours collectifs et danses",
          texte: "Les professeurs qui font vibrer le planning.",
        },
        { role: "Bien-être", texte: "L'équipe qui prend soin de toi après l'effort." },
      ],
      photo: {
        src: null,
        alt: "L'équipe du Coco Social Club",
        motif: "equipe",
        tone: "beige",
      } as Photo,
    },
    pourquoi: {
      surtitre: "Sept bonnes raisons",
      titre: "Pourquoi choisir le *Coco Social Club* ?",
      liste: [
        {
          titre: "L'ambiance",
          texte: "Chaleureuse et sans jugement, dès l'accueil.",
        },
        {
          titre: "Les coachs",
          texte: "Présents, à l'écoute et attentifs à ta progression.",
        },
        {
          titre: "Les équipements",
          texte: "EMS, salle, cours collectifs et espace bien-être réunis au même endroit.",
        },
        {
          titre: "L'accompagnement",
          texte: "Séance découverte, bilan, coaching : tu n'es jamais seul face à ton objectif.",
        },
        {
          titre: "La communauté",
          texte: "Des cours collectifs et des danses pour se retrouver et s'encourager.",
        },
        {
          titre: "La privatisation",
          texte:
            "Le spa / jacuzzi se réserve en privé. Pour un groupe ou un événement, parles-en à l'équipe.",
        },
        {
          titre: "La flexibilité",
          texte: "Abonnement, carte de séances ou Day Pass : tu choisis ta formule.",
        },
      ],
    },
    entreprises: {
      surtitre: "Entreprises et partenaires",
      titre: "Un projet pour ton équipe ou *ta structure* ?",
      texte:
        "Séance d'équipe, privatisation, partenariat : dis-nous ce que tu imagines, on construit la réponse ensemble.",
      bouton: "Parler de ton projet",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Activités — liste réelle (Deciplus, 12 novembre 2026), textes proposés   */
  /* ------------------------------------------------------------------------ */
  activites: {
    meta: {
      titre: "Activités — EMS, salle, cours collectifs, danses et bien-être | Coco Social Club",
      description:
        "Toutes les activités du Coco Social Club au Moule : coaching EMS, salle, cours collectifs, danses et soins bien-être. Description, bénéfices et public concerné.",
    },
    entete: {
      surtitre: "Les activités",
      titre: "Tout ce que tu peux faire *au club*",
      texte:
        "Cinq univers, une vingtaine d'activités. Pour chacune : ce que c'est, ce que tu y gagnes et à qui elle s'adresse.",
    },
    libelles: {
      benefices: "Bénéfices",
      publicConcerne: "Pour qui",
      tarifs: "Voir les tarifs",
      sommaire: "Aller à",
    },
    conseilSante:
      "Un doute sur ta santé ou une contre-indication ? Parles-en à l'équipe avant de réserver.",
    familles: [
      {
        id: "ems",
        nom: "EMS",
        accroche: "20 minutes, avec un coach",
        intro:
          "L'EMS, c'est l'électrostimulation musculaire : pendant que tu enchaînes des exercices simples, guidé par ton coach, l'appareil stimule tes muscles.",
        ancreTarifs: "cartes",
        photo: { src: null, alt: "Séance de coaching EMS", motif: "ems", tone: "moka" },
        activites: [
          {
            id: "coaching-ems",
            nom: "Coaching EMS",
            etiquette: "20 minutes",
            description:
              "Une séance d'électrostimulation encadrée de bout en bout : ton coach règle l'appareil, te montre les exercices et t'accompagne pendant 20 minutes.",
            benefices: [
              "Un entraînement court, facile à caser dans une semaine chargée",
              "Un coach à tes côtés du début à la fin",
              "Une séance adaptée à ton objectif",
            ],
            publicConcerne:
              "Débutants comme confirmés. En cas de doute sur ta santé, parles-en au coach avant de réserver.",
            action: "reservation",
            photo: { src: null, alt: "Coaching EMS", motif: "ems", tone: "moka" },
          },
          {
            id: "decouverte-ems",
            nom: "Séance découverte EMS",
            etiquette: "Offerte",
            description:
              "Une première séance gratuite pour essayer l'EMS avec un coach et poser toutes tes questions.",
            benefices: [
              "Tu essaies avant de t'engager",
              "Tu repars en sachant si l'EMS te correspond",
            ],
            publicConcerne: "Toi, si tu n'as encore jamais essayé l'EMS au club.",
            action: "decouverte",
            photo: { src: null, alt: "Séance découverte EMS", motif: "decouverte", tone: "sable" },
          },
        ],
      },
      {
        id: "salle",
        nom: "Salle",
        accroche: "En autonomie ou accompagné",
        intro:
          "Tu t'entraînes seul, avec un coach ou en petit groupe : à toi de choisir la formule qui te motive.",
        ancreTarifs: "cartes",
        photo: { src: null, alt: "La salle du Coco Social Club", motif: "salle", tone: "taupe" },
        activites: [
          {
            id: "libre-acces",
            nom: "Libre accès",
            description:
              "Tu t'entraînes en autonomie dans la salle, à ton rythme, pendant les horaires d'ouverture.",
            benefices: ["La liberté de tes horaires", "Ton programme, à ton rythme"],
            publicConcerne: "Sportifs autonomes, déjà à l'aise avec le matériel.",
            action: "reservation",
            photo: { src: null, alt: "Libre accès à la salle", motif: "salle", tone: "taupe" },
          },
          {
            id: "day-pass",
            nom: "Day Pass",
            description: "Un accès à la salle pour la journée, sans abonnement.",
            benefices: ["Aucun engagement", "Idéal pour essayer le club"],
            publicConcerne: "De passage au Moule, ou envie de tester avant de t'abonner.",
            action: "boutique",
            photo: { src: null, alt: "Day Pass", motif: "daypass", tone: "beige" },
          },
          {
            id: "coaching-salle",
            nom: "Coaching salle et bilan",
            description:
              "Une séance en salle avec un coach, construite autour de ton objectif. Le bilan permet de faire le point avant de démarrer.",
            benefices: [
              "Un programme qui te ressemble",
              "Des gestes corrigés en direct",
              "Un point de départ clair grâce au bilan",
            ],
            publicConcerne: "Reprise du sport, objectif précis ou envie d'être guidé.",
            action: "reservation",
            photo: { src: null, alt: "Coaching en salle", motif: "coaching", tone: "sable" },
          },
          {
            id: "small-group",
            nom: "Small group",
            description:
              "Le coaching en petit groupe : l'énergie du collectif, avec un coach qui garde un œil sur chacun.",
            benefices: ["La motivation du groupe", "Un suivi de près"],
            publicConcerne: "Toi, si tu aimes t'entraîner à plusieurs tout en étant suivi.",
            action: "reservation",
            photo: { src: null, alt: "Coaching en small group", motif: "groupe", tone: "moka" },
          },
        ],
      },
      {
        id: "cours",
        nom: "Cours collectifs",
        accroche: "Sept cours pour varier les plaisirs",
        intro:
          "Renforcement, cardio, douceur : les cours collectifs s'adaptent à ton niveau et se réservent en ligne.",
        ancreTarifs: "cartes",
        photo: {
          src: null,
          alt: "Cours collectif au Coco Social Club",
          motif: "groupe",
          tone: "sable",
        },
        activites: [
          {
            id: "abdo-choco-fessiers-coco",
            nom: "Abdo choco fessiers coco",
            description: "Un cours ciblé sur la sangle abdominale et les fessiers.",
            benefices: ["Renforcement du centre du corps", "Travail du bas du corps"],
            publicConcerne: "Tous niveaux.",
            action: "reservation",
            photo: {
              src: null,
              alt: "Cours Abdo choco fessiers coco",
              motif: "abdos",
              tone: "sable",
            },
          },
          {
            id: "body-sculpt",
            nom: "Body Sculpt",
            description: "Un cours de renforcement musculaire de tout le corps, en musique.",
            benefices: ["Tonicité", "Endurance musculaire"],
            publicConcerne: "Tous niveaux, l'intensité s'adapte.",
            action: "reservation",
            photo: { src: null, alt: "Cours Body Sculpt", motif: "sculpt", tone: "taupe" },
          },
          {
            id: "fat-burner",
            nom: "Fat Burner",
            description: "Un cours cardio à haute intensité, rythmé et sans temps mort.",
            benefices: ["Cardio", "Endurance", "Dépense d'énergie"],
            publicConcerne: "Toi, si tu aimes te dépasser. L'intensité s'adapte à ton niveau.",
            action: "reservation",
            photo: { src: null, alt: "Cours Fat Burner", motif: "cardio", tone: "moka" },
          },
          {
            id: "pilates",
            nom: "Pilates",
            description:
              "Un travail en douceur et en profondeur, centré sur la posture, la respiration et le gainage.",
            benefices: ["Gainage", "Posture", "Mobilité"],
            publicConcerne: "Tous niveaux, débutants bienvenus.",
            action: "reservation",
            photo: { src: null, alt: "Cours de Pilates", motif: "pilates", tone: "beige" },
          },
          {
            id: "stretching",
            nom: "Stretching",
            description: "Un cours d'étirements pour relâcher les tensions et gagner en souplesse.",
            benefices: ["Souplesse", "Détente"],
            publicConcerne: "Tous niveaux, parfait en complément d'un entraînement.",
            action: "reservation",
            photo: { src: null, alt: "Cours de stretching", motif: "stretching", tone: "sable" },
          },
          {
            id: "yoga-aerien",
            nom: "Yoga aérien",
            description:
              "Le yoga pratiqué dans un hamac suspendu : postures, équilibre et lâcher-prise.",
            benefices: ["Équilibre", "Gainage", "Lâcher-prise"],
            publicConcerne: "Curieux et pratiquants de yoga, le professeur guide chaque posture.",
            action: "reservation",
            photo: { src: null, alt: "Cours de yoga aérien", motif: "aerien", tone: "taupe" },
          },
          {
            id: "yoga-hatha",
            nom: "Yoga Hatha",
            description: "Un yoga traditionnel et posé, qui enchaîne postures et respiration.",
            benefices: ["Souplesse", "Respiration", "Calme"],
            publicConcerne: "Tous niveaux, idéal pour débuter le yoga.",
            action: "reservation",
            photo: { src: null, alt: "Cours de yoga Hatha", motif: "yoga", tone: "beige" },
          },
        ],
      },
      {
        id: "danses",
        nom: "Danses",
        accroche: "Kuduro, Gwo Ka, Soca / Bouyon",
        intro:
          "Trois danses pour transpirer avec le sourire, portées par les rythmes d'Afrique et de la Caraïbe.",
        ancreTarifs: "cartes",
        photo: {
          src: null,
          alt: "Cours de danse au Coco Social Club",
          motif: "kuduro",
          tone: "moka",
        },
        activites: [
          {
            id: "kuduro",
            nom: "Danse Kuduro",
            description: "Une danse urbaine née en Angola, énergique et entraînante.",
            benefices: ["Cardio", "Coordination", "Bonne humeur"],
            publicConcerne: "Tous niveaux, aucune base de danse nécessaire.",
            action: "reservation",
            photo: { src: null, alt: "Cours de danse Kuduro", motif: "kuduro", tone: "moka" },
          },
          {
            id: "gwo-ka",
            nom: "Gwo Ka",
            description:
              "La danse traditionnelle de la Guadeloupe, portée par le rythme des tambours ka.",
            benefices: ["Rythme", "Expression", "Un lien avec la culture guadeloupéenne"],
            publicConcerne: "Tous niveaux, pour découvrir ou approfondir.",
            action: "reservation",
            photo: { src: null, alt: "Cours de Gwo Ka", motif: "gwoka", tone: "sable" },
          },
          {
            id: "soca-bouyon",
            nom: "Soca / Bouyon",
            description: "Deux rythmes caribéens festifs, pour danser sans s'arrêter.",
            benefices: ["Cardio", "Coordination", "L'énergie du groupe"],
            publicConcerne: "Tous niveaux, pour danser et se défouler.",
            action: "reservation",
            photo: { src: null, alt: "Cours de Soca / Bouyon", motif: "soca", tone: "taupe" },
          },
        ],
      },
      {
        id: "bien-etre",
        nom: "Bien-être",
        accroche: "Souffler, récupérer, prendre soin de soi",
        intro:
          "Après l'effort ou simplement pour toi : le spa / jacuzzi privé et les soins se réservent en ligne.",
        ancreTarifs: "soins",
        photo: {
          src: null,
          alt: "L'espace bien-être du Coco Social Club",
          motif: "spa",
          tone: "beige",
        },
        activites: [
          {
            id: "spa-jacuzzi",
            nom: "Spa / jacuzzi privé",
            etiquette: "60 ou 90 minutes",
            description:
              "Le spa / jacuzzi se réserve en privé, pour 60 ou 90 minutes : un moment rien que pour toi, ou à partager.",
            benefices: ["Détente", "Un moment à partager"],
            publicConcerne: "En solo, en duo ou entre amis.",
            action: "reservation",
            photo: { src: null, alt: "Le spa / jacuzzi privé", motif: "spa", tone: "beige" },
          },
          {
            id: "pressotherapie",
            nom: "Pressothérapie",
            description:
              "Un soin par pressions d'air alternées, que tu reçois confortablement installé.",
            benefices: ["Une pause détente", "Apprécié après l'entraînement"],
            publicConcerne:
              "Sportifs ou non. En cas de doute sur ta santé, demande conseil à l'équipe avant de réserver.",
            action: "reservation",
            photo: { src: null, alt: "Soin de pressothérapie", motif: "presso", tone: "sable" },
          },
          {
            id: "cryolipolyse",
            nom: "Cryolipolyse",
            description:
              "Un soin par le froid, appliqué sur une zone précise et réalisé sur rendez-vous.",
            benefices: [
              "Un échange avec l'équipe avant la séance",
              "Un déroulement expliqué étape par étape",
            ],
            publicConcerne: "Sur rendez-vous, après un échange avec l'équipe.",
            action: "reservation",
            photo: { src: null, alt: "Soin de cryolipolyse", motif: "cryo", tone: "taupe" },
          },
          {
            id: "bronzage",
            nom: "Bronzage",
            description:
              "Des séances de bronzage, pour le visage, les bras et le cou, ou pour le corps entier.",
            benefices: ["Un hâle à ton rythme", "À la séance ou en carte de 10"],
            publicConcerne: "Sur rendez-vous.",
            action: "reservation",
            photo: { src: null, alt: "Séance de bronzage", motif: "bronzage", tone: "sable" },
          },
        ],
      },
    ] as Famille[],
  },

  /* ------------------------------------------------------------------------ */
  /* Planning et réservation                                                  */
  /* ------------------------------------------------------------------------ */
  planning: {
    meta: {
      titre: "Planning et réservation — Coco Social Club, Le Moule",
      description:
        "Comment réserver ta séance au Coco Social Club, le planning des cours et l'accès à la salle. La réservation se fait en ligne sur Deciplus.",
    },
    entete: {
      surtitre: "Planning et réservation",
      titre: "Réserve ta séance *en quelques clics*",
      texte:
        "Cours collectifs, EMS, coaching, soins : tout se réserve en ligne, depuis l'application du club.",
    },
    etapes: {
      surtitre: "Comment réserver",
      titre: "Quatre étapes, *et c'est parti*",
      liste: [
        {
          titre: "Ouvre l'espace de réservation",
          texte: "Le bouton « Réserver » t'emmène sur Deciplus, l'application du club.",
        },
        {
          titre: "Choisis ton activité",
          texte: "Cours collectif, EMS, coaching ou soin : sélectionne ce qui te fait envie.",
        },
        {
          titre: "Choisis ton créneau",
          texte: "Tu vois les créneaux disponibles et tu confirmes depuis ton compte.",
        },
        {
          titre: "Viens au club",
          texte: "On t'attend au 6 rue de Portland, au Moule.",
        },
      ],
      premiereFois: {
        titre: "C'est ta première fois ?",
        texte: "Commence par la séance découverte EMS : elle est offerte.",
      },
    },
    semaine: {
      surtitre: "Planning des cours",
      titre: "Une semaine au club",
      badge: "Exemple",
      avertissement:
        "Semaine d'exemple : les cours et les horaires ci-dessous illustrent la présentation du planning. Le planning réel et les places disponibles sont sur Deciplus.",
      legende: "Cours collectifs et danses",
      colonnes: { jour: "Jour", heure: "Heure", cours: "Cours" },
      choisirJour: "Choisir un jour",
      jours: [
        {
          jour: "Lundi",
          cours: [
            { heure: "9 h 00", nom: "Pilates", famille: "cours" },
            { heure: "12 h 30", nom: "Body Sculpt", famille: "cours" },
            { heure: "18 h 00", nom: "Fat Burner", famille: "cours" },
            { heure: "19 h 00", nom: "Yoga Hatha", famille: "cours" },
          ],
        },
        {
          jour: "Mardi",
          cours: [
            { heure: "9 h 00", nom: "Stretching", famille: "cours" },
            { heure: "12 h 30", nom: "Abdo choco fessiers coco", famille: "cours" },
            { heure: "18 h 00", nom: "Danse Kuduro", famille: "danses" },
            { heure: "19 h 00", nom: "Body Sculpt", famille: "cours" },
          ],
        },
        {
          jour: "Mercredi",
          cours: [
            { heure: "9 h 00", nom: "Yoga Hatha", famille: "cours" },
            { heure: "17 h 30", nom: "Yoga aérien", famille: "cours" },
            { heure: "18 h 30", nom: "Fat Burner", famille: "cours" },
          ],
        },
        {
          jour: "Jeudi",
          cours: [
            { heure: "9 h 00", nom: "Body Sculpt", famille: "cours" },
            { heure: "12 h 30", nom: "Pilates", famille: "cours" },
            { heure: "18 h 00", nom: "Gwo Ka", famille: "danses" },
            { heure: "19 h 00", nom: "Stretching", famille: "cours" },
          ],
        },
        {
          jour: "Vendredi",
          cours: [
            { heure: "9 h 00", nom: "Abdo choco fessiers coco", famille: "cours" },
            { heure: "12 h 30", nom: "Fat Burner", famille: "cours" },
            { heure: "18 h 00", nom: "Soca / Bouyon", famille: "danses" },
          ],
        },
        {
          jour: "Samedi",
          cours: [
            { heure: "9 h 00", nom: "Yoga aérien", famille: "cours" },
            { heure: "10 h 15", nom: "Pilates", famille: "cours" },
            { heure: "11 h 30", nom: "Body Sculpt", famille: "cours" },
          ],
        },
      ],
      bouton: "Voir le planning réel et réserver",
    },
    acces: {
      surtitre: "Accès salle",
      titre: "La salle, *à ton rythme*",
      texte:
        "La salle est accessible en libre accès pendant les horaires d'ouverture du club, avec un abonnement ou un Day Pass.",
      surRendezVous: {
        titre: "EMS, coaching et soins",
        texte: "Ces séances se réservent sur créneau, directement en ligne.",
      },
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Tarifs — boutique Deciplus, relevés le 12 novembre 2026                  */
  /* ------------------------------------------------------------------------ */
  tarifs: {
    meta: {
      titre: "Tarifs — abonnements, cartes et soins | Coco Social Club",
      description:
        "Les tarifs du Coco Social Club au Moule : abonnements à partir de 99 € par mois, cartes de séances, Day Pass, soins bien-être et cartes cadeaux.",
    },
    entete: {
      surtitre: "Les tarifs",
      titre: "Des formules *simples*, pour chaque envie",
      texte:
        "Abonnement, carte de séances ou séance à l'unité : choisis ta façon de venir au club.",
    },
    mention: "Tarifs indicatifs, à jour sur la boutique",
    mentionDetail:
      "Les prix de cette page ont été relevés le 12 novembre 2026. Ceux de la boutique en ligne du club font foi.",
    abonnements: {
      ancre: "abonnements",
      surtitre: "Abonnements",
      titre: "Les abonnements *mensuels*",
      conditions: ["Engagement 6 mois", "-10 % sur les soins"],
      conditionsTitre: "Pour tous les abonnements",
      parMois: "par mois",
      bouton: "Choisir cette formule",
      liste: [
        {
          id: "coco-pass",
          nom: "COCO PASS",
          prix: "99 €",
          resume: "Pour venir régulièrement",
          inclus: ["2 accès salle en autonomie par semaine", "2 cours collectifs par semaine"],
          misEnAvant: false,
        },
        {
          id: "coco-free",
          nom: "COCO FREE",
          prix: "199 €",
          resume: "Pour venir autant que tu veux",
          inclus: [
            "Salle en illimité",
            "Cours collectifs en illimité",
            "Une séance spa / jacuzzi privé",
          ],
          misEnAvant: true,
        },
        {
          id: "coco-vibes",
          nom: "COCO VIBES",
          prix: "329 €",
          resume: "Pour être accompagné",
          inclus: [
            "3 séances par semaine : 1 coaching salle, 1 coaching EMS, 1 libre accès",
            "1 h de spa pour 4 offerte",
          ],
          misEnAvant: false,
        },
        {
          id: "ems-one",
          nom: "EMS ONE",
          prix: "119 €",
          resume: "L'EMS, une fois par semaine",
          inclus: ["1 séance EMS par semaine", "1 h de spa pour 4 offerte"],
          misEnAvant: false,
        },
        {
          id: "ems-two",
          nom: "EMS TWO",
          prix: "219 €",
          resume: "L'EMS, deux fois par semaine",
          inclus: ["2 séances EMS par semaine", "1 h de spa pour 4 offerte"],
          misEnAvant: false,
        },
      ],
      pressotherapie: {
        nom: "Pressothérapie illimitée",
        prix: "100 €",
        unite: "le mois",
        texte: "La pressothérapie en illimité pendant un mois.",
      },
    },
    cartes: {
      ancre: "cartes",
      surtitre: "Séances et cartes",
      titre: "À l'unité ou *en carte*",
      texte: "Plus la carte est grande, plus la séance est avantageuse.",
      colonnes: ["À l'unité", "5 séances", "10 séances", "20 séances"],
      lignes: [
        { nom: "Coaching EMS", prix: ["46 €", "225 €", "430 €", "660 €"] },
        { nom: "Coaching salle", prix: ["71 €", "330 €", "560 €", "920 €"] },
        { nom: "Cours collectif", prix: ["26 €", "105 €", "160 €", "220 €"] },
        { nom: "Small group", prix: ["31 €", "145 €", "260 €", "420 €"] },
        { nom: "Day Pass", prix: ["16 €", "75 €", "130 €", null] },
      ],
      complement: { nom: "Bilan (coaching salle)", prix: "31 €" },
      nonPropose: "Non proposé",
      colonneSeance: "Séance",
    },
    soins: {
      ancre: "soins",
      surtitre: "Bien-être",
      titre: "Les soins et *le spa*",
      groupes: [
        {
          nom: "Spa / jacuzzi privé",
          lignes: [
            { libelle: "60 minutes", prix: "60 €" },
            { libelle: "90 minutes", prix: "70 €" },
          ],
        },
        {
          nom: "Pressothérapie",
          lignes: [
            { libelle: "La séance", prix: "36 €" },
            { libelle: "10 séances", prix: "260 €" },
          ],
        },
        {
          nom: "Cryolipolyse",
          lignes: [{ libelle: "La séance", prix: "295 €" }],
        },
        {
          nom: "Bronzage",
          lignes: [
            { libelle: "Visage, bras et cou", prix: "36 €" },
            { libelle: "Visage, 10 séances", prix: "210 €" },
            { libelle: "Corps entier", prix: "46 €" },
            { libelle: "Corps entier, 10 séances", prix: "310 €" },
          ],
        },
      ],
    },
    cadeaux: {
      ancre: "cartes-cadeaux",
      surtitre: "Cartes cadeaux",
      titre: "Offrir *un moment au club*",
      texte: "Une carte cadeau à utiliser au club, à offrir en quelques clics.",
      montants: ["15 €", "25 €", "50 €", "100 €"],
    },
    appel: {
      titre: "Prêt à te lancer ?",
      texte: "Abonnements, cartes et soins s'achètent sur la boutique en ligne du club.",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Boutique — vitrine, les achats se font au club ou sur Deciplus           */
  /* ------------------------------------------------------------------------ */
  boutique: {
    meta: {
      titre: "Boutique — produits du club et cartes cadeaux | Coco Social Club",
      description:
        "La vitrine du Coco Social Club : produits Nutripure, serviettes brodées et cartes cadeaux à offrir.",
    },
    entete: {
      surtitre: "La boutique",
      titre: "Les essentiels du club, *et de quoi faire plaisir*",
      texte: "Des produits à retrouver à l'accueil, et des cartes cadeaux à offrir en ligne.",
    },
    produits: {
      surtitre: "En vente au club",
      titre: "À retrouver *à l'accueil*",
      note: "Vitrine : ces produits sont vendus au club. Demande les références et les prix à l'accueil.",
      question: "Poser une question sur un produit",
      liste: [
        {
          id: "nutripure",
          nom: "Nutripure",
          categorie: "Nutrition sportive",
          texte:
            "Le club propose une sélection de produits Nutripure. L'équipe te conseille selon ta pratique.",
          photo: {
            src: null,
            alt: "Produits Nutripure en vente au club",
            motif: "nutrition",
            tone: "sable",
          } as Photo,
        },
        {
          id: "serviettes",
          nom: "Serviettes brodées",
          categorie: "Accessoires",
          texte: "Les serviettes brodées du Coco Social Club, pour tes séances et pour le spa.",
          photo: {
            src: null,
            alt: "Serviettes brodées du Coco Social Club",
            motif: "serviette",
            tone: "beige",
          } as Photo,
        },
      ],
    },
    cadeaux: {
      surtitre: "Cartes cadeaux",
      titre: "Offrir *un moment au club*",
      texte: "Quatre montants au choix. Tu commandes la carte en ligne, sur la boutique du club.",
      montants: ["15 €", "25 €", "50 €", "100 €"],
      precision: "L'achat se fait sur Deciplus, la boutique en ligne du club.",
      photo: {
        src: null,
        alt: "Carte cadeau du Coco Social Club",
        motif: "cadeau",
        tone: "moka",
      } as Photo,
    },
    enLigne: {
      surtitre: "Boutique en ligne",
      titre: "Abonnements, cartes et soins",
      texte: "Toutes les formules du club s'achètent en ligne, sur la boutique Deciplus.",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Galerie — emplacements en attente des photos du club                     */
  /* ------------------------------------------------------------------------ */
  galerie: {
    meta: {
      titre: "Galerie — le club en images | Coco Social Club",
      description:
        "Les locaux, l'ambiance, les séances, les événements et les coachs du Coco Social Club, au Moule.",
    },
    entete: {
      surtitre: "La galerie",
      titre: "Le club *en images*",
      texte: "Les locaux, l'ambiance, les séances, les événements et les coachs.",
    },
    note: "Les photos du club prendront place ici.",
    photoAVenir: "Photo à venir",
    toutes: "Toutes",
    filtrer: "Filtrer les photos",
    resultat: "emplacements affichés",
    agrandir: "Agrandir",
    categories: [
      { id: "locaux", nom: "Locaux" },
      { id: "ambiance", nom: "Ambiance" },
      { id: "seances", nom: "Séances" },
      { id: "evenements", nom: "Événements" },
      { id: "coachs", nom: "Coachs" },
    ] as { id: CategorieGalerie; nom: string }[],
    images: [
      {
        categorie: "locaux",
        legende: "L'accueil",
        src: null,
        alt: "L'accueil du club",
        motif: "accueil",
        tone: "sable",
        format: "large",
      },
      {
        categorie: "seances",
        legende: "Coaching EMS",
        src: null,
        alt: "Une séance de coaching EMS",
        motif: "ems",
        tone: "moka",
        format: "haut",
      },
      {
        categorie: "locaux",
        legende: "La salle",
        src: null,
        alt: "La salle du club",
        motif: "salle",
        tone: "taupe",
        format: "carre",
      },
      {
        categorie: "ambiance",
        legende: "L'ambiance du club",
        src: null,
        alt: "L'ambiance au club",
        motif: "club",
        tone: "beige",
        format: "carre",
      },
      {
        categorie: "seances",
        legende: "Cours collectif",
        src: null,
        alt: "Un cours collectif",
        motif: "groupe",
        tone: "sable",
        format: "large",
      },
      {
        categorie: "coachs",
        legende: "L'équipe",
        src: null,
        alt: "L'équipe du club",
        motif: "equipe",
        tone: "moka",
        format: "carre",
      },
      {
        categorie: "locaux",
        legende: "Le spa / jacuzzi privé",
        src: null,
        alt: "Le spa / jacuzzi privé",
        motif: "spa",
        tone: "beige",
        format: "haut",
      },
      {
        categorie: "seances",
        legende: "Yoga aérien",
        src: null,
        alt: "Un cours de yoga aérien",
        motif: "aerien",
        tone: "taupe",
        format: "carre",
      },
      {
        categorie: "evenements",
        legende: "Un événement au club",
        src: null,
        alt: "Un événement au club",
        motif: "evenement",
        tone: "sable",
        format: "large",
      },
      {
        categorie: "ambiance",
        legende: "Après la séance",
        src: null,
        alt: "Un moment de détente après la séance",
        motif: "club",
        tone: "moka",
        format: "carre",
      },
      {
        categorie: "seances",
        legende: "Danse",
        src: null,
        alt: "Un cours de danse",
        motif: "gwoka",
        tone: "beige",
        format: "carre",
      },
      {
        categorie: "coachs",
        legende: "Un coach en séance",
        src: null,
        alt: "Un coach pendant une séance",
        motif: "coaching",
        tone: "taupe",
        format: "haut",
      },
    ] as {
      categorie: CategorieGalerie;
      legende: string;
      src: string | null;
      alt: string;
      motif: Motif;
      tone: Tone;
      format: "carre" | "large" | "haut";
    }[],
    visionneuse: {
      fermer: "Fermer",
      precedente: "Photo précédente",
      suivante: "Photo suivante",
      titre: "Photo agrandie",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Actualités — articles d'exemple, à remplacer par ceux du club            */
  /* ------------------------------------------------------------------------ */
  actualites: {
    meta: {
      titre: "Actualités — nouveautés, événements et conseils | Coco Social Club",
      description:
        "Les nouveautés, les événements, les conseils et les informations importantes du Coco Social Club.",
    },
    entete: {
      surtitre: "Les actualités",
      titre: "Ce qui se passe *au club*",
      texte: "Nouveautés, événements, conseils et informations importantes.",
    },
    note: "Articles d'exemple : ils montrent la présentation de la rubrique et seront remplacés par les actualités du club.",
    badgeExemple: "Exemple",
    toutes: "Toutes",
    lire: "Lire l'article",
    retour: "Toutes les actualités",
    partager: "Partager cet article",
    filtrer: "Filtrer les actualités",
    resultat: "articles affichés",
    autres: "Les autres articles",
    categories: [
      { id: "nouveautes", nom: "Nouveautés" },
      { id: "evenements", nom: "Événements" },
      { id: "conseils", nom: "Conseils" },
      { id: "infos", nom: "Infos importantes" },
    ] as { id: CategorieActu; nom: string }[],
    articles: [
      {
        slug: "nouveau-creneau-au-planning",
        categorie: "nouveautes",
        titre: "Un nouveau créneau arrive au planning",
        resume:
          "Ici, le club annonce un nouveau cours ou un nouveau créneau, avec le jour, l'heure et le lien pour réserver.",
        corps: [
          "Cet article est un exemple. Il montre comment le club peut annoncer une nouveauté : un cours qui s'ajoute au planning, une nouvelle activité, un nouvel équipement.",
          "Le texte présente la nouveauté en quelques lignes, précise à qui elle s'adresse et rappelle comment réserver.",
          "Un bouton en fin d'article peut mener directement à la réservation en ligne.",
        ],
        photo: { src: null, alt: "Illustration de l'article", motif: "nouveaute", tone: "sable" },
      },
      {
        slug: "soiree-decouverte-des-danses",
        categorie: "evenements",
        titre: "Une soirée pour découvrir les danses du club",
        resume:
          "Ici, le club présente un événement : la date, les horaires, le programme et la façon de s'inscrire.",
        corps: [
          "Cet article est un exemple. Il montre comment le club peut présenter un événement : une soirée découverte, une journée portes ouvertes, un atelier.",
          "Le texte donne la date, les horaires et le programme, puis explique comment s'inscrire.",
          "Après l'événement, quelques photos peuvent compléter l'article et rejoindre la galerie.",
        ],
        photo: { src: null, alt: "Illustration de l'article", motif: "evenement", tone: "moka" },
      },
      {
        slug: "bien-preparer-sa-premiere-seance",
        categorie: "conseils",
        titre: "Bien préparer ta première séance",
        resume:
          "Ici, un coach partage un conseil : ce qu'il faut prévoir, comment se déroule la séance, à qui poser ses questions.",
        corps: [
          "Cet article est un exemple. Il montre comment l'équipe peut partager un conseil avec les adhérents.",
          "Le coach y explique ce qu'il faut prévoir pour une première séance, comment elle se déroule et à qui s'adresser en cas de question.",
          "Les conseils sont rédigés par l'équipe du club, avec ses mots.",
        ],
        photo: { src: null, alt: "Illustration de l'article", motif: "conseil", tone: "beige" },
      },
      {
        slug: "horaires-des-jours-feries",
        categorie: "infos",
        titre: "Les horaires pendant les jours fériés",
        resume:
          "Ici, le club annonce ses horaires exceptionnels, ses fermetures et toute information importante.",
        corps: [
          "Cet article est un exemple. Il montre comment le club peut prévenir ses adhérents d'un changement : horaires exceptionnels, fermeture, travaux.",
          "L'information est courte, datée et facile à retrouver. Elle peut aussi être mise en avant sur la page d'accueil.",
        ],
        photo: { src: null, alt: "Illustration de l'article", motif: "info", tone: "taupe" },
      },
    ] as Actualite[],
  },

  /* ------------------------------------------------------------------------ */
  /* Contact                                                                  */
  /* ------------------------------------------------------------------------ */
  contact: {
    meta: {
      titre: "Contact — Coco Social Club, 6 rue de Portland, Le Moule",
      description:
        "Écris au Coco Social Club par WhatsApp ou par e-mail, appelle le club ou viens nous voir au 6 rue de Portland, au Moule.",
    },
    entete: {
      surtitre: "Contact",
      titre: "Une question ? *Écris-nous*",
      texte:
        "Pour une information, un conseil ou un projet de groupe, l'équipe te répond avec plaisir.",
    },
    formulaire: {
      titre: "Prépare ton message",
      explication:
        "Remplis le formulaire, puis choisis WhatsApp ou l'e-mail : ton message s'ouvre tout prêt dans l'application, et c'est toi qui l'envoies.",
      confidentialite:
        "Rien n'est envoyé ni enregistré par ce site : ton message reste sur ton appareil jusqu'à ce que tu l'envoies toi-même.",
      obligatoire: "Les champs marqués d'un astérisque sont obligatoires.",
      champs: {
        prenom: { libelle: "Ton prénom", exemple: "Prénom" },
        telephone: { libelle: "Ton téléphone", exemple: "0690 00 00 00", facultatif: "facultatif" },
        sujet: { libelle: "Ta demande concerne" },
        message: { libelle: "Ton message", exemple: "Bonjour, j'aimerais…" },
      },
      sujets: [
        "La séance découverte EMS",
        "Les abonnements et les tarifs",
        "Les cours collectifs et les danses",
        "Les soins bien-être",
        "Une privatisation ou un projet d'entreprise",
        "Une autre demande",
      ],
      boutons: {
        whatsapp: "Ouvrir dans WhatsApp",
        email: "Ouvrir dans ma messagerie",
        copier: "Copier ma demande",
      },
      retours: {
        copie: "Ta demande est copiée. Tu peux la coller où tu veux.",
        echecCopie: "La copie n'a pas fonctionné. Sélectionne le texte ci-dessous pour le copier.",
        prenomManquant: "Indique ton prénom pour préparer le message.",
        messageManquant: "Écris ton message pour le préparer.",
        ouvertWhatsapp: "WhatsApp s'ouvre avec ton message. Il te reste à l'envoyer.",
        ouvertEmail: "Ta messagerie s'ouvre avec ton message. Il te reste à l'envoyer.",
      },
      apercu: "Aperçu de ton message",
      gabarit: {
        salutation: "Bonjour,",
        presentation: "Je suis",
        sujet: "Ma demande concerne :",
        telephone: "Mon téléphone :",
        signature: "Message préparé depuis le site du Coco Social Club.",
        objetEmail: "Demande depuis le site",
      },
    },
    direct: {
      titre: "Nous joindre directement",
      telephone: "Téléphone",
      email: "E-mail",
      adresse: "Adresse",
      reseaux: "Réseaux sociaux",
    },
    carte: {
      titre: "Nous trouver",
      texte: "6 rue de Portland, 97160 Le Moule.",
      afficher: "Afficher la carte",
      ouvrir: "Ouvrir dans Google Maps",
      information: "La carte est fournie par Google Maps. Elle ne se charge que si tu le demandes.",
      titreCadre: "Carte Google Maps du Coco Social Club",
    },
  },

  /* ------------------------------------------------------------------------ */
  /* Partage, cookies, pied de page, page introuvable                         */
  /* ------------------------------------------------------------------------ */
  partage: {
    titre: "Partager",
    whatsapp: "Partager sur WhatsApp",
    facebook: "Partager sur Facebook",
    copier: "Copier le lien",
    copie: "Lien copié",
    natif: "Partager",
  },

  cookies: {
    titre: "Tes préférences",
    texte:
      "On aimerait mesurer la fréquentation du site pour l'améliorer. Tu acceptes les cookies de mesure d'audience ?",
    demo: "Démonstration : aucun cookie de mesure n'est déposé, seul ton choix est gardé dans ton navigateur.",
    accepter: "Accepter",
    refuser: "Refuser",
    enSavoirPlus: "En savoir plus",
    gerer: "Gérer mes cookies",
    etiquette: "Préférences de confidentialité",
  },

  piedDePage: {
    accroche: "Physique & santé, sans compromis",
    colonnes: {
      navigation: "Le site",
      contact: "Contact",
      horaires: "Horaires",
    },
    mentions: "Mentions légales",
    droits: "Coco Social Club",
  },

  /* Bloc d'appel à l'action placé en bas des pages. */
  appelFinal: {
    surtitre: "À toi de jouer",
    titre: "Envie d'essayer ? *On t'attend*",
    texte: "Réserve ta séance en ligne, ou écris-nous si tu as une question.",
  },

  introuvable: {
    titre: "Cette page n'existe pas",
    texte: "Le lien a peut-être changé. Retourne à l'accueil pour retrouver ton chemin.",
    bouton: "Revenir à l'accueil",
  },

  erreur: {
    titre: "Cette page n'a pas pu s'afficher",
    texte: "Une erreur est survenue. Tu peux réessayer ou revenir à l'accueil.",
    reessayer: "Réessayer",
    accueil: "Revenir à l'accueil",
  },

  /* ------------------------------------------------------------------------ */
  /* Mentions légales — structure seulement, les textes sont à fournir        */
  /* ------------------------------------------------------------------------ */
  mentionsLegales: {
    meta: {
      titre: "Mentions légales — Coco Social Club",
      description: "Mentions légales, données personnelles et cookies du site du Coco Social Club.",
    },
    entete: {
      surtitre: "Informations légales",
      titre: "Mentions légales",
      texte:
        "Cette page de démonstration présente la structure des mentions légales. Les textes définitifs seront rédigés et validés par le club.",
    },
    aFournir: "Texte à fournir et à valider par le club.",
    sommaire: "Sommaire",
    retour: "Revenir à l'accueil",
    sections: [
      {
        id: "editeur",
        titre: "Éditeur du site",
        lignes: [
          "Coco Social Club, 6 rue de Portland, 97160 Le Moule, Guadeloupe.",
          "Téléphone : 0690 97 95 45 — e-mail : hello@cocosocialclub.fr.",
        ],
        aCompleter:
          "Dénomination sociale, forme juridique, numéro d'immatriculation, siège social et directeur de la publication.",
      },
      {
        id: "hebergement",
        titre: "Hébergement",
        lignes: [],
        aCompleter: "Nom, adresse et contact de l'hébergeur du site définitif.",
      },
      {
        id: "donnees",
        titre: "Données personnelles",
        lignes: [
          "Cette démonstration ne collecte aucune donnée : le formulaire de contact prépare un message que tu envoies toi-même par WhatsApp ou par e-mail.",
          "La réservation et le paiement se font sur Deciplus, l'application du club, qui applique sa propre politique de confidentialité.",
        ],
        aCompleter:
          "Politique de confidentialité du site définitif : données collectées, finalités, durée de conservation, droits et contact.",
      },
      {
        id: "cookies",
        titre: "Cookies",
        lignes: [
          "Cette démonstration ne dépose aucun cookie de mesure d'audience. Seul ton choix sur le bandeau est gardé dans ton navigateur, pour ne pas te le redemander.",
          "La carte Google Maps de la page Contact ne se charge que si tu le demandes.",
        ],
        aCompleter: "Liste des cookies du site définitif et durée de conservation du consentement.",
      },
      {
        id: "credits",
        titre: "Crédits",
        lignes: [
          "Démonstration réalisée par Gwada Web Studio.",
          "Polices Fraunces et DM Sans, sous licence SIL Open Font License.",
        ],
        aCompleter: "Crédits des photographies du site définitif.",
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* Export                                                                     */
/* -------------------------------------------------------------------------- */

/** Tous les contenus du site, avec la typographie française appliquée. */
export const content = typoDeep(contenus);

export type Content = typeof content;

/** Retrouve une famille d'activités par son identifiant. */
export function familleParId(id: FamilleId): Famille {
  const famille = content.activites.familles.find((item) => item.id === id);
  if (!famille) throw new Error(`Famille d'activités inconnue : ${id}`);
  return famille;
}

/** Retrouve un article par son identifiant d'adresse. */
export function articleParSlug(slug: string): Actualite | undefined {
  return content.actualites.articles.find((article) => article.slug === slug);
}

/** Nom affiché d'une catégorie d'actualités. */
export function nomCategorieActu(id: CategorieActu): string {
  return content.actualites.categories.find((categorie) => categorie.id === id)?.nom ?? id;
}
