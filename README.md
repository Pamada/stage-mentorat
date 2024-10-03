
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

Le développement du projet a progressé sur l'intégration de la base de données MySQL pour la persistance des données des utilisateurs, des mentors et des mentorés, ainsi que la gestion des sessions et des paiements. Voici les détails concernant l'intégration MySQL :

### **Intégration MySQL avec XAMPP sur localhost**

- **Hôte** : `localhost`
- **Utilisateur** : `root` (pas de mot de passe)
- **Port** : `3306` (port par défaut de MySQL)
- **Base de données** : `mentorship_platform`

#### **Étapes d'intégration avec MySQL via XAMPP** :
1. **Installation et configuration** :
   - Démarrez **XAMPP** et activez les services **Apache** et **MySQL**.
   - Ouvrez **phpMyAdmin** en accédant à `http://localhost/phpmyadmin/`.
   - Créez la base de données en exécutant le fichier SQL disponible dans le projet : `/sql/mentorship_platform.sql`. Cela créera les tables nécessaires (Mentor, Mentoré, Session, Demande, Paiement).
2. **Connexion à la base de données** :
   - La connexion MySQL est définie dans le fichier `server.js` avec l'utilisateur `root` sans mot de passe, sur `localhost` avec le port `3306`. Cela garantit une connexion locale à MySQL.
   - Les utilisateurs peuvent maintenant s'inscrire comme mentors ou mentorés, et ces données sont stockées dans la base de données.

3. **Gestion des utilisateurs** :
   - L'ajout d'utilisateurs à la base de données est maintenant possible via les formulaires d'inscription des mentors et mentorés.
   - Lorsqu'un utilisateur soumet le formulaire d'inscription, ses informations sont stockées dans les tables `Mentor` ou `Mentoree`, en fonction de son rôle choisi.

### **Prochaine étape : Validation des utilisateurs** :
- **Validation des utilisateurs** : La prochaine étape consiste à valider les utilisateurs lorsqu'ils tentent de se connecter à la plateforme. En fonction de leur rôle (mentor ou mentoré), ils seront redirigés vers leur tableau de bord respectif.
   - **Ajout d'une sélection sur la page de connexion** : La page de connexion doit permettre à l'utilisateur de choisir s'il se connecte en tant que mentor ou mentoré. Ce choix déterminera quelle table (Mentor ou Mentoree) sera utilisée pour valider les informations d'identification et rediriger l'utilisateur vers la bonne interface.
   - **Connexion sécurisée** : Chaque utilisateur (mentor ou mentoré) sera validé en fonction de son email et mot de passe ou via l'authentification Google.

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
   - Assurez-vous que MySQL est installé et en cours d'exécution sur votre machine via XAMPP.
   - Utilisez le fichier SQL fourni (`/mentorship_platform.sql`) pour créer les tables nécessaires.
   - Mettez à jour le fichier `server.js` avec vos informations d'identification MySQL (utilisateur `root`, pas de mot de passe, port `3306`).

5. **Exécuter l'application** :
   ```bash
   node server.js
   ```

6. **Ouvrir l'application dans votre navigateur** :
   Accédez à `http://localhost:4000`.

## À faire

- [x] Finaliser l'intégration de la base de données MySQL
- [x] Implémenter le chargement dynamique des données des mentors et sessions
- [ ] Ajouter une sélection dans la page de connexion pour choisir entre mentor et mentoré
- [ ] Ajouter la fonctionnalité de traitement des paiements
- [ ] Terminer le flux d'inscription et de connexion via Google
- [ ] Améliorer l'interface utilisateur du tableau de bord

## Contribution

Si vous souhaitez contribuer à ce projet, merci de soumettre une pull request avec une description des modifications effectuées. Les retours et suggestions sont également les bienvenus !

## Licence

Daniela