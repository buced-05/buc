# Script de déploiement PowerShell pour Windows/VPS
# Usage: .\deploy.ps1

$ErrorActionPreference = "Stop"

Write-Host "=== Déploiement du site Bureau des Clubs éducatifs ===" -ForegroundColor Green

# Vérifier qu'on est dans un dépôt Git
if (-not (Test-Path .git)) {
    Write-Host "Erreur: Ce n'est pas un dépôt Git" -ForegroundColor Red
    exit 1
}

# Définir la branche (par défaut main)
$BRANCH = if ($args[0]) { $args[0] } else { "main" }

Write-Host "Vérification de l'état du dépôt..." -ForegroundColor Yellow

# Vérifier s'il y a des modifications non commitées
$status = git status --porcelain
if ($status) {
    Write-Host "Des modifications locales détectées. Sauvegarde..." -ForegroundColor Yellow
    # Créer un backup des modifications
    $backupDir = "backup_$(Get-Date -Format 'yyyyMMdd_HHmmss')"
    New-Item -ItemType Directory -Path "..\$backupDir" -Force | Out-Null
    git diff > "..\$backupDir\changes.patch"
    Write-Host "Backup créé dans ..\$backupDir\" -ForegroundColor Green
    
    # Stash les modifications locales
    $stashMessage = "Auto-stash avant déploiement $(Get-Date -Format 'yyyy-MM-dd_HH:mm:ss')"
    git stash push -m $stashMessage
    Write-Host "Modifications locales sauvegardées (stash)" -ForegroundColor Green
}

# Récupérer les dernières modifications
Write-Host "Récupération des dernières modifications depuis GitHub..." -ForegroundColor Yellow
git fetch origin

# Vérifier si on est en retard
$local = git rev-parse HEAD
$remote = git rev-parse "origin/$BRANCH"

if ($local -eq $remote) {
    Write-Host "Le dépôt est déjà à jour." -ForegroundColor Green
} else {
    Write-Host "Mise à jour en cours..." -ForegroundColor Yellow
    
    # Essayer un merge fast-forward d'abord
    $ancestor = git merge-base HEAD "origin/$BRANCH"
    if ($ancestor -eq $local) {
        # Fast-forward possible
        git merge --ff-only "origin/$BRANCH"
        Write-Host "Mise à jour effectuée (fast-forward)" -ForegroundColor Green
    } else {
        # Pas de fast-forward possible, reset hard pour éviter les conflits
        Write-Host "Pas de fast-forward possible. Reset vers origin/$BRANCH..." -ForegroundColor Yellow
        git reset --hard "origin/$BRANCH"
        Write-Host "Mise à jour effectuée (reset hard)" -ForegroundColor Green
    }
}

Write-Host "=== Déploiement terminé avec succès ===" -ForegroundColor Green
Write-Host "Le site est maintenant à jour avec la version GitHub." -ForegroundColor Green

# Afficher le dernier commit
Write-Host "`nDernier commit:" -ForegroundColor Yellow
git log -1 --oneline

