---
title: "PocketBase ou Supabase : comparer sur des critères utiles"
date: 2026-11-22 09:00:00 -0500
categories: [PocketBase, Comparaison]
tags: [pocketbase, supabase, comparaison, backend]
description: "Comparaison entre PocketBase et Supabase sur sept critères annoncés d'avance : licence, modèle de données, authentification, fichiers, temps réel, apprentissage et coût."
---

« Pour un petit projet » ne dit rien : tous les outils prétendent s'y adapter. J'oppose PocketBase à Supabase sur sept critères annoncés avant le tableau, pour que le lecteur puisse contester le choix des critères autant que le résultat. Supabase sert de point de comparaison parce qu'il couvre le même besoin (base, authentification, fichiers, temps réel) avec une architecture à l'opposé.

## Les sept critères

1. **Licence et hébergement** : peut-on installer l'outil soi-même, et à quelles conditions ?
2. **Modèle de données** : quelle base, et quelles conséquences pour les requêtes et la concurrence ?
3. **Authentification** : comptes, rôles et jetons sont-ils fournis, ou faut-il les construire ?
4. **Stockage de fichiers** : les images et documents sont-ils gérés nativement ?
5. **Temps réel** : les clients peuvent-ils recevoir des mises à jour sans interrogation répétée ?
6. **Courbe d'apprentissage** : combien de temps faut-il pour livrer une première fonctionnalité ?
7. **Coût et dépendance** : que paie-t-on, et que se passe-t-il si l'on veut partir ?

Ces critères ignorent la popularité et la qualité du code. Ce qui compte ici, c'est ce qui pèse sur une petite équipe qui doit livrer et maintenir un projet.

## Le tableau comparatif

| Critère | PocketBase | Supabase |
|---|---|---|
| Licence et hébergement | MIT ; un binaire à installer soi-même, pas d'offre hébergée officielle | Composants open source ; offre hébergée, auto-hébergement possible avec Docker |
| Modèle de données | SQLite dans un fichier ; un seul écrivain à la fois | PostgreSQL ; requêtes SQL complètes, index, extensions, concurrence |
| Authentification | Intégrée : courriel et mot de passe, fournisseurs OAuth2, rôles dans les règles | Intégrée : courriel, OAuth2, magie par lien, politiques par ligne |
| Stockage de fichiers | Intégré, sur disque ou compatible S3 | Service de stockage compatible S3 |
| Temps réel | Intégré, par événements envoyés au client | Intégré, basé sur les changements PostgreSQL |
| Courbe d'apprentissage | Très courte : une commande, une console, des règles | Moyenne : concepts PostgreSQL, politiques, CLI |
| Coût et dépendance | Coût d'hébergement seul ; dépendance faible, mais migration manuelle | Offre gratuite limitée puis facturation ; dépendance au fournisseur si hébergé |

Le tableau donne une impression d'équilibre qui ne tient pas. Les deux outils offrent à peu près les mêmes fonctionnalités ; la différence est dans ce qu'ils cachent.

## Ce que la comparaison ne dit pas

PocketBase cache l'infrastructure. Un binaire, un dossier de données, une sauvegarde à copier : voilà ce qui explique sa courbe d'apprentissage très courte et son coût presque nul. En contrepartie, SQLite n'accepte qu'un écrivain à la fois. Un laboratoire qui enregistre quelques prêts par jour ne le remarque pas, mais une application qui reçoit des centaines d'écritures simultanées se heurte à un plafond structurel qu'aucune optimisation de requête ne fait disparaître.

Supabase cache la base de données. PostgreSQL est derrière l'interface, avec ses index, ses extensions et ses transactions. C'est un avantage décisif pour une équipe qui connaît déjà SQL, et un coût d'apprentissage réel pour qui ne le connaît pas. L'offre hébergée ajoute une dépendance : les données restent exportables, mais les fonctions, les politiques et l'authentification doivent être reconstruites si l'on part.

Reste un critère que le tableau ne capture pas : la maintenance. PocketBase se met à jour en remplaçant un fichier, après sauvegarde. Supabase hébergé se met à jour tout seul, ce qui est confortable jusqu'au jour où une montée de version change un comportement dont on dépend. Aucune des deux approches n'est gratuite en temps ; elles déplacent seulement la charge.

## Pour quel besoin choisir l'un ou l'autre

PocketBase convient quand le projet tient sur une machine, que l'équipe est petite et que le besoin principal est de livrer vite une interface au-dessus d'une base simple. C'est le cas du scénario de cette série : un inventaire d'équipement et des prêts, avec deux rôles et quelques règles.

Supabase convient quand les données sont relationnelles et volumineuses, quand plusieurs services doivent écrire en même temps, ou quand l'équipe préfère du SQL et des politiques déclaratives à des règles JavaScript. C'est aussi le choix raisonnable si l'on a besoin d'un hébergement managé sans administrer de serveur.

Un point commun compte : les deux outils permettent de commencer sans écrire de backend. Ce n'est pas un détail de confort, c'est ce qui rend la comparaison pertinente pour une petite équipe. La différence se joue ensuite sur les limites, pas sur le premier jour.

## Sources

- PocketBase. *Introduction* et *API rules and filters*, [pocketbase.io/docs](https://pocketbase.io/docs/), 2026.
- Supabase. *Documentation*, [supabase.com/docs](https://supabase.com/docs), 2026.
- Supabase. *Auth* et *Storage*, [supabase.com/docs/guides](https://supabase.com/docs/guides), 2026.
