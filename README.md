# Bot bbcollab
Bot bbcollab pour se connecter au visios conférences sans se réveiller !

## Comment ça marche ?

Bbcollab ne disposant pas d'API permettant directement de se connecter, le bot utilise Selenium, une librarie. Pour chaque nom mis dans le fichier de configuration, le bot va ouvrir un nouveau navigateur, se rendre sur l'adresse spécifiée dans la configuration.

## Installer le bot

Pour installer le bot, ouvrez le terminal et tapez les commandes suivantes :

il faut télécharger le driver pour firefox : [ici](https://github.com/mozilla/geckodriver/releases) et l'ajouter dans votre PATH

* `git clone https://github.com/MatthieuLeboeuf/bbcollab-bot.git` - Téléchargement des fichiers
* `npm install --production` - Installation des dépendances du bot
* `node index.js` - Démarrage du bot

### Fichier de configuration

Pour que le bot fonctionne correctement, vous devez remplir le fichier de configuration. Copiez le fichier `config.sample.json` en un nouveau fichier `config.json`. Puis, éditez le avec les valeurs suivantes :

* `url`: l'adresse de connexion bbcollab
* `time`: l'heure à laquelle le bot doit se connecter
* `time_bypass`: bypass le temps et lancer le bot immédiatement
* `users`: tout les noms