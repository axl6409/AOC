function resolveRiddle() {
  // Charger le contenu de l'élément <pre> dans le DOM
  const content = document.querySelector('pre').innerText;

  // Si le contenu est vide, afficher une alerte et arrêter l'exécution
  if (!content) {
    alert("Aucun contenu trouvée!");
    return;
  }

  // Fonction pour vérifier si une séquence est valide
  function isValidSequence(sequence) {
    // Convertir la séquence en un tableau de nombres
    const nums = sequence.split(' ').map(Number);

    // Calculer les différences entre chaque paire de nombres consécutifs
    const differences = nums.slice(1).map((num, i) => num - nums[i]);

    // Vérifier si toutes les différences sont strictement positives et <= 3 (séquence croissante)
    const allIncreasing = differences.every(diff => diff > 0 && diff <= 3);
    // Vérifier si toutes les différences sont strictement négatives et >= -3 (séquence décroissante)
    const allDecreasing = differences.every(diff => diff < 0 && diff >= -3);

    // La séquence est valide si elle est entièrement croissante ou décroissante
    return allIncreasing || allDecreasing;
  }

  // Fonction pour vérifier si une séquence peut devenir valide en retirant un élément
  function canBeMadeValidByRemovingOne(sequence) {
    // Convertir la séquence en un tableau de nombres
    const nums = sequence.split(' ').map(Number);

    // Tester chaque niveau de la séquence en le retirant
    for (let i = 0; i < nums.length; i++) {
      // Créer une nouvelle séquence en retirant l'élément à l'index `i`
      const testSequence = nums.filter((_, index) => index !== i);
      // Calculer les différences entre chaque paire de nombres consécutifs dans la nouvelle séquence
      const differences = testSequence.slice(1).map((num, j) => num - testSequence[j]);
      // Vérifier si la nouvelle séquence est croissante
      const allIncreasing = differences.every(diff => diff > 0 && diff <= 3);
      // Vérifier si la nouvelle séquence est décroissante
      const allDecreasing = differences.every(diff => diff < 0 && diff >= -3);

      // Si la nouvelle séquence est valide, retourner true
      if (allIncreasing || allDecreasing) {
        return true;
      }
    }

    // Retourner false si aucune suppression ne rend la séquence valide
    return false;
  }

  // Filtrer les lignes du contenu pour ne conserver que les séquences valides
  const filteredLines = content
    .trim() // Supprimer les espaces en début et fin de chaîne
    .split('\n') // Diviser le contenu par lignes
    .filter(line => /^(\d+\s?)+$/.test(line)) // Filtrer les lignes qui contiennent uniquement des chiffres et des espaces
    .map(line => ({
      sequence: line, // La séquence en tant que chaîne
      isValid: isValidSequence(line), // Indiquer si la séquence est valide
      canBeFixed: false // Initialiser "canBeFixed" à faux
    }));

  // Afficher les lignes filtrées dans la console (pour déboguer)
  console.log(filteredLines);

  // Filtrer les lignes valides
  const validLines = filteredLines.filter(item => item.isValid);

  // Nombre de séquences valides initialement
  const validCount1 = validLines.length;

  // Afficher le nombre de séquences valides dans la console (pour déboguer)
  console.log(validCount1);

  // Marquer les séquences qui peuvent devenir valides en retirant un seul élément
  filteredLines.forEach(item => {
    if (!item.isValid) {
      item.canBeFixed = canBeMadeValidByRemovingOne(item.sequence);
    }
  });

  // Calculer le nombre de séquences qui sont valides ou qui peuvent être rendues valides
  const validCount2 = filteredLines.filter(item => item.isValid || item.canBeFixed).length;

  // Afficher le nombre de séquences valides et valides/modifiables dans une alerte
  alert(`Nombre de séquences valides : ${validCount1}\nNombre de séquences valides ou modifiables : ${validCount2}`);
}