function countXMas(input, gridWidth) {
  // Étape 1 : Transformer l'entrée en grille 2D
  const grid = [];
  for (let i = 0; i < input.length; i += gridWidth) {
    grid.push(input.slice(i, i + gridWidth).split("")); // Divise en lignes
  }

  // Étape 2 : Initialiser les dimensions
  const rows = grid.length; // Nombre de lignes
  const cols = grid[0].length; // Nombre de colonnes
  let count = 0; // Compteur pour les motifs X-MAS

  // Étape 3 : Parcourir chaque position de la grille
  for (let r = 0; r < rows - 2; r++) { // On s'arrête 2 lignes avant la fin (X = 3 lignes)
    for (let c = 0; c < cols - 2; c++) { // On s'arrête 2 colonnes avant la fin (X = 3 colonnes)

      // Vérifier le motif "M.S / A / M.S" (Left - Right)
      // M . S
      // . A .
      // M . S
      if (
        grid[r][c] === "M" &&
        grid[r][c + 2] === "S" &&
        grid[r + 1][c + 1] === "A" &&
        grid[r + 2][c] === "M" &&
        grid[r + 2][c + 2] === "S"
      ) {
        count++;
      }

      // Vérifier le motif "S.M / A / S.M" (Right - Left)
      // S . M
      // . A .
      // S . M
      if (
        grid[r][c] === "S" &&
        grid[r][c + 2] === "M" &&
        grid[r + 1][c + 1] === "A" &&
        grid[r + 2][c] === "S" &&
        grid[r + 2][c + 2] === "M"
      ) {
        count++;
      }

      // Vérifier le motif "S.S / A / M.M" (Bottom - Top)
      // S . S
      // . A .
      // M . M
      if (
        grid[r][c] === "S" &&
        grid[r][c + 2] === "S" &&
        grid[r + 1][c + 1] === "A" &&
        grid[r + 2][c] === "M" &&
        grid[r + 2][c + 2] === "M"
      ) {
        count++;
      }

      // Vérifier le motif "M.M / A / S.S" (Top - Bottom)
      // M . M
      // . A .
      // S . S
      if (
        grid[r][c] === "M" &&
        grid[r][c + 2] === "M" &&
        grid[r + 1][c + 1] === "A" &&
        grid[r + 2][c] === "S" &&
        grid[r + 2][c + 2] === "S"
      ) {
        count++;
      }
    }
  }

  // Retourner le nombre total de X-MAS
  return count;
}

function resolveRiddle() {
  const container = document.querySelector('pre');
  const content = container.innerText;
  // Exemple d'input sous forme de chaîne unique
  const input = content.replace(/\s+/g, "");

  // Largeur de la grille (par exemple, 120 caractères par ligne)
  const gridWidth = 140;

  // Appel de la fonction pour compter les motifs X-MAS
  const result = countXMas(input, gridWidth);

  // Affichage du résultat
  alert(`Nombre total d'occurrences de X-MAS 2 : ${result}`);
}