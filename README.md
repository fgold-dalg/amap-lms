# 1. Installation
Télécharger ou cloner le projet puis installer les `packages` nmp via la commande :
```
npm install
```
Créer la base de données Postgresql via le fichier `amap-lms.sql`

# 2. Configuration
Configurer le serveur base de données via le fichier `config.js`.

La commande suivante permet de ne plus traquer le ficher par git :
```
git update-index --skip-worktree config.js
pour annuler
git update-index --no-skip-worktree config.js
```

# 3. Lancer le serveur local
node app.js
