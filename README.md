# MentorMTL - Plateforme de mentorat

MentorMTL est une plateforme de mentorat conçue pour connecter les mentors et les mentorés. La plateforme offre un tableau de bord permettant aux utilisateurs de gérer leurs sessions, d'envoyer des messages, de suivre leurs progrès et de gérer les paiements. Le développement de cette plateforme se concentre sur la mise en relation des mentorés avec des mentors dans différents domaines, tels que le coaching de carrière, le coaching de vie et l'équilibre travail-vie personnelle.

## Aperçu du projet

Le projet est développé en utilisant les technologies suivantes :

- **Node.js** avec **Express** pour la logique côté serveur

- **MySQL** pour la gestion de base de données

- **Bootstrap 5.3.3** pour un design responsive

- **API Google** pour l'authentification (inscription/connexion avec Google)

- **JavaScript**, **HTML** et **CSS** pour la conception et l'interactivité côté front-end

## Fonctionnalités

- **Inscription Mentor et Mentoré** : Les utilisateurs peuvent s'inscrire en tant que mentor ou mentoré.

- **Tableau de bord** : Un tableau de bord personnel où les utilisateurs peuvent consulter leurs sessions, mentors favoris, messages et factures.

- **Système de messagerie** : Une boîte de réception intégrée pour la communication entre les mentors et les mentorés.

- **Calendrier** : Les utilisateurs peuvent gérer leurs événements à venir et leurs sessions de mentorat.

- **Liste des tâches** : Aide les mentorés et les mentors à suivre leurs tâches et objectifs.

- **Intégration des paiements** : Permet aux mentors de facturer les sessions et de suivre les paiements.

- **Paramètres** : Les utilisateurs peuvent mettre à jour leurs informations de profil et paramètres de compte.

## Statut actuel

Le développement du projet se concentre actuellement sur l'intégration de la base de données MySQL pour la persistance des données. La base de données gérera les données des utilisateurs, la planification des sessions, le suivi des paiements et le stockage des messages.

**En cours** :

- L'intégration de la base de données MySQL est en cours.

- Le schéma de la base de données a été conçu et le fichier SQL pour la création des tables nécessaires (Mentor, Mentoré, Session, Demande, Paiement) a été préparé.

- Des données d'exemple pour les mentors et mentorés sont en cours d'ajout dans le cadre de l'intégration.

- Les plans futurs incluent le développement supplémentaire du système de paiement et le chargement dynamique de contenu depuis la base de données.

## Instructions d'installation

Pour exécuter le projet en local, suivez les étapes ci-dessous :

1. **Cloner le dépôt** :

   ```bash

   git clone https://github.com/pamada/stage-mentorat.git

   cd mentormtl

2. **Installer les dépendances nécessaires** :

   Assurez-vous que Node.js et npm sont installés sur votre machine, puis exécutez :

   ```bash

   npm install

   ```

3. **Installer Bootstrap 5.3.3** :

   ```bash

   npm i bootstrap@5.3.3

   ```

4. **Configurer la base de données MySQL** :

    - Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine.

    - Utilisez le fichier SQL fourni (`/sql/mentorship_platform.sql`) pour créer les tables nécessaires.

    - Mettez à jour le fichier `server.js` avec vos informations d'identification MySQL.

5. **Exécuter l'application** :

   ```bash

   node server.js

   ```

6. **Ouvrir l'application dans votre navigateur** :

   Accédez à `http://localhost:3000`.

## À faire

- [ ] Finaliser l'intégration de la base de données MySQL

- [ ] Implémenter le chargement dynamique des données des mentors et sessions

- [ ] Ajouter la fonctionnalité de traitement des paiements

- [ ] Terminer le flux d'inscription et de connexion via Google

- [ ] Améliorer l'interface utilisateur du tableau de bord

## Contribution

Si vous souhaitez contribuer à ce projet, merci de soumettre une pull request avec une description des modifications effectuées. Les retours et suggestions sont également les bienvenus !

## Licence

Daniela

GitHub - Pamada/stage-mentorat
Contribute to Pamada/stage-mentorat development by creating an account on GitHub.
 