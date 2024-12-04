function resolveRiddle() {
    const instructions = document.querySelector('pre').textContent.trim();

    if (!instructions) {
        alert("Aucune instruction trouvée!");
        return;
    }

    // --- Part 1 - Seulement Santa ---
    // Initialise la position de départ de Santa (x=0, y=0)
    let x = 0;
    let y = 0;

    // Créé un ensemble (Set) pour enregistrer les maisons visitées.
    // Chaque maison est identifiée par ses coordonnées "x,y" en string.
    const visitedSingle = new Set();

    // Ajoute la maison de départ, comme Santa y livre un premier cadeau
    visitedSingle.add(`${x},${y}`);

    // Transforme la chaîne d'instructions en tableau de caractères & Parcourt chaque direction
    instructions.split('').forEach(direction => {
        // En fonction du caractère, modifie x ou y
        if (direction === '^') y++;   // Monte vers le nord
        else if (direction === 'v') y--;   // Descend vers le sud
        else if (direction === '>') x++;   // Va vers l'est
        else if (direction === '<') x--;   // Va vers l'ouest

        // Ajoute la nouvelle position au Set, ce qui enregistre la maison visitée
        visitedSingle.add(`${x},${y}`);
    });

    // --- Part 2 : Santa et Robo-Santa ---
    // Initialise la position de départ de Santa et Robo-Santa
    let santaX = 0;
    let santaY = 0;
    let roboX = 0;
    let roboY = 0;

    // Ensemble pour stocker les maisons visitées par Santa et Robo-Santa
    const visitedDouble = new Set();

    // Au départ, ils livrent deux cadeaux à la même maison
    visitedDouble.add(`0,0`);

    // On sépare les mouvements alternés entre Santa et Robo-Santa
    const chars = instructions.split('');
    for (let i = 0; i < chars.length; i++) {
        const direction = chars[i];

        // Déterminer qui bouge : Santa si i est pair, Robo-Santa si i est impair
        if (i % 2 === 0) {
            // Santa bouge
            if (direction === '^') santaY++; // Monte vers le nord
            else if (direction === 'v') santaY--; // Descend vers le sud
            else if (direction === '>') santaX++; // Va vers l'est
            else if (direction === '<') santaX--; // Va vers l'ouest

            // Ajoute la nouvelle position au Set, ce qui enregistre la maison visitée
            visitedDouble.add(`${santaX},${santaY}`);
        } else {
            // Robo-Santa bouge
            if (direction === '^') roboY++; // Monte vers le nord
            else if (direction === 'v') roboY--; // Descend vers le sud
            else if (direction === '>') roboX++; // Va vers l'est
            else if (direction === '<') roboX--; // Va vers l'ouest

            // Ajoute la nouvelle position au Set, ce qui enregistre la maison visitée
            visitedDouble.add(`${roboX},${roboY}`);
        }
    }

    // Le nombre de maisons ayant reçu au moins un cadeau est le nombre d'éléments uniques dans le Set
    alert(`Maisons qui reçoivent au moins 1 cadeau (Santa seul) : ${visitedSingle.size}`);
    alert(`Maisons qui reçoivent au moins 1 cadeau (Santa + Robo-Santa): ${visitedDouble.size}`);

}