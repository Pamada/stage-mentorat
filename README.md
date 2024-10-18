### README Update

# MentorMTL - Plateforme de mentorat

MentorMTL est une plateforme de mentorat conçue pour connecter les mentors et les mentorés. La plateforme offre un tableau de bord permettant aux utilisateurs de gérer leurs sessions, d'envoyer des messages, de suivre leurs progrès et de gérer les paiements. Le développement de cette plateforme se concentre sur la mise en relation des mentorés avec des mentors dans différents domaines, tels que le coaching de carrière, le coaching de vie et l'équilibre travail-vie personnelle.

## Aperçu du projet

Le projet est développé en utilisant les technologies suivantes :
- **Node.js** avec **Express** pour la logique côté serveur
- **MySQL** pour la gestion de base de données
- **Bootstrap 5.3.3** pour un design responsive
- **JavaScript**, **HTML** et **CSS** pour la conception et l'interactivité côté front-end

## Modifications récentes

### **Intégration d'une nouvelle table `Users`**

La base de données a été mise à jour pour supprimer les tables séparées `Mentor` et `Mentoree`. Ces deux entités sont désormais intégrées dans une table unique `Users`. Un champ **userType** a été ajouté pour distinguer les mentors des mentorés.

Cela a impacté les logiques suivantes :
1. **Recherche** : La recherche se fait maintenant dans la table `Users`, en filtrant les résultats en fonction du `userType` (mentor ou mentoré).
2. **Messagerie** : Les messages entre utilisateurs (qu'ils soient mentors ou mentorés) sont maintenant basés sur l'ID des utilisateurs dans la table `Users`.
3. **Contacts** : La logique de gestion des contacts a également été ajustée pour prendre en compte cette nouvelle table unifiée.

### **Changements dans la logique de recherche**

La recherche a été modifiée pour interroger la table `Users` en fonction du type d'utilisateur. Les résultats de recherche excluent l'utilisateur actuellement connecté et affichent des boutons d'action spécifiques selon les résultats :
- **Mentor vers mentor ou mentoré vers mentoré** : Ajout du bouton `Ajouter comme ami`.
- **Mentoré vers mentor** : Boutons `Demander un mentorat` et `Ajouter comme ami`.
- **Mentor vers mentoré** : Boutons `Proposer un mentorat` et `Ajouter comme ami`.

Un message s'affiche si aucun utilisateur correspondant n'est trouvé.

### **Mise à jour de la logique de la messagerie**

La logique de messagerie a été refactorisée pour intégrer la table `Users`. Chaque utilisateur a désormais un identifiant unique dans cette table, ce qui simplifie l'envoi et la réception de messages. Un onglet pour les messages envoyés a également été ajouté, permettant aux utilisateurs de voir leurs messages envoyés.

Les messages sont récupérés et affichés en fonction de l'ID de l'utilisateur connecté, avec un système de popup pour lire les messages.

### **Nouveaux modules et dépendances**

Un nouveau module a été ajouté pour la gestion des sessions :
- **express-session** : pour la gestion des sessions utilisateurs lors de la connexion.

Installez ce module via :
```bash
npm install express-session
```

## Instructions d'installation

1. **Cloner le dépôt** :
   ```bash
   git clone https://github.com/pamada/stage-mentorat.git
   cd mentormtl
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   npm install express-session
   ```

3. **Configurer la base de données MySQL** :
   - Créez la base de données avec le fichier SQL mis à jour (`mentorship_platform.sql`) qui contient la table `Users` et les relations nécessaires.

4. **Exécuter l'application** :
   ```bash
   node server.js
   ```

5. **Ouvrir l'application dans votre navigateur** :
   Accédez à `http://localhost:4000`.

## Fonctionnalités

- **Inscription** : Inscription en tant que mentor ou mentoré via un formulaire.
- **Connexion** : Connexion avec une gestion de sessions.
- **Tableau de bord** : Accès à des fonctionnalités comme la recherche, la messagerie, et la gestion des contacts.
- **Recherche** : Trouver des mentors ou mentorés en fonction de critères spécifiques.
- **Messagerie** : Envoyer et recevoir des messages entre utilisateurs.
- **Gestion des contacts** : Ajout de contacts après acceptation d'une demande d'ami ou de mentorat.

## À faire

- [x] Unifier les tables `Mentor` et `Mentoree` dans une table `Users`.
- [x] Mettre à jour la logique de recherche et de messagerie.
- [ ] Ajouter une fonctionnalité de création de session entre mentor et mentoré.
- [ ] Finaliser la gestion des paiements.

## Contribution

Si vous souhaitez contribuer à ce projet, soumettez une pull request avec une description des modifications effectuées.
## Licence

Projet développé par Daniela.