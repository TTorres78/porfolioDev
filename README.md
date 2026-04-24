# Portfolio 02 - IDE Style

Portfolio Next.js inspiré d’une interface IDE, orienté lisibilité, navigation par onglets et présentation structurée des projets.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript strict
- Tailwind CSS v4
- Lucide React

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run check
```

## Architecture

```text
app/
  layout.tsx
  page.tsx
  globals.css

features/portfolio-ide/
  icons.tsx              # Icônes SVG partagées (GitHub, LinkedIn)
  model.tsx              # Données métier + types (sans style)
  ui-config.tsx          # Mapping UI (icônes, classes, accents)
  portfolio-ide.tsx      # Shell IDE (tabs, sidebar, navigation)
  contents/
    about-content.tsx
    projects-content.tsx
    skills-content.tsx
    contact-content.tsx
    index.ts             # Mapping fileId -> composant de contenu
```

## Principes appliqués

- Séparation des responsabilités:
  - `model.tsx` = contenu et types.
  - `ui-config.tsx` = règles visuelles partagées.
  - `contents/*` = rendu des sections.
- Accessibilité:
  - Pattern `tablist/tab/tabpanel`.
  - Navigation clavier des onglets (`ArrowLeft`, `ArrowRight`, `Home`, `End`).
- État partageable:
  - Synchronisation de l’onglet actif avec le hash URL (`#a-propos`, `#projets`, etc.).
- Design system:
  - Tokens CSS centralisés dans `app/globals.css`.

## Personnalisation rapide

- Modifier les données: `features/portfolio-ide/model.tsx`
- Modifier les couleurs/icônes UI: `features/portfolio-ide/ui-config.tsx`
- Modifier la structure visuelle des sections: `features/portfolio-ide/contents/*`
