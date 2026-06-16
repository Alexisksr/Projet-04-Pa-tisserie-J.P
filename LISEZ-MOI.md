# Maison Joudia — Démo cake design (proposition ALK Concept)

Site one-page **immersif** : `index.html` + `styles.css` + `script.js`.
Concept : **cake design** (spécialisé gâteaux), expérience plein écran « Noir & Or » (chocolat-noir, or, cuivre, serif Cormorant), à Lausanne.
Structure volontairement différente d'un site « sections empilées + grille » : ici des **scènes plein écran** avec photos en fond + une **vitrine horizontale** des gâteaux.

## Structure des scènes
1. Hero plein écran · 2. Manifeste · 3. **Vitrine horizontale des gâteaux** (flèches + points + glissement)
4. Sur mesure (+ compteurs) · 5. L'atelier (4 étapes) · 6. Avis · 7. Commander · 8. FAQ · 9. Footer

## À personnaliser (placeholders)
1. **Nom** — « Maison Joudia » est un nom de travail (chercher/remplacer dans `index.html`).
2. **Photos plein écran** — chaque scène a un fond `<div class="scene-bg">…<div class="ph ph-cover" …></div></div>`.
   Remplacer le bloc `.ph` par une image : `<img src="images/ma-photo.jpg" alt="…" style="width:100%;height:100%;object-fit:cover">`.
   Les photos de fond doivent être **grandes et lumineuses** (elles remplissent l'écran derrière le texte).
3. **Photos des gâteaux** — dans la vitrine, chaque `<article class="cake">` a un `.cake-photo` avec un `.ph` : même remplacement par `<img …>`.
4. **Formulaire** — créer un formulaire [formspree.io](https://formspree.io) (gratuit) et remplacer `VOTRE_ID_FORMSPREE`
   dans l'attribut `action` du `<form id="orderForm">`. En attendant, mode démo (« Demande envoyée ✓ » sans envoi réel).
5. **Coordonnées / textes** — tél `078 000 00 00`, email `contact@maison-joudia.ch`, ville `Lausanne`, prix, avis, FAQ : à ajuster.
6. **Gâteaux** — 6 signatures (Layer / Wedding / Number / Drip / Naked / sculpté). Ajouter/retirer un `<article class="cake">` ;
   les points de navigation se génèrent tout seuls. Pense à garder le `data-produit` cohérent avec les options du `<select id="type">`.

## Fonctionnalités
- Bouton « Commander » sur chaque gâteau → pré-remplit le formulaire (type + message) et scrolle dessus.
- Vitrine horizontale (flèches, points, glissement tactile/trackpad), parallaxe des fonds, titre animé, compteurs, FAQ accordéon.
- Responsive (desktop / tablette / mobile, vitrine en swipe sur mobile) + respect de `prefers-reduced-motion`.

## Polices : Cormorant (titres) + Outfit (texte), via Google Fonts.

## Mise en ligne
Upload GitHub Pages : `index.html`, `styles.css`, `script.js` + dossier `images/`.

> Note technique : la prévisualisation locale est servie depuis `/tmp/patisserie-preview` (le chemin réel a un accent + espace
> que le serveur Python refuse). Config `patisserie-jp` port 8745 dans `.claude/launch.json`.
