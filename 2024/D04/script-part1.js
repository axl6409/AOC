function countXmas(input, word, gridWidth) {
  // Étape 1 : Transformer la chaîne d'entrée en une grille 2D
  const grid = [];
  for (let i = 0; i < input.length; i += gridWidth) {
    grid.push(input.slice(i, i + gridWidth).split("")); // Divise l'entrée en lignes de 'gridWidth' caractères
  }

  // Étape 2 : Initialiser les dimensions et les directions
  const rows = grid.length; // Nombre de lignes dans la grille
  const cols = grid[0].length; // Nombre de colonnes dans la grille
  const wordLength = word.length; // Longueur du mot à chercher
  let count = 0; // Compteur pour les occurrences de "XMAS"

  // Directions possibles : [incrément pour les lignes, incrément pour les colonnes]
  const directions = [
    [0, 1],  // Droite
    [0, -1], // Gauche
    [1, 0],  // Bas
    [-1, 0], // Haut
    [1, 1],  // Diagonale bas-droite
    [1, -1], // Diagonale bas-gauche
    [-1, 1], // Diagonale haut-droite
    [-1, -1] // Diagonale haut-gauche
  ];

  // Étape 3 : Parcourir la grille pour chercher le mot
  for (let r = 0; r < rows; r++) { // Boucle sur les lignes
    for (let c = 0; c < cols; c++) { // Boucle sur les colonnes
      for (const [dr, dc] of directions) { // Boucle sur les directions
        let found = true; // On suppose qu'on a trouvé le mot

        // Vérifier chaque caractère du mot dans cette direction
        for (let i = 0; i < wordLength; i++) {
          const nr = r + dr * i; // Nouvelle ligne
          const nc = c + dc * i; // Nouvelle colonne

          // Si on dépasse les limites de la grille ou si les caractères ne correspondent pas
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr][nc] !== word[i]) {
            found = false; // Mot non trouvé
            break; // Quitter la vérification pour cette direction
          }
        }

        // Si le mot est trouvé, incrémenter le compteur
        if (found) count++;
      }
    }
  }

  // Retourner le nombre total d'occurrences
  return count;
}

const container = document.querySelector('pre');
const content = container.innerText;
// Exemple d'input sous forme de chaîne unique
const input = content.replace(/\s+/g, "");

// Largeur de la grille (par exemple, 120 caractères par ligne)
const gridWidth = 140;

// Mot à rechercher
const word = "XMAS";

// Appel de la fonction
const result = countXmas(input, word, gridWidth);

// Affichage du résultat
console.log(`Nombre total d'occurrences de '${word}' : ${result}`);
