function resolveRiddle() {
  // Charger le contenu de l'élément <pre> dans le DOM
  const content = document.querySelector('pre').textContent;

  // Si le contenu est vide, afficher une alerte et arrêter l'exécution
  if (!content) {
    alert("Aucun contenu trouvé !");
    return;
  }

  // Normaliser les fins de ligne en remplaçant \r\n (Windows) par \n (Unix)
  const normalizedContent = content.replace(/\r\n/g, '\n');

  // Diviser le contenu en deux parties : les règles et les mises à jour
  const parts = normalizedContent.split("\n\n");

  // Assigner la première partie aux règles et la deuxième aux mises à jour
  const [rules, updates] = parts;

  // Afficher les règles et mises à jour pour débogage
  console.log("Partie 1 :", rules);
  console.log("Partie 2 :", updates);

  // Transformer les règles en une structure manipulable
  const rulesLines = rules
    .split("\n") // Diviser les règles en lignes
    .filter(line => line.trim() !== '') // Ignorer les lignes vides
    .map(line => { // Transformer chaque ligne de règle en un objet
      const [first, second] = line.split("|").map(num => parseInt(num.trim(), 10)); // Diviser et convertir les numéros
      return { first, second }; // Retourner un objet { first, second }
    });

  // Transformer les mises à jour en tableaux de nombres
  const updatesLines = updates
    .split("\n") // Diviser les mises à jour en lignes
    .filter(line => line.trim() !== '') // Ignorer les lignes vides
    .map(line => line.split(",").map(num => parseInt(num.trim(), 10))); // Diviser et convertir chaque ligne en tableau de nombres

  // Fonction pour vérifier si une mise à jour respecte les règles
  function isUpdateValid(update, rules) {
    for (let i = 0; i < update.length; i++) {
      const current = update[i]; // Récupérer le numéro courant dans la mise à jour

      // Filtrer les règles applicables uniquement aux numéros présents dans la mise à jour
      const applicableRules = rules.filter(rule => update.includes(rule.first) && update.includes(rule.second));

      // Vérifier si toutes les règles applicables sont respectées
      for (const rule of applicableRules) {
        const firstIndex = update.indexOf(rule.first); // Trouver l'index du premier numéro
        const secondIndex = update.indexOf(rule.second); // Trouver l'index du second numéro

        // Si le premier numéro apparaît après le second, la règle est violée
        if (firstIndex > secondIndex) {
          return false; // Retourner invalide
        }
      }
    }
    return true; // Toutes les règles sont respectées
  }

  // Initialiser la somme des pages centrales des mises à jour valides
  let middlePageSum = 0;

  // Parcourir chaque mise à jour pour vérifier sa validité
  updatesLines.forEach((update, index) => {
    if (isUpdateValid(update, rulesLines)) { // Vérifier si la mise à jour est valide
      console.log(`La ligne ${index + 1} est valide :`, update);

      // Trouver la page centrale de la mise à jour
      const middlePage = update[Math.floor(update.length / 2)];
      console.log(`Page centrale de la ligne ${index + 1} : ${middlePage}`);

      // Ajouter la page centrale à la somme
      middlePageSum += middlePage;
    } else {

      console.log(`La ligne ${index + 1} est invalide :`, update);
    }
  });

  // Afficher la somme des pages centrales des mises à jour valides
  alert(`Somme des pages centrales des mises à jour valides : ${middlePageSum}`);
}