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

  // Transformer les règles en une structure manipulable (tableau d'objets)
  const rulesLines = rules
    .split("\n") // Diviser les règles par ligne
    .filter(line => line.trim() !== '') // Filtrer les lignes vides
    .map(line => {
      // Pour chaque ligne, extraire les numéros de pages
      const [first, second] = line.split("|").map(num => parseInt(num.trim(), 10));
      return { first, second }; // Retourner un objet contenant les pages à imprimer dans un certain ordre
    });

  // Transformer les mises à jour en tableaux de nombres
  const updatesLines = updates
    .split("\n") // Diviser les mises à jour par ligne
    .filter(line => line.trim() !== '') // Filtrer les lignes vides
    .map(line => line.split(",").map(num => parseInt(num.trim(), 10))); // Transformer chaque ligne en un tableau de nombres

  // Fonction pour vérifier si une mise à jour respecte les règles
  function isUpdateValid(update, rules) {
    // Filtrer uniquement les règles applicables (les deux pages sont présentes dans la mise à jour)
    const applicableRules = rules.filter(rule => update.includes(rule.first) && update.includes(rule.second));

    for (const rule of applicableRules) {
      // Trouver les positions des deux pages dans la mise à jour
      const firstIndex = update.indexOf(rule.first);
      const secondIndex = update.indexOf(rule.second);

      // Vérifier si la première page est bien avant la seconde
      if (firstIndex > secondIndex) {
        return false; // Si ce n'est pas le cas, la mise à jour est invalide
      }
    }
    return true; // Si toutes les règles sont respectées, la mise à jour est valide
  }

  // Fonction pour réorganiser une mise à jour invalide
  // Cette fonction utilisera un algorithme de tri topologique pour mettre les pages dans l'ordre approprié
  function reorderUpdate(update, rules) {
    // Construire un graphe de dépendances pour les pages
    const graph = new Map();
    const inDegree = new Map(); // Dégré d'entrée de chaque page

    // Initialiser le graphe et les degrés d'entrée pour chaque page de la mise à jour
    update.forEach(page => {
      graph.set(page, []); // Chaque page a un tableau de pages qui doivent la suivre
      inDegree.set(page, 0); // Chaque page a un dégré d'entrée initial de 0
    });

    // Ajouter les dépendances basées sur les règles de classement
    rules.forEach(rule => {
      const { first, second } = rule;
      if (update.includes(first) && update.includes(second)) {
        graph.get(first).push(second); // Ajouter 'second' comme dépendant de 'first'
        inDegree.set(second, inDegree.get(second) + 1); // Incrémenter le degré d'entrée de 'second'
      }
    });

    // Utiliser une file (queue) pour faire un tri topologique
    const queue = [];
    // Ajouter à la file toutes les pages qui n'ont pas de dépendances (dégré d'entrée = 0)
    inDegree.forEach((degree, page) => {
      if (degree === 0) {
        queue.push(page);
      }
    });

    const sortedUpdate = []; // Liste des pages triées
    // Traiter la file jusqu'à ce qu'elle soit vide
    while (queue.length > 0) {
      const currentPage = queue.shift(); // Récupérer la première page de la file
      sortedUpdate.push(currentPage); // Ajouter cette page au résultat trié

      // Pour chaque page qui doit suivre la page courante
      graph.get(currentPage).forEach(neighbor => {
        inDegree.set(neighbor, inDegree.get(neighbor) - 1); // Décrémenter le degré d'entrée de cette page
        if (inDegree.get(neighbor) === 0) {
          queue.push(neighbor); // Si son degré d'entrée est maintenant de 0, l'ajouter à la file
        }
      });
    }

    // Vérifier si toutes les pages ont été triées (sinon, il y a un problème de dépendances)
    if (sortedUpdate.length !== update.length) {
      throw new Error(`Impossible de réorganiser la mise à jour : ${update}`);
    }

    return sortedUpdate; // Retourner la mise à jour réorganisée correctement
  }

  // Initialiser les sommes des pages centrales pour les étapes 1 et 2
  let middlePageSum = 0; // Somme des pages centrales des mises à jour valides (étape 1)
  let reorderedMiddlePageSum = 0; // Somme des pages centrales des mises à jour réorganisées (étape 2)

  // Parcourir chaque mise à jour pour vérifier sa validité
  updatesLines.forEach((update, index) => {
    if (isUpdateValid(update, rulesLines)) {
      // Étape 1 : La mise à jour est valide
      console.log(`La ligne ${index + 1} est valide :`, update);
      const middlePage = update[Math.floor(update.length / 2)]; // Trouver la page centrale
      console.log(`Page centrale de la ligne ${index + 1} : ${middlePage}`);
      middlePageSum += middlePage; // Ajouter la page centrale à la somme
    } else {
      // Étape 2 : La mise à jour est invalide
      console.log(`La ligne ${index + 1} est invalide :`, update);
      const reorderedUpdate = reorderUpdate(update, rulesLines); // Réorganiser la mise à jour
      console.log(`Ligne réorganisée ${index + 1} :`, reorderedUpdate);
      const middlePage = reorderedUpdate[Math.floor(reorderedUpdate.length / 2)]; // Trouver la page centrale de la mise à jour réorganisée
      console.log(`Page centrale de la ligne réorganisée ${index + 1} : ${middlePage}`);
      reorderedMiddlePageSum += middlePage; // Ajouter la page centrale à la somme des pages réorganisées
    }
  });

  // Afficher les résultats des deux étapes
  alert(`Somme des pages centrales des mises à jour valides : ${middlePageSum}`);
  alert(`Somme des pages centrales des mises à jour réorganisées : ${reorderedMiddlePageSum}`);
}
