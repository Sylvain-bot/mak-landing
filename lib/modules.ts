// Modules présentés dans le menu Fonctionnalités, la page /fonctionnalites et les pages modules.
// Les URL existantes sont conservées pour le référencement.

export type ModuleGroup = "coeur" | "cabinet";

export type MakModule = {
  slug: string;
  href: string;
  name: string; // nom court (menu, grille)
  pitch: string; // phrase d'explication (menu, grille)
  group: ModuleGroup;
};

export const MODULE_GROUPS: { id: ModuleGroup; label: string }[] = [
  { id: "coeur", label: "Le cœur de MAK" },
  { id: "cabinet", label: "Les outils du cabinet" },
];

export const MODULES: MakModule[] = [
  {
    slug: "documentation-bilan-kine",
    href: "/fonctionnalites/documentation-bilan-kine",
    name: "Bilan dicté",
    pitch: "Tu parles pendant la séance, ton bilan se rédige.",
    group: "coeur",
  },
  {
    slug: "suivi-patient",
    href: "/fonctionnalites/suivi-patient",
    name: "Suivi patient et exercices",
    pitch: "Programme d'exercices sur WhatsApp, suivi entre les séances.",
    group: "coeur",
  },
  {
    slug: "aide-decision-clinique",
    href: "/fonctionnalites/aide-decision-clinique",
    name: "Copilot IA clinique",
    pitch: "Questions cliniques et bibliographiques, réponses sourcées.",
    group: "coeur",
  },
  {
    slug: "videotransmission",
    href: "/fonctionnalites/videotransmission",
    name: "Vidéotransmission et FAMI",
    pitch: "Téléconsultation sécurisée, éligible à l'aide FAMI.",
    group: "cabinet",
  },
  {
    slug: "gestion-administrative",
    href: "/fonctionnalites/gestion-administrative",
    name: "Gestion administrative",
    pitch: "Courriers et relances rédigés depuis tes modèles.",
    group: "cabinet",
  },
  {
    slug: "contrats-remplacement",
    href: "/fonctionnalites/contrats-remplacement",
    name: "Contrats de remplacement",
    pitch: "Rédigés, signés et déclarés à l'Ordre. Gratuit.",
    group: "cabinet",
  },
];

export const ALL_FEATURES_HREF = "/fonctionnalites";
export const FAMI_HREF = "/guide-fami";
