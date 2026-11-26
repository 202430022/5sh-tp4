---
title: "Installer PocketBase : l'erreur qui m'a le plus appris"
date: 2026-11-18 09:00:00 -0500
categories: [PocketBase, Retour d'experience]
tags: [pocketbase, installation, depannage]
description: "Récit de l'installation de PocketBase 0.40.6 sous Windows : un port déjà occupé, un message trompeur, et deux dossiers qu'il faut absolument distinguer."
---

Je m'attendais à passer vingt minutes sur l'installation de PocketBase. J'en ai passé une heure, et la moitié de ce temps n'a pas servi à installer quoi que ce soit : elle a servi à comprendre ce que le logiciel me disait. Voici le récit de ces premiers pas, avec le message d'erreur complet et ce que j'en ai tiré.

## Le téléchargement, la partie simple

Le site officiel propose une archive par système d'exploitation. Pour Windows, c'est un fichier ZIP d'environ 13 Mo qui contient un exécutable de 34 Mo, une licence et un journal des versions. J'ai décompressé l'archive dans un dossier `pocketbase/` à la racine du dépôt du projet, puis j'ai lancé la commande indiquée par la documentation.

```powershell
.\pocketbase.exe superuser create <COURRIEL> "<MOT_DE_PASSE>"
.\pocketbase.exe serve --http=127.0.0.1:8090
```

Le serveur démarre, affiche deux adresses — l'API sur `/api/` et la console sur `/_/` — et reste actif dans le terminal. La console s'ouvre dans le navigateur, le compte administrateur fonctionne, et les collections apparaissent. Jusque-là, tout est conforme à la promesse : un fichier, une commande, une interface.

## L'erreur la plus instructive : le port occupé

Le lendemain, j'ai relancé le serveur sans avoir fermé celui de la veille. Le terminal a affiché ceci, et rien d'autre :

```text
2026/11/25 19:24:16 listen tcp 127.0.0.1:8090: bind: Une seule utilisation de chaque adresse de socket (protocole/adresse réseau/port) est habituellement autorisée.
```

Sur le moment, j'ai lu « adresse réseau » et j'ai cru à un problème de carte réseau ou de pare-feu. C'était faux. Le message dit exactement l'inverse : le port 8090 est déjà pris par un autre processus, en l'occurrence mon propre serveur resté actif. La formulation est celle de Windows, pas celle de PocketBase, ce qui ajoute à la confusion : le logiciel ne fait que rapporter l'erreur du système.

Deux solutions, toutes les deux utiles. La première consiste à fermer le processus qui occupe le port. La seconde consiste à démarrer sur un autre port, ce qui est d'ailleurs la bonne habitude à prendre quand on travaille à plusieurs sur la même machine :

```powershell
.\pocketbase.exe serve --http=127.0.0.1:8091
```

Cette erreur m'a appris quelque chose de plus général : avec PocketBase, le message affiché est souvent celui du système d'exploitation ou de la base, pas une explication pédagogique. Il faut le lire littéralement. « Bind » veut dire « attacher une adresse à un socket », et l'échec de cette opération n'a qu'une cause fréquente : l'adresse est déjà utilisée.

## Le deuxième piège : 403 ou 400

En testant l'API avec PowerShell, j'ai obtenu deux réponses différentes pour ce qui me semblait être la même chose. Une lecture refusée renvoyait une erreur 403 avec un message clair :

```text
{"data":{},"message":"Only superusers can perform this action.","status":403}
```

Une création refusée renvoyait, elle, une erreur 400 beaucoup plus vague :

```text
{"data":{},"message":"Failed to create record.","status":400}
```

J'ai d'abord cherché un champ obligatoire manquant. En réalité, les deux refus venaient de la même cause : la règle d'accès de la collection. PocketBase choisit simplement de ne pas détailler un refus d'écriture, pour ne pas révéler la structure des règles à un client non autorisé. Comprendre cela demandait de lire la documentation des règles, pas de modifier la requête au hasard. C'est le sujet du troisième article de la série.

## Deux dossiers, deux rôles

Le point que j'aurais aimé comprendre plus tôt concerne les deux dossiers créés par PocketBase. `pb_data/` contient la base, les fichiers déposés, les journaux et les sauvegardes : c'est l'état de mon poste, et il ne se versionne jamais. `pb_migrations/` contient le schéma sous forme de scripts : c'est ce qui permet à un collègue de recréer les collections chez lui.

J'ai vérifié ce comportement en supprimant `pb_data/` après avoir conservé une copie. Au redémarrage, les collections étaient bien recréées à partir des migrations, mais la base était vide et il a fallu recréer le compte administrateur. Autrement dit, les migrations reproduisent la structure, pas les données ni les comptes. Cette distinction paraît évidente une fois écrite ; elle ne l'était pas avant l'essai.

## Ce que je ferais autrement

Trois habitudes auraient suffi à éviter la perte de temps. Fermer le serveur avant d'en démarrer un autre, et vérifier le port avec `Get-NetTCPConnection -LocalPort 8090` en cas de doute. Lire les messages d'erreur du plus près possible, sans les paraphraser. Et noter chaque commande et chaque sortie au moment où elles arrivent, parce qu'un message recopié de mémoire perd précisément les détails qui servent au dépannage.

La procédure complète, de l'installation au premier équipement créé, est dans le wiki : [Premiers pas avec PocketBase](https://github.com/202430022/5sh-tp4/wiki/Premiers-pas). Elle est écrite pour être suivie telle quelle, sans les hésitations de ce récit.

## Sources

- Georgiev, G. *PocketBase — Release v0.40.6*, [github.com/pocketbase/pocketbase/releases/tag/v0.40.6](https://github.com/pocketbase/pocketbase/releases/tag/v0.40.6), 2026.
- PocketBase. *Installation*, [pocketbase.io/docs](https://pocketbase.io/docs/), 2026.
- Microsoft. *Invoke-RestMethod*, [learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-restmethod), 2026.
