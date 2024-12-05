function resolveRiddle() {
    const content = document.querySelector('pre').innerText;

    if (!content) {
        alert("Aucun contenu trouvée!");
        return;
    }

    const clean = content.split(/\s+/).filter(item => item.trim() !== "");

    let leftCol = [];
    let rightCol = [];

    clean.forEach((number, index) => {
        if (index % 2 === 0) {
            rightCol.push(Number(number));
        } else {
            leftCol.push(Number(number));
        }
    });

    leftCol.sort((a, b) => a - b);
    rightCol.sort((a, b) => a - b);

    console.log("Left Column:", leftCol);
    console.log("Right Column:", rightCol);

    const occurrences = leftCol.map(number => {
        const count = rightCol.filter(item => item === number).length;
        const result = number * count;
        console.log(`Nombre ${number}, Occurrences : ${count}, Produit : ${result}`);
        return result;
    });

    console.log("Occurrences Array :", occurrences);

    const sum = occurrences.reduce((acc, num) => acc + num, 0);

    alert(`Sum of occurrences: ${sum}`);
}