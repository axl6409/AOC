function resolveRiddle() {
    // Charger le contenu de l'élément <pre> dans le DOM
    const content = document.querySelector('pre').innerText;

    // Si le contenu est vide, afficher une alerte et arrêter l'exécution
    if (!content) {
        alert("Aucun contenu trouvée!");
        return;
    }

    // Diviser le contenu en utilisant les espaces comme séparateurs et supprimer les éléments vides
    const clean = content.split(/\s+/).filter(item => item.trim() !== "");

    // Déclarer deux tableaux pour stocker les colonnes gauche et droite
    let leftCol = [];
    let rightCol = [];

    // Parcourir chaque élément du tableau "clean" et l'ajouter dans la colonne appropriée
    clean.forEach((number, index) => {
        if (index % 2 === 0) {
            // Si l'index est pair, l'élément appartient à la colonne de droite
            rightCol.push(Number(number));
        } else {
            // Si l'index est impair, l'élément appartient à la colonne de gauche
            leftCol.push(Number(number));
        }
    });

    // Trier la colonne de gauche en ordre croissant
    leftCol.sort((a, b) => a - b);
    // Trier la colonne de droite en ordre croissant
    rightCol.sort((a, b) => a - b);

    // Afficher les colonnes triées dans la console pour vérifier le résultat
    console.log("Left Column:", leftCol);
    console.log("Right Column:", rightCol);

    // Calculer le nombre d'occurrences de chaque élément de la colonne gauche dans la colonne droite
    const occurrences = leftCol.map(number => {
        // Calculer combien de fois le "number" de la colonne de gauche apparaît dans la colonne de droite
        const count = rightCol.filter(item => item === number).length;
        // Calculer le produit entre le nombre et le nombre d'occurrences
        const result = number * count;
        // Afficher chaque nombre, ses occurrences et le produit calculé
        console.log(`Nombre ${number}, Occurrences : ${count}, Produit : ${result}`);
        // Retourner le produit pour construire un tableau des produits
        return result;
    });

    // Afficher le tableau des produits obtenus à partir des occurrences dans la console
    console.log("Occurrences Array :", occurrences);

    // Calculer la somme des produits des occurrences (c'est-à-dire la somme du tableau "occurrences")
    const sum = occurrences.reduce((acc, num) => acc + num, 0);

    // Afficher la somme totale des occurrences dans une alerte
    alert(`Sum of occurrences: ${sum}`);
}
