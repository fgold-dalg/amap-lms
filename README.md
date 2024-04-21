# 1. Installation
Télécharger ou cloner le projet puis installer les `packages` nmp via la commande :
```
npm install
```
Créer la base de données Postgresql via le fichier `amap-lms-db.sql`

# 2. Configuration
Configurer le serveur base de données via le fichier `config.js`.

La commande suivante permet de ne plus traquer le ficher par git :
```
git update-index --skip-worktree config.js
pour annuler
git update-index --no-skip-worktree config.js
```

# 3. Lancer le serveur local
```
node app.js
```

# 4. Optionnel sous linux (ici ubuntu)
## 4.1 Création du service amap-lms pour un lancement via systemd
```
sudo vim /lib/systemd/system/amap_lms.service

	[Unit]
	Description=Appli de gestion AMAP La Marmite Sauvage
	After=network.target

	[Service]
	Environment=NODE_PORT=3000
	Type=simple
	User=utilisateur_linux
	ExecStart=/usr/bin/node /home/fgold-dalg/projet/amap-lms/app.js
	Restart=on-failure

	[Install]
	WantedBy=multi-user.target
```
 Prise en compte du nouveau service par le systeme
```
sudo systemctl daemon-reload
```

## 4.2 Alias pour executer plus vite les lancement, arrêt et statut du service créé
```
.bash_aliases

	alias -p lms="sudo systemctl start amap_lms.service"
	alias -p lms-i="sudo systemctl status amap_lms.service"
	alias -p lms-s="sudo systemctl stop amap_lms.service"
	alias -p lms-r="sudo systemctl restart amap_lms.service"
```

## 4.3 Création d'un alias dans le dns local
```
vim /etc/hosts

	127.0.0.1	localhost	lms	amap-lms
```
