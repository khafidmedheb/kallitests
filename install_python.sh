#!/bin/bash

# Définir l'URL de la dernière version de Python
PYTHON_URL="https://www.python.org/ftp/python/3.11.5/python-3.11.5-amd64.exe"

# Nom du fichier de l'installateur téléchargé
INSTALLER_FILE="python_installer.exe"

# Télécharger l'installateur de Python
echo "Téléchargement de la dernière version de Python..."
curl -L -o $INSTALLER_FILE $PYTHON_URL

if [ $? -ne 0 ]; then
    echo "Erreur lors du téléchargement de l'installateur Python."
    exit 1
fi

# Exécuter l'installateur en mode silencieux
echo "Installation de Python..."
./$INSTALLER_FILE /quiet InstallAllUsers=1 PrependPath=1 Include_test=0

if [ $? -ne 0 ]; then
    echo "Erreur lors de l'installation de Python."
    exit 1
fi

# Supprimer l'installateur après installation
rm $INSTALLER_FILE

# Vérification de l'installation de Python
echo "Vérification de l'installation de Python..."
python --version

if [ $? -ne 0 ]; then
    echo "Python n'est pas correctement installé."
    exit 1
else
    echo "Python est installé avec succès."
fi
