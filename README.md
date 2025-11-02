# Somedia Portfolio

Portfolio interactif et moderne développé avec React, Vite et Framer Motion. Ce projet présente une expérience utilisateur immersive avec des animations fluides, une galerie vidéo 3D et des composants adaptatifs pour mobile et desktop.

## Aperçu du Projet

Portfolio créatif mettant en avant :
- **Hero Section Interactive** : Mascotte animée avec cartes en pile sur mobile
- **Galerie Vidéo 3D** : Navigation immersive en dôme avec gestes tactiles
- **Design Responsive** : Expérience optimisée mobile-first
- **Animations Fluides** : Transitions et interactions avec Framer Motion
- **Performance Optimisée** : Bundle optimisé avec Vite et lazy loading

## Stack Technique

### Frontend
- **React 19.1.1** - Framework JavaScript moderne
- **Vite 7.1.7** - Bundler ultra-rapide avec HMR
- **Framer Motion 12.23.24** - Animations et gestes avancés
- **Tailwind CSS 3.4.18** - Framework CSS utility-first
- **GSAP 3.13.0** - Animations haute performance

### Gestion Média
- **Cloudinary** - CDN et optimisation d'images/vidéos
- **React Player** - Lecteur vidéo universel
- **Lucide React** - Icônes SVG optimisées

### Outils de Développement
- **ESLint** - Linting et qualité de code
- **PostCSS & Autoprefixer** - Traitement CSS
- **@use-gesture/react** - Gestion des gestes tactiles

## Structure du Projet

```
somedia_portfolio/
├── src/
│   ├── components/
│   │   ├── covers/         # Composants de cartes (BounceCards)
│   │   ├── gallery/        # Galerie vidéo 3D (DomeVideoGallery)
│   │   ├── hero/           # Section héro avec mascotte
│   │   ├── layout/         # Header et composants de mise en page
│   │   └── sections/       # Contact, Portfolio, etc.
│   ├── styles/
│   │   └── globals.css     # Styles globaux et variables CSS
│   ├── utils/
│   │   ├── cloudinary.js   # Configuration Cloudinary
│   │   └── cloudinary-debug.js # Utilitaires de debug
│   ├── assets/             # Images, SVG et ressources statiques
│   ├── App.jsx            # Composant racine
│   └── main.jsx           # Point d'entrée React
├── public/                 # Ressources publiques
├── eslint.config.js       # Configuration ESLint
├── tailwind.config.js     # Configuration Tailwind
├── vite.config.js         # Configuration Vite
└── package.json           # Dépendances et scripts
```

## Installation et Lancement

### Prérequis
- **Node.js** ≥ 16.0.0
- **npm** ou **yarn**

### Installation
```bash
# Cloner le repository
git clone [https://github.com/crimra/somedia_portfolio.git]
cd somedia_portfolio

# Installer les dépendances
npm install
```

### Scripts Disponibles

```bash
# Démarrer le serveur de développement
npm run dev
# → Démarre Vite dev server sur http://localhost:5173

# Build de production
npm run build
# → Génère le build optimisé dans /dist

# Prévisualiser le build
npm run preview
# → Sert le build de production localement

# Linter le code
npm run lint
# → Vérifie la qualité du code avec ESLint
```

## Fonctionnalités Principales

### Hero Section
- **Desktop** : Cartes flottantes avec effet bounce au hover
- **Mobile** : Cartes empilées avec interactions tactiles
- **Mascotte Interactive** : Animations fluides et bulles d'information
- **Détection Automatique** : Bascule responsive selon la taille d'écran

### Galerie Vidéo 3D
- **Navigation Dôme** : Disposition circulaire des vidéos en 3D
- **Gestes Tactiles** : Swipe et pinch pour navigation mobile
- **Lecture Fluide** : Système de modal avec contrôles personnalisés
- **Auto-rotation** : Animation continue avec pause au hover/touch

### Responsive Design
- **Mobile-First** : Approche progressive enhancement
- **Breakpoints Optimisés** : Adaptation fluide sur tous écrans
- **Touch-Friendly** : Interactions optimisées pour le tactile
- **Performance Mobile** : Lazy loading et optimisations

## Composants Clés

### `HeroWithMascot.jsx`
Composant principal de la section héro avec :
- Détection de taille d'écran
- Système de bulles interactives
- Intégration SwipeCards (mobile) / BounceCards (desktop)

### `DomeVideoGallery.jsx`
Galerie vidéo immersive avec :
- Positionnement 3D en dôme
- Gestion des gestes (@use-gesture/react)
- Système de modal vidéo
- Auto-rotation et animations GSAP

### `SwipeCards` (Mobile)
Composant de cartes empilées avec :
- Effet de pile avec rotations
- Interactions de clic
- Animations Framer Motion
- Bulles contextuelles

## Configuration

### Cloudinary
Configuration dans `src/utils/cloudinary.js` :
```javascript
const CLOUDINARY_CONFIG = {
    cloud_name: 'dpk4mqxrg'
};
```

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.js` avec :
- Thème étendu
- Animations personnalisées
- Variables CSS custom

### Vite
Configuration optimisée pour :
- Dev server avec `--host` pour accès réseau local
- Build optimisé pour production
- HMR (Hot Module Replacement) rapide

## Bonnes Pratiques Implémentées

### Performance
- **Lazy Loading** : Chargement différé des composants lourds
- **Code Splitting** : Division automatique du bundle
- **Image Optimization** : CDN Cloudinary avec formats adaptatifs
- **CSS Purging** : Suppression des styles inutilisés

### UX/UI
- **Mobile-First** : Design adaptatif progressif
- **Micro-interactions** : Feedback utilisateur immédiat
- **Accessibility** : Navigation clavier et screen readers
- **Loading States** : Indicateurs visuels de chargement

### Code Quality
- **ESLint Rules** : Standards de code stricts
- **Component Architecture** : Séparation claire des responsabilités
- **Utility Functions** : Réutilisabilité maximale
- **Clean Code** : Suppression des logs et commentaires debug

## Déploiement

### Build de Production
```bash
npm run build
```
Génère un dossier `/dist` optimisé avec :
- Bundle JavaScript minifié
- CSS extrait et optimisé
- Assets optimisés et hashés
- Service worker (si configuré)

### Platforms Recommandées
- **Vercel** : Déploiement automatique depuis Git
- **Netlify** : Build et CDN intégrés
- **GitHub Pages** : Hébergement gratuit
- **Firebase Hosting** : Performance et analytics

## Debug et Développement

### Outils de Debug
- **React DevTools** : Inspection des composants
- **Vite Inspector** : Debug du bundling
- **Framer Motion DevTools** : Animations debug
- **Cloudinary Inspector** : Vérification des URLs média

### Variables d'Environnement
Créer un fichier `.env.local` :
```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_API_URL=your_api_url
```

## Prochaines Étapes

### Améliorations Prévues
- [ ] **Tests Unitaires** : Jest + React Testing Library
- [ ] **Storybook** : Documentation des composants
- [ ] **PWA** : Service worker et cache
- [ ] **Analytics** : Suivi des interactions utilisateur
- [ ] **SEO** : Meta tags dynamiques et sitemap

### Optimisations Techniques
- [ ] **Bundle Analysis** : Analyse de la taille du bundle
- [ ] **Lighthouse Score** : Optimisation performance
- [ ] **A11y Audit** : Amélioration de l'accessibilité
- [ ] **Cross-browser Testing** : Compatibilité étendue

## Contribution

### Guide pour Stagiaires
1. **Fork** le repository
2. **Créer une branche** : `git checkout -b feature/nouvelle-fonctionnalite`
3. **Développer** en suivant les conventions du projet
4. **Tester** avec `npm run lint` et `npm run build`
5. **Commit** avec des messages descriptifs
6. **Push** et créer une Pull Request

### Standards de Code
- **Conventions** : Nommage en camelCase pour JS, kebab-case pour CSS
- **Components** : Un composant par fichier, export default
- **Imports** : Ordre alphabétique, chemins relatifs
- **Comments** : JSDoc pour les fonctions complexes

## Support

Pour toute question ou problème :
- **Issues GitHub** : Signaler les bugs
- **Discussions** : Questions générales
- **Wiki** : Documentation détaillée
- **Contact** : [email de contact]

---

**Développé avec pour une expérience utilisateur exceptionnelle**
