function resolveRiddle() {
    const instructions = document.querySelector('pre').textContent;
    if (!instructions) {
        alert("Aucune instruction trouvée!");
        return;
    }

    let wrappingPapper = 0;
    let ribbon = 0;
    const lines = instructions.split('\n'); // Récupérer les lignes

    // Boucler sur chaque ligne
    for (let i = 0; i < lines.length; i++) {
        const char = lines[i]; // Récupère la ligne actuelle
        const numbers = char.split('x').map(Number); // Diviser la ligne en nombres et les convertir en nombres
        const [l, w, h] = numbers;
        // Calculer le produit des nombres
        let papperResult = 2*l*w + 2*w*h + 2*h*l;
        const smallestSide = Math.min(l*w, w*h, h*l);
        wrappingPapper += papperResult + smallestSide; // Ajouter le produit au total

        const sides = [l, w, h].sort((a, b) => a - b); // Trier les nombres par ordre croissant
        const ribonWrap = 2 * sides[0] + 2 * sides[1]; // Calculer le produit des deux plus petits nombres
        let ribonBow = l*w*h;
        ribbon += ribonWrap + ribonBow; // Ajouter le produit au total
    }

    // Afficher le total
    alert(`Pieds Carré du papier : ${wrappingPapper}`);
    alert(`Pieds du ruban : ${ribbon}`);
}