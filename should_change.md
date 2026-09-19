# LABOCONTROL (labocontrol.ma) — RAPPORT DE REVUE TECHNIQUE & ARCHITECTURALE
## Nouvelle Version vs Ancienne Version : Identité Visuelle, Éléments à Ajouter/Supprimer, Audit Mobile & Media Queries

> **Date d'audit :** Septembre 2026  
> **Contexte :** Refonte institutionnelle du site officiel de **Labocontrol Maroc** (`www.labocontrol.ma`), laboratoire agréé BTP / Géotechnique / Matériaux (Qualification d'État **LAB/03**).  
> **Fichier de référence :** `should_change.md`  

---

## SOMMAIRE
1. [Contexte & Analyse Comparative (Ancienne vs Nouvelle Version)](#1-contexte--analyse-comparative-ancienne-vs-nouvelle-version)
2. [Préservation et Renforcement de l'Identité de Couleur (Color Identity)](#2-préservation-et-renforcement-de-lidentité-de-couleur-color-identity)
3. [Tous les Problèmes et Bugs Critiques à Corriger](#3-tous-les-problèmes-et-bugs-critiques-à-corriger)
4. [Ce qu'il faut SUPPRIMER (What Should Be Removed)](#4-ce-quil-faut-supprimer-what-should-be-removed)
5. [Ce qu'il faut AJOUTER (What Should Be Added)](#5-ce-quil-faut-ajouter-what-should-be-added)
6. [Revue Exhaustive du Style Écran Téléphone (Phone Screen Style) & Media Queries](#6-revue-exhaustive-du-style-écran-téléphone-phone-screen-style--media-queries)
7. [Plan d'Action Immédiat et Architecture CSS Unifiée](#7-plan-daction-immédiat-et-architecture-css-unifiée)

---

## 1. Contexte & Analyse Comparative (Ancienne vs Nouvelle Version)

### 1.1 L'ancienne version de `www.labocontrol.ma`
L'ancien site internet de Labocontrol (conçu sous Adobe Dreamweaver avec templates `.dwt`, jQuery et OwlCarousel) présentait les caractéristiques suivantes :
- **Positionnement clair et direct :** *« Laboratoire accrédité spécialisé dans les domaines des études hydrologiques, hydrogéologiques, géotechniques et d'impact sur l'environnement »*.
- **Accréditation phare :** Mention omniprésente de l'accréditation **NM ISO/CEI 17025:2005** et de la qualification ministérielle **LAB/03**.
- **Services historiques :** 
  1. Études géotechniques (sondages, essais in situ, fondations).
  2. Expertises & diagnostic des structures.
  3. Essais sur béton frais (slump test, cône d'Abrams, masse volumique, air occlus).
  4. Contrôle des granulats (granularité, aplatissement, bleu de méthylène, équivalent de sable).
  5. Études hydrologiques, hydrogéologiques et études d'impact environnemental.
- **Iconographie réelle :** Véritables photos de leurs agences (siège Médiouna, Casablanca Oulfa, Fès, Marrakech, Tanger, El Jadida), de leurs engins de forage, de leurs presses hydrauliques de compression 3000 kN, et de leurs chantiers de référence au Maroc.
- **Clients réels :** Logos des grands comptes institutionnels et privés marocains (OCP, ONCF, Maroc Telecom, ONEP/ONEE, ONHYM, OFPPT, TGCC, SGTM, NOVEC, CEGELEC, STROC, MEDITEL/ORANGE, WANA/INWI, Ministères).

### 1.2 La nouvelle version ("Terrain")
La nouvelle maquette apporte un saut qualitatif indéniable en termes de design éditorial :
- Typographie typée (Fraunces en titres serif, Inter en corps de texte, JetBrains Mono pour la métrologie).
- Transitions fluides, compteurs animés, carte interactive du Maroc, rotator de punchlines.
- Ergonomie modernisée et découpage par disciplines.

### 1.3 Le décalage à corriger impérativement
Cependant, la refonte a créé des ruptures involontaires avec l'ADN de l'entreprise :
1. **Omission de l'accréditation ISO 17025 :** L'ancienne version mettait en avant `NM ISO/CEI 17025:2005` dans le header et le `<title>`. La nouvelle version n'indique qu'une mention floue *"ISO — CONFORME"*, ce qui affaiblit la valeur juridique et technique de Labocontrol face à ses concurrents (LPEE, CETEMCO, etc.).
2. **Disparition des compétences en Hydrologie & Hydrogéologie :** Réduites uniquement au terme *"Études d'impact"*, alors que les études de nappes, forages d'eau et perméabilité sont une source majeure de chiffre d'affaires au Maroc.
3. **Utilisation d'images IA génériques au détriment des vraies photos existantes :** Des placeholders synthétiques (`hero-drill.jpg`, `hero-concrete.jpg`, `hero-aerial.jpg`) remplacent les vraies photos de chantiers marocains présentes dans le dossier `images/` (`sized_1.jpg` à `sized_15.jpg`, `casa_sized.jpg`, etc.).
4. **Fragilités techniques et responsive sur smartphones :** Conflits CSS, sélecteurs non responsives, liens d'images brisés, burger menu piégé par le z-index, et carte non interactive au toucher tactile.

---

## 2. Préservation et Renforcement de l'Identité de Couleur (Color Identity)

### 2.1 La Palette Officielle Labocontrol
L'identité de marque Labocontrol repose historiquement sur le contraste entre le **Rouge vif du logo (l'arc géométrique)**, le **Noir d'encre technique**, et le **Blanc/Gris neutre d'ingénierie**.

La direction "Terrain" a introduit des teintes chaudes complémentaires :

| Token CSS | Hexadécimal | Rôle & Sémantique | Statut & Recommandation |
|---|---|---|---|
| `--accent` | `#D01919` | **Rouge Labocontrol (Couleur Maîtresse)** : issu directement du logo. CTAs primaires, curseurs, pins actifs, puces dynamiques. | **À PRÉSERVER ABSOLUMENT.** C'est l'ancre visuelle de la marque. |
| `--accent-2` | `#E84040` | Rouge lumineux pour les italiques, accents sur fond sombre et badges. | Conserver pour la lisibilité sur fond noir (`--ink`). |
| `--blue` | `#3B5468` | **Bleu Ardoise / Technique** : indexation, codes normes, tags techniques, hydrogéologie. | Très réussi. Rappelle l'ingénierie de l'eau et la rigueur métrologique. |
| `--blue-2` | `#56728A` | Bleu secondaire adouci. | Conserver pour états de survol secondaires. |
| `--ink` | `#14100E` | Noir profond charbon (texte et sections sombres prestige). | Excellent contraste (dépasse 14:1 sur fond crème). |
| `--bg` | `#F5F2EC` | Papier crème naturel (fond principal). | **ATTENTION AU DRIFT :** Ne pas jaunir davantage. Sur certains écrans mal calibrés, il tend vers le parchemin ancien. Conserver `#F5F2EC` ou clarifier légèrement vers `#F9F7F2` pour garder l'aspect laboratoire propre. |
| `--bg-2` | `#EBE6DC` | Dune / pierre claire pour alternance de sections. | Conserver pour donner du rythme vertical. |
| `--line` | `#DAD2C4` | Trait de coupe métrologique 1px. | Conserver. |

### 2.2 Dérives de couleur constatées et corrections exigées
1. **Couleurs pirates codées en dur :**
   - Dans `styles.css` ligne 507 : `background: rgba(217,119,66,0.08);` (teinte orange/terracotta étrangère à la charte). Remplacer par `rgba(208,25,25,0.08)` (rouge Labocontrol).
   - Dans `app.js` lignes 209-212 : boîtes d'alerte en vert `#10b981` / `#065f46` de style Tailwind non intégré. Re-styliser avec une bordure `--blue` (`#3B5468`) et un accent `--accent` (`#D01919`) pour respecter la charte graphique.
2. **Logo sur fond crème vs fond sombre :**
   - `assets/logo-original.png` contient le texte noir et l'arc rouge. S'assurer que le détourage du PNG est 100% transparent sans frange blanche (halo) visible sur `--bg: #F5F2EC`.
   - Dans le footer et l'espace client, `assets/logo-light.png` (arc rouge + texte blanc pur) fonctionne parfaitement sur fond `--ink`.
3. **Éviter l'effet "Revue Littéraire" :**
   - L'excès de texte en italique rouge (`em { font-style: italic; color: var(--accent); }`) combiné à la police serif Fraunces donne par moments l'impression d'un magazine d'art ou d'un hôtel de luxe.
   - **Correction d'identité :** Rééquilibrer avec la typographie technique **JetBrains Mono** et des tables de données cliniques (MPa, NF EN, granulométrie, coordonnées Lambert), qui incarnent la crédibilité d'un laboratoire de BTP.
4. **Cohérence du Nom de Domaine et des Emails :**
   - Le site web officiel est `labocontrol.ma`.
   - Or, les adresses emails dans le code mélangent `casa@labo-control.com`, `support@labo-control.com`, `demo@labocontrol.ma`.
   - **Règle :** Unifier tous les contacts sous le domaine institutionnel officiel marocain : `@labocontrol.ma` (ex: `contact@labocontrol.ma`, `direction@labocontrol.ma`).

---

## 3. Tous les Problèmes et Bugs Critiques à Corriger

### 🔴 BUG 1 : Liens d'images rompus sur `clients.html` et `services.html`
- **Constat :** Dans `terrain/clients.html`, toutes les images des logos clients (30 logos !) pointent vers :
  ```html
  <img src="../../images/01_societes/_0001_MEDITEL.jpg" class="client-card__logo">
  ```
  Et dans `terrain/services.html` (lignes 138 et 173) :
  ```html
  <img src="../../images/services_beton_sized.jpg">
  <img src="../../images/services_granulat_sized.jpg">
  ```
- **Cause :** Les fichiers sont situés dans `design_files/terrain/`. Deux niveaux en arrière (`../../`) amènent à la racine du projet où le dossier `images/` n'existe pas (il se trouve dans `design_files/images/`).
- **Impact utilisateur :** **Toutes les images de logos clients et les photos de béton/granulat sont en échec de chargement (icônes d'images brisées) sur tout le site !**
- **Solution immédiate :** Remplacer partout `../../images/` par `../images/` dans les fichiers situés dans `terrain/*.html`. (Pour les sous-dossiers comme `terrain/services/*.html`, `../../images/` est requis).

---

### 🔴 BUG 2 : Le Drawer Mobile (Menu) piège l'utilisateur et masque le bouton de fermeture
- **Constat :** Dans `styles.css` :
  - `.nav` a `z-index: 50;`
  - `.mobile-drawer` a `z-index: 60;`
- **Cause :** Lorsque l'utilisateur clique sur le burger menu sur smartphone, le tiroir plein écran descend avec un `z-index: 60`, passant **PAR-DESSUS la barre de navigation et le burger**.
- **Impact utilisateur :** Le bouton burger (qui est censé se transformer en croix "X" pour refermer) se retrouve physiquement masqué et non cliquable. Sur smartphone, l'utilisateur est coincé dans le menu sans pouvoir le fermer, à moins de recharger la page ou de cliquer sur un lien !
- **Solution immédiate :**
  1. Donner à `.nav` un `z-index: 70;` pour qu'il reste toujours au-dessus du drawer (`z-index: 60;`).
  2. Ajouter une croix explicite de fermeture en haut à droite dans `.mobile-drawer`.
  3. Ajouter `body.menu-open { overflow: hidden; height: 100vh; }` pour bloquer le défilement parasite en arrière-plan.

---

### 🔴 BUG 3 : Incompatibilité tactile de la Carte Interactive du Maroc (`app.js`)
- **Constat :** Dans `app.js` lignes 55-56 :
  ```javascript
  pins.forEach((p, i) => p.addEventListener('mouseenter', () => activate(i)));
  agencies.forEach((a, i) => a.addEventListener('mouseenter', () => activate(i)));
  ```
- **Cause :** L'événement `mouseenter` n'existe pas sur les écrans tactiles (smartphones/tablettes).
- **Impact utilisateur :** Sur téléphone portable, toucher un point rouge (Tanger, Fès, Casa, Marrakech, El Jadida) ou toucher la fiche d'une agence **ne déclenche absolument rien**. La carte est totalement inerte et frustrante sur mobile.
- **Solution immédiate :** Écouter également les événements `click` et `touchstart` dans `app.js` pour activer l'agence correspondante au tap.

---

### 🔴 BUG 4 : Conflits de styles `!important` et destruction des états de survol
- **Constat :** Dans `styles.css` lignes 805-820 :
  ```css
  .client-card {
    background: #ffffff !important;
    transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease !important;
  }
  ```
  Alors que dans `clients.html` ligne 23 :
  ```css
  .client-card:hover { background: var(--ink); color: var(--white); }
  ```
- **Impact :** La directive `!important` écrase l'état de survol prévu par la direction artistique "Terrain", rendant le texte invisible ou provoquant un clignotement.
- **Solution :** Supprimer les `!important` superflus dans `styles.css` et unifier les règles de `.client-card`.

---

### 🔴 BUG 5 : Déplacement hors conteneur de la flèche `.job__arrow` sur Carrières
- **Constat :** Dans `carrieres.html` ligne 33 :
  ```css
  @media(max-width: 900px) {
    .job__arrow { position: absolute; right: 0; }
  }
  ```
  Mais l'élément parent `.job` (ligne 25) n'a **PAS** de `position: relative;`.
- **Impact utilisateur :** Sur mobile, la flèche `→` ne s'aligne pas avec l'offre d'emploi : elle s'échappe et vient se positionner tout en haut ou tout en bas du conteneur de page.
- **Solution :** Ajouter impérativement `position: relative;` sur `.job`.

---

### 🔴 BUG 6 : Alerte JavaScript native bloquante sur les formulaires
- **Constat :** Dans `index.html` ligne 549 et `contact.html` ligne 88 :
  ```html
  <form onsubmit="event.preventDefault(); alert('Merci — nous vous recontactons sous 24h.');">
  ```
- **Impact :** Une popup navigateur `alert()` archaïque et bloquante s'affiche, courcircuitant le message de confirmation avec numéro de dossier (réf. `LC-2026-T...`) développé dans `app.js`.
- **Solution :** Retirer complètement les attributs inline `onsubmit="..."` du HTML et laisser `app.js` gérer la validation et l'affichage fluide dans la page.

---

### 🔴 BUG 7 : Débordement d'en-tête collant (Sticky Filters) sur `projets.html`
- **Constat :** La barre de filtres `.pj-filters` a `position: sticky; top: 74px; flex-wrap: wrap;`.
- **Impact sur mobile :** Sur un écran de 375px, les 6 boutons de filtre se répartissent sur 3 lignes empilées. Combinés à la barre de navigation fixée, ils occupent **plus de 220px**, soit près de 35% de la hauteur totale de l'écran du smartphone en permanence pendant le défilement !
- **Solution :** Mettre la barre de filtres en défilement horizontal sans retour à la ligne sur mobile (`flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none;`).

---

## 4. Ce qu'il faut SUPPRIMER (What Should Be Removed)

| Élément à supprimer | Emplacement | Raison technique & visuelle |
|---|---|---|
| **1. Scripts & artefacts Cloudflare fantômes** | `index.html` (lignes 85, 437, 445, 454, 463, 472, 575, 613, 639) | Présence de balises obsolètes `<script src="/cdn-cgi/scripts/.../email-decode.min.js">` et de textes détruits `[email protected]`. En local ou hors proxy Cloudflare, les adresses email sont illisibles ! |
| **2. Dossiers en double mal nommés** | `images/03_organismes publics` et `images/03_organismes%20publics` | Doublons avec caractères d'espacement et encodage `%20` générant des erreurs 404 sur les serveurs Linux/Nginx. Seul `images/03_organismes_publics` doit être conservé. |
| **3. Les balises `<style>` internes dans chaque fichier HTML** | 16 fichiers HTML de `terrain/` | Plus de 15 blocs `<style>` dupliqués dans le `<head>` qui entrent en collision avec `styles.css`. Tout le CSS doit être consolidé dans un fichier unique et optimisé. |
| **4. Placeholders d'images IA répétitifs** | `hero-drill.jpg`, `hero-concrete.jpg`, `hero-aerial.jpg` dupliqués sur 8 pages | La même image de foreuse ou de presse béton est réutilisée 4 fois sur des pages différentes (projets, géotech, expertises, accueil). |
| **5. Liens morts `href="#"`** | `index.html`, `projets.html`, `carrieres.html` | "TOUTES LES ACTUALITÉS →", "Lire l'étude de cas →", les offres d'emploi pointent vers `#` et rechargent le haut de page. |
| **6. Popups natives `alert()` inline** | Formulaires contact et devis | Bloquent l'UI et dégradent l'image d'un laboratoire de pointe. |
| **7. Boutons magnétiques parasites sur mobile** | `app.js` lignes 106-117 | Le script écoute `mousemove` sur `.btn`. Sur mobile, ces calculs de coordonnées sont inutiles et créent de la latence lors du tap. |
| **8. Animation continue des courbes topographiques sur mobile** | `.hero__topo path` (`topoDrift 60s`) | Forte consommation de batterie et chute de framerate sur les processeurs de smartphones d'entrée/milieu de gamme. |

---

## 5. Ce qu'il faut AJOUTER (What Should Be Added)

### 5.1 Restauration des Acquis Métier de l'Ancien Site
1. **Accréditation Officielle NM ISO/CEI 17025:2005 :**
   - À ajouter dans le hero principal, dans le badge de réassurance et dans le footer aux côtés de `LAB/03`.
   - Formule recommandée : **« Qualifié LAB/03 par le Ministère de l'Équipement · Système d'essais conforme NM ISO/CEI 17025 »**.
2. **Réintroduction de l'Hydrologie & Hydrogéologie :**
   - Ajouter un onglet ou sous-service dédié : *Piézométrie, forages d'eau, perméabilité des sols (Lefranc, Lugeon, Matsuo), études de ruissellement et assainissement*.
3. **Exploitation des 15 Véritables Photos Chantiers :**
   - Remplacer les placeholders de `projets.html` par les vraies réalisations photographiées présentes dans `images/` : `sized_1.jpg` à `sized_15.jpg`.
   - Utiliser les vraies façades des agences de Labocontrol (`images/casa_sized.jpg`, `fes_sized.jpg`, `marrakech_sized.jpg`, `tanger_sized.jpg`, `eljadida_sized.jpg`, `siege_sized.jpg`).

### 5.2 Nouvelles Fonctionnalités Indispensables
1. **Module de Vérification d'Authenticité des Rapports (Anti-Fraude BTP) :**
   - Les bureaux de contrôle et assureurs (Socotec, Veritas, etc.) doivent pouvoir vérifier qu'un PV d'essai géotechnique ou de résistance béton émane bien de Labocontrol.
   - Ajouter dans l'Espace Client ou le footer un champ simple : *« Vérifier un rapport d'essais (saisir le n° de dossier ex: LC-2026-...) »*.
2. **Formulaire de Demande de Devis Paramétrique :**
   - Ajouter des champs spécifiques BTP :
     - *Nature de l'ouvrage* (Bâtiment R+N, Ouvrage d'art, Voirie/Plateforme, Barrage/Ouvrage hydraulique).
     - *Prestation souhaitée* (Sondage carotté, pressiomètre, pénétromètre dynamique lourd, écrasement d'éprouvettes béton à 7j/28j, analyse de carrières).
     - *Localisation précise (avec bouton GPS mobile facultatif)*.
3. **Boutons d'Action Rapide Mobile (Quick Action Bar) :**
   - Pour un ingénieur sur un chantier avec son smartphone :
     - Bouton flottant d'appel direct : `tel:+212522338501`.
     - Bouton WhatsApp Business ou demande d'intervention d'urgence 24h.
4. **Architecture Bilingue / Trilingue (FR / AR / EN) :**
   - Le secteur du BTP au Maroc opère en français et arabe (appels d'offres publics ministériels). Tanger Med et OCP demandent aussi l'anglais. Prévoir l'icône de sélection de langue dans la navigation (`FR | AR | EN`).
5. **Gestion de l'Accessibilité (WCAG 2.1 AA) :**
   - Ajout d'un lien d'évitement (`Skip to main content`).
   - Focus visible au clavier (`:focus-visible`) sur les liens et boutons.
   - Cibles tactiles d'au moins **44 × 44 pixels** pour tous les éléments interactifs.

---

## 6. Revue Exhaustive du Style Écran Téléphone (Phone Screen Style) & Media Queries

### 6.1 Cartographie Complète des Media Queries Existantes

L'audit révèle **21 media queries fragmentées**, utilisant des valeurs de coupure dispersées et sans cohérence globale :

```
[1200px]  --> styles.css : footer__top (3 col), nav liens réduits
[1060px]  --> styles.css : disparition nav desktop, burger actif
[1000px]  --> services/*.html & demarche.html : passage 1 colonne
[900px]   --> Utilisé sur 12 fichiers pour basculer les grilles (services, agences, carrières, contact, news, qual)
[800px]   --> styles.css : figures__grid (2 col)
[768px]   --> styles.css : hero__topbar (colonne), boutons hero full width
[700px]   --> styles.css : footer (2 col), services/*.html (normes 1 col)
[600px]   --> styles.css : méthode 1 col, demarche 1 col, champs 1 col
[560px]   --> styles.css : qualifications 1 col
[500px]   --> styles.css : chiffres 1 col, footer 1 col
```

### 6.2 Analyse Critique par Composant sur Smartphone (320px à 480px)

#### A. Barre de Navigation & Header
- **Problème :** Logo trop grand sur écran < 360px (`height: 36px` + padding). Il comprime l'espace disponible à côté du burger.
- **Correction :** Réduire la hauteur du logo à `28px` sur mobile, avec `padding: 10px 16px;`.
- **Drawer Mobile :** Les 9 liens à `font-size: clamp(32px, 8vw, 56px)` génèrent un dépassement de plus de 900px de haut. Sur iPhone SE (hauteur 667px), les boutons d'action en bas sont invisibles sans un long scroll.
- **Correction Drawer :** Passer la taille des liens à `clamp(20px, 6vw, 28px)`, padding `12px 0`, et fixer le bouton de fermeture croix en haut.

#### B. Hero Section sur Smartphone
- **Problème `100vh` :** L'usage de `height: 100vh` provoque un saut d'affichage brutal lors de l'apparition/disparition de la barre d'adresse de Safari iOS et Chrome Android.
- **Correction :** Utiliser `min-height: 100dvh` (Dynamic Viewport Height).
- **Collision Titre Rotator :** Le titre avec `clamp(34px, 7.5vw, 120px)` et `letter-spacing: -0.03em` force les mots longs comme *"Labocontrol"* à déborder hors de l'écran sur un téléphone de 360px de large.
- **Correction :** Définir `font-size: clamp(28px, 8vw, 48px); word-break: break-word;` sous 480px.
- **Superposition de l'indicateur "DÉFILER" :** Les deux boutons d'actions `.btn` empilés à 100% de large recouvrent l'indicateur centré en bas `.hero__scroll`.
- **Correction :** Masquer `.hero__scroll` en dessous de 600px (`display: none;`).

#### C. Chiffres Clés (`.figures`)
- **Problème :** À 800px, la grille passe en 2 colonnes, puis à 500px en 1 colonne. Mais entre 500px et 700px (grands téléphones et phablettes en mode paysage), les chiffres énormes (`clamp(56px, 6.5vw, 92px)`) chevauchent les bordures verticales droites.
- **Correction :** Basculer en 2 colonnes compactes avec bordures propres dès 768px, et 1 colonne fluide sous 480px.

#### D. Grille des Équipements (`.equip`)
- **Problème Majeur :** Dans `styles.css` ligne 551 :
  ```css
  @media (max-width: 900px){
    .equip__grid{ grid-template-columns: repeat(2, 1fr); grid-auto-rows: 140px; }
  }
  ```
  **Aucune media query n'existe en dessous de 900px !**
  Sur un smartphone de 360px de large, la cellule ne fait que `150px` de large. Les étiquettes en JetBrains Mono majuscule comme *"PÉNÉTROMÈTRE DYNAMIQUE"* ou *"TAMISEUSE GRANULOMÉTRIQUE"* débordent complètement des boîtes !
- **Correction :** Passer `.equip__grid` à `grid-template-columns: 1fr; grid-auto-rows: 160px;` sous 520px.

#### E. Références Clients & Marquee
- **Problème Marquee Accueil :** Le texte géant à 40px et l'espacement de 64px créent un défilement saccadé sur mobile.
- **Correction :** Réduire la taille de police à `24px` et le gap à `32px` sur mobile.
- **Problème Page `clients.html` :** `.client-grid` est bloqué à `repeat(2, 1fr)` en dessous de 900px sans règle pour smartphone. Les cartes deviennent des rectangles minuscules de 90px de haut où le logo et le nom s'écrasent.
- **Correction :** Sous 480px, passer la grille en 2 colonnes optimisées (padding 12px, hauteur automatique) ou 1 colonne claire.

#### F. Carte du Maroc sur Mobile (`.agencies`)
- **Problème :** Sur smartphone, le SVG de la carte s'affiche en dessous de la liste (`order: 2`). Comme les pins font 14px et que les labels n'apparaissent qu'au hover (inaccessible au doigt), la carte perd toute utilité.
- **Correction :**
  1. Afficher en permanence les pastilles avec étiquettes de villes visibles au-dessus des pins sur mobile.
  2. Rendre la zone tactile du pin d'au moins 44px (avec pseudo-élément `::after`).
  3. Placer la carte en premier ou sous forme d'onglet commutable [Liste | Carte].

#### G. Formulaire de Contact & Footer
- **Problème :** Sur mobile, le formulaire a `display: grid; gap: 20px;`. Les champs de formulaire avec bordure inférieure unique (style minimaliste) sont difficiles à repérer pour un utilisateur mobile en plein soleil sur un chantier.
- **Correction :** Ajouter un fond subtil de champ (`background: rgba(0,0,0,0.02); padding: 12px 14px; border-radius: 2px; border-bottom: 2px solid var(--line);`).
- **Footer :** Les icônes sociales (32×32px) sont trop petites pour le pouce (norme Apple/Google = 44×44px). Les agrandir.

---

## 7. Plan d'Action Immédiat et Architecture CSS Unifiée

Pour stabiliser le projet et offrir une expérience mobile sans faille, voici les correctifs à appliquer dans l'ordre de priorité :

### 1. Correction immédiate des chemins d'images dans `clients.html` et `services.html`
Remplacer toutes les occurrences de `../../images/` par `../images/`.

### 2. Résolution du conflit de Z-Index du Menu Mobile
```css
/* Navigation fixée prioritaire */
.nav {
  z-index: 70 !important;
}

/* Tiroir mobile en dessous de la barre nav */
.mobile-drawer {
  z-index: 60 !important;
  padding-top: 80px;
}

/* Verrouillage du scroll arrière-plan */
body.menu-open {
  overflow: hidden !important;
  touch-action: none;
}
```

### 3. Système Standardisé de Breakpoints (À intégrer dans `styles.css`)
Remplacer les 21 media queries disparates par une échelle normalisée :
- **Mobile compact :** `@media (max-width: 480px)`
- **Mobile standard & Phablette :** `@media (max-width: 640px)`
- **Tablette portrait :** `@media (max-width: 768px)`
- **Tablette paysage / Petit PC :** `@media (max-width: 1024px)`

```css
/* ============================================================
   CORRECTIFS RESPONSIVE CRITIQUES POUR SMARTPHONES (< 640px)
   ============================================================ */

@media (max-width: 640px) {
  /* Hero & Typographie */
  .hero {
    min-height: 100dvh;
    padding: 110px var(--pad) 40px;
  }
  .hero__title {
    font-size: clamp(28px, 8.5vw, 44px);
    line-height: 1.05;
  }
  .hero__scroll {
    display: none;
  }
  .hero__topbar {
    position: static;
    margin-bottom: 24px;
  }
  
  /* Grille Chiffres Clés */
  .figures__grid {
    grid-template-columns: 1fr 1fr !important;
    gap: 16px;
  }
  .figure {
    border-right: 0 !important;
    border-bottom: 1px solid var(--line);
    padding: 16px 8px;
  }
  .figure__num {
    font-size: 40px;
  }

  /* Équipements en 1 colonne sur smartphone */
  .equip__grid {
    grid-template-columns: 1fr !important;
    grid-auto-rows: 160px !important;
  }
  .equip__cell--big,
  .equip__cell--wide,
  .equip__cell--tall {
    grid-column: span 1 !important;
    grid-row: span 1 !important;
  }

  /* Clients sur mobile */
  .client-grid {
    grid-template-columns: 1fr 1fr !important;
  }
  .client-card {
    padding: 16px 10px !important;
    aspect-ratio: auto !important;
    min-height: 110px;
  }

  /* Filtres Projets en défilement horizontal */
  .pj-filters {
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    padding: 14px var(--pad);
    gap: 8px;
  }
  .pj-filter {
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* Cibles tactiles accessibles (44px min) */
  .testi__dot {
    height: 12px;
    padding: 16px 0;
    background-clip: content-box;
  }
  .footer__social a {
    width: 44px;
    height: 44px;
  }

  /* Agences et Téléphone */
  .ag-card__name {
    font-size: 32px;
  }
  .ag-card {
    padding: 24px 16px;
  }
}
```

---

## Conclusion et Synthèse de Validation
La refonte "Terrain" de Labocontrol possède un socle visuel de haute volée qui modernise admirablement l'image de marque. En corrigeant les **liens d'images rompus**, le **bug de fermeture du menu mobile**, en réaffirmant l'accréditation reine **NM ISO/CEI 17025**, et en appliquant les **media queries unifiées pour smartphone**, le site atteindra un niveau de finition irréprochable digne du premier laboratoire privé de contrôle technique et géotechnique du Royaume du Maroc.

