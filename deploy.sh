#!/bin/bash

# Script de déploiement pour VPS - Évite les conflits Git
# Usage: ./deploy.sh

set -e  # Arrêter en cas d'erreur

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Déploiement du site Bureau des Clubs éducatifs ===${NC}"

# Vérifier qu'on est dans un dépôt Git
if [ ! -d .git ]; then
    echo -e "${RED}Erreur: Ce n'est pas un dépôt Git${NC}"
    exit 1
fi

# Définir la branche (par défaut main)
BRANCH=${1:-main}

echo -e "${YELLOW}Vérification de l'état du dépôt...${NC}"

# Vérifier s'il y a des modifications non commitées
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Des modifications locales détectées. Sauvegarde...${NC}"
    # Créer un backup des modifications
    BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
    mkdir -p "../$BACKUP_DIR"
    git diff > "../$BACKUP_DIR/changes.patch"
    echo -e "${GREEN}Backup créé dans ../$BACKUP_DIR/${NC}"
    
    # Stash les modifications locales
    git stash push -m "Auto-stash avant déploiement $(date +%Y-%m-%d_%H:%M:%S)"
    echo -e "${GREEN}Modifications locales sauvegardées (stash)${NC}"
fi

# Récupérer les dernières modifications
echo -e "${YELLOW}Récupération des dernières modifications depuis GitHub...${NC}"
git fetch origin

# Vérifier si on est en retard
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/$BRANCH)

if [ "$LOCAL" = "$REMOTE" ]; then
    echo -e "${GREEN}Le dépôt est déjà à jour.${NC}"
else
    echo -e "${YELLOW}Mise à jour en cours...${NC}"
    
    # Essayer un merge fast-forward d'abord
    if git merge-base --is-ancestor HEAD origin/$BRANCH; then
        # Fast-forward possible
        git merge --ff-only origin/$BRANCH
        echo -e "${GREEN}Mise à jour effectuée (fast-forward)${NC}"
    else
        # Pas de fast-forward possible, reset hard pour éviter les conflits
        echo -e "${YELLOW}Pas de fast-forward possible. Reset vers origin/$BRANCH...${NC}"
        git reset --hard origin/$BRANCH
        echo -e "${GREEN}Mise à jour effectuée (reset hard)${NC}"
    fi
fi

# Nettoyer les fichiers non suivis (optionnel, commenté par défaut)
# echo -e "${YELLOW}Nettoyage des fichiers non suivis...${NC}"
# git clean -fd

echo -e "${GREEN}=== Déploiement terminé avec succès ===${NC}"
echo -e "${GREEN}Le site est maintenant à jour avec la version GitHub.${NC}"

# Afficher le dernier commit
echo -e "\n${YELLOW}Dernier commit:${NC}"
git log -1 --oneline

