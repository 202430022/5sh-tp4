---
title: "PocketBase pour un petit projet d'équipe : mon avis"
date: 2026-11-24 09:00:00 -0500
categories: [PocketBase, Avis]
tags: [pocketbase, avis, équipe, backend]
description: "Avis motivé sur PocketBase pour un petit projet d'équipe : forces observées, faiblesses, cas recommandés et déconseillés, et limites de cet avis."
---

J'ai installé PocketBase, créé trois collections, testé les règles d'accès avec deux comptes et comparé l'outil à Supabase. La question qui reste : est-ce que je le recommanderais à une petite équipe ? Oui, avec des conditions précises. Voici les forces, les faiblesses, les cas où ça vaut le coup, ceux où ça ne vaut pas, et les limites de mon jugement.

## Ce qui fonctionne vraiment bien

La promesse de départ est tenue. Un fichier, une commande, une console : la première collection est créée en quelques minutes, sans serveur de base de données à installer ni configuration à écrire. Pour une équipe qui veut valider une idée avant d'investir, c'est un avantage réel.

Les migrations changent la nature de l'outil. Une collection créée dans la console produit un fichier JavaScript dans `pb_migrations/`, qui décrit les champs et les règles. Ce fichier se versionne, se relit et se rejoue sur un poste neuf. J'ai vérifié en supprimant `pb_data/` : les collections sont revenues, la base était vide, et il a fallu recréer le compte administrateur. La séparation entre structure et données est nette, exactement ce qu'on attend d'un projet reproductible.

Les règles d'accès sont expressives sans être obscures. Une expression comme `@request.auth.id != "" && (membre = @request.auth.id || @request.auth.role = "technicien")` se lit presque comme une phrase. Elle est évaluée à chaque requête, avec les champs du compte authentifié. Pour un projet à deux rôles, c'est suffisant et ça évite d'écrire une couche d'autorisation maison.

La console d'administration est utilisable par quelqu'un qui ne code pas. Un technicien peut consulter l'inventaire, créer un prêt et vérifier un retour sans passer par l'API. Pour une équipe mixte, ce n'est pas un détail.

## Les faiblesses observées

SQLite n'accepte qu'un écrivain à la fois. Sur mon projet, ça ne s'est jamais vu. Sur une application qui reçoit des écritures simultanées, cela devient un plafond, et PocketBase ne propose pas de réplication intégrée pour y répondre.

L'hébergement demande du travail. Il n'existe pas d'offre managée officielle : il faut un serveur, un nom de domaine, un certificat et une sauvegarde. Ce sont des compétences d'administration, pas de développement. Une équipe qui choisit PocketBase pour éviter l'infrastructure finit par en faire un peu quand même.

Le diagnostic est frustrant. Les refus d'écriture renvoient un 400 « Failed to create record. » qui ne distingue pas une règle d'accès d'une validation de champ. Les refus de lecture renvoient un 403 plus clair, mais il faut connaître les trois états des règles pour interpréter l'ensemble. Ne pas révéler les règles est une protection volontaire ; le coût, c'est l'apprentissage.

La maintenance du projet dépend d'une personne. PocketBase est développé principalement par une personne. Ce n'est pas un jugement sur la qualité, qui est bonne, mais un risque de continuité qu'une équipe doit connaître avant de s'engager. La licence MIT limite ce risque : le code reste disponible, mais personne ne garantit les correctifs à venir.

## Les cas où je le recommande

PocketBase convient à un projet interne, avec une équipe de une à cinq personnes, une charge modérée et un besoin de livrer vite. Un inventaire, un formulaire de réservation, un tableau de suivi ou un prototype à montrer à un client : dans ces cas, le temps gagné au démarrage est réel et les limites ne se manifestent pas.

Il convient aussi quand la sauvegarde peut rester simple. Copier `pb_data/` serveur arrêté, ou utiliser la sauvegarde intégrée, suffit pour un projet dont la perte de quelques heures de données serait gênante mais pas catastrophique.

Il convient aussi quand l'équipe veut comprendre ce qui se passe. Un binaire, un fichier de base, des migrations lisibles : le système est assez petit pour être tenu dans la tête, ce qui est rare dans cette catégorie d'outils.

## Les cas où je le déconseille

Je le déconseille dès que plusieurs services doivent écrire simultanément dans la même base, ou quand le volume de données dépasse ce qu'un fichier SQLite peut raisonnablement servir. Dans ces cas, PostgreSQL s'impose comme la réponse au problème.

Je le déconseille aussi pour un projet qui exige une haute disponibilité, une réplication géographique ou un engagement de service. PocketBase ne fournit ni l'un ni l'autre, et l'ajouter demanderait plus de travail que de changer d'outil.

Je le déconseille aussi à une équipe qui n'a personne pour administrer un serveur et qui ne veut pas en avoir. L'absence d'offre managée officielle devient alors un obstacle réel.

## Mon avis, et ses limites

Mon avis est favorable pour le scénario de cette série : un petit projet d'équipe, deux rôles, quelques collections, une charge faible. PocketBase fait ce qu'il promet, avec moins de pièces mobiles que ses concurrents, et les migrations donnent un chemin de reproductibilité crédible.

Cet avis a des limites. Je n'ai pas fait de test de charge, ni mesuré le comportement à cent utilisateurs simultanés. Je n'ai pas non plus testé de montée de version en production, ni de restauration réelle après sinistre. Mon recul se limite à quelques jours de pratique et à un projet de taille modeste. Un avis fondé sur ces seules observations ne doit pas être lu comme une évaluation de production.

Ce qui reste solide, en revanche, c'est la méthode : annoncer les critères, les vérifier avec des comptes réels, noter les messages exacts, et séparer ce qu'on a observé de ce qu'on suppose. C'est cette méthode, plus que le verdict, qui rend la comparaison utilisable par quelqu'un d'autre.

## Sources

- Georgiev, G. *PocketBase — Release v0.40.6*, [github.com/pocketbase/pocketbase/releases/tag/v0.40.6](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.6), 2026.
- PocketBase. *Introduction*, [pocketbase.io/docs](https://pocketbase.io/docs/), 2026.
- PocketBase. *API rules and filters*, [pocketbase.io/docs/api-rules-and-filters](https://pocketbase.io/docs/api-rules-and-filters/), 2026.
