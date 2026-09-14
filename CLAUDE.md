# CLAUDE.md — Automotive Premium Marketplace

## 1. IDENTITÉ DU PROJET

Nom de travail : [À DÉFINIR]

Ce projet est une marketplace premium dédiée aux voitures exceptionnelles.

L'objectif initial est de permettre à des clients de réserver des trajets avec chauffeur dans :
- des voitures de collection ;
- des voitures anciennes iconiques ;
- des voitures sportives ;
- des voitures de luxe ;
- des véhicules rares ou particulièrement intéressants.

À terme, la plateforme devra également permettre la location de ces véhicules sans chauffeur.

Le lancement initial est prévu sur la Côte d'Azur :
- Cannes
- Antibes
- Nice
- Monaco
- Saint-Tropez
- éventuellement d'autres villes de la région

La vision long terme est de devenir une plateforme de référence pour réserver ou louer des véhicules exceptionnels, en combinant :
- mobilité premium ;
- expériences automobiles ;
- événementiel ;
- location ;
- tourisme ;
- conciergerie.

---

# 2. VISION PRODUIT

Le produit ne doit PAS être pensé comme un simple clone d'Uber.

Uber vend principalement :
    A → B

Notre produit vend :
    A → B + voiture exceptionnelle + expérience

La voiture est donc une partie centrale du produit.

Le client doit avoir envie de réserver une voiture même si une alternative de transport classique existe.

Le positionnement doit être :
- premium ;
- élégant ;
- automobile ;
- expérientiel ;
- moderne ;
- simple à utiliser.

Éviter absolument :
- l'image "taxi classique" ;
- une interface générique de VTC ;
- une esthétique trop luxueuse artificielle ;
- les gradients excessifs ;
- les interfaces surchargées ;
- le copier-coller visuel d'Uber.

---

# 3. UTILISATEURS

La plateforme possède trois types d'utilisateurs principaux.

## 3.1 CLIENT

Le client peut :
- créer un compte ;
- consulter les véhicules ;
- rechercher un véhicule ;
- filtrer les véhicules ;
- consulter une fiche véhicule ;
- voir les photos ;
- voir les caractéristiques ;
- voir le prix ;
- sélectionner une date ;
- sélectionner une heure ;
- sélectionner un lieu de départ ;
- sélectionner une destination ;
- demander une réservation ;
- suivre ses réservations ;
- annuler selon les conditions ;
- noter une expérience ;
- consulter son historique.

---

## 3.2 PROPRIÉTAIRE / CHAUFFEUR

Le propriétaire peut :
- créer un compte ;
- créer son profil ;
- soumettre un véhicule ;
- ajouter des photos ;
- renseigner les caractéristiques du véhicule ;
- renseigner ses disponibilités ;
- définir ses tarifs ;
- recevoir des demandes ;
- accepter/refuser une réservation ;
- consulter ses réservations ;
- consulter ses revenus ;
- modifier ses disponibilités.

Important :

Un propriétaire n'est pas automatiquement autorisé à publier son véhicule.

Chaque véhicule doit avoir un statut :

- DRAFT
- PENDING_REVIEW
- APPROVED
- REJECTED
- SUSPENDED

L'administrateur valide manuellement les véhicules au lancement.

---

## 3.3 ADMINISTRATEUR

L'administrateur possède une interface permettant de :
- voir les utilisateurs ;
- voir les propriétaires ;
- voir les véhicules ;
- approuver/refuser un véhicule ;
- suspendre un véhicule ;
- modifier les informations ;
- voir les réservations ;
- voir les revenus ;
- voir les commissions ;
- gérer les catégories ;
- gérer les utilisateurs ;
- gérer les signalements ;
- gérer les avis.

L'admin doit avoir une vision globale de la marketplace.

---

# 4. MVP — PRIORITÉ ABSOLUE

Ne pas construire toute la vision long terme immédiatement.

Le premier objectif est de construire un MVP réellement utilisable.

Le MVP doit permettre :

CLIENT :

1. Landing page
2. Création de compte
3. Connexion
4. Catalogue des véhicules
5. Recherche
6. Filtres
7. Fiche véhicule
8. Sélection d'une date
9. Sélection d'une heure
10. Départ
11. Destination
12. Demande de réservation
13. Confirmation
14. Historique des réservations

PROPRIÉTAIRE :

1. Création de compte
2. Profil
3. Ajout d'un véhicule
4. Upload de photos
5. Caractéristiques
6. Prix
7. Disponibilités
8. Réception des demandes
9. Acceptation/refus
10. Historique

ADMIN :

1. Dashboard
2. Gestion des utilisateurs
3. Gestion des véhicules
4. Validation des véhicules
5. Gestion des réservations
6. Gestion des avis
7. Gestion des commissions

---

# 5. LOCATION SANS CHAUFFEUR

La location sans chauffeur est une fonctionnalité importante de la vision long terme.

MAIS :

NE PAS la développer complètement dans le premier MVP.

Préparer l'architecture pour qu'elle puisse être ajoutée plus tard.

La base de données doit pouvoir distinguer :

- WITH_DRIVER
- SELF_DRIVE_RENTAL

Mais le MVP doit principalement se concentrer sur :

WITH_DRIVER

La location sans chauffeur sera développée dans une phase ultérieure.

---

# 6. MODÈLE ÉCONOMIQUE

La plateforme fonctionne comme une marketplace.

La plateforme ne possède pas nécessairement les véhicules.

Les propriétaires apportent les véhicules.

La plateforme apporte :
- les clients ;
- la visibilité ;
- la réservation ;
- le paiement ;
- la mise en relation ;
- la gestion ;
- la confiance.

Le modèle économique prévu est une commission sur les transactions.

Exemple :

Prix client : 500 €

Commission plateforme : 20 %

Revenu plateforme : 100 €

Revenu propriétaire : 400 €

NE PAS coder un taux de commission fixe partout dans le code.

Créer une configuration :

platform_commission_rate

Cette valeur doit pouvoir être modifiée facilement depuis l'administration.

---

# 7. STRATÉGIE DE LIQUIDITÉ DE LA MARKETPLACE

Le problème principal au lancement n'est pas le code.

Le problème principal est :

OFFRE ↔ DEMANDE

Une marketplace vide ne fonctionne pas.

La stratégie initiale doit donc permettre de lancer la plateforme avec un nombre limité mais qualitatif de véhicules.

Objectif initial :

10 à 20 véhicules réellement disponibles.

Puis :

20 → 50 → 100+

Ne jamais présenter artificiellement des véhicules inexistants ou indisponibles.

Les véhicules fictifs peuvent être utilisés uniquement pour le développement et doivent être clairement identifiés comme données de démonstration.

---

# 8. ACQUISITION

La stratégie d'acquisition initiale sera principalement organique.

Canaux prioritaires :

- TikTok
- Instagram
- Reels
- YouTube Shorts

Types de contenu :

- présentation de voitures ;
- "combien coûte ce trajet ?" ;
- voitures rares ;
- comparaison avec un VTC classique ;
- POV trajet ;
- expériences ;
- mariages ;
- Cannes ;
- Monaco ;
- Saint-Tropez ;
- événements automobiles.

Un deuxième axe d'acquisition doit cibler les propriétaires.

Message :

"Votre voiture dort la majorité du mois. Transformez-la en source de revenus."

La plateforme doit donc prévoir un CTA clair :

"Proposer ma voiture"

---

# 9. LANDING PAGE

La landing page est extrêmement importante.

Elle doit immédiatement communiquer :

1. Ce qu'est le service
2. Où il est disponible
3. Les véhicules disponibles
4. Comment réserver
5. Pourquoi utiliser la plateforme
6. Comment proposer son véhicule

CTA principaux :

"Réserver une voiture"

"Proposer ma voiture"

La landing page doit être très visuelle.

Les photos des voitures sont un élément majeur du produit.

---

# 10. DESIGN SYSTEM

Direction artistique :

Premium automobile contemporain.

Inspirations conceptuelles :
- plateformes automobiles haut de gamme ;
- maisons automobiles ;
- conciergeries premium ;
- design éditorial moderne.

Le design doit être :

- minimaliste ;
- élégant ;
- rapide ;
- mobile-first ;
- photographique ;
- très lisible.

Éviter :
- interfaces SaaS génériques ;
- cartes avec trop d'informations ;
- couleurs criardes ;
- boutons partout ;
- animations inutiles.

La voiture doit être le héros visuel.

---

# 11. STRUCTURE DU CATALOGUE

Chaque véhicule doit posséder au minimum :

id
owner_id
brand
model
year
category
description
short_description
photos
location
price_per_hour
price_per_trip
availability
with_driver
self_drive_available
status
created_at
updated_at

Catégories initiales possibles :

CLASSIC
SPORT
LUXURY
SUPERCAR
ICONIC
WEDDING
EVENT
OTHER

Prévoir une architecture permettant d'ajouter facilement des catégories.

---

# 12. RÉSERVATIONS

Une réservation doit contenir au minimum :

id
customer_id
vehicle_id
owner_id
booking_type
date
start_time
pickup_location
destination
duration
base_price
platform_fee
total_price
status
created_at
updated_at

Statuts :

PENDING
ACCEPTED
DECLINED
CANCELLED
COMPLETED

Le système doit empêcher les doubles réservations sur une même période.

---

# 13. DISPONIBILITÉS

La disponibilité des véhicules est critique.

Un véhicule ne doit jamais pouvoir être réservé simultanément deux fois.

Prévoir :

- calendrier ;
- jours disponibles ;
- horaires disponibles ;
- réservations existantes ;
- périodes bloquées.

L'architecture doit permettre plus tard :
- disponibilité récurrente ;
- indisponibilité temporaire ;
- synchronisation calendrier ;
- règles de réservation.

---

# 14. TARIFICATION

Ne pas hardcoder les prix.

Prévoir une structure permettant à terme :

- tarif horaire ;
- tarif demi-journée ;
- tarif journée ;
- tarif trajet ;
- tarif kilométrique ;
- frais supplémentaires ;
- supplément événement ;
- supplément nuit ;
- minimum de réservation.

Pour le MVP, utiliser une logique simple.

La complexité tarifaire viendra plus tard.

---

# 15. PAIEMENT

Ne pas créer son propre système de paiement.

Prévoir une intégration avec un prestataire spécialisé lorsque le paiement réel sera activé.

Architecture à prévoir pour :

- paiement client ;
- commission plateforme ;
- versement propriétaire ;
- remboursement ;
- frais ;
- statut du paiement.

Le système doit séparer :

booking_status

et

payment_status

Exemple :

booking_status = ACCEPTED

payment_status = PAID

Ne jamais mélanger les deux.

---

# 16. AUTHENTIFICATION

Prévoir :

- email ;
- mot de passe ;
- récupération de mot de passe ;
- éventuellement Google/Apple plus tard.

Les rôles doivent être clairement séparés :

CUSTOMER
OWNER
ADMIN

Ne jamais faire confiance au rôle envoyé directement par le frontend.

Les permissions doivent être contrôlées côté serveur.

---

# 17. SÉCURITÉ

Principes obligatoires :

- validation côté serveur ;
- contrôle des permissions ;
- protection des routes admin ;
- protection contre les accès à des données d'autres utilisateurs ;
- validation des uploads ;
- limitation des fichiers ;
- protection des secrets ;
- variables d'environnement ;
- aucune clé API secrète dans le frontend.

Ne jamais mettre :

API keys
passwords
secret keys
database credentials

dans le code source public.

---

# 18. DONNÉES PERSONNELLES

Le produit traitera potentiellement :

- nom ;
- email ;
- téléphone ;
- adresse de départ ;
- destination ;
- informations de réservation ;
- données de paiement via le prestataire.

Concevoir le système avec une logique de minimisation des données.

Ne stocker que ce qui est nécessaire.

Prévoir plus tard :

- politique de confidentialité ;
- suppression de compte ;
- export des données ;
- consentement ;
- conformité RGPD.

---

# 19. VÉRIFICATION DES PROPRIÉTAIRES

La marketplace doit prévoir un processus de vérification.

À terme :

IDENTITÉ
→ DOCUMENTS
→ VÉHICULE
→ ASSURANCE
→ DOCUMENTS ADMINISTRATIFS
→ VALIDATION

Ne jamais considérer qu'un véhicule est légalement exploitable uniquement parce qu'un propriétaire l'a ajouté.

Le système doit utiliser :

verification_status

avec par exemple :

UNVERIFIED
PENDING
VERIFIED
REJECTED

---

# 20. VÉHICULES DE COLLECTION

Le produit cible notamment les véhicules de collection.

Cependant, l'application ne doit jamais afficher automatiquement :

"Ce véhicule est légalement autorisé à exercer comme VTC."

Cette question doit être traitée séparément selon :
- réglementation ;
- véhicule ;
- usage ;
- assurance ;
- statut du chauffeur ;
- réglementation applicable.

L'application doit distinguer :

"Véhicule de collection"

de

"Véhicule validé pour le service proposé".

---

# 21. ARCHITECTURE TECHNIQUE

Tu dois privilégier une architecture simple et maintenable.

Priorités :

1. simplicité
2. sécurité
3. vitesse de développement
4. maintenabilité
5. évolutivité

Ne pas introduire de technologie complexe sans raison.

Avant de choisir définitivement une technologie, expliquer brièvement :
- pourquoi ;
- avantages ;
- inconvénients ;
- coût éventuel ;
- complexité.

L'utilisateur est débutant en programmation.

Le code doit donc être :
- lisible ;
- commenté lorsque nécessaire ;
- organisé ;
- explicable.

---

# 22. RÈGLE ABSOLUE : NE PAS SUR-ENGINEER

Ne pas construire aujourd'hui les fonctionnalités dont nous aurons peut-être besoin dans 3 ans.

Exemples :

NE PAS commencer avec :
- microservices ;
- Kubernetes ;
- architecture distribuée ;
- IA complexe ;
- système de recommandation avancé ;
- géolocalisation temps réel complexe ;
- matching algorithmique complexe ;
- système de pricing dynamique complexe.

Le MVP doit rester simple.

---

# 23. IA

L'IA pourra être ajoutée plus tard pour :

- recommandations ;
- recherche naturelle ;
- génération de descriptions ;
- support client ;
- détection de fraude ;
- analyse de véhicules ;
- personnalisation.

Mais l'IA n'est PAS une priorité du MVP.

Ne pas ajouter de l'IA simplement parce que le projet est une startup moderne.

Chaque fonctionnalité IA doit avoir une justification business.

---

# 24. MOBILE / DESKTOP

Le produit doit être :

MOBILE-FIRST

La majorité des utilisateurs découvriront probablement le service via :
- TikTok ;
- Instagram ;
- QR codes ;
- partage mobile.

L'expérience mobile doit donc être prioritaire.

Mais l'interface desktop doit rester correctement utilisable.

---

# 25. SEO

Prévoir une architecture permettant plus tard de créer des pages indexables :

/cars
/cars/mustang
/cars/porsche
/cars/cannes
/cars/monaco
/cars/nice
/experiences
/wedding
/events

Ne pas nécessairement développer toutes ces pages dans le MVP.

Mais éviter une architecture qui rendrait le SEO impossible.

---

# 26. ANALYTICS

Prévoir des événements permettant de mesurer :

- visite landing page ;
- clic "Réserver" ;
- clic "Proposer ma voiture" ;
- recherche ;
- consultation véhicule ;
- début réservation ;
- demande réservation ;
- réservation confirmée ;
- abandon réservation.

KPIs principaux :

Traffic
→ visites véhicules
→ demandes
→ réservations
→ réservations complétées

Pour les propriétaires :

Visites
→ inscriptions
→ véhicules soumis
→ véhicules approuvés
→ réservations

---

# 27. MARKETPLACE : KPI PRINCIPAL

Le KPI le plus important au début n'est PAS :

nombre de téléchargements.

Le KPI principal est :

GMV / volume de réservations

et surtout :

nombre de réservations réellement complétées.

Autres métriques importantes :

- taux de conversion ;
- taux d'acceptation propriétaire ;
- taux d'annulation ;
- panier moyen ;
- commission moyenne ;
- repeat rate ;
- utilisation des véhicules ;
- nombre de véhicules actifs.

---

# 28. PRIORITÉ DE DÉVELOPPEMENT

Toujours développer dans cet ordre :

PHASE 0
Architecture
→ choix technologique
→ structure projet
→ base de données
→ authentification

PHASE 1
Landing page

PHASE 2
Catalogue véhicules

PHASE 3
Fiches véhicules

PHASE 4
Comptes clients

PHASE 5
Réservation

PHASE 6
Espace propriétaire

PHASE 7
Administration

PHASE 8
Disponibilités

PHASE 9
Paiement

PHASE 10
Avis

PHASE 11
Analytics

PHASE 12
Polissage UI/UX

Ne pas commencer une nouvelle phase tant que la précédente n'est pas fonctionnelle.

---

# 29. MÉTHODE DE TRAVAIL AVEC L'UTILISATEUR

L'utilisateur est le fondateur du projet mais n'est pas développeur professionnel.

Tu dois donc agir comme :

- développeur senior ;
- architecte logiciel ;
- product manager ;
- conseiller technique.

Mais tu dois laisser les décisions business importantes à l'utilisateur.

Avant toute décision qui modifie fortement :
- le business model ;
- le positionnement ;
- l'expérience utilisateur ;
- les coûts ;
- la réglementation ;
- l'architecture fondamentale ;

expliquer le problème et proposer 2 ou 3 options.

NE PAS prendre une décision stratégique majeure silencieusement.

---

# 30. FORMAT DES RÉPONSES

Lorsque tu expliques quelque chose à l'utilisateur :

1. Explique simplement le problème.
2. Donne ta recommandation.
3. Explique brièvement pourquoi.
4. Si nécessaire, demande validation.
5. Puis implémente.

Éviter les explications inutilement longues.

L'utilisateur préfère les recommandations directes.

---

# 31. RÈGLE : SI QUELQUE CHOSE EST UNE MAUVAISE IDÉE

Ne jamais simplement exécuter une mauvaise décision.

Si une demande est :
- techniquement fragile ;
- inutilement complexe ;
- trop chère ;
- dangereuse ;
- juridiquement risquée ;
- incohérente avec le MVP ;

dire clairement :

"Je déconseille cette approche parce que..."

Puis proposer une alternative.

---

# 32. TESTS

Chaque fonctionnalité importante doit être testée.

Tester notamment :

- inscription ;
- connexion ;
- permissions ;
- création véhicule ;
- validation véhicule ;
- réservation ;
- conflit de disponibilité ;
- annulation ;
- calcul du prix ;
- commission ;
- accès admin ;
- accès propriétaire ;
- accès client.

Ne pas considérer une fonctionnalité comme terminée uniquement parce que l'interface fonctionne.

---

# 33. GESTION DES ERREURS

L'application doit afficher des erreurs compréhensibles.

Éviter les messages techniques du type :

"500 Internal Server Error"

à l'utilisateur final.

Afficher par exemple :

"Une erreur est survenue. Veuillez réessayer."

Les erreurs techniques doivent être disponibles dans les logs.

---

# 34. GIT

Utiliser Git.

Faire des commits logiques.

Exemples :

feat: add vehicle catalogue
feat: add booking flow
feat: add owner dashboard
fix: prevent duplicate bookings
fix: booking price calculation

Ne pas faire un énorme commit contenant toute l'application.

---

# 35. ENVIRONNEMENTS

Prévoir :

development
production

Les données de test ne doivent jamais être mélangées avec les données de production.

Les secrets doivent être stockés dans des variables d'environnement.

---

# 36. DONNÉES DE DÉMONSTRATION

Pour le développement, créer des véhicules fictifs réalistes.

Exemple :

1967 Ford Mustang
1989 Porsche 911
1972 Jaguar E-Type
1986 Mercedes-Benz 560 SEC

IMPORTANT :

Ces données sont uniquement des données de démonstration.

Ne jamais les présenter comme de véritables véhicules disponibles sans validation.

---

# 37. PHILOSOPHIE PRODUIT

La plateforme doit donner au client l'impression :

"Je peux réserver cette voiture."

et non :

"Je peux chercher un taxi."

La voiture doit être au centre.

Chaque fiche véhicule doit être désirable.

La photographie doit avoir une importance majeure.

---

# 38. FUTUR

Après validation du MVP, les fonctionnalités suivantes pourront être étudiées :

V2 :
- location sans chauffeur ;
- paiement automatisé ;
- caution ;
- contrats ;
- vérification permis ;
- assurance ;
- système de messagerie ;
- avis avancés.

V3 :
- expériences automobiles ;
- événements ;
- mariages ;
- conciergeries ;
- hôtels ;
- yachts ;
- intégration avec acteurs touristiques.

V4 :
- expansion Monaco ;
- Saint-Tropez ;
- Paris ;
- autres marchés européens.

V5 :
- marketplace internationale.

---

# 39. RÈGLE BUSINESS FONDAMENTALE

NE PAS confondre :

"Nous pouvons techniquement construire cette fonctionnalité"

avec :

"Nous devons construire cette fonctionnalité."

Toujours privilégier :

VALIDATION DU MARCHÉ
→ UTILISATEURS
→ TRANSACTIONS
→ OPTIMISATION
→ SCALE

plutôt que :

CODE
→ CODE
→ CODE
→ chercher des clients.

---

# 40. PREMIÈRE MISSION

Avant d'écrire une grande quantité de code :

1. analyser le projet ;
2. identifier les fonctionnalités nécessaires au MVP ;
3. proposer l'architecture technique ;
4. proposer la structure de la base de données ;
5. identifier les risques majeurs ;
6. identifier les décisions qui nécessitent une validation du fondateur ;
7. proposer le plan de développement par étapes.

Ne pas commencer immédiatement par générer tout le projet.

Présenter d'abord le plan.

Après validation, commencer la construction étape par étape.

---

# 41. OBJECTIF FINAL

Construire une marketplace réellement utilisable permettant à un client de :

Découvrir une voiture exceptionnelle
→ choisir la voiture
→ choisir le moment
→ choisir le trajet
→ demander/réserver
→ vivre l'expérience
→ laisser un avis.

Et permettant au propriétaire de :

Inscrire son véhicule
→ être vérifié
→ définir ses disponibilités
→ recevoir des réservations
→ accepter les demandes
→ générer des revenus.

La technologie doit servir ce modèle économique.

Elle ne doit jamais devenir le produit à la place du produit.
