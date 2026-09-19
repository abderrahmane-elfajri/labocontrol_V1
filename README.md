# Handoff : Labocontrol — refonte "Terrain"

## Overview

Refonte complète du site institutionnel de **Labocontrol** (labocontrol.ma) — laboratoire marocain d'étude, d'essais et de contrôle qualifié LAB/03 par le Ministère de l'Équipement. Le site présente 5 disciplines (géotechnique, expertises, essais béton, granulats, études d'impact environnemental), 5 agences (Casablanca, Fès, Marrakech, Tanger, El Jadida), les références clients (privé, offices, organismes publics), le portfolio projets, la démarche qualité, les carrières, et un portail espace client.

La direction retenue est **"Terrain"** : univers éditorial chaud (papier crème + noir profond + rouge du logo + bleu ardoise complémentaire), typographie serif de caractère (Fraunces) pour les titres, sans-serif (Inter) pour le corps de texte, monospace (JetBrains Mono) pour les métadonnées techniques. Motion cinématique subtile (parallax hero, révélations au scroll, rotator de titre, marquee clients).

## About the Design Files

Les fichiers livrés dans ce bundle sont des **références de design réalisées en HTML/CSS/JS vanilla** — ce sont des prototypes fonctionnels qui montrent l'apparence, la structure et le comportement voulus. Ils ne sont **pas destinés à être livrés en production tels quels**.

La mission du développeur est de **recréer ces designs dans l'environnement du projet cible** en utilisant les patterns, composants et bibliothèques du codebase existant :

- Si le projet a un stack établi (React/Next.js, Vue/Nuxt, Astro, WordPress, etc.), recréer les designs dans ce cadre.
- Si aucun environnement n'existe encore, **Next.js (React)** est le choix recommandé pour ce type de site institutionnel multi-pages avec SEO fort (App Router + composants serveur pour les pages statiques, sitemap.xml natif, images optimisées via `next/image`).

Alternative légère : **Astro** convient parfaitement — encore plus performant pour un site majoritairement statique de ce type.

## Fidelity

**Haute fidélité (hi-fi).** Les mockups représentent la version finale attendue :

- Palette de couleurs finalisée (rouge Labocontrol `#D01919`, bleu ardoise `#3B5468`, papier crème `#F5F2EC`, encre noire `#14100E`).
- Typographies choisies et calibrées (Fraunces / Inter / JetBrains Mono via Google Fonts).
- Espacements, tailles de police, bordures, ombres, states d'interaction : à reproduire pixel-perfect.
- Micro-interactions et animations : à respecter dans leur intention (durées, easing, propriétés animées).

Les images générées par IA (`hero-drill.jpg`, `hero-concrete.jpg`, `hero-aerial.jpg`) sont des **placeholders** — à remplacer par des photos réelles du client. Les emplacements et cadrages restent identiques.

---

## Screens / Views

### 1. Accueil (`terrain/index.html`)

**Purpose** : Page d'entrée, vitrine principale. Doit communiquer l'expertise, la qualification État, la couverture nationale, et pousser à la conversion (devis).

**Layout** :
- Conteneur max : `1440px`, centré horizontalement.
- Padding horizontal fluide : `clamp(20px, 4vw, 64px)`.
- Sections empilées verticalement, séparées par des transitions de fond (papier → dune → noir profond → papier).

**Composants** :

- **Navigation fixe (`.nav`)** : Fond transparent au chargement, fond crème avec backdrop-blur au scroll (`.nav.scrolled`). Padding `18px → 12px` transition. Logo à gauche (36px de hauteur), 7 liens centraux (Inter 14px, medium, gap 4px), CTA "Demander un devis" à droite (fond `#14100E`, texte crème, padding 12×18, transition vers `#D01919` au hover). Sur mobile (<900px), burger menu qui ouvre un drawer full-screen.

- **Hero (`.hero`)** :
  - Height : `100vh`, image de fond drill rig avec scale animé (`heroZoom` 22s infinite alternate) et parallax scroll subtile.
  - Overlay radial-gradient rouge en bas-gauche + gradient noir→crème vertical.
  - SVG "topo lines" superposé en `mix-blend-mode: screen`, opacité 35%, animation `topoDrift` 60s linear (déplacement stroke-dashoffset).
  - Top bar : "LAB/03 · Qualifié par l'État" (mono, blanc opacité 75) à gauche, coordonnées GPS "33.5731° N / 7.5898° W / CASABLANCA" à droite avec pastilles rouges devant chaque coordonnée.
  - Eyebrow badge : "Depuis 1998 — Laboratoire d'étude & contrôle" dans une pill outlined blanche, avec point rouge pulsant (`pulse` 2s).
  - **Titre rotator** (`.hero__title-rotator`) : Fraunces, `clamp(48px, 8.5vw, 132px)`, line-height 0.95, letter-spacing -0.03em. 3 variantes qui s'alternent toutes les 5.5s avec transition opacity + translateY + filter blur(4px). Data-attribute `data-rotator="A|B|C"` avec `|` comme séparateur. Variantes :
    - "Le sol / ne ment *jamais.* / Nous non plus." (avec *span.stroke* pour la dernière ligne = outline uniquement)
    - "Sous chaque / chantier *réussi,* / un sol compris."
    - "Sous chaque / chantier *réussi,* / un sol maîtrisé."
    - "Un rapport / *Labocontrol* / vaut mieux qu'un permis."
  - Meta bar en bas : description + CTAs (`.btn--primary` fond rouge + `.btn--ghost` bordure blanche transparente).
  - "DÉFILER" indicator centré en bas avec ligne animée.

- **Key Figures (`.figures`)** : 4 colonnes en grille, 1px de séparation verticale entre chaque. Chiffres Fraunces `clamp(56px, 6.5vw, 92px)`, unités en superscript rouge, labels mono uppercase. Chiffres animés via IntersectionObserver + easing cubic-out. Valeurs : 27 ans, 2400+ projets, 5 agences, LAB/03.

- **Méthode (`.how`)** : Nouvelle section 4 étapes (Brief 24h → Devis 3-5j → Terrain → Rapport signé). Fond `--bg-2` (dune). Chaque étape a un grand chiffre Fraunces 88px rouge, un nom serif 28px, une description 15px et un tag mono avec délai. Lien "Voir la démarche complète →" en accent rouge dans le header.

- **Services (`.services`)** : Liste de 5 rangées cliquables (grid 80px 1fr 2fr 1fr 40px). Au hover : padding horizontal 24px + bg dune + barre verticale rouge à gauche (`::before scaleY(0→1)`). Chaque ligne = numéro mono (`/01`) + titre serif + description + tags mono (bordure `--line`) + flèche `→`. Liens vers `services/{discipline}.html`.

- **Qualifications (`.qual`)** : Section fond noir profond `#14100E`, texte blanc. Grille 4 cartes bordure 1px transparente devenant orange au hover (`transform: translateY(-4px)`). Chaque carte : badge circulaire 48px avec numéro mono, titre serif 22px, description blanche opacité 70, ref mono en bas.

- **Moyens matériels (`.equip`)** : Grid mosaïque 6 colonnes avec cellules de tailles variables (`--big` = 3×2, `--wide` = 2×1). Placeholders avec pattern diagonal + label mono en bas et numéro d'inventaire (M-01 / 12) en haut à droite. Le placeholder est à remplacer par des vraies photos d'équipement.

- **Clients (`.clients`)** : Titre + marquee horizontal infini (14 noms de clients dupliqués, animation `marquee` 40s linear). Noms en Fraunces 40px muted, deviennent noirs au hover. Séparés par des dots rouges 8px. Masqué par un `mask-image: linear-gradient` sur les bords pour un fade in/out.

- **Testimonial (`.testi`)** : Section citation. Blockquote serif italic 300 `clamp(28px, 4vw, 56px)`, ligne 1.25. Auteur avec avatar carré 64px (initiales serif blanches sur fond noir). 3 dots de navigation (32px×2px, active = rouge). Carrousel auto de 3 citations (8s), swipe manuel par clic sur les dots. Transition opacity 0.3s.

- **Agences (`.agencies`)** : Grid 1fr / 1fr. Gauche : carte SVG stylisée du Maroc avec 5 pins interactifs (Tanger, Fès, Casablanca, Marrakech, El Jadida). Pin = point rouge 14px avec animation `pin` box-shadow expansive infinie, label mono qui apparaît au hover. Droite : liste des 5 agences avec numéro mono + serif + adresse + tél/email. Sync bidirectionnel pin ↔ ligne au hover.

- **Actualités (`.news`)** : 3 cartes flexibles. Placeholder image (aspect 4/3) avec pattern diagonal, tag mono en haut à gauche. Corps : date mono bleue, titre serif 24px, "LIRE L'ARTICLE →" mono rouge en bas. Hover : `translateY(-4px)` + bordure rouge.

- **Carrières callout (`.careers`)** : Fond noir. Grid 1fr / 1fr. Gauche : eyebrow + titre serif 5vw + description + CTA. Droite : 4 stats (120 collab, 8 postes, 40h formation, 5 villes). Bordure haute 1px blanche pour chaque stat.

- **Contact (`.contact`)** : Grid 1fr / 1fr. Gauche : formulaire avec labels mono uppercase, inputs bordure basse `--line`, focus bordure rouge, textarea 4 rows. Droite : 4 info-blocks (Siège, Téléphone, Email, Horaires) bordure haute `--line`.

- **Footer (`.footer`)** : Fond noir `#14100E`. 5 colonnes desktop (brand + 3 col liens + col newsletter). Brand : logo blanc, description, 4 icônes sociales (LinkedIn, Facebook, Instagram, YouTube — SVG 32×32 bordure 1px, hover fond rouge). Newsletter : input email + bouton flèche → sur bordure basse. Bottom row : copyright + 3 liens légaux (Mentions, Confidentialité, Espace client) + certification.

---

### 2. Services vue d'ensemble (`terrain/services.html`)

5 sections empilées, alternance de fond (papier / dune / papier / dune / papier). Chaque section : image ou placeholder à gauche (aspect 4/5), corps à droite (eyebrow, titre serif avec em italic rouge, lead, liste numérotée `.svc-list` avec 6 items). Le 2e (Expertises) et 4e (Granulats) inversent l'ordre (`grid-template-columns: 1fr 1.4fr` → `1.4fr 1fr`).

### 3. Services détail (`terrain/services/{geotechnique|expertises|beton|granulats|impact}.html`)

Template unique pour les 5 pages. Structure :
1. **Hero** avec fil d'ariane, titre serif géant, 3 cartes fact (norme / délai / matériel).
2. **Intro** grid 1/2 : eyebrow + citation manifeste serif avec em italic.
3. **Normes applicables** : grid 2 colonnes de 4 cartes (code norme, titre, description).
4. **Protocole** : 4 étapes verticales avec grand numéro serif rouge 300, titre, description, tags mono.
5. **Livrable** section dark : grid 1/1 avec description à gauche et **mock de rapport PDF** à droite (élément blanc box-shadow avec header rouge, titre, corps en barres skeleton, mini bar chart, footer).
6. **Autres services** : 4 cartes des autres disciplines.

### 4. Projets (`terrain/projets.html`)

Hero + barre de filtres sticky (Tous / Géotech / Béton / Expertises / Granulats / Impact) + liste alternée gauche/droite. Chaque projet : media aspect 4/3 + badge numéro/année + meta (type, localisation, client) + titre serif 3.5vw + description + tags + CTA "Lire l'étude de cas →". Hover : bg dune + image scale 1.05.

### 5. Démarche (`terrain/demarche.html`)

Hero + section principale 7 étapes en 3 colonnes (numéro / titre+description / meta 3 items avec bordures). Bas de page : "Engagements qualité" fond noir avec 4 cartes (Traçabilité, Étalonnage, Signature, Coffre-fort).

### 6. À propos (`terrain/about.html`)

Hero split (titre + intro), section manifeste centrée (texte serif géant avec strike + em), timeline verticale (6 dates : 1998, 2004, 2010, 2016, 2020, 2026), 3 valeurs (Rigueur, Terrain, Confidentialité).

### 7. Clients (`terrain/clients.html`)

Hero + 3 sections groupées (Sociétés, Offices, Organismes Publics). Chaque groupe : titre + count + grille 4 colonnes de cartes clients (initiales serif 40px muted → rouge au hover, nom mono). Cartes en bordure `--line` avec margin -0.5px pour bordures partagées.

### 8. Agences (`terrain/agences.html`)

Hero + section carte Maroc à gauche + explication à droite. Sous-section 6 cartes agences (Casa siège, Casa Oulfa, Fès, Marrakech, Tanger, El Jadida) chacune avec numéro, tag ville, nom serif 48px, adresse, 3 lignes tél/fax/email.

### 9. Carrières (`terrain/carrieres.html`)

Hero dark (fond noir avec accent rouge), stats 4 colonnes, liste 8 postes ouverts (`grid: 120 140 1fr 120 40`) avec lieu, département, titre serif, type de contrat, flèche. Section "Ce que nous offrons" 3 colonnes. CTA candidature spontanée en bas.

### 10. Contact (`terrain/contact.html`)

Hero + main grid 1.2fr / 1fr (formulaire complet + coordonnées siège). Section basse "Contacts directs" fond noir avec 6 cartes agences.

### 11. Espace client (`terrain/espace-client.html`)

Layout split 1fr / 1fr full-screen (aside marque dark + form login clair). Aside : photo aerial avec overlay noir, logo blanc, titre serif "Vos rapports. Vos essais. Sur clé.", description, coordonnées support. Main : eyebrow mono, titre serif, form email/password avec "Rester connecté" + "Mot de passe oublié →", 2 CTAs (Se connecter dark + Demander un accès blue), demo hint mono.

### 12. Pages légales (`terrain/mentions-legales.html`, `terrain/confidentialite.html`)

Layout centré 900px max, titre serif géant, sections numérotées h2 avec paragraphes 16px line-height 1.7. Blocs `.info` avec bordure gauche rouge/bleue.

---

## Interactions & Behavior

### Navigation
- Nav fixe : `position: fixed; top: 0`. Au scroll > 40px : ajoute `.scrolled` (fond crème 85% + backdrop-filter blur(10px) saturate(1.1) + bordure inférieure + padding vertical réduit). Transition `.35s ease`.
- Mobile : bouton burger toggle `body.menu-open`. Le drawer `.mobile-drawer` translate de `-100%` → `0` avec cubic-bezier(.22,1,.36,1) 0.5s. Fermeture au clic sur un lien ou touche Escape. Burger devient croix animée.

### Reveal au scroll
Sélecteur `.reveal` : opacity 0 + translateY(24px). IntersectionObserver seuil 12%, rootMargin `-60px` bas. Ajoute `.in` qui restaure opacity 1 + translateY(0) avec transition `.8s ease`. Classes délai : `.reveal--delay-1|2|3` (0.1s, 0.2s, 0.3s).

### Compteurs animés
Sélecteur `[data-count]`. IntersectionObserver seuil 40%. Anime de 0 à target sur 1600ms avec easing cubic-out. Format via `toLocaleString('fr-FR')`.

### Rotator de titre hero
Data-attribute `data-rotator` avec variantes séparées par `|`. Toutes les 5500ms : slot courant ajoute `.h-slot--exit` (opacity 0 + translateY(-24%) + blur 4px), après 700ms est retiré. Nouveau slot créé avec `.h-slot--enter`, puis via requestAnimationFrame passe à `.h-slot--in`. Transition `.7s cubic-bezier(.22,1,.36,1)`.

### Testimonials carrousel
Data-driven. 3 objets `{q, mark, name, role}`. Setinterval 8000ms → next. Clic sur dot → setTesti(i). Fade out (opacity 0, 300ms), swap contents, fade in.

### Map pins ↔ agencies list
Au hover sur un pin, ajoute `.active` au pin correspondant + à la ligne agence de même index. Idem inversé.

### Magnetic buttons
Sélecteur `.btn`. Sur mousemove : translate le bouton de `(mx * 0.12, my * 0.18)` selon la position du curseur relative au centre. Reset au mouseleave.

### Parallax hero
Au scroll (jusqu'à Y=900) : `.hero__bg img` transform `scale(1.06 + y * 0.00018) translateY(y * 0.15)`.

### Hover states
- Boutons `.btn--primary` : hover fond blanc + texte encre + `translateY(-2px)`.
- Boutons `.btn--ghost` : hover bordure blanche pleine + fond blanc 8%.
- Services rows : padding horizontal 24px, background dune, barre gauche rouge scale(0→1).
- Cartes clients : hover fond noir + texte crème + marque rouge.
- Cartes news : `translateY(-4px)` + bordure rouge.
- Icônes sociales footer : bordure et fond deviennent rouges, icône devient crème.

### Marquee clients
Animation CSS `marquee` 40s linear infinite : `transform: translateX(-50%)`. Contenu dupliqué 2× pour bouclage seamless.

### Topo lines animées
Paths SVG dans `.hero__topo` et `.page-hero__lines` avec `stroke-dasharray: 3 6` (ou 4 8) et animation `topoDrift` 60s linear : `stroke-dashoffset: 0 → -400`.

### Marmonisation métro carte
Croisillon central décoratif dans les cartes Précision (obsolète pour Terrain).

---

## State Management

Peu d'état côté client :

- **Nav scrolled state** : booléen sur `window.scrollY > 40`.
- **Mobile menu open** : booléen sur `document.body.classList`.
- **Testimonial index** : entier 0-2, cyclique.
- **Rotator index** : entier 0-2, cyclique interne au composant.
- **Reveal state** : one-shot par élément via IntersectionObserver (unobserve au trigger).
- **Counter state** : one-shot par élément.
- **Active agency/pin** : entier, éphémère (hover uniquement).

Aucun state serveur nécessaire pour la démo. En production :
- Formulaires contact et candidature → endpoint POST (ex. `/api/contact`) qui envoie un email SMTP + persiste en base.
- Newsletter → API type Mailjet/Brevo/Sendinblue.
- Espace client → auth JWT + API `/api/reports` protégée.
- Actualités → CMS headless recommandé (Sanity, Contentful) pour permettre au marketing de publier sans dev.

---

## Design Tokens

### Couleurs (CSS custom properties, définies dans `terrain/styles.css`)

```css
--bg:        #F5F2EC;   /* papier crème — fond principal */
--bg-2:      #EBE6DC;   /* dune — fond alterné */
--ink:       #14100E;   /* noir profond — texte principal */
--ink-2:     #3E3833;   /* encre douce — texte secondaire */
--muted:     #8A837B;   /* pierre — labels / meta discret */
--line:      #DAD2C4;   /* trait fin — séparateurs, bordures */
--accent:    #D01919;   /* rouge Labocontrol — signal principal */
--accent-2:  #E84040;   /* rouge clair — italic / highlight */
--blue:      #3B5468;   /* bleu ardoise — accent secondaire */
--blue-2:    #56728A;   /* bleu clair */
--blue-3:    #223543;   /* bleu profond */
--white:     #FBF8F2;   /* crème très clair */
--black:     #0B0807;   /* noir absolu */
```

Rôles :
- **Rouge** = actions primaires, CTAs, italic dans les titres, hover, live indicators, pins carte.
- **Bleu ardoise** = index de sections (`01 —`), numéros de services (`/01`), dates, tags, timeline dots, coord readouts, hover secondaires.
- **Noir** = texte principal, sections dark (Qualifications, Careers, Espace client, Footer).
- **Crème / dune** = alternance de fonds pour rythmer les sections.

### Typographie

Familles :
- **Fraunces** (Google Fonts) — serif de titre. Poids 300, 400, 600. Italics : 300, 400. Utilisée à toutes les tailles ≥ 20px.
- **Inter** (Google Fonts) — sans-serif de corps. Poids 400, 500, 600, 700.
- **JetBrains Mono** (Google Fonts) — mono technique. Poids 400, 500. Utilisée pour tags, labels, coordonnées, nombres d'inventaire.

Import :
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Échelle (utilise `clamp` pour la fluidité) :
- **Display XL** (hero title) : `clamp(48px, 8.5vw, 132px)` / Fraunces 400 / 0.95 / -0.03em
- **Display L** (section title) : `clamp(36px, 5vw, 72px)` / Fraunces 400 / 1 / -0.02em
- **Display M** (page hero) : `clamp(48px, 7vw, 120px)` / Fraunces 400 / 0.95 / -0.03em
- **H2 card** : 22-28px / Fraunces 400
- **H3 item** : 20-26px / Fraunces 400
- **Body large** : 18px / Inter 400 / 1.55
- **Body** : 15-16px / Inter 400 / 1.55
- **Small** : 14px / Inter 400 / 1.5
- **Mono label** : 11-12px / JetBrains Mono 500 / letter-spacing 0.14em à 0.20em / UPPERCASE

### Espacements

Padding horizontal fluide : `--pad: clamp(20px, 4vw, 64px)`.
Container max : `--max: 1440px`.

Espacements internes (par convention, pas de tokens formels) :
- Sections : `padding: 120px 0` (`100px 0` sur cartes/mobile).
- Section head margin-bottom : `64px`.
- Gap grid : `16px / 24px / 32px / 48px / 64px` selon densité.
- Card padding : `24px / 32px / 40px`.

### Bordures et arrondis

- Border-radius : `--radius: 2px` (quasi-carré) — appliqué avec parcimonie sur boutons, cards. La plupart des éléments ont un radius de 0 (esthétique éditoriale).
- Border width : `1px` uniquement. Couleur : `--line`.

### Ombres

Très peu utilisées. Le mock de rapport PDF utilise `box-shadow: 0 40px 80px -20px rgba(0,0,0,0.5)`. Le CTA hover magnétique n'utilise pas d'ombre — c'est le transform qui apporte la profondeur.

### Animations et transitions

- Durée par défaut : `0.2s - 0.35s` pour les hovers, `0.5s - 0.8s` pour les reveals.
- Easing par défaut : `ease` (transitions simples), `cubic-bezier(.22,1,.36,1)` (out-expo pour reveals et rotator), `linear` (marquee et topo).
- Reveals : `opacity + translateY(24px)` sur 0.8s.
- Rotator : `opacity + translateY + filter(blur)` sur 0.7s cubic-out-expo.
- Marquee : 40s linear infinite.
- Topo drift : 60s linear infinite (Terrain) / 45s (Précision, obsolète).
- Hero image zoom : 22s ease-in-out infinite alternate.
- Pulse (dot rouge) : 2s infinite.

---

## Assets

Tous les assets sont dans le dossier `assets/` à la racine du projet.

### Logos

- **`assets/logo-original.png`** (200×50, PNG transparent) — logo officiel Labocontrol : arc rouge à gauche + texte "LABO CONTROL" noir. Utilisé dans la nav sur les pages à fond clair.
- **`assets/logo-light.png`** (200×50, PNG transparent) — version pour fond sombre : arc rouge conservé + texte inversé en blanc. Utilisé dans le footer et dans l'aside de l'espace client.

### Images héros (placeholders générés par IA — **à remplacer par des vraies photos client**)

- **`assets/hero-drill.jpg`** (2656×1504) — foreuse de sondage géotechnique sur un chantier marocain, coucher de soleil, montagnes de l'Atlas en fond, échantillons de sol rouges au premier plan. Utilisée en hero de la home et de `services/geotechnique.html`.
- **`assets/hero-concrete.jpg`** (2656×1504) — essai de compression d'un cylindre béton dans une presse hydraulique, éclairage studio, fissures apparaissant. Utilisée pour `services/expertises.html` et `services/beton.html`.
- **`assets/hero-aerial.jpg`** (2656×1504) — vue drone d'un chantier marocain avec terrassement géométrique en gradins, terre rouge. Utilisée pour `services/impact.html`, `services/granulats.html`, l'aside espace client.

### Carte du Maroc

Dessinée en SVG inline dans les pages. Chemin défini par une série de coordonnées lissées (silhouette approximative). Motif de points en `<pattern>` pour la texture. Pas de fichier externe à recréer.

### Icônes

Toutes en SVG inline (petits chemins simples) :
- Flèches → : `<svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 6h8m-3-3 3 3-3 3"/></svg>`
- Icônes sociales (LinkedIn, Facebook, Instagram, YouTube) dans le footer — SVG monochromes simples.
- Aucun icon set externe requis.

---

## Files

### Pages HTML (Terrain)

```
terrain/
├── index.html              # Accueil (page principale)
├── services.html           # Services vue d'ensemble (5 disciplines listées)
├── services/
│   ├── geotechnique.html   # Détail géotechnique
│   ├── expertises.html     # Détail expertises
│   ├── beton.html          # Détail essais béton
│   ├── granulats.html      # Détail granulats
│   └── impact.html         # Détail études d'impact
├── projets.html            # Portfolio 6 études de cas
├── demarche.html           # Démarche qualité 7 étapes + engagements
├── about.html              # À propos + timeline + valeurs
├── clients.html            # 3 groupes de clients
├── agences.html            # Carte + 6 fiches agences
├── carrieres.html          # 8 postes + perks
├── contact.html            # Formulaire complet + contacts directs
├── espace-client.html      # Portail login split-screen
├── mentions-legales.html   # Mentions légales
├── confidentialite.html    # Politique de confidentialité
├── styles.css              # Tout le CSS (~700 lignes, custom props + composants)
└── app.js                  # Interactions (nav, reveals, rotator, testi, magnetic, parallax)
```

### Racine du projet

```
index.html                  # Redirect vers terrain/index.html
sitemap.xml                 # Sitemap SEO
robots.txt                  # Directives crawlers
assets/                     # Logos + images héros
```

### Meta / SEO

La home (`terrain/index.html`) contient un bloc riche :
- Meta `description`, `keywords`, `author`, `robots`.
- Open Graph complet (title, description, image, url, type, locale).
- Twitter card.
- JSON-LD `Organization` avec adresse, téléphone, email.

À reproduire sur chaque page en adaptant `title` et `description`.

---

## Recommandations d'implémentation

### Stack recommandé

**Next.js 14+ (App Router) + Tailwind CSS** :
- App Router permet des pages statiques ultra-performantes (SSG) avec ISR pour les actualités si CMS branché.
- Tailwind CSS reproductible facilement à partir des tokens ci-dessus (à configurer dans `tailwind.config.ts`).
- `next/image` pour l'optimisation automatique des images (hero, projets).
- `next/font/google` pour Fraunces / Inter / JetBrains Mono (auto-preconnect + no-CLS).
- `next-sitemap` pour régénérer le sitemap automatiquement.
- Framer Motion pour les micro-interactions (rotator, reveals) — plus expressif que du JS vanilla.
- MDX + un CMS headless (Sanity ou Prismic) pour les actualités et éventuelles pages éditables par le marketing.

### Structure de composants suggérée

```
app/
├── layout.tsx              # Nav + Footer partagés
├── page.tsx                # Home (assemble tous les blocs)
├── services/
│   ├── page.tsx            # Overview
│   └── [slug]/page.tsx     # Détail dynamique par discipline
├── projets/page.tsx
├── demarche/page.tsx
├── about/page.tsx
├── clients/page.tsx
├── agences/page.tsx
├── carrieres/page.tsx
├── contact/page.tsx
└── espace-client/page.tsx

components/
├── layout/
│   ├── Nav.tsx
│   ├── MobileDrawer.tsx
│   └── Footer.tsx
├── home/
│   ├── Hero.tsx
│   ├── HeroTitleRotator.tsx
│   ├── Figures.tsx
│   ├── HowItWorks.tsx
│   ├── ServicesList.tsx
│   ├── Qualifications.tsx
│   ├── Equipment.tsx
│   ├── ClientsMarquee.tsx
│   ├── Testimonials.tsx
│   ├── AgenciesMap.tsx
│   ├── News.tsx
│   ├── CareersCallout.tsx
│   └── ContactForm.tsx
├── ui/
│   ├── Button.tsx
│   ├── SectionHead.tsx
│   └── Reveal.tsx           # Wrapper IntersectionObserver
└── icons/                   # SVG components
```

### Formulaires

- Utiliser **React Hook Form** + **Zod** pour la validation.
- Actions serveur Next.js pour les submissions (contact, candidature, newsletter).
- Emails transactionnels via **Resend** (recommandé, DX excellente) ou SMTP classique.
- Anti-spam : honeypot invisible + rate-limit par IP.

### Accessibilité

- Le design actuel a de bons contrastes (`--ink` sur `--bg` passe AAA), à préserver.
- Vérifier les focus states clavier (le CSS actuel les gère peu — ajouter des `:focus-visible` explicites).
- Alt text sur toutes les images (déjà présent).
- Landmarks HTML sémantiques (`<nav>`, `<main>`, `<article>`, `<footer>`) déjà en place.
- Prefers-reduced-motion : conditionner les animations (topo drift, rotator, marquee, parallax) sur `@media (prefers-reduced-motion: no-preference)`.

### SEO

- Meta déjà bien structurée (voir home).
- Générer des OG images dynamiques par page (Next `opengraph-image.tsx`).
- Sitemap.xml automatique (`next-sitemap`).
- Structured data : `Organization` déjà en place ; ajouter `LocalBusiness` par agence, `Service` par discipline, `Article` pour les actualités.

### Performances

- Toutes les images non-hero ont `loading="lazy"`.
- Hero en `fetchpriority="high"`.
- Preconnect Google Fonts.
- Marquee et parallax en `transform` (composited layer, pas de reflow).
- IntersectionObserver plutôt que scroll listeners partout où possible.

### Internationalisation

Site 100% français aujourd'hui. Si extension EN/AR à prévoir :
- Next.js i18n routing (`app/[locale]/...`).
- Attention RTL pour l'arabe : Tailwind supporte `dir-rtl:`.
- Le rotator de titre en particulier nécessitera 3 variantes par langue.

---

## Contact

Pour toute question sur ce handoff, se référer aux fichiers HTML/CSS/JS livrés dans `design_files/`. Les fichiers y sont un miroir fidèle de ce qui a été construit — utilisables comme référence visuelle et fonctionnelle définitive.
