
# MentorMTL - Plateforme de mentorat
 
---

MentorMTL est une plateforme de mentorat conçue pour connecter les mentors et les mentorés. La plateforme offre un tableau de bord permettant aux utilisateurs de gérer leurs sessions, d'envoyer des messages, de suivre leurs progrès et de gérer les paiements. Le développement de cette plateforme se concentre sur la mise en relation des mentorés avec des mentors dans différents domaines, tels que le coaching de carrière, le coaching de vie et l'équilibre travail-vie personnelle.

## Aperçu du projet

Le projet est développé en utilisant les technologies suivantes :
- **Node.js** avec **Express** pour la logique côté serveur
- **MySQL** pour la gestion de base de données
- **Bootstrap 5.3.3** pour un design responsive
- **JavaScript**, **HTML** et **CSS** pour la conception et l'interactivité côté front-end

## Fonctionnalités

- **Inscription Mentor et Mentoré** : Les utilisateurs peuvent s'inscrire en tant que mentor ou mentoré.
- **Tableau de bord** : Un tableau de bord personnalisé où les utilisateurs peuvent consulter leurs sessions, mentors favoris, messages et factures.
- **Système de messagerie** : Une boîte de réception intégrée pour la communication entre les mentors et les mentorés.
- **Calendrier** : Les utilisateurs peuvent gérer leurs événements à venir et leurs sessions de mentorat.
- **Liste des tâches** : Aide les mentorés et les mentors à suivre leurs tâches et objectifs.
- **Intégration des paiements** : Permet aux mentors de facturer les sessions et de suivre les paiements.
- **Paramètres** : Les utilisateurs peuvent mettre à jour leurs informations de profil et paramètres de compte.

## Statut actuel

### **Modifications Récentes :**

1. **Modification de la base de données** :
   - La base de données a été simplifiée pour inclure les informations principales pour les mentors et les mentorés :
      - **Mentor** : `name`, `email`, `password`, `expertise`.
      - **Mentoree** : `name`, `email`, `password`.
   - Les tables `Session`, `Demande`, et `Paiement` restent en place pour gérer les fonctionnalités futures.

2. **Installation de modules npm supplémentaires** :
   - Le module **express-session** a été installé pour gérer les sessions des utilisateurs afin de les maintenir connectés et d'afficher leur nom dans le tableau de bord :
     ```bash
     npm install express-session
     ```

3. **Modification du tableau de bord** :
   - Le tableau de bord a été modifié pour afficher le nom de l'utilisateur (mentor ou mentoré) après la connexion. Cette information est récupérée via la session active de l'utilisateur.

4. **Fonctionnalité future - Création de session entre Mentor et Mentoré** :
   - Les prochaines étapes incluront la possibilité de créer des **sessions** entre les mentors et les mentorés, où un mentor pourra accepter une demande de session envoyée par un mentoré.

### **Intégration MySQL avec XAMPP sur localhost**

- **Hôte** : `localhost`
- **Utilisateur** : `root` (pas de mot de passe)
- **Port** : `3306` (port par défaut de MySQL)
- **Base de données** : `mentorship_platform`

#### **Étapes d'intégration avec MySQL via XAMPP** :
1. **Installation et configuration** :
   - Démarrez **XAMPP** et activez les services **Apache** et **MySQL**.
   - Ouvrez **phpMyAdmin** en accédant à `http://localhost/phpmyadmin/`.
   - Créez la base de données en exécutant le fichier SQL disponible dans le projet : `/sql/mentorship_platform.sql`.

2. **Connexion à la base de données** :
   - La connexion MySQL est définie dans le fichier `server.js` avec l'utilisateur `root` sans mot de passe, sur `localhost` avec le port `3306`.

3. **Gestion des utilisateurs** :
   - L'ajout d'utilisateurs à la base de données est maintenant possible via les formulaires d'inscription des mentors et mentorés.
   - Lorsqu'un utilisateur soumet le formulaire d'inscription, ses informations sont stockées dans les tables `Mentor` ou `Mentoree`.

### **Prochaines étapes :**

- **Fonction de recherche pour les mentorés** : Les mentorés pourront rechercher des mentors en fonction de leur domaine d'expertise.
- **Envoyer des demandes** : Les mentorés pourront envoyer des demandes de sessions aux mentors.
- **Accepter des demandes** : Les mentors pourront accepter ou refuser ces demandes.
- **Création d'une session mentor-mentoré** : Un mentor et un mentoré pourront planifier et gérer leurs sessions directement depuis le tableau de bord.

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

4. **Installer express-session** :
   ```bash
   npm install express-session
   ```

5. **Configurer la base de données MySQL** :
   - Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine via XAMPP.
   - Utilisez le fichier SQL fourni (`/mentorship_platform.sql`) pour créer les tables nécessaires.
   - Mettez à jour le fichier `server.js` avec vos informations d'identification MySQL (utilisateur `root`, pas de mot de passe, port `3306`).

6. **Exécuter l'application** :
   ```bash
   node server.js
   ```

7. **Ouvrir l'application dans votre navigateur** :
   Accédez à `http://localhost:4000`.

## À faire

- [x] Finaliser l'intégration de la base de données MySQL
- [x] Implémenter le chargement dynamique des données des mentors et sessions
- [x] Ajouter une sélection dans la page de connexion pour choisir entre mentor et mentoré
- [x] Modifier le tableau de bord pour afficher le nom de l'utilisateur connecté
- [ ] Fonction de recherche pour les mentorés
- [ ] Envoi de demandes pour les mentorés
- [ ] Acceptation des demandes pour les mentors
- [ ] Ajouter la fonctionnalité de traitement des paiements
- [ ] Planifier et gérer des sessions entre mentors et mentorés
- [ ] Améliorer l'interface utilisateur du tableau de bord

## Contribution

Si vous souhaitez contribuer à ce projet, merci de soumettre une pull request avec une description des modifications effectuées. Les retours et suggestions sont également les bienvenus !

## Licence

Daniela
 
 