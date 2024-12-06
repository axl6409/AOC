function resolveRiddle() {
    // Charger le contenu de l'élément <pre> dans le DOM
    const minifiedCode = document.querySelector('pre').innerText;

    // Si le contenu est vide, afficher une alerte et arrêter l'exécution
    if (!minifiedCode) {
        alert("Aucun code trouvée!");
        return;
    }

    // Expressions régulières
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/g; // Capture tous les appels `mul(x,y)` où x et y sont des nombres entre 1 et 3 chiffres
    const dontRegex = /\bdon't\(\)/g; // Capture les occurrences de `don't()` isolées
    const doRegex = /\bdo\(\)/g; // Capture les occurrences de `do()` isolées

    let matches = []; // Tableau pour stocker toutes les instructions `mul(x,y)` prises en compte
    let result = 0; // Résultat final de la somme des produits des instructions `mul(x,y)`
    let isActive = true; // État indiquant si on doit prendre en compte les `mul(x,y)`
    let cursor = 0; // Position actuelle dans le texte à partir de laquelle on commence à chercher

    // Boucle principale pour parcourir tout le texte
    while (cursor < minifiedCode.length) {
        // Chercher les prochaines occurrences de `don't()` et `do()` à partir de la position actuelle
        const nextDont = dontRegex.exec(minifiedCode); // Prochaine occurrence de `don't()`
        const nextDo = doRegex.exec(minifiedCode); // Prochaine occurrence de `do()`

        // Déterminer quelle est la prochaine limite d'événement (le plus proche entre `don't()` et `do()`)
        const nextEvent = Math.min(
          nextDont ? nextDont.index : Infinity, // Si `don't()` est trouvé, utilise sa position, sinon `Infinity`
          nextDo ? nextDo.index : Infinity // Si `do()` est trouvé, utilise sa position, sinon `Infinity`
        );

        // Rechercher les `mul(x,y)` jusqu'à la prochaine limite d'événement
        mulRegex.lastIndex = cursor; // Repositionner la recherche de `mul(x,y)` à la position actuelle

        let mulMatch;
        while (isActive && (mulMatch = mulRegex.exec(minifiedCode)) !== null && mulMatch.index < nextEvent) {
            const x = Number(mulMatch[1]); // Extraire le premier nombre
            const y = Number(mulMatch[2]); // Extraire le deuxième nombre

            // Ajouter l'instruction `mul(x,y)` au tableau des matches
            matches.push(mulMatch[0]);

            // Ajouter le produit x * y au résultat final
            result += x * y;
        }

        // Gérer les événements `don't()` et `do()`
        if (nextDont && nextDont.index === nextEvent) {
            isActive = false; // Désactiver la prise en compte des `mul(x,y)`
            cursor = dontRegex.lastIndex; // Avancer le curseur après `don't()`
        } else if (nextDo && nextDo.index === nextEvent) {
            isActive = true; // Réactiver la prise en compte des `mul(x,y)`
            cursor = doRegex.lastIndex; // Avancer le curseur après `do()`
        } else {
            break; // Si aucun événement n'est trouvé, on sort de la boucle principale
        }
    }

    // Afficher les résultats
    console.log(matches); // Les instructions `mul(x,y)` prises en compte
    console.log(result); // La somme totale des produits
    alert(`Somme des produits des instructions \`mul(x,y)\` : ${result}` + "\n" + "Instructions \`mul(x,y)\` prises en compte : " + matches.length);
}
