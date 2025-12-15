# Guide de Déploiement

Ce guide explique comment déployer le site sur le VPS sans conflits Git.

## 🚀 Déploiement Automatique

### Sur Linux/VPS (Bash)

1. **Rendre le script exécutable** (première fois seulement) :
```bash
chmod +x deploy.sh
```

2. **Exécuter le script de déploiement** :
```bash
./deploy.sh
```

Ou pour une branche spécifique :
```bash
./deploy.sh main
```

### Sur Windows (PowerShell)

Exécutez simplement :
```powershell
.\deploy.ps1
```

## 📋 Ce que fait le script

Le script de déploiement :

1. ✅ **Vérifie l'état du dépôt** - S'assure qu'on est dans un dépôt Git
2. ✅ **Sauvegarde les modifications locales** - Crée un backup automatique si nécessaire
3. ✅ **Récupère les dernières modifications** - Fait un `git fetch origin`
4. ✅ **Met à jour sans conflits** - Utilise `git reset --hard` pour éviter les conflits
5. ✅ **Affiche le statut** - Montre le dernier commit déployé

## 🔧 Configuration sur le VPS

### Première configuration

1. **Cloner le dépôt** (si pas déjà fait) :
```bash
cd /var/www
git clone https://github.com/buced-05/buc.git
cd buc
```

2. **Configurer Git pour éviter les problèmes de propriété** :
```bash
git config --global --add safe.directory /var/www/buc
```

3. **Rendre le script exécutable** :
```bash
chmod +x deploy.sh
```

### Déploiement régulier

À chaque fois que vous voulez mettre à jour le site :

```bash
cd /var/www/buc
./deploy.sh
```

## 🔄 Workflow recommandé

1. **Développement local** : Faire vos modifications et commits
2. **Push sur GitHub** : `git push origin main`
3. **Déploiement sur VPS** : Se connecter au VPS et exécuter `./deploy.sh`

## ⚠️ Important

- Le script utilise `git reset --hard` pour éviter les conflits
- **Toutes les modifications locales non commitées seront écrasées**
- Les modifications sont sauvegardées dans un dossier `backup_*` avant d'être écrasées
- Le script ne modifie jamais les fichiers sur GitHub, seulement sur le VPS

## 🛠️ Dépannage

### Erreur "dubious ownership"

Si vous obtenez cette erreur :
```
fatal: detected dubious ownership in repository
```

Exécutez :
```bash
git config --global --add safe.directory /var/www/buc
```

### Erreur de permissions

Si le script n'est pas exécutable :
```bash
chmod +x deploy.sh
```

### Vérifier l'état du dépôt

Pour voir l'état actuel :
```bash
git status
git log --oneline -5
```

## 📝 Notes

- Le script est conçu pour un déploiement unidirectionnel (GitHub → VPS)
- Ne jamais faire de commits directement sur le VPS
- Toujours développer localement et pousser sur GitHub
- Le script gère automatiquement les conflits en privilégiant la version GitHub

