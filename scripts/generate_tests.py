import json
import os

# PROMPT: implementer un script python qui utilise smoke_tests_amazon_fr.json pour ecrire des tests Cypress 
# en Gherkin avec les POM correspondants de chaque ligne, puis lance les tests cypress en ligne de commande 
# et fait un reporting sur Power BI

# Chemin vers le fichier JSON des tests
json_file = 'smoke_tests_amazon_fr.json'

# Chemin du dossier où les tests seront générés
tests_dir = 'cypress/integration/tests/smoke_tests/'
pages_dir = 'cypress/pages/'

# Charger les tests à partir du fichier JSON
with open(json_file, 'r') as file:
    smoke_tests = json.load(file)['smoke_tests']

# Vérifier que les répertoires existent sinon les créer
os.makedirs(tests_dir, exist_ok=True)
os.makedirs(pages_dir, exist_ok=True)

# Fonction pour créer les POM (Page Object Model) correspondants
def create_pom(page_name, elements):
    pom_content = f"""
class {page_name} {{
    constructor() {{
"""
    for element in elements:
        pom_content += f"        this.{element['name']} = '{element['selector']}';\n"

    pom_content += "    }\n}\n\n"
    pom_content += f"export default {page_name};\n"

    return pom_content

# Générer les fichiers de test Cypress
for test in smoke_tests:
    test_file_name = f"{tests_dir}test_{test['test_case_id']}.feature"
    page_name = f"Page{test['test_case_id']}"
    elements = [
        {"name": "homepage", "selector": "body"},  # Exemple d'élément
        {"name": "search_bar", "selector": "#twotabsearchtextbox"},
        {"name": "search_button", "selector": "#nav-search-submit-button"}
    ]  # Ceci devrait être adapté à chaque test
    
    # Générer le contenu du test
    test_content = f"""Feature: {test['name']}

    Scenario: {test['name']}
    Given I open Amazon page
    {''.join([f"    And I {step.lower()}\\n" for step in test['steps']])}
    Then {test['expected_result']}
"""

    # Écrire le test dans un fichier .feature
    with open(test_file_name, 'w') as test_file:
        test_file.write(test_content)

    # Générer le POM correspondant
    pom_content = create_pom(page_name, elements)
    pom_file_name = f"{pages_dir}{page_name}.js"
    with open(pom_file_name, 'w') as pom_file:
        pom_file.write(pom_content)

# Après génération, lancer les tests Cypress (sans reporting Mochawesome)
# os.system("npx cypress run --spec 'cypress/integration/tests/smoke_tests/*.feature' --reporter json > results/test_results.json")

# Après génération, lancer les tests Cypress avec le reporter Mochawesome
result = subprocess.run(["npx", "cypress", "run", "--spec", "cypress/integration/tests/smoke_tests/*.feature"], capture_output=True, text=True)

# Vérifier l'exécution et afficher les résultats
if result.returncode == 0:
    print("Tests exécutés avec succès.")
else:
    print("Échec des tests. Voir les détails ci-dessous.")
    print(result.stderr)

# Générer le rapport HTML avec Mochawesome-merge et Mochawesome-report-generator
os.system("npx mochawesome-merge cypress/results/mochawesome/*.json > cypress/results/mochawesome/report.json")
os.system("npx mochawesome-report-generator cypress/results/mochawesome/report.json -o cypress/results/mochawesome-report")

# Charger les résultats pour reporting Power BI
with open('results/test_results.json', 'r') as result_file:
    test_results = json.load(result_file)

# Vous pouvez maintenant transformer ces résultats en un DataFrame pour Power BI
import pandas as pd

df = pd.json_normalize(test_results['tests'])

# Sauvegarder les résultats au format CSV pour import dans Power BI
df.to_csv('results/test_results.csv', index=False)



# Importer le fichier CSV (results/test_results.csv) dans Power BI.

# Pour importer un fichier CSV (comme `results/test_results.csv`) dans Power BI, suivez les étapes ci-dessous :

# ### Étape 1 : Ouvrir Power BI Desktop
# 1. **Lancer Power BI Desktop** sur votre ordinateur.

# ### Étape 2 : Importer le fichier CSV
# 1. **Cliquer sur le bouton "Obtenir les données"** dans le ruban supérieur, puis sélectionnez **"Texte/CSV"**.

# 2. **Parcourir pour sélectionner le fichier** :
#    - Dans la fenêtre qui s’ouvre, naviguez jusqu’à l’emplacement de votre fichier `results/test_results.csv`.
#    - Sélectionnez le fichier, puis cliquez sur **Ouvrir**.

# 3. **Aperçu des données** :
#    - Power BI va charger un aperçu des données contenues dans le fichier CSV. Vous verrez un aperçu des colonnes et des premières lignes de votre fichier.
#    - Cliquez sur **Charger** pour importer directement les données, ou sur **Transformer les données** si vous souhaitez faire des ajustements avant de charger (comme changer les types de colonnes ou filtrer les lignes).

# ### Étape 3 : Travailler avec les données dans Power BI
# 1. **Naviguer dans les données importées** :
#    - Une fois les données chargées, vous les verrez dans le panneau **Champs** à droite. Elles sont prêtes à être utilisées pour créer des visualisations.

# 2. **Créer des visualisations** :
#    - Faites glisser les champs des données sur la zone de rapport pour créer des graphiques, tableaux, cartes, etc.
#    - Par exemple, vous pouvez créer un graphique à barres pour montrer le taux de réussite des tests, ou un tableau croisé dynamique pour analyser les erreurs par scénario de test.

# ### Étape 4 : Enregistrer et publier le rapport
# 1. **Enregistrer le rapport** :
#    - Cliquez sur **Fichier > Enregistrer sous** pour enregistrer votre travail en local.

# 2. **Publier sur Power BI Service** :
#    - Pour partager le rapport avec d'autres ou accéder à distance, cliquez sur **Fichier > Publier > Publier sur Power BI**.
#    - Sélectionnez votre espace de travail et suivez les instructions pour publier.

# ### Étape 5 : Automatiser les mises à jour (facultatif)
# - Si vous avez automatisé la génération du fichier CSV (via un script ou un pipeline CI/CD), vous pouvez configurer Power BI pour actualiser les données à intervalles réguliers.
# - Cela se fait sur Power BI Service, sous les **Paramètres d'actualisation** de l'ensemble de données.

# ### Conclusion
# Une fois le fichier CSV importé, vous pourrez analyser vos résultats de tests de manière approfondie grâce aux puissantes fonctionnalités de visualisation de Power BI. Vous pouvez également publier et partager vos rapports, offrant ainsi une visibilité sur les performances des tests à l'échelle de l'organisation.
