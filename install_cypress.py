import subprocess

def install_cypress():
    # Installation de Cypress via npm
    try:
        print("Installation de la dernière version de Cypress...")
        subprocess.run(["npm", "install", "cypress", "--save-dev"], check=True)
        print("Cypress installé avec succès.")
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de l'installation de Cypress: {e}")
        return

def verify_cypress_installation():
    # Vérification de l'installation de Cypress
    try:
        print("Vérification de l'installation de Cypress...")
        result = subprocess.run(["npx", "cypress", "version"], check=True, capture_output=True, text=True)
        print("Cypress est installé. Version détectée :")
        print(result.stdout)
    except subprocess.CalledProcessError as e:
        print(f"Erreur lors de la vérification de l'installation de Cypress: {e}")

if __name__ == "__main__":
    install_cypress()
    verify_cypress_installation()
