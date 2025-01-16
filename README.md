# Let's Cook - les recettes de cuisine mondiale. 🍳

## Description

**Let's Cook** est une application web développée entièrement en **Vanilla JavaScript** (sans frameworks). Elle permet aux utilisateurs de rechercher et d'explorer des recettes de cuisine en s'appuyant sur une **API REST** externe, [DummyJSON](https://dummyjson.com/).

### Objectifs pédagogiques

Ce projet a été conçu pour :

- Utiliser des **fonctions asynchrones** pour interagir avec une API REST.
- Structurer un projet web avec des bonnes pratiques : **HTML sémantique**, **CSS modularisé**, et **JavaScript en modules**.
- Préparer le déploiement d'une application web sur **Vercel**.

## Fonctionnalités principales

1. **Affichage des recettes :**
   - **Les recettes sont téléchargées depuis le site dummyjson.com via API.**
   - **Les recettes sont représentées sous forme de cartes avec le nom de la recette, une image et une liste des ingrédients.**

2. **Recherche par nom de recette :**
   - **Permet de rechercher des recettes grâce à un formulaire de recherche.**
   - **Un `eventListener` sur l'input met à jour la liste des recettes en temps réel à chaque saisie.**

3. **Tri des recettes par nom ou date de création :**
   - **Les recettes peuvent être triées par nom ou par date via des filtres.**
   - **Il est possible de choisir un ordre croissant ou décroissant.**

4. **Choix du nombre de recettes affichées :**
   - **Un formulaire de sélection permet de modifier le nombre de recettes affichées (12, 24 ou 30).**
   - **Ces valeurs peuvent être ajustées facilement.**

## Architecture du projet

```
├── README.md
├── assets
│   ├── css
│   │   ├── custom.css
│   │   ├── custom.css.map
│   │   ├── custom.scss
│   │   ├── reboot.css
│   │   ├── style.css
│   │   ├── utilites.css
│   │   └── variables.css
│   ├── images
│   │   └── logo.svg
│   └── js
│       ├── index.js
│       └── index2.js
└── index.html
```

### Points clés de l'architecture :

1. **Séparation des responsabilités :**
   - **Les fichiers CSS incluent des variables globales, des utilitaires réutilisables et des styles spécifiques.**
   - **Le JavaScript est structuré en modules pour séparer la logique principale des fonctionnalités secondaires.**

2. **Utilisation de l'API :**
   - **Les données des recettes proviennent de l'API DummyJSON.**
   - **L'application interagit avec l'API via des requêtes asynchrones (`fetch`).**

## Ressources utilisées 📚

- **API :** [DummyJSON](https://dummyjson.com/) pour les données des recettes.
- **Vanilla JavaScript :** Aucune bibliothèque ou framework.
- **CSS :** Reboot et styles personnalisés.
- **Déploiement :** [Vercel](https://vercel.com/) (URL fictive : [https://lets-cook.vercel.app](https://lets-cook.vercel.app)).

### Explications techniques

- **Chargement des données :**
   - **Les recettes sont récupérées depuis l'API en utilisant fetch et affichées sous forme de cartes.**
- **Mise à jour dynamique de l'interface :**
   - **Recherche et filtres agissent en temps réel grâce à des eventListeners**
- **Gestion des erreurs :**
   - **Si une requête échoue, un message informatif est affiché à l'utilisateur.**

### Déploiement

- Le projet sera déployé sur **Vercel**. Accédez à l'application ici : [Let's Cook](https://lets-cook.vercel.app).

## Auteur

- **Nom :** Loukachov Andrei  
- **Formation :** DWWM
- **Objectif :** Validation des compétences en création et déploiement d'applications web.

## Améliorations possibles 🚀

1. Ajout d'une page détaillée pour chaque recette.
2. Possibilité de filtrer par type de cuisine ou d'ingrédients.
3. Intégration d'une fonctionnalité permettant aux utilisateurs d'ajouter leurs propres recettes.