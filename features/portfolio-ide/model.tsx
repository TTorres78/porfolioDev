export type PortfolioFileId = "a-propos" | "projets" | "competences" | "contact";

export type PortfolioFile = {
  id: PortfolioFileId;
  name: string;
  language: "MD";
};

export type ProjectPreviewIcon = "code" | "server" | "layout";
export type ProjectCategory = "Freelance" | "Professionnel" | "Personnel" | "Acad\u00E9mique";

export type ProjectKeyPoint = {
  title: string;
  description: string;
};

export type ProjectAnnexDocument = {
  id: string;
  title: string;
  description?: string;
  href?: string;
};

export type ProjectDetails = {
  context: string;
  keyPoints: ProjectKeyPoint[];
  annexDocuments?: ProjectAnnexDocument[];
};

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  details: ProjectDetails;
  stack: string[];
  modalLinks: {
    siteHref: string;
    sourceHref: string;
  };
  modalButtons: {
    isSiteEnabled: boolean;
    isSourceEnabled: boolean;
  };
  year: string;
  themeClassName: string;
  category: ProjectCategory;
  preview:
    | {
        type: "icon";
        value: ProjectPreviewIcon;
      }
    | {
        type: "image";
        value: string;
      }
    | {
        type: "text";
        value: string;
      };
};

export type SkillGroupId = "front" | "back" | "cloud" | "workflow" | "mobile";

export type SkillLevel = "Expert" | "Avancé" | "Intermédiaire" | "En montée en compétence";

export type SkillItem = {
  name: string;
  level: SkillLevel;
  experience: number;
};

export type SkillGroup = {
  id: SkillGroupId;
  title: string;
  description: string;
  details: string;
  skills: SkillItem[];
};

export type ContactMethodId = "email" | "github" | "linkedin";

export type ContactMethod = {
  id: ContactMethodId;
  title: string;
  description: string;
  href: string;
};

export const PORTFOLIO_FILES: PortfolioFile[] = [
  {
    id: "a-propos",
    name: "À Propos.md",
    language: "MD",
  },
  {
    id: "projets",
    name: "Mes Projets.md",
    language: "MD",
  },
  {
    id: "competences",
    name: "Compétences.md",
    language: "MD",
  },
  {
    id: "contact",
    name: "Contact.md",
    language: "MD",
  },
];

export const PORTFOLIO_FILES_BY_ID = PORTFOLIO_FILES.reduce<Record<PortfolioFileId, PortfolioFile>>(
  (accumulator, file) => {
    accumulator[file.id] = file;
    return accumulator;
  },
  {} as Record<PortfolioFileId, PortfolioFile>,
);

export const DEFAULT_OPEN_FILE_IDS: PortfolioFileId[] = PORTFOLIO_FILES.map((file) => file.id);

export const PROJECT_CARDS: ProjectCard[] = [
  {
    id: "arkrunners",
    title: "ArkRunners",
    description:
      "ArkRunners est une application mobile qui motive à bouger en extérieur en transformant marche et course en aventure, avec une histoire et des objectifs communautaires.",
    details: {
      context:
        "Développement d’une application mobile de gamification sportive combinant suivi d’activité, progression narrative et objectifs communautaires. Le projet soulève des enjeux de tracking temps réel, de rendu cartographique 2D, de synchronisation offline/online et d’optimisation des performances sur mobile.",
      keyPoints: [
        {
          title: "Structurer une architecture mobile scalable orientée features",
          description: "Architecture mobile modulaire orientée features, composants réutilisables, design system et séparation claire entre UI, domaine et services techniques.",
        },
        {
          title: "Concevoir une carte 2D interactive performante et maintenable.",
          description: "Rendu cartographique via Skia avec pipeline Tiled → JSON → moteur de rendu, gestion du sampling, snapping caméra, zoom quantifié et maintien de la netteté des tiles à différents niveaux d’échelle.",
        },
        {
          title: "Préparer une synchronisation robuste entre stockage local et backend.",
          description: "Préparer une synchronisation robuste entre stockage local et backend pour assurer résilience réseau, reprise de session et cohérence des données.",
        }
      ],
    },
    stack: ["React Native", "Expo", "Tailwind", "Skia"],
    modalLinks: {
      siteHref: "#",
      sourceHref: "https://github.com/ArkRunners/mobile-arkrunners",
    },
    modalButtons: {
      isSiteEnabled: false,
      isSourceEnabled: true,
    },
    year: "2026",
    themeClassName: "from-[#007acc] to-[#004a82]",
    category: "Freelance",
    preview: {
      type: "image",
      value: "/projects/arkrunners-banner.png",
    },
  },
  {
    id: "idposition",
    title: "IDPosition",
    description:
      "IDPosition est une solution SaaS qui permet aux entreprises de suivre et gérer leurs équipements et espaces en temps réel.",
    details: {
      context:
        "Plateforme SaaS multi-tenant sécurisée et scalable, capable de répondre aux exigences de groupes du CAC 40 (Orange, Dior, FDJ, Vinci, BNP...)",
      keyPoints: [
        {
          title: "Architecture SaaS & Scalabilité",
          description: "Migration avec l'équipe vers une infrastructure Kubernetes (Scaleway) en mode multi-tenant, garantissant une isolation totale des données avec une base PostgreSQL dédiée par client.",
        },
        {
          title: "Performance & Big Data.",
          description: "Optimisation globale de la base de données et des requêtes SQL sur des volumes dépassant les 3 millions de lignes, résolvant des blocages critiques de performance.",
        },
        {
          title: "Sécurité & Identité (Enterprise-grade)",
          description: "Implémentation de Keycloak pour l'authentification centralisée et l'intégration des SSO clients. Mise en place de protections via Cloudflare, avec plusieurs audits de sécurité externes réussis avec brio.",
        },
        {
          title: "Développement Fullstack",
          description: "Conception d’une API robuste sous Symfony 6 / PHP 8 incluant un moteur de gestion de droits complexe (profils de droit et d'accès) et une interface utilisateur réactive sous Vue.js 3.",
        },
        {
          title: "Industrialisation & DevOps",
          description: "Mise en œuvre de pipelines CI/CD automatisés avec ArgoCD et GitHub Actions, assurant des déploiements stables et fréquents.",
        }
      ],
    },
    stack: ["VueJS", "Symfony", "Docker", "PostgreSQL", "Kubernetes", "Keycloak", "Cloudflare", "ArgoCD"],
    modalLinks: {
      siteHref: "https://www.idposition.fr/",
      sourceHref: "#",
    },
    modalButtons: {
      isSiteEnabled: true,
      isSourceEnabled: false,
    },
    year: "2025",
    themeClassName: "from-[#ce9178] to-[#9c664f]",
    category: "Professionnel",
    preview: {
      type: "image",
      value: "/projects/idposition-banner.png",
    },
  },
  {
    id: "idcapture",
    title: "IDCapture",
    description:
      "Application mobile Android de gestion d’inventaire terrain, conçue pour accélérer l’identification, le contrôle et la mise à jour d’actifs via scan RFID et QR Code.",
    details: {
      context:
        "L'application répond à une contrainte forte de mobilité : les opérateurs doivent pouvoir travailler aussi bien hors ligne qu’avec un réseau instable, tout en garantissant la persistance locale des données et leur synchronisation différée avec le système central",
      keyPoints: [
        {
          title: "Scan et identification terrain",
          description: "Gestion des lecteurs RFID et QR Code avec une mise à jour rapide des informations d’inventaire. Usage optimisé pour les contraintes de terrain et la manipulation rapide sur tablette.",
        },
        {
          title: "Architecture et et refonte applicative.",
          description: "Migration progressive vers une architecture MVVM en Java. Séparation claire entre UI / ViewModel / Repository / Data layer. Centralisation de la logique métier pour rendre l’application plus modulaire, testable et maintenable.",
        },
        {
          title: "Persistance locale et fonctionnement hors ligne.",
          description: "Stockage local des données via Room / SQLite pour permettre la consultation et la modification sans connexion. Conservation locale des créations et mises à jour avant remontée serveur, tout en gardant un état applicatif cohérent même en contexte de coupure réseau",
        },
        {
          title: "Mécanisme de synchronisation différée.",
          description: "Mise en place d’un système de UpSync / DownSync pour synchroniser les données entre l’appareil et le backend via un WorkManager en arrière-plan. Gestion d'une file d'attente de synchronisation avec statut et priorisations selon les dépendances métiers.",
        }
      ],
    },
    stack: ["Java", "AndroidStudio", "MVVM", "Room", "SQLite", "GraphQL"],
    modalLinks: {
      siteHref: "https://www.idposition.fr/",
      sourceHref: "#",
    },
    modalButtons: {
      isSiteEnabled: true,
      isSourceEnabled: false,
    },
    year: "2025",
    themeClassName: "from-[#4fc1ff] to-[#1c81b8]",
    category: "Professionnel",
    preview: {
      type: "image",
      value: "/projects/idcapture-banner.png",
    },
  },
  {
    id: "konstellation",
    title: "Konstellation",
    description:
      "Konstellation transforme des idées et citations en constellations interactives, pour explorer et relier visuellement les pensées des utilisateurs.",
    details: {
      context:
        "Konstellation est un prototype full-stack de visualisation 3D de contenu textuel, où chaque idée est représentée comme un nœud spatial interactif dans une constellation. Le projet explore à la fois les problématiques de rendu WebGL, de structuration de données relationnelles, et de scalabilité du placement spatial pour afficher un ensemble d’objets dynamiques de manière lisible et performante.",
      keyPoints: [
        {
          title: "Rendu 3D interactif en temps réel",
          description: "Rendu des nœuds, post-processing visuel, gestion du focus caméra, sélection d’éléments et mise en avant des relations entre idées.",
        },
        {
          title: "Système de placement spatial optimisé",
          description: "Calcul de coordonnées 3D via un algorithme de Poisson disk sampling, combiné à un partitionnement spatial en grille pour limiter les chevauchements et faciliter l’insertion de nouveaux éléments dans l’espace.",
        },
        {
          title: "Pipeline de données structuré",
          description: "Séparation des entités métier, normalisation des tags, persistance côté base relationnelle et exposition via une API Symfony pour alimenter le frontend.",
        }
      ],
    },
    stack: ["Symfony", "NextJS", "React Three Fiber", "PostgreSQL", "ThreeJS"],
    modalLinks: {
      siteHref: "#",
      sourceHref: "#",
    },
    modalButtons: {
      isSiteEnabled: false,
      isSourceEnabled: false,
    },
    year: "2025",
    themeClassName: "from-[#6d7bff] to-[#3f4fa8]",
    category: "Personnel",
    preview: {
      type: "image",
      value: "/projects/konstellation-banner.png",
    },
  },
  {
    id: "boxty",
    title: "Boxty",
    description:
      "Box’Ty est une plateforme de mini-jeux multijoueur pensée pour le jeu en local sur écran partagé, où chaque smartphone sert de manette temps réel.",
    details: {
      context:
        "Le projet repose sur une architecture distribuée combinant une application mobile Flutter, un backend Node.js/TypeScript exposant la logique de session et le transport des inputs via WebSocket, un frontend Vue.js pour l’interface TV/PC, une base PostgreSQL pour la persistance, ainsi que des jeux Unity intégrés en WebGL côté navigateur.",
      keyPoints: [
        {
          title: "Architecture cross-platform.",
          description: "Conception d’une architecture cross-platform mobile + web permettant à plusieurs joueurs de rejoindre une même session via un code salon, avec gestion d’un hôte, synchronisation des connexions et pilotage de la partie depuis téléphone ou navigateur.",
        },
        {
          title: "Flux en temps réel.",
          description: "Mise en place d’un flux temps réel basé sur WebSocket pour transmettre les inputs de la manette Flutter vers le backend, puis vers l’interface web et le mini-jeu lancé, avec une logique de traduction intermédiaire des données entre les différentes couches applicatives.",
        },
        {
          title: "Modélisation et persistance des données.",
          description: "Modélisation et persistance des données sous PostgreSQL avec entités dédiées aux utilisateurs, jeux, playlists et salons, incluant une logique d’optimisation sur le cycle de vie des rooms pour supprimer automatiquement les salons inactifs et limiter les données orphelines.",
        },
        {
          title: "Intégration de mini-jeux en WebGL.",
          description: "Intégration de mini-jeux Unity WebGL dans le frontend web, avec prise en compte des problématiques de chargement, de fluidité et de performance sur navigateur dans un contexte de jeu multijoueur orienté grand public.",
        }
      ],
      annexDocuments: [
        {
          id: "boxty-archi",
          title: "Dossier d'analyse technique",
          description: "Dossier technique réalisé au début du projet.",
          href: "/projects/Dossier%20Analyse%20technique.pdf",
        },
        {
          id: "boxty-realtime",
          title: "Dossier de maintenance et d'administration",
          description: "Documentation sur la gestion et l'administration du système en temps réel.",
          href: "/projects/Documentation%20de%20maintenance%20et%20d%27administration%20Box%27ty.pdf",
        },
        {
          id: "boxty-data",
          title: "Manuel utilisateur",
          description: "Guide d'utilisation du système pour les utilisateurs finaux.",
          href: "/projects/Dossier%20manuel%20utilisateur%20Box%27ty.pdf",
        },
      ],
    },
    stack: ["Docker", "Express", "Unity WebGL", "VueJS", "Flutter", "PostgreSQL", "WebSocket"],
    modalLinks: {
      siteHref: "#",
      sourceHref: "#",
    },
    modalButtons: {
      isSiteEnabled: false,
      isSourceEnabled: false,
    },
    year: "2021",
    themeClassName: "from-[#2cb67d] to-[#146c43]",
    category: "Acad\u00E9mique",
    preview: {
      type: "image",
      value: "/projects/boxty-banner.png",
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "front",
    title: "Front-end",
    description: "Création d'interfaces utilisateur interactives, accessibles et responsives.",
    details: "J'accorde une grande importance à l'ergonomie et aux performances de rendu.",
    skills: [
      { name: "HTML/CSS", level: "Avancé", experience: 7 },
      { name: "TypeScript", level: "Avancé", experience: 5 },
      { name: "JavaScript", level: "Avancé", experience: 5 },
      { name: "VueJS", level: "Intermédiaire", experience: 4 },
      { name: "Tailwind CSS", level: "Intermédiaire", experience: 3 },
      { name: "Next.js", level: "En montée en compétence", experience: 1 },
    ],
  },
  {
    id: "back",
    title: "Back-end",
    description: "Développement d'APIs robustes, sécurisées et gestion de bases de données.",
    details: "Je conçois des architectures claires avec un focus sur la maintenabilité.",
    skills: [
      { name: "Symfony", level: "Intermédiaire", experience: 4 },
      { name: "PostgreSQL", level: "Intermédiaire", experience: 3 },
      { name: "Laravel", level: "En montée en compétence", experience: 1 },
      { name: "Node.js", level: "En montée en compétence", experience: 1 },
    ],
  },
  {
    id: "cloud",
    title: "DevOps & Cloud",
    description: "Automatisation du déploiement, intégration continue et hébergement.",
    details: "J'industrialise les livraisons pour garder un cycle de développement fluide.",
    skills: [
      { name: "Docker", level: "Intermédiaire", experience: 4 },
      { name: "CI/CD", level: "Intermédiaire", experience: 3 },
      { name: "Kubernetes", level: "Intermédiaire", experience: 3 },
      { name: "Keycloak", level: "En montée en compétence", experience: 1 },
    ],
  },
  {
    id: "workflow",
    title: "Outils & Workflow",
    description: "Gestion de version, conception UI/UX et productivité au quotidien.",
    details: "Mon workflow privilégie la clarté, la collaboration et la qualité d'exécution.",
    skills: [
      { name: "Git / GitHub", level: "Expert", experience: 8 },
      { name: "VS Code", level: "Expert", experience: 8 },
      { name: "Figma", level: "Intermédiaire", experience: 3 },
      { name: "Android Studio", level: "Intermédiaire", experience: 3 },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    description: "Création d'applications mobiles performantes et engageantes.",
    details: "Je conçois des expériences utilisateur fluides sur les plateformes iOS et Android.",
    skills: [
      { name: "Java", level: "Intermédiaire", experience: 3 },
      { name: "Kotlin", level: "Intermédiaire", experience: 3 },
      { name: "React Native", level: "En montée en compétence", experience: 1 },
    ],
  },
];

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: "email",
    title: "Email",
    description: "timothe.torres.0505@gmail.com",
    href: "mailto:timothe.torres.0505@gmail.com",
  },
  {
    id: "github",
    title: "GitHub",
    description: "Voir mes projets de développement",
    href: "https://github.com/TTorres78",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    description: "Suivre mon parcours professionnel",
    href: "https://www.linkedin.com/in/timoth%C3%A9-torres-0121031a7/",
  },
];

export const CONTACT_METHODS_BY_ID = CONTACT_METHODS.reduce<
  Record<ContactMethodId, ContactMethod>
>((accumulator, method) => {
  accumulator[method.id] = method;
  return accumulator;
}, {} as Record<ContactMethodId, ContactMethod>);
