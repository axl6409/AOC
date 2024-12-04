function resolveRiddle() {
    const instructions = document.querySelector('pre').textContent;
    if (!instructions) {
        alert("Aucune instruction trouvée!");
        return;
    }

    let floor = 0; // L'étage actuel
    let firstBasementPosition = -1; // Position du premier sous-sol
    const steps = instructions.split(''); // Diviser les instructions

    for (let i = 0; i < steps.length; i++) {
        console.log(`Etage actuel : ${floor}`);
        const char = steps[i];

        // Monter ou descendre d'un étage
        if (char === '(') {
            floor++;
        } else if (char === ')') {
            floor--;
        }

        // Vérifier si c'est la première fois qu'il entre dans le sous-sol
        if (floor === -1 && firstBasementPosition === -1) {
            firstBasementPosition = i + 1; // Enregistrer la position (1-based index)
        }
    }

    alert(`Étage final : ${floor}`);
    alert(`Première entrée dans le sous-sol à la position : ${firstBasementPosition}`);
}